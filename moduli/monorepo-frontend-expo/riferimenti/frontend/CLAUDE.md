# Regole tecniche: frontend (Expo e React Native)

**Zero silent failure:** ogni interazione dell'utente ha un feedback visivo. Nessuna chiamata asincrona o validazione fallisce senza avvisare: bottoni disabilitati, indicatori di caricamento, banner di errore chiari.

## Comandi (dalla radice)
`npm ci`, `npm run build:shared` (dopo modifiche a `shared/`), `npm run dev:web`.

## Linee guida
1. **Navigazione:** Expo Router con rotte organizzate per gruppi (es. `(auth)` e `(dashboard)`).
2. **Stile e design:** usare i token del design system del progetto; niente colori esadecimali o pixel arbitrari nei componenti. Spaziatura in base 4.
3. **Stato e caricamento:** prima di ogni chiamata API `setIsLoading(true)`, tutto in `try/catch`, errore mostrato all'utente (anche l'output di `ZodError`), `setIsLoading(false)` nel `finally`.
4. **Form:** validazione con gli schemi Zod di `@APP_SCOPE/shared`, testo d'errore visibile sotto ogni campo non valido.
5. **Stati vuoti ed errori:** componenti dedicati (`<EmptyState>`, `<ErrorState>`) al posto di spazi vuoti o testi rossi ad hoc.

## Variabili d'ambiente
Vedi `.env.example`. Le variabili `EXPO_PUBLIC_*` finiscono nel bundle: mai segreti.
