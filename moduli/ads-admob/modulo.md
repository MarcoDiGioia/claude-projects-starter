---
id: ads-admob
versione: 1
descrizione: Banner + interstitial AdMob con consenso GDPR (UMP) e limite di frequenza.
quando_usarlo: App con pubblicità AdMob.
quando_no: App senza ads o con un altro circuito pubblicitario.
etichette: [ads]
richiede: [android-rn, multi-ambiente]
conflitti: []
azioni_esterne: false
---

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/mobile/src/services/AdsService.ts` | `mobile/src/services/AdsService.ts` |
| `files/mobile/src/components/BannerAd.tsx` | `mobile/src/components/BannerAd.tsx` |

## Comportamento
- Consenso GDPR (UMP) raccolto prima di inizializzare AdMob; se la rete manca o UMP non risponde entro 10 s l'app parte senza annunci.
- Interstitial ogni 3 azioni (`registraAzione()`), non nei primi 2 minuti e non più spesso di uno ogni 3 minuti.
- Banner a fondo schermata, persistente.

## Modifiche a file esistenti
- `App.tsx`: `await adsService.init()` come ultimo passo della sequenza di inizializzazione.
- Impostazioni: mostrare "Preferenze privacy annunci" se `adsService.isPrivacyOptionsRequired()` (apre `showPrivacyOptions()`).
- Interstitial: chiamare `registraAzione()` a ogni azione significativa dell'utente.

## Passi manuali (li fa Marco)
- Creare l'app in AdMob e inserire l'App ID in `mobile/app.json` e in `AndroidManifest.xml`.
- Inserire gli ID delle unità in `shared/src/utils/config/prod.ts`.
- Creare il messaggio GDPR in AdMob → Privacy e messaggi (senza, il form di consenso non compare).

## Verifica
`npm run type-check`, `./gradlew assembleDebug`, banner visibile con gli ID di test in dev.
