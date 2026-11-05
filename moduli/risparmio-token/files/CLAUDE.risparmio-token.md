## Risparmio di token

**Regola salda: il risparmio di token non deve mai ridurre la qualità del lavoro.** Se risparmiare e lavorare bene sono in conflitto, vince sempre lavorare bene. Si elimina solo lo spreco (letture ripetute, output rumoroso, contesto inutile), mai: ragionamento, letture necessarie, verifiche (test, build, type-check), completezza delle risposte, sicurezza.

Dettagli nella skill `risparmio-token` (`.claude/skills/risparmio-token/SKILL.md`), da leggere quando la sessione è lunga o costosa.

1. Prosa senza ripetizioni: risultato prima, niente riassunti del diff né eco della domanda. La brevità non toglie mai informazioni che servono per decidere o verificare.
2. Cercare prima (Grep/Glob), poi leggere. Se un intervallo non basta per capire, leggere il file intero. Non rileggere un file già letto e non cambiato.
3. Chiamate indipendenti in parallelo, in un solo turno.
4. Togliere dall'output dei comandi solo il rumore (progress bar, righe ripetute). Un errore va mostrato intero; non nascondere mai un fallimento.
5. Ricerche ampie nel codice: possono essere delegate al subagente `esploratore`; le conclusioni importanti si controllano leggendo le righe che cita. Nessun subagente per compiti piccoli.
6. Modello e sforzo: mai al di sotto di ciò che il compito richiede; nel dubbio restano quelli predefiniti.
7. Compattare il contesto (`/compact` indicando cosa tenere) solo a fine sotto-compito, mai con lavoro a metà; `/clear` quando cambia argomento.
8. Non cambiare `CLAUDE.md` o server MCP a sessione avviata (rompe la cache del prompt).
