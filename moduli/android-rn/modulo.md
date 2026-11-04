---
id: android-rn
versione: 1
descrizione: Scheletro React Native 0.85 (babel con ENV inline, metro, tsconfig con alias, script npm standard).
quando_usarlo: App mobile Android (o Android + iOS) in React Native.
quando_no: Progetti web, Godot, altri framework.
etichette: [android]
richiede: [regole-base]
conflitti: []
azioni_esterne: false
---

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/mobile/babel.config.js` | `mobile/babel.config.js` |
| `files/mobile/metro.config.js` | `mobile/metro.config.js` |
| `files/mobile/tsconfig.json` | `mobile/tsconfig.json` |
| `files/mobile/package.json` | `mobile/package.json` (unire con quello creato da `init`) |
| `files/mobile/.env.example` | `mobile/.env.example` |
| `files/.gitignore` | `.gitignore` |

## Segnaposto
`APP_SLUG`, `APP_PACKAGE`, `APP_DISPLAY_NAME`.

## Procedura
```bash
# 1. Crea il progetto React Native (stessa versione delle altre app)
npx @react-native-community/cli@latest init NomeApp --version 0.85.2 --directory mobile \
  --package-name com.progettogazza.<app_package>
# 2. Copia i file del modulo sopra il progetto creato, poi sostituisci i segnaposto (vedi ../README.md)
# 3. Installa e verifica
cd mobile && npm install && npm run type-check
cd android && ./gradlew assembleDebug
```

## Note
- Struttura attesa: `mobile/` (app), `shared/` (logica condivisa, vedi `multi-ambiente`), `store/` (contenuti Play).
- Path alias obbligatori: `@/*` → `mobile/src/*`, `@shared/*` → `shared/src/*` (in `tsconfig.json` e in `babel.config.js`). `tsconfig.json` include `"ignoreDeprecations": "6.0"`.
- Servizi singleton (`getInstance()`), inizializzati in `App.tsx` in sequenza: `dbService.init()` → `notificheService.init()` → `adsService.init()`. I context stanno in `shared/` e ricevono i servizi per props/injection.
- `package.json` include già le dipendenze di AdMob, notifee e SQLite usate dalle app Gazza: togliere quelle che il progetto non usa.
- Il template viene da `luna`; le dipendenze sono quelle di quel momento.

## Passi manuali
Creare il repo GitHub `MarcoDiGioia/<app-slug>`.

## Verifica
`npm run type-check` e `./gradlew assembleDebug` senza errori.
