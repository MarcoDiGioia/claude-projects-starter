# CLAUDE.md

Regole valide per tutti i progetti (modulo `regole-base`). Aggiungere sotto le regole specifiche del progetto.

## Regole

1. Cloud prima di tutto: il lavoro vive in repository remoti; i dispositivi locali sono solo un'area temporanea e ogni risultato torna sul repository.
2. Nessun segreto in chat o nei file: chiavi, password e JSON dell'account di servizio vanno solo nei secret del repo, impostati dall'utente.
3. Workflow CI solo manuali (`workflow_dispatch`), uso minimo di Actions.
4. Niente pubblicazione in produzione senza richiesta esplicita dell'utente.
5. Niente disinstallazioni o cancellazioni senza ok.
6. Una PR si unisce solo dopo l'ok dell'utente su quella PR.
7. Niente push di codice non verificato (type-check e build prima di ogni push). "Sembra giusto" non basta: serve output concreto (log, build riuscita).
8. Commit in inglese `[nome-app] descrizione`. Branch: `feature/<app>/<descrizione>`, `bugfix/<app>/<descrizione>`. `main` = codice pronto per la produzione.
9. Quando un file standard migliora in un'app, riportare la modifica nel modulo corrispondente del cestino.

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

## Principi

- Semplicità prima di tutto: ogni modifica la più semplice possibile, con impatto minimo.
- Trovare la causa vera dei problemi, niente soluzioni temporanee.
- Toccare solo il necessario.
