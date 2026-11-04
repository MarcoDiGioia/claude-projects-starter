# CLAUDE.md

Monorepo npm workspaces: `shared` (schemi Zod e tipi), `backend` (NestJS + Prisma), `frontend` (Expo). Ogni pacchetto ha il suo `CLAUDE.md` con le regole tecniche.

## Comandi (dalla radice)

- `npm ci`: installa tutto ed esegue il build di `shared` (script `postinstall`).
- `npm run build:shared`: ricompila `@APP_SCOPE/shared`. **Obbligatorio dopo ogni modifica in `shared/`.**
- `npm run dev:backend`, `npm run dev:web`, `npm run dev`: avvio in sviluppo.
- `npm run test:backend`, `npm run test:shared`: test.

## Regole

- Tutto ciò che passa tra client e server sta in `@APP_SCOPE/shared`: mai duplicare tipi tra frontend e backend.
- Nessun segreto nei file: `.env` non va mai in git, solo `.env.example` con valori finti.
- Node >= 20.
