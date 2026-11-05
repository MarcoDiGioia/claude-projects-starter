---
id: risparmio-token
versione: 1
descrizione: Regole, skill, subagente per ridurre lo spreco di token senza perdere qualità.
quando_usarlo: Consigliato per ogni progetto; proporlo sempre nel piano insieme a regole-base.
quando_no: Se l'utente preferisce non limitare letture e output.
etichette: [sempre]
richiede: [regole-base]
conflitti: []
azioni_esterne: false
---

## Regola salda
**Il modulo non deve mai ridurre le prestazioni di Claude.** Nel conflitto tra risparmio e qualità vince la qualità. Per questo il modulo taglia solo lo spreco e non tocca modello, sforzo di ragionamento, verifiche, limiti di lettura o dimensione degli output. Ogni nuova regola va controllata con questa domanda: "può far perdere informazione o precisione?". Se sì, non entra.

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/CLAUDE.risparmio-token.md` | in coda al `CLAUDE.md` del progetto (dopo `regole-base`) |
| `files/.claude/skills/risparmio-token/SKILL.md` | stesso percorso |
| `files/.claude/agents/esploratore.md` | stesso percorso |

## Cosa fa
- **Regole** (`CLAUDE.risparmio-token.md`): la regola salda più 8 regole brevi, sempre in contesto. Il dettaglio sta nella skill, che si carica solo quando serve.
- **Skill `risparmio-token`**: gestione del contesto (`/compact`, `/clear`, `/context`, `/cost`), ricerca prima della lettura, output dei comandi senza rumore, prompt caching, `CLAUDE.md` snello.
- **Subagente `esploratore`**: ricerca in sola lettura con lo stesso modello della sessione (`model: inherit`); tiene le molte letture fuori dal contesto principale.

## Cosa non fa (di proposito)
Nessun `.claude/settings.json` di default: limiti all'output di Bash o MCP, divieti di lettura (`node_modules`, build, lockfile) e un modello leggero per i subagenti possono far perdere informazione o precisione. Sono scelte facoltative dell'utente, da aggiungere a mano sapendo il rischio. Il modello principale e lo sforzo non si fissano: li sceglie l'utente.

## Passi manuali
Nessuno. Facoltativo: disattivare con `/mcp` i server MCP non usati.

## Verifica
`CLAUDE.md` contiene la sezione "Risparmio di token" con la regola salda; esistono `.claude/skills/risparmio-token/SKILL.md` e `.claude/agents/esploratore.md`.
