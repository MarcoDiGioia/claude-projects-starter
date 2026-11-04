---
id: play-console-checklist
versione: 1
descrizione: Elenco dei passi a mano in Play Console per una nuova app.
quando_usarlo: App Android su Play.
quando_no: App non su Play.
etichette: [play]
richiede: []
conflitti: []
azioni_esterne: false
---

## Passi manuali (li fa Marco)
1. Creare l'app in Play Console con package `com.progettogazza.<app_package>`.
2. Dare all'account di servizio l'accesso all'app (Utenti e autorizzazioni). Senza, l'upload fallisce con "The caller does not have permission". Per la scheda serve anche il permesso "Gestisci la presenza nello store".
3. Completare "Configura la tua app" nella Dashboard (contenuti dell'app, privacy policy, Data safety, ecc.).
4. Dopo la prima pubblicazione compare il link per i tester.
5. Se l'upload via API fallisce, scaricare l'artifact `aab` del workflow (resta 1 giorno) e caricarlo a mano.
6. Aggiungere l'app alla tabella "App" in `progetto-gazza/CLAUDE.md` (con PR, su ok di Marco).

## Verifica
Il primo deploy internal arriva su Play senza errori di permessi.
