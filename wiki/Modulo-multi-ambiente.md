# multi-ambiente

Configurazione dev/test/prod iniettata da Babel (ENV) con constants.ts e ENVIRONMENTS.md.

| | |
|---|---|
| Quando usarlo | Ogni app React Native che segue la struttura del cestino (obbligatorio nello standard). |
| Quando no | Progetti non React Native. |
| Richiede | android-rn |
| Azioni esterne | false |
| Versione | 1 |

Riferimenti del modulo: [https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/moduli/multi-ambiente](https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/moduli/multi-ambiente)

## Riferimenti
| Riferimento (nel modulo) | Destinazione (nel progetto) |
|---|---|
| `riferimenti/shared/src/utils/config/` (`types.ts`, `index.ts`, `dev.ts`, `test.ts`, `prod.ts`) | `shared/src/utils/config/` |
| `riferimenti/shared/src/utils/constants.ts` | `shared/src/utils/constants.ts` |
| `riferimenti/ENVIRONMENTS.md` | `ENVIRONMENTS.md` |

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
