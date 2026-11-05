---
id: godot-ci-desktop
versione: 1
descrizione: Workflow manuale che esporta il gioco per Windows e Linux come pacchetti scaricabili dagli artifact.
quando_usarlo: Gioco Godot destinato anche a PC (Steam, GOG, itch.io).
quando_no: Giochi solo mobile.
etichette: [godot, desktop]
richiede: [godot-progetto-base]
conflitti: []
azioni_esterne: false
---

**Scelta**: trigger solo `workflow_dispatch`, niente build a ogni push.

## Riferimenti
| Riferimento (nel modulo) | Destinazione (nel progetto) |
|---|---|
| `riferimenti/.github/workflows/build-desktop.yml` | `.github/workflows/build-desktop.yml` |

## Segnaposto
`APP_PROJECT`.

## Note
- Richiede in `export_presets.cfg` i preset chiamati `Linux` e `Windows` (creati dall'editor).
- L'upload sulle piattaforme (Steam, GOG, itch.io) non è incluso: si aggiunge a parte, con le loro chiavi, che imposta l'utente.
- Non incluso: la build iOS non firmata (IPA per AltStore/SideStore, runner macOS), da aggiungere come modulo `godot-ci-ios-non-firmato` se serve.

## Passi manuali (a carico dell'utente)
Lanciare il workflow da GitHub → Actions.

## Verifica
L'esecuzione produce gli artifact `APP_PROJECT-Linux-<n>` e `APP_PROJECT-Windows-<n>`.
