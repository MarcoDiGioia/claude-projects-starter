## Risparmio di token

Dettagli e comandi nella skill `risparmio-token` (`.claude/skills/risparmio-token/SKILL.md`): leggerla quando la sessione è lunga o costosa.

1. Risposte brevi: prima il risultato, poi solo i dettagli necessari. Niente riassunti del diff, niente ripetizione della domanda.
2. Cercare prima (Grep/Glob), poi leggere solo l'intervallo utile del file. Non rileggere file già letti e non modificati, né dopo una modifica riuscita.
3. Chiamate indipendenti in parallelo, in un solo turno.
4. Limitare l'output dei comandi alla fonte (`tail`, `grep`, `--quiet`, `git diff --stat`): mai log interi in contesto.
5. Ricerche ampie nel codice: delegarle al subagente `esploratore` (modello leggero, sola lettura). Nessun subagente per compiti piccoli.
6. Modello e sforzo proporzionati: leggeri per lavoro meccanico, alti solo per progettazione e debug difficile. Sceglierli a inizio compito, non a ogni turno.
7. Compattare il contesto (`/compact` con cosa tenere) a fine sotto-compito o verso il 60%; `/clear` quando cambia argomento.
8. Non cambiare `CLAUDE.md`, impostazioni o server MCP a sessione avviata (rompe la cache del prompt). Disattivare i server MCP inutilizzati.
