# Selezione dei moduli

`regole-base` si applica sempre. Le dipendenze (`richiede`) si aggiungono da sole.

| Etichetta | Come si riconosce nella descrizione | Moduli |
|---|---|---|
| `android` | "app Android", "app mobile", nessuna piattaforma indicata per un'app | `android-rn`, `multi-ambiente` |
| `ads` | "gratuita con pubblicità", "monetizzata con AdMob" | `ads-admob` |
| `multilingua` | più lingue, o nessuna indicazione (default) | `i18n-6-lingue` |
| `play` | "sul Play Store", "pubblicare" | `ci-play-internal`, `play-console-checklist`, `firma-android` |
| `scheda-store` | "scheda store", "testi dello store" | `play-store-scheda`, `play-store-grafiche` |
| `dati-utente` | raccoglie o salva dati dell'utente, usa ads | `privacy-policy` |
| `produzione` | "pubblica in produzione" detto esplicitamente da Marco | `ci-play-production` |
| `monorepo` | "monorepo", "backend e app insieme", "pacchetto condiviso" | `monorepo-npm-workspaces`, `monorepo-shared-zod` |
| `backend` | "API", "server", "NestJS" (in un monorepo) | `monorepo-backend-nestjs` |
| `frontend` | "app web", "Expo" (in un monorepo) | `monorepo-frontend-expo` |

Un progetto `monorepo` non usa `android-rn` (struttura diversa).

Esempio: "App Android offline per segnare le spese di condominio, gratuita con pubblicità, in italiano e inglese, da mettere sul Play Store" → `android`, `ads`, `play`, `dati-utente`, `multilingua` → `regole-base`, `android-rn`, `multi-ambiente`, `i18n-6-lingue`, `ads-admob`, `ci-play-internal`, `play-console-checklist`, `firma-android`, `privacy-policy`. Esclusi: `ci-play-production` (nessuna richiesta di pubblicare), `play-store-scheda` (si aggiunge quando i testi sono pronti).
