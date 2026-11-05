# Catalogo moduli

| Id | Cosa fa | Quando usarlo | Esterno? | Richiede |
|---|---|---|---|---|
| [regole-base](regole-base/modulo.md) | `CLAUDE.md` di partenza con le regole valide per tutti | Sempre | no | - |
| [risparmio-token](risparmio-token/modulo.md) | Regole, skill e subagente `esploratore` per ridurre lo spreco di token senza perdere qualità | Consigliato sempre | no | regole-base |
| [android-rn](android-rn/modulo.md) | Scheletro React Native 0.85: babel, metro, tsconfig, alias, script npm | App mobile Android | no | regole-base |
| [multi-ambiente](multi-ambiente/modulo.md) | Config dev/test/prod, `constants.ts`, `ENVIRONMENTS.md` | Ogni app React Native che segue la struttura del cestino | no | android-rn |
| [i18n-6-lingue](i18n-6-lingue/modulo.md) | Traduzioni it/en/es/fr/de/pt con `t()` e test | App in più lingue (default sì) | no | android-rn |
| [ads-admob](ads-admob/modulo.md) | Banner, interstitial, consenso GDPR (UMP) | App con pubblicità | no (passi manuali su AdMob) | android-rn, multi-ambiente |
| [ci-play-internal](ci-play-internal/modulo.md) | Workflow manuale di build e upload sul canale interno + note di rilascio | App su Play | sì: carica su Play | android-rn, firma-android |
| [ci-play-production](ci-play-production/modulo.md) | Workflow manuale per la produzione | Solo se l'utente chiede di pubblicare | sì: pubblica | ci-play-internal |
| [play-store-scheda](play-store-scheda/modulo.md) | `store/listings/`, script e workflow di caricamento della scheda | App su Play, quando i testi sono pronti | sì: scrive su Play | ci-play-internal |
| [play-store-grafiche](play-store-grafiche/modulo.md) | Cartelle e misure per icona, feature graphic, screenshot | Prima della prima pubblicazione | no | play-store-scheda |
| [privacy-policy](privacy-policy/modulo.md) | Pagina privacy su GitHub Pages | App che raccoglie dati o usa ads | sì: scrive in un altro repo | - |
| [play-console-checklist](play-console-checklist/modulo.md) | Passi a mano in Play Console | App su Play | no (solo istruzioni) | - |
| [firma-android](firma-android/modulo.md) | Secret del repo per firma e account di servizio | App Android su Play | sì: secret del repo (li imposta l'utente) | - |

### Monorepo

| Id | Cosa fa | Quando usarlo | Esterno? | Richiede |
|---|---|---|---|---|
| [monorepo-npm-workspaces](monorepo-npm-workspaces/modulo.md) | Radice npm workspaces: script, `.gitignore`, `CLAUDE.md` | Progetto con più pacchetti | no | regole-base |
| [monorepo-shared-zod](monorepo-shared-zod/modulo.md) | Pacchetto `shared` con schemi Zod, tipi ed enum | Client e server che scambiano dati | no | monorepo-npm-workspaces |
| [monorepo-backend-nestjs](monorepo-backend-nestjs/modulo.md) | Backend NestJS + Prisma + Jest | Monorepo con API | no | monorepo-npm-workspaces, monorepo-shared-zod |
| [monorepo-frontend-expo](monorepo-frontend-expo/modulo.md) | Frontend Expo web-first con Metro per monorepo | Monorepo con app Expo | no | monorepo-npm-workspaces, monorepo-shared-zod |

### Godot 4 in C#

| Id | Cosa fa | Quando usarlo | Esterno? | Richiede |
|---|---|---|---|---|
| [godot-regole-csharp](godot-regole-csharp/modulo.md) | Regole di codice, architettura e test per Godot C# | Ogni progetto Godot C# | no | regole-base |
| [godot-core-csharp](godot-core-csharp/modulo.md) | ServiceLocator, EventBus, test runner, BuildInfo, SaveService, csproj, `.gitignore` | Ogni progetto Godot C# | no | regole-base, godot-regole-csharp |
| [godot-progetto-base](godot-progetto-base/modulo.md) | `project.godot` di partenza (mobile-friendly) | Nuovo progetto Godot | no | godot-core-csharp |
| [godot-ci-android-apk-prova](godot-ci-android-apk-prova/modulo.md) | Workflow manuale per l'APK di debug | Provare il gioco su telefono | no | godot-progetto-base |
| [godot-ci-android-aab-play](godot-ci-android-aab-play/modulo.md) | Workflow manuale AAB firmato, upload sul test interno di Play, guida a chiave e secret | Gioco su Google Play | sì: carica su Play | godot-progetto-base |
| [godot-ci-desktop](godot-ci-desktop/modulo.md) | Workflow manuale per Windows e Linux | Gioco anche per PC | no | godot-progetto-base |

Candidati per dopo: `godot-ci-ios-non-firmato`, `sito-statico`, `app-web-pwa`, `notifiche-locali`, `backup-export`, `acquisti-in-app`.
