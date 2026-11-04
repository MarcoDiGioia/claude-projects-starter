---
id: multi-ambiente
versione: 1
descrizione: Configurazione dev/test/prod iniettata da Babel (ENV) con constants.ts e ENVIRONMENTS.md.
quando_usarlo: Ogni app React Native Gazza (obbligatorio nello standard).
quando_no: Progetti non React Native.
etichette: [android]
richiede: [android-rn]
conflitti: []
azioni_esterne: false
---

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/shared/src/utils/config/` (`types.ts`, `index.ts`, `dev.ts`, `test.ts`, `prod.ts`) | `shared/src/utils/config/` |
| `files/shared/src/utils/constants.ts` | `shared/src/utils/constants.ts` |
| `files/ENVIRONMENTS.md` | `ENVIRONMENTS.md` |

## Segnaposto
`APP_SLUG`, `APP_DISPLAY_NAME`.

## Regole
- `ENV=dev|test|prod` viene iniettata da Babel al bundle time: non è una selezione runtime.
- I servizi importano solo da `constants.ts`, mai da `config/`.
- Per aggiungere un'impostazione: `types.ts` → i tre file env → `constants.ts`.
- Documentare le differenze tra ambienti in `ENVIRONMENTS.md`.
- `dev` e `test` usano gli ID di test ufficiali di Google AdMob; `prod` usa ID reali (da inserire).

## Passi manuali
Inserire in `config/prod.ts` gli ID AdMob reali (da admob.google.com), se l'app ha pubblicità.

## Verifica
`npm run type-check`; `npm run android:dev`, `android:test` e `android:prod` selezionano il DB giusto.
