# gemini-mcp

Server MCP locale (stdio, zero dipendenze, solo Node 18+) che aggiunge a Claude Desktop / Claude Code il tool **`ask_gemini`**. Inoltra la domanda alla **Gemini CLI ufficiale** già installata sul tuo computer, quindi usa il login Google (e la quota del tuo abbonamento) e non le API a crediti.

## Rischi: leggere prima di usarlo

- **Termini d'uso.** La documentazione della Gemini CLI dice che accedere ai servizi che la alimentano con software di terze parti usando il login OAuth (esempi citati: OpenClaw, Claude Code) viola i termini. Google ha sospeso account per questo. Questo server **non estrae né riusa token**: lancia il binario ufficiale `gemini -p`. È la variante più prudente, ma Google non ha risposto in modo ufficiale se questo sia permesso: resta una **zona grigia** e il rischio ricade sul tuo account Google (che è lo stesso di Gmail e Drive). Se vuoi zero rischio, usa una chiave API di Google AI Studio (ha un piano gratuito) con `GEMINI_API_KEY`: la CLI la usa al posto del login.
- **Quote.** Ogni chiamata consuma la quota di Gemini CLI del tuo piano, che è separata dall'app Gemini. Le chiamate sono messe in coda una alla volta con 2 s di pausa.
- **Cambi di Google.** Alcune fonti riportano restrizioni recenti al login Google nella CLI. Verifica che `gemini -p "ciao"` funzioni nel tuo terminale prima di configurare Claude.
- **Privacy.** Il prompt va a Google. Gemini gira in una cartella temporanea vuota e non vede i tuoi file, a meno che tu non li incolli nel prompt.

## Installazione

1. `npm i -g @google/gemini-cli`, poi esegui `gemini` una volta e accedi con l'account Google dell'abbonamento.
2. Prova: `gemini -p "ciao"`.
3. Copia `server.mjs` dove vuoi (o clona il repo) e aggiungi a `claude_desktop_config.json` (Impostazioni, Sviluppatore, Modifica config):

```json
{
  "mcpServers": {
    "gemini": {
      "command": "node",
      "args": ["/percorso/assoluto/gemini-mcp/server.mjs"]
    }
  }
}
```

Su Windows usa `"C:\\percorso\\gemini-mcp\\server.mjs"`. Riavvia Claude Desktop. Per Claude Code: `claude mcp add gemini -- node /percorso/server.mjs`.

Variabili opzionali: `GEMINI_BIN` (percorso del binario se non è nel PATH di Claude Desktop), `GEMINI_MODEL`, `GEMINI_TIMEOUT_MS` (180000), `GEMINI_MIN_GAP_MS` (2000).

## Limiti

Funziona solo sul tuo computer: i progetti Claude sul web e le sessioni cloud non possono lanciarlo. Ogni chiamata è senza memoria. Il formato JSON della CLI (`--output-format json`, campo `response`) è verificato solo sulla documentazione: se non è JSON, il server restituisce il testo grezzo.
