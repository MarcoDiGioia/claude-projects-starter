---
id: monorepo-shared-zod
versione: 1
descrizione: Pacchetto condiviso di schemi Zod, tipi inferiti ed enum, compilato in CommonJS e usato da backend e frontend.
quando_usarlo: Monorepo in cui client e server scambiano dati.
quando_no: Progetti senza un pacchetto condiviso.
etichette: [monorepo]
richiede: [monorepo-npm-workspaces]
conflitti: []
azioni_esterne: false
---

Senza schemi di dominio.

## Riferimenti
| Riferimento (nel modulo) | Destinazione (nel progetto) |
|---|---|
| `riferimenti/shared/package.json` | `shared/package.json` |
| `riferimenti/shared/tsconfig.json`, `tsconfig.build.json` | `shared/` |
| `riferimenti/shared/src/index.ts` | `shared/src/index.ts` |
| `riferimenti/shared/CLAUDE.md` | `shared/CLAUDE.md` |

## Segnaposto
`APP_SCOPE`.

## Note
- Il build usa il `tsc` della radice (`../node_modules/typescript`), quindi serve `npm ci` dalla radice.
- Il backend mappa `@APP_SCOPE/shared` ai sorgenti in Jest (vedi `monorepo-backend-nestjs`); il frontend lo legge da `node_modules` tramite workspaces.

## Verifica
`npm run build:shared` produce `shared/dist/index.js`; `npm run test:shared` passa (senza test, aggiungerne uno per schema).
