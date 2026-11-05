# Sicurezza

Questo repository contiene solo **modelli di configurazione**: file di testo, workflow di esempio e script. Non contiene segreti e non deve mai contenerne.

## Segnalare un problema

Se trovi una chiave, una password, un dato personale o una vulnerabilità in un modulo (per esempio un workflow che espone un secret):

1. **Non aprire una issue pubblica** con i dettagli.
2. Usa "Report a vulnerability" nella scheda **Security** del repository (segnalazione privata).

Riceverai una risposta appena possibile. Se un segreto è finito per errore in un commit, va considerato compromesso e ruotato subito, prima di ripulire la cronologia.

## Principi dei moduli

- Nessun segreto nei file: i workflow leggono i secret del repository dell'app (`${{ secrets.NOME }}`), che imposta solo l'utente.
- Workflow solo manuali (`workflow_dispatch`): nessuno parte da pull request o commenti esterni.
- Niente pubblicazione in produzione senza richiesta esplicita.
