# Catalogo moduli

| Id | Cosa fa | Quando usarlo | Esterno? | Richiede |
|---|---|---|---|---|
| [regole-base](regole-base/modulo.md) | `CLAUDE.md` di partenza con le regole valide per tutti | Sempre | no | - |
| [android-rn](android-rn/modulo.md) | Scheletro React Native 0.85: babel, metro, tsconfig, alias, script npm | App mobile Android | no | regole-base |
| [multi-ambiente](multi-ambiente/modulo.md) | Config dev/test/prod, `constants.ts`, `ENVIRONMENTS.md` | Ogni app React Native Gazza | no | android-rn |
| [i18n-6-lingue](i18n-6-lingue/modulo.md) | Traduzioni it/en/es/fr/de/pt con `t()` e test | App in più lingue (default sì) | no | android-rn |
| [ads-admob](ads-admob/modulo.md) | Banner, interstitial, consenso GDPR (UMP) | App con pubblicità | no (passi manuali su AdMob) | android-rn, multi-ambiente |
| [ci-play-internal](ci-play-internal/modulo.md) | Workflow manuale di build e upload sul canale interno + note di rilascio | App su Play | sì: carica su Play | android-rn, firma-android |
| [ci-play-production](ci-play-production/modulo.md) | Workflow manuale per la produzione | Solo se Marco chiede di pubblicare | sì: pubblica | ci-play-internal |
| [play-store-scheda](play-store-scheda/modulo.md) | `store/listings/`, script e workflow di caricamento della scheda | App su Play, quando i testi sono pronti | sì: scrive su Play | ci-play-internal |
| [play-store-grafiche](play-store-grafiche/modulo.md) | Cartelle e misure per icona, feature graphic, screenshot | Prima della prima pubblicazione | no | play-store-scheda |
| [privacy-policy](privacy-policy/modulo.md) | Pagina privacy nel repo `MarcoDiGioia.github.io` | App che raccoglie dati o usa ads | sì: scrive in un altro repo | - |
| [play-console-checklist](play-console-checklist/modulo.md) | Passi a mano in Play Console | App su Play | no (solo istruzioni) | - |
| [firma-android](firma-android/modulo.md) | Secret del repo per firma e account di servizio | App Android su Play | sì: secret del repo (li imposta Marco) | - |

Candidati per dopo: `godot-*` (progetti Godot), `monorepo-*` (progetti monorepo), `sito-statico`, `app-web-pwa`, `notifiche-locali`, `backup-export`, `acquisti-in-app`.
