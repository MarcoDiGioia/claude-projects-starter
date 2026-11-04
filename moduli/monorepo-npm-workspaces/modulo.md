---
id: monorepo-npm-workspaces
versione: 1
descrizione: Radice di un monorepo npm workspaces (shared + backend + frontend) con script comuni, .gitignore e CLAUDE.md.
quando_usarlo: Progetto con più pacchetti che condividono codice (es. backend + app + tipi condivisi).
quando_no: App singola (usare android-rn); progetti non JavaScript/TypeScript.
etichette: [monorepo]
richiede: [regole-base]
conflitti: [android-rn]
azioni_esterne: false
---

Senza codice di dominio.

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/package.json` | `package.json` (radice) |
| `files/.gitignore` | `.gitignore` |
| `files/CLAUDE.md` | `CLAUDE.md` (unire con quello di `regole-base`) |

## Segnaposto
`APP_SCOPE`: scope npm in minuscolo (es. `miaapp` → `@miaapp/shared`).

## Note
- `postinstall` costruisce `shared`, quindi `npm ci` lascia subito il monorepo utilizzabile.
- Togliere dal campo `workspaces` e dagli script i pacchetti che il progetto non usa (es. senza frontend). Un pacchetto in più (es. `admin`) si aggiunge in `workspaces` e con uno script `dev:<nome>`.
- Il `conflitti: [android-rn]` indica che i due moduli hanno struttura diversa (`mobile/` + `shared/` contro workspaces). Un'app React Native pura nel monorepo non è ancora coperta da un modulo.
- Nel monorepo di origine esistono anche `setup-node.sh` e script PowerShell per un Node locale in `.tools/`: sono una comodità personale, non inclusi.

## Passi manuali (a carico dell'utente)
Creare il repo GitHub del progetto.

## Verifica
`npm ci` dalla radice termina senza errori e crea `shared/dist/`.
