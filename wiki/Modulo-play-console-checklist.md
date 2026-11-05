# play-console-checklist

Elenco dei passi a mano in Play Console per una nuova app.

| | |
|---|---|
| Quando usarlo | App Android su Play. |
| Quando no | App non su Play. |
| Azioni esterne | false |
| Versione | 1 |

Riferimenti del modulo: [https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/moduli/play-console-checklist](https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/moduli/play-console-checklist)

## Passi manuali (a carico dell'utente)
1. Creare l'app in Play Console con package `<APP_PACKAGE_ID>`.
2. Dare all'account di servizio l'accesso all'app (Utenti e autorizzazioni). Senza, l'upload fallisce con "The caller does not have permission". Per la scheda serve anche il permesso "Gestisci la presenza nello store".
3. Completare "Configura la tua app" nella Dashboard (contenuti dell'app, privacy policy, Data safety, ecc.).
4. Dopo la prima pubblicazione compare il link per i tester.
5. Se l'upload via API fallisce, scaricare l'artifact `aab` del workflow (resta 1 giorno) e caricarlo a mano.
6. Se tieni un elenco delle tue app (es. nel `CLAUDE.md` di un repo di riferimento), aggiungere la nuova app.

## Verifica
Il primo deploy internal arriva su Play senza errori di permessi.
