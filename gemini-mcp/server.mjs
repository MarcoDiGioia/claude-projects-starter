#!/usr/bin/env node
// MCP server (stdio, JSON-RPC 2.0, zero dipendenze) che inoltra le domande
// alla Gemini CLI ufficiale già installata e autenticata sul tuo computer.
// Non legge né copia token: lancia semplicemente `gemini -p "<prompt>"`.
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";

const GEMINI_BIN = process.env.GEMINI_BIN || "gemini";
const DEFAULT_MODEL = process.env.GEMINI_MODEL || ""; // vuoto = default della CLI
const TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS || 180000);
const MIN_GAP_MS = Number(process.env.GEMINI_MIN_GAP_MS || 2000); // pausa tra chiamate (gentile con la quota)
const MAX_PROMPT = 200000;

const TOOLS = [{
  name: "ask_gemini",
  description:
    "Fa una domanda a Gemini (tramite la Gemini CLI locale con l'account Google dell'utente) e restituisce la risposta testuale. " +
    "Utile per un secondo parere, confronti o per usare i punti di forza di Gemini. Ogni chiamata è senza memoria: includi nel prompt tutto il contesto necessario.",
  inputSchema: {
    type: "object",
    properties: {
      prompt: { type: "string", description: "Domanda completa, con tutto il contesto." },
      model: { type: "string", description: "Opzionale: modello Gemini (es. gemini-2.5-pro). Se omesso usa il default della CLI." },
    },
    required: ["prompt"],
  },
}];

let lastEnd = 0;
let queue = Promise.resolve(); // una chiamata alla volta

function runGemini(prompt, model) {
  return new Promise((resolve, reject) => {
    const args = ["-p", prompt, "--output-format", "json"];
    const m = model || DEFAULT_MODEL;
    if (m) args.push("-m", m);
    const cwd = mkdtempSync(join(tmpdir(), "gemini-mcp-")); // cartella vuota: Gemini non vede i tuoi file
    const child = spawn(GEMINI_BIN, args, { cwd, stdio: ["ignore", "pipe", "pipe"], env: process.env });
    let out = "", err = "", done = false;
    const finish = (fn, v) => { if (done) return; done = true; clearTimeout(t); rmSync(cwd, { recursive: true, force: true }); fn(v); };
    const t = setTimeout(() => { child.kill("SIGKILL"); finish(reject, new Error(`Timeout dopo ${TIMEOUT_MS / 1000}s`)); }, TIMEOUT_MS);
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("error", (e) => finish(reject, new Error(
      e.code === "ENOENT"
        ? `Gemini CLI non trovata ("${GEMINI_BIN}"). Installala con: npm i -g @google/gemini-cli, poi esegui "gemini" una volta e accedi con Google.`
        : e.message)));
    child.on("close", (code) => {
      if (code !== 0) return finish(reject, new Error(`gemini è uscita con codice ${code}: ${(err || out).trim().slice(0, 2000)}`));
      let text = out.trim();
      try { const j = JSON.parse(text); if (typeof j.response === "string") text = j.response; } catch { /* output non JSON: lo restituisco com'è */ }
      finish(resolve, text || "(risposta vuota)");
    });
  });
}

function enqueue(fn) {
  const run = queue.then(async () => {
    const wait = lastEnd + MIN_GAP_MS - Date.now();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    try { return await fn(); } finally { lastEnd = Date.now(); }
  });
  queue = run.catch(() => {});
  return run;
}

const send = (o) => process.stdout.write(JSON.stringify(o) + "\n");
const ok = (id, result) => send({ jsonrpc: "2.0", id, result });
const fail = (id, code, message) => send({ jsonrpc: "2.0", id, error: { code, message } });

async function handle(msg) {
  const { id, method, params } = msg;
  if (id === undefined) return; // notifica (es. notifications/initialized)
  switch (method) {
    case "initialize":
      return ok(id, {
        protocolVersion: params?.protocolVersion || "2025-06-18",
        capabilities: { tools: {} },
        serverInfo: { name: "gemini-mcp", version: "1.0.0" },
      });
    case "ping": return ok(id, {});
    case "tools/list": return ok(id, { tools: TOOLS });
    case "tools/call": {
      if (params?.name !== "ask_gemini") return fail(id, -32602, `Tool sconosciuto: ${params?.name}`);
      const { prompt, model } = params.arguments || {};
      if (typeof prompt !== "string" || !prompt.trim()) return fail(id, -32602, "prompt mancante");
      if (prompt.length > MAX_PROMPT) return ok(id, { isError: true, content: [{ type: "text", text: `Prompt troppo lungo (max ${MAX_PROMPT} caratteri).` }] });
      try {
        const text = await enqueue(() => runGemini(prompt, model));
        return ok(id, { content: [{ type: "text", text }] });
      } catch (e) {
        return ok(id, { isError: true, content: [{ type: "text", text: String(e.message || e) }] });
      }
    }
    default: return fail(id, -32601, `Metodo non supportato: ${method}`);
  }
}

createInterface({ input: process.stdin }).on("line", (line) => {
  if (!line.trim()) return;
  let msg;
  try { msg = JSON.parse(line); } catch { return fail(null, -32700, "JSON non valido"); }
  handle(msg).catch((e) => msg.id !== undefined && fail(msg.id, -32603, String(e.message || e)));
});
