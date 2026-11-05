---
id: monorepo-frontend-expo
versione: 1
descrizione: Frontend Expo (web-first, Expo Router) nel monorepo, con Metro configurato per leggere i pacchetti della radice.
quando_usarlo: Monorepo con un'app Expo / React Native web-first.
quando_no: App Android pura con la struttura `mobile/` + `shared/` (usare android-rn).
etichette: [monorepo, frontend]
richiede: [monorepo-npm-workspaces, monorepo-shared-zod]
conflitti: [android-rn]
azioni_esterne: false
---

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
