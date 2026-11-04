---
id: ci-play-internal
versione: 1
descrizione: Workflow manuale che compila l'AAB di produzione e lo carica sul canale interno di Play, con le note di rilascio.
quando_usarlo: App Android che va su Google Play.
quando_no: App non destinate a Play.
etichette: [play]
richiede: [android-rn, firma-android]
conflitti: []
azioni_esterne: true   # carica una build su Google Play
---

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/.github/workflows/deploy-internal.yml` | `.github/workflows/deploy-internal.yml` |
| `files/store/whatsnew/whatsnew-<lingua>` (7 file: it-IT, en-US, en-GB, es-ES, fr-FR, de-DE, pt-PT) | `store/whatsnew/` |

## Segnaposto
`APP_PACKAGE_ID` (nel workflow).

## Note
- Trigger solo `workflow_dispatch` (per risparmiare minuti di Actions). ENV=prod, track=internal: l'internal è la pre-release della build di produzione.
- Le note di rilascio (max 500 caratteri per lingua) vanno aggiornate a ogni versione, insieme a `versionCode`. I file contengono un `TODO`: sostituirlo prima del deploy.
- Una lingua che non esiste nella scheda Play può far fallire l'upload: lanciare prima "Update Store Listing" (modulo `play-store-scheda`).
- Il workflow salva anche l'artifact `aab` (1 giorno): se l'upload via API fallisce, si scarica e si carica a mano.
- Nessun segreto nei file: il workflow legge i secret del repo (vedi `firma-android`).

## Passi manuali (a carico dell'utente)
- Lanciare il workflow da GitHub → Actions.
- Su Play Console il link per i tester compare solo dopo la prima pubblicazione.

## Verifica
Il workflow compare in Actions come "Deploy → Internal Testing" e non ha altri trigger oltre a `workflow_dispatch`.
