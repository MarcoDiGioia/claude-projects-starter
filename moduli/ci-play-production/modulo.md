---
id: ci-play-production
versione: 1
descrizione: Workflow manuale che compila l'AAB e lo carica sul canale di produzione di Play.
quando_usarlo: Solo quando Marco chiede esplicitamente di poter pubblicare in produzione.
quando_no: In tutti gli altri casi (mai di default).
etichette: [produzione]
richiede: [ci-play-internal]
conflitti: []
azioni_esterne: true   # pubblica su Google Play
---

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/.github/workflows/deploy-production.yml` | `.github/workflows/deploy-production.yml` |

## Segnaposto
`APP_PACKAGE` (nel workflow).

## Note
- Solo `workflow_dispatch`, ENV=prod, track=production. Usa le note di rilascio di `ci-play-internal`.
- Regola base: niente produzione senza richiesta esplicita di Marco, e Claude non lancia mai questo workflow da solo.

## Passi manuali (li fa Marco)
Lanciare il workflow da GitHub → Actions quando decide di pubblicare.

## Verifica
Il workflow compare in Actions e ha solo il trigger `workflow_dispatch`.
