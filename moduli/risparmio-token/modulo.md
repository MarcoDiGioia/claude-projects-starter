---
id: risparmio-token
versione: 1
descrizione: Regole, skill, subagente e impostazioni per ridurre il consumo di token.
quando_usarlo: Consigliato per ogni progetto; proporlo sempre nel piano insieme a regole-base.
quando_no: Se l'utente preferisce non limitare letture e output.
etichette: [sempre]
richiede: [regole-base]
conflitti: []
azioni_esterne: false
---

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/CLAUDE.risparmio-token.md` | in coda al `CLAUDE.md` del progetto (dopo `regole-base`) |
| `files/.claude/settings.json` | `.claude/settings.json` (se esiste già, unire `env` e `permissions.deny`) |
| `files/.claude/skills/risparmio-token/SKILL.md` | stesso percorso |
| `files/.claude/agents/esploratore.md` | stesso percorso |

## Cosa fa
- **Regole** (`CLAUDE.risparmio-token.md`): 8 regole brevi, sempre in contesto. Il dettaglio sta nella skill, che si carica solo quando serve.
- **Skill `risparmio-token`**: gestione del contesto (`/compact`, `/clear`, `/context`, `/cost`), letture parziali, filtro dell'output dei comandi, scelta di modello e sforzo, prompt caching, `CLAUDE.md` snello.
- **Subagente `esploratore`**: ricerca in sola lettura con modello `haiku`; nel contesto principale torna solo la conclusione.
- **`.claude/settings.json`**: limita l'output di Bash (`BASH_MAX_OUTPUT_LENGTH`) e degli strumenti MCP (`MAX_MCP_OUTPUT_TOKENS`), imposta `haiku` per i subagenti (`CLAUDE_CODE_SUBAGENT_MODEL`), disattiva le chiamate al modello non essenziali e vieta la lettura di cartelle e file inutili (`node_modules`, build, `.godot`, lockfile, log).

## Note
Modello principale e sforzo non sono fissati: si scelgono per compito (`/model`, `/effort`). Per un modello predefinito aggiungere `"model"` in `.claude/settings.json`. L'elenco `deny` va adattato alle cartelle del progetto.

## Passi manuali
Nessuno. Facoltativo: adattare l'elenco `deny` e disattivare con `/mcp` i server MCP non usati.

## Verifica
`CLAUDE.md` contiene la sezione "Risparmio di token"; `python3 -m json.tool .claude/settings.json` non dà errori; esistono `.claude/skills/risparmio-token/SKILL.md` e `.claude/agents/esploratore.md`.
