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

Astratto da `build-desktop.yml` di `Streethole`. **Differenza voluta**: l'originale parte a ogni push su `develop` e `main`; qui solo `workflow_dispatch`.

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/.github/workflows/build-desktop.yml` | `.github/workflows/build-desktop.yml` |

## Segnaposto
`APP_PROJECT`.

## Note
- Richiede in `export_presets.cfg` i preset chiamati `Linux` e `Windows` (creati dall'editor).
- L'upload sulle piattaforme (Steam, GOG, itch.io) non è incluso: si aggiunge a parte, con le loro chiavi, che le imposta Marco.
- Nell'originale esiste anche `build-ios.yml` (IPA non firmato per AltStore/SideStore, runner macOS, solo manuale): non incluso, da aggiungere come modulo `godot-ci-ios-non-firmato` se serve.

## Passi manuali (li fa Marco)
Lanciare il workflow da GitHub → Actions.

## Verifica
L'esecuzione produce gli artifact `APP_PROJECT-Linux-<n>` e `APP_PROJECT-Windows-<n>`.
