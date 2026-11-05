# Catalogo moduli

| Id | Cosa fa | Quando usarlo | Esterno? | Richiede |
|---|---|---|---|---|
| [regole-base](Modulo-regole-base.md) | `CLAUDE.md` di partenza con le regole valide per tutti | Sempre | no | - |
| [risparmio-token](Modulo-risparmio-token.md) | Regole, skill e subagente `esploratore` per ridurre lo spreco di token senza perdere qualità | Consigliato sempre | no | regole-base |
| [android-rn](Modulo-android-rn.md) | Scheletro React Native 0.85: babel, metro, tsconfig, alias, script npm | App mobile Android | no | regole-base |
| [multi-ambiente](Modulo-multi-ambiente.md) | Config dev/test/prod, `constants.ts`, `ENVIRONMENTS.md` | Ogni app React Native che segue la struttura del cestino | no | android-rn |
| [i18n-6-lingue](Modulo-i18n-6-lingue.md) | Traduzioni it/en/es/fr/de/pt con `t()` e test | App in più lingue (default sì) | no | android-rn |
| [ads-admob](Modulo-ads-admob.md) | Banner, interstitial, consenso GDPR (UMP) | App con pubblicità | no (passi manuali su AdMob) | android-rn, multi-ambiente |
| [ci-play-internal](Modulo-ci-play-internal.md) | Workflow manuale di build e upload sul canale interno + note di rilascio | App su Play | sì: carica su Play | android-rn, firma-android |
| [ci-play-production](Modulo-ci-play-production.md) | Workflow manuale per la produzione | Solo se l'utente chiede di pubblicare | sì: pubblica | ci-play-internal |
| [play-store-scheda](Modulo-play-store-scheda.md) | `store/listings/`, script e workflow di caricamento della scheda | App su Play, quando i testi sono pronti | sì: scrive su Play | ci-play-internal |
| [play-store-grafiche](Modulo-play-store-grafiche.md) | Cartelle e misure per icona, feature graphic, screenshot | Prima della prima pubblicazione | no | play-store-scheda |
| [privacy-policy](Modulo-privacy-policy.md) | Pagina privacy su GitHub Pages | App che raccoglie dati o usa ads | sì: scrive in un altro repo | - |
| [play-console-checklist](Modulo-play-console-checklist.md) | Passi a mano in Play Console | App su Play | no (solo istruzioni) | - |
| [firma-android](Modulo-firma-android.md) | Secret del repo per firma e account di servizio | App Android su Play | sì: secret del repo (li imposta l'utente) | - |

### Monorepo

| Id | Cosa fa | Quando usarlo | Esterno? | Richiede |
|---|---|---|---|---|
| [monorepo-npm-workspaces](Modulo-monorepo-npm-workspaces.md) | Radice npm workspaces: script, `.gitignore`, `CLAUDE.md` | Progetto con più pacchetti | no | regole-base |
| [monorepo-shared-zod](Modulo-monorepo-shared-zod.md) | Pacchetto `shared` con schemi Zod, tipi ed enum | Client e server che scambiano dati | no | monorepo-npm-workspaces |
| [monorepo-backend-nestjs](Modulo-monorepo-backend-nestjs.md) | Backend NestJS + Prisma + Jest | Monorepo con API | no | monorepo-npm-workspaces, monorepo-shared-zod |
| [monorepo-frontend-expo](Modulo-monorepo-frontend-expo.md) | Frontend Expo web-first con Metro per monorepo | Monorepo con app Expo | no | monorepo-npm-workspaces, monorepo-shared-zod |

### Godot 4 in C#

| Id | Cosa fa | Quando usarlo | Esterno? | Richiede |
|---|---|---|---|---|
| [godot-regole-csharp](Modulo-godot-regole-csharp.md) | Regole di codice, architettura e test per Godot C# | Ogni progetto Godot C# | no | regole-base |
| [godot-core-csharp](Modulo-godot-core-csharp.md) | ServiceLocator, EventBus, test runner, BuildInfo, SaveService, csproj, `.gitignore` | Ogni progetto Godot C# | no | regole-base, godot-regole-csharp |
| [godot-progetto-base](Modulo-godot-progetto-base.md) | `project.godot` di partenza (mobile-friendly) | Nuovo progetto Godot | no | godot-core-csharp |
| [godot-ci-android-apk-prova](Modulo-godot-ci-android-apk-prova.md) | Workflow manuale per l'APK di debug | Provare il gioco su telefono | no | godot-progetto-base |
| [godot-ci-android-aab-play](Modulo-godot-ci-android-aab-play.md) | Workflow manuale AAB firmato, upload sul test interno di Play, guida a chiave e secret | Gioco su Google Play | sì: carica su Play | godot-progetto-base |
| [godot-ci-desktop](Modulo-godot-ci-desktop.md) | Workflow manuale per Windows e Linux | Gioco anche per PC | no | godot-progetto-base |

Candidati per dopo: `godot-ci-ios-non-firmato`, `sito-statico`, `app-web-pwa`, `notifiche-locali`, `backup-export`, `acquisti-in-app`.
