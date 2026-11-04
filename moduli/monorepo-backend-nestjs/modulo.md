---
id: monorepo-backend-nestjs
versione: 1
descrizione: Backend NestJS 11 + Prisma 6 + Jest nel monorepo, con validazione Zod da shared e regole su moduli, guard e DI.
quando_usarlo: Monorepo che ha un'API.
quando_no: Progetti senza backend.
etichette: [monorepo, backend]
richiede: [monorepo-npm-workspaces, monorepo-shared-zod]
conflitti: []
azioni_esterne: false
---

Le integrazioni specifiche (autenticazione gestita, pagamenti, monitoraggio, notifiche push, PDF, email) non sono incluse: si aggiungono caso per caso.

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/backend/package.json` | `backend/package.json` |
| `files/backend/tsconfig.json` | `backend/tsconfig.json` |
| `files/backend/.env.example` | `backend/.env.example` |
| `files/backend/CLAUDE.md` | `backend/CLAUDE.md` |

## Segnaposto
`APP_SCOPE`, `APP_SLUG`.

## Da creare con `nest`
`backend/nest-cli.json`, `backend/tsconfig.build.json`, `backend/src/main.ts`, `backend/src/app.module.ts`, `backend/prisma/schema.prisma`. Generarli con `npx @nestjs/cli new` in una cartella temporanea e copiarli, poi allineare `package.json`.

## Note
- Jest mappa `@APP_SCOPE/shared` ai sorgenti di `shared/src`, così i test non richiedono il build.
- Nei sorgenti originali `GET /health-check` e Swagger (`/api/docs` con `SWAGGER_ENABLED=true`) sono le prime due rotte.

## Passi manuali (a carico dell'utente)
Creare il database e mettere `DATABASE_URL` / `DIRECT_URL` reali nel `.env` locale e nei secret dell'hosting.

## Verifica
`npm run test:backend` e `npm run dev:backend` (porta 3000).
