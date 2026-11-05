# ci-play-production

Workflow manuale che compila l'AAB e lo carica sul canale di produzione di Play.

| | |
|---|---|
| Quando usarlo | Solo quando l'utente chiede esplicitamente di poter pubblicare in produzione. |
| Quando no | In tutti gli altri casi (mai di default). |
| Richiede | ci-play-internal |
| Azioni esterne | true |
| Versione | 1 |

Riferimenti del modulo: [https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/scaffold/ci-play-production](https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/scaffold/ci-play-production)

## Riferimenti
| Riferimento (nel modulo) | Destinazione (nel progetto) |
|---|---|
| `riferimenti/.github/workflows/deploy-production.yml` | `.github/workflows/deploy-production.yml` |

## Segnaposto
`APP_PACKAGE_ID` (nel workflow).

## Note
- Solo `workflow_dispatch`, ENV=prod, track=production. Usa le note di rilascio di `ci-play-internal`.
- Regola base: niente produzione senza richiesta esplicita dell'utente, e Claude non lancia mai questo workflow da solo.

## Passi manuali (a carico dell'utente)
Lanciare il workflow da GitHub → Actions quando decide di pubblicare.

## Verifica
Il workflow compare in Actions e ha solo il trigger `workflow_dispatch`.
