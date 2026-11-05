---
id: regole-base
versione: 2
descrizione: CLAUDE.md di partenza con le regole valide per tutti i progetti, più regole, skill, subagente e impostazioni per ridurre il consumo di token.
quando_usarlo: Sempre, per ogni nuovo progetto.
quando_no: mai
etichette: [sempre]
richiede: []
conflitti: []
azioni_esterne: false
---

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/CLAUDE.base.md` | `CLAUDE.md` (se esiste già, unire le regole in cima) |
| `files/.claude/settings.json` | `.claude/settings.json` (se esiste già, unire `env` e `permissions.deny`) |
| `files/.claude/skills/risparmio-token/SKILL.md` | stesso percorso |
| `files/.claude/agents/esploratore.md` | stesso percorso |

## Risparmio di token
- **Regole** (`CLAUDE.base.md`, sezione "Risparmio di token"): 8 regole brevi, sempre in contesto. Il dettaglio sta nella skill, che si carica solo quando serve.
- **Skill `risparmio-token`**: gestione del contesto (`/compact`, `/clear`, `/context`, `/cost`), letture parziali, filtro dell'output dei comandi, scelta di modello e sforzo, prompt caching, `CLAUDE.md` snello.
- **Subagente `esploratore`**: ricerca in sola lettura con modello `haiku`; nel contesto principale torna solo la conclusione.
- **`.claude/settings.json`**: limita l'output di Bash (`BASH_MAX_OUTPUT_LENGTH`) e degli strumenti MCP (`MAX_MCP_OUTPUT_TOKENS`), imposta `haiku` per i subagenti (`CLAUDE_CODE_SUBAGENT_MODEL`), disattiva le chiamate al modello non essenziali, e vieta la lettura di cartelle e file inutili (`node_modules`, build, `.godot`, lockfile, log). Adattare l'elenco `deny` alle cartelle del progetto.
- Il modello principale e lo sforzo non sono fissati nelle impostazioni: si scelgono per compito (`/model`, `/effort`). Se si vuole un modello predefinito, aggiungere `"model"` in `.claude/settings.json`.

## Note
Sono regole predefinite ragionevoli, da adattare al proprio modo di lavorare. Le preferenze di processo più personali (uso della modalità piano, subagenti, file di lezioni apprese, task list) non sono incluse: aggiungerle se servono.

## Passi manuali
Nessuno.

## Verifica
Il file `CLAUDE.md` esiste nella radice del nuovo progetto. `.claude/settings.json` è JSON valido (`python3 -m json.tool .claude/settings.json`) e i due file in `.claude/skills/` e `.claude/agents/` esistono.
