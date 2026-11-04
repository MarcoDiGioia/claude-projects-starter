---
id: privacy-policy
versione: 1
descrizione: Pagina privacy dell'app nel repo pubblico MarcoDiGioia.github.io (GitHub Pages).
quando_usarlo: App che raccoglie dati o usa pubblicità (quasi sempre).
quando_no: App senza dati e senza ads.
etichette: [dati-utente]
richiede: []
conflitti: []
azioni_esterne: true   # scrive in un altro repo (MarcoDiGioia/MarcoDiGioia.github.io)
---

## Dove
Le privacy policy stanno in [MarcoDiGioia/MarcoDiGioia.github.io](https://github.com/MarcoDiGioia/MarcoDiGioia.github.io) (GitHub Pages da `main`), in `<app>/privacy/index.html`, pubblicate su `https://marcodigioia.github.io/<app>/privacy/`. Questi URL sono in Play Console: non spostarli. (`progetto-gazza` è privato e col piano gratuito non può pubblicare Pages.)

## Cosa fare
- Aggiungere `<app>/privacy/index.html` nel repo pubblico, modellandola su quella di un'app esistente.
- Aggiungere il link nella `index.html` di quel repo.
- Mettere l'URL in Play Console (Contenuti dell'app).

## Note
Nessun file nel modulo: il template di progetto-gazza non contiene una pagina privacy da copiare. Da aggiungere come `files/` partendo da una policy esistente, quando Marco la indica.

## Passi manuali (li fa Marco)
Approvare la PR sul repo `MarcoDiGioia.github.io` e inserire l'URL in Play Console.

## Verifica
L'URL `https://marcodigioia.github.io/<app>/privacy/` risponde.
