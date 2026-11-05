# Regole tecniche: backend (NestJS e Prisma)

**Validazione obbligatoria:** nessun dato grezzo del client deve raggiungere il database. Ogni body, query o parametro va validato con schemi Zod importati da `@APP_SCOPE/shared`.

## Comandi
Dalla radice: `npm ci`, `npm run build:shared` (dopo modifiche a `shared/`), `npm run dev:backend`, `npm run test:backend`.
Test singolo (da `backend/`): `npx jest src/modules/<nome>/<file>.spec.ts --no-coverage`.
Prisma (da `backend/`): `npx prisma migrate dev --name <nome>`, `npx prisma studio`, `npx prisma generate`.

## Architettura
1. **Moduli:** codice in `src/modules/<nome>`. Un controller o service oltre le 250 righe va scorporato.
2. **Dati condivisi:** mai duplicare tipi; un DTO del backend estende o avvolge lo schema Zod condiviso.
3. **Segreti:** mai nel codice; sempre da `process.env`.
4. **Servizi esterni dietro interfacce:** il codice di business non conosce l'implementazione concreta. Il provider si sceglie a bootstrap con un token di Dependency Injection (es. `AUTH_PROVIDER` → `IAuthProvider`), non con una variabile d'ambiente.
5. **Autorizzazione:** nessun endpoint di business è pubblico di default. Usare auth guard + `RolesGuard` con logica OR (`@Roles('A', 'B')`). I ruoli si derivano dalle relazioni nel database, non da un campo diretto sull'utente.

## Variabili d'ambiente
Vedi `.env.example`. Con un database gestito, usare per `DATABASE_URL` il pooler a transazioni e per `DIRECT_URL` (usata da `prisma migrate`) la connessione compatibile con l'hosting.
