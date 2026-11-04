---
id: godot-ci-android-apk-prova
versione: 1
descrizione: Workflow manuale che costruisce un APK di debug scaricabile dagli artifact, con versione/commit scritti in BuildInfo.
quando_usarlo: Gioco Godot da provare su telefono Android prima di Play.
quando_no: Se si vuole solo l'AAB per Play (usare godot-ci-android-aab-play).
etichette: [godot]
richiede: [godot-progetto-base]
conflitti: []
azioni_esterne: false
---

Astratto da `build-android-preview.yml` di `Streethole`. **Differenze volute**: l'originale parte a ogni push su `develop` (qui solo manuale) e usa un `debug.keystore` tenuto nel repo (qui la chiave di debug standard viene creata nel runner, così nel repo non entra nessun keystore).

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/.github/workflows/build-android-preview.yml` | `.github/workflows/build-android-preview.yml` |

## Segnaposto
`APP_PROJECT`.

## Note
- Richiede `Scripts/Core/BuildInfo.cs` (modulo `godot-core-csharp`) e un preset `Android` in `export_presets.cfg`.
- L'APK è firmato con la chiave di debug: **mai su Google Play**.
- Nell'originale esiste anche un workflow che a ogni push su `main` crea tag e GitHub Release con l'APK: non incluso, perché fa azioni (tag, release) che si decidono caso per caso e con un trigger automatico.

## Passi manuali (li fa Marco)
Lanciare il workflow da GitHub → Actions e scaricare l'APK dalla pagina dell'esecuzione (resta 14 giorni).

## Verifica
L'esecuzione produce l'artifact `APP_PROJECT-debug-<n>`.
