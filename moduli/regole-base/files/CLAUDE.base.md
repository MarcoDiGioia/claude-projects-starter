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

## Principi

- Semplicità prima di tutto: ogni modifica la più semplice possibile, con impatto minimo.
- Trovare la causa vera dei problemi, niente soluzioni temporanee.
- Toccare solo il necessario.
