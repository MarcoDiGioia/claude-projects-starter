# monorepo-backend-nestjs

Backend NestJS 11 + Prisma 6 + Jest nel monorepo, con validazione Zod da shared e regole su moduli, guard e DI.

| | |
|---|---|
| Quando usarlo | Monorepo che ha un'API. |
| Quando no | Progetti senza backend. |
| Richiede | monorepo-npm-workspaces, monorepo-shared-zod |
| Azioni esterne | false |
| Versione | 1 |

Riferimenti del modulo: [https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/scaffold/monorepo-backend-nestjs](https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/scaffold/monorepo-backend-nestjs)

Le integrazioni specifiche (autenticazione gestita, pagamenti, monitoraggio, notifiche push, PDF, email) non sono incluse: si aggiungono caso per caso.

## Riferimenti
| Riferimento (nel modulo) | Destinazione (nel progetto) |
|---|---|
| `riferimenti/backend/package.json` | `backend/package.json` |
| `riferimenti/backend/tsconfig.json` | `backend/tsconfig.json` |
| `riferimenti/backend/.env.example` | `backend/.env.example` |
| `riferimenti/backend/CLAUDE.md` | `backend/CLAUDE.md` |

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
