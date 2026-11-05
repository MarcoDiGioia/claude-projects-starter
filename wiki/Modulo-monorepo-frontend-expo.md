# monorepo-frontend-expo

Frontend Expo (web-first, Expo Router) nel monorepo, con Metro configurato per leggere i pacchetti della radice.

| | |
|---|---|
| Quando usarlo | Monorepo con un'app Expo / React Native web-first. |
| Quando no | App Android pura con la struttura `mobile/` + `shared/` (usare android-rn). |
| Richiede | monorepo-npm-workspaces, monorepo-shared-zod |
| Conflitti | android-rn |
| Azioni esterne | false |
| Versione | 1 |

Riferimenti del modulo: [https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/scaffold/monorepo-frontend-expo](https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/scaffold/monorepo-frontend-expo)

Non inclusi: SVG transformer, NativeWind, il design system e i componenti specifici di un progetto.

## Riferimenti
| Riferimento (nel modulo) | Destinazione (nel progetto) |
|---|---|
| `riferimenti/frontend/metro.config.js` | `frontend/metro.config.js` |
| `riferimenti/frontend/tsconfig.json` | `frontend/tsconfig.json` |
| `riferimenti/frontend/.env.example` | `frontend/.env.example` |
| `riferimenti/frontend/CLAUDE.md` | `frontend/CLAUDE.md` |

## Segnaposto
`APP_SCOPE`.

## Da creare con Expo
Creare l'app con `npx create-expo-app` in `frontend/` e fonderne `package.json` con gli script `start` e `web` richiesti dalla radice. Il pacchetto dipende da `"@APP_SCOPE/shared": "*"`.

## Note
- Il progetto di origine usa Expo 52, target web-first (PWA); iOS e Android nativi sono secondari.
- Metro ha bisogno di `watchFolders` e `nodeModulesPaths` sulla radice perché le dipendenze sono sollevate in `node_modules` della radice.

## Passi manuali (a carico dell'utente)
Nessuno per questo modulo.

## Verifica
`npm run dev:web` avvia il server e l'app importa un tipo da `@APP_SCOPE/shared`.
