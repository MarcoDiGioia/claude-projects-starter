---
id: privacy-policy
versione: 1
descrizione: Pagina privacy dell'app pubblicata con GitHub Pages in un repository pubblico.
quando_usarlo: App che raccoglie dati o usa pubblicità (quasi sempre).
quando_no: App senza dati e senza ads.
etichette: [dati-utente]
richiede: []
conflitti: []
azioni_esterne: true   # scrive in un altro repo (il sito GitHub Pages)
---

## Dove
Le privacy policy stanno in un repository pubblico con GitHub Pages (es. `<tuo-utente>/<tuo-utente>.github.io`, pubblicato da `main`), in `<app>/privacy/index.html`, raggiungibili su `https://<tuo-utente>.github.io/<app>/privacy/`. L'URL va in Play Console: una volta inserito non spostarlo. Un repository privato col piano gratuito non può pubblicare Pages, per questo serve un repository pubblico dedicato.

## Cosa fare
- Aggiungere `<app>/privacy/index.html` nel repo pubblico, modellandola su una policy esistente.
- Aggiungere il link nella `index.html` di quel repo.
- Mettere l'URL in Play Console (Contenuti dell'app).

## Note
Nessun file nel modulo: una pagina privacy dipende dai dati raccolti e dalla giurisdizione. Se ne hai una collaudata, aggiungila come `riferimenti/`.

## Passi manuali (a carico dell'utente)
Approvare la PR sul repository del sito e inserire l'URL in Play Console.

## Verifica
L'URL `https://<tuo-utente>.github.io/<app>/privacy/` risponde.
