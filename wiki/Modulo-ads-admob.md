# ads-admob

Banner + interstitial AdMob con consenso GDPR (UMP) e limite di frequenza.

| | |
|---|---|
| Quando usarlo | App con pubblicità AdMob. |
| Quando no | App senza ads o con un altro circuito pubblicitario. |
| Richiede | android-rn, multi-ambiente |
| Azioni esterne | false |
| Versione | 1 |

Riferimenti del modulo: [https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/scaffold/ads-admob](https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/scaffold/ads-admob)

## Riferimenti
| Riferimento (nel modulo) | Destinazione (nel progetto) |
|---|---|
| `riferimenti/mobile/src/services/AdsService.ts` | `mobile/src/services/AdsService.ts` |
| `riferimenti/mobile/src/components/BannerAd.tsx` | `mobile/src/components/BannerAd.tsx` |

## Comportamento
- Consenso GDPR (UMP) raccolto prima di inizializzare AdMob; se la rete manca o UMP non risponde entro 10 s l'app parte senza annunci.
- Interstitial ogni 3 azioni (`registraAzione()`), non nei primi 2 minuti e non più spesso di uno ogni 3 minuti.
- Banner a fondo schermata, persistente.

## Modifiche a file esistenti
- `App.tsx`: `await adsService.init()` come ultimo passo della sequenza di inizializzazione.
- Impostazioni: mostrare "Preferenze privacy annunci" se `adsService.isPrivacyOptionsRequired()` (apre `showPrivacyOptions()`).
- Interstitial: chiamare `registraAzione()` a ogni azione significativa dell'utente.

## Passi manuali (a carico dell'utente)
- Creare l'app in AdMob e inserire l'App ID in `mobile/app.json` e in `AndroidManifest.xml`.
- Inserire gli ID delle unità in `shared/src/utils/config/prod.ts`.
- Creare il messaggio GDPR in AdMob → Privacy e messaggi (senza, il form di consenso non compare).

## Verifica
`npm run type-check`, `./gradlew assembleDebug`, banner visibile con gli ID di test in dev.
