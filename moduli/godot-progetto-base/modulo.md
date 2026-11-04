---
id: godot-progetto-base
versione: 1
descrizione: project.godot di partenza (C#, Godot 4.7, renderer compatibile con mobile, schermo 1280x720 con stretch espandibile).
quando_usarlo: Nuovo progetto Godot 4 in C#.
quando_no: Progetti Godot già creati dall'editor.
etichette: [godot]
richiede: [godot-core-csharp]
conflitti: []
azioni_esterne: false
---

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/Godot/project.godot` | `Godot/project.godot` |

## Segnaposto
`APP_DISPLAY_NAME`, `APP_PROJECT`.

## Scelte (dal gioco di origine)
- `gl_compatibility` anche su mobile: massima compatibilità con i telefoni Android.
- `window/stretch/mode="canvas_items"` con `aspect="expand"`: l'interfaccia si adatta a schermi di rapporti diversi.
- `import_etc2_astc=true`: compressione texture per mobile.
- L'autoload `GameManager` deve esistere (`Scripts/Core/GameManager.cs`): è il punto che lancia i test con `--run-tests`.
- Le azioni di input (`InputMap`) e il tema UI si aggiungono dall'editor: non sono nel modulo perché dipendono dal gioco.

## Da creare a mano
`Scenes/Main.tscn`, `Scripts/Core/GameManager.cs`, l'icona (`config/icon`), un preset Android in `export_presets.cfg` (creato dall'editor: Progetto → Esporta).

## Passi manuali
Esportare i preset dall'editor: servono `Android` (e `Windows`/`Linux` per `godot-ci-desktop`). Nel preset Android il package è `APP_PACKAGE_ID`, che su Play non si cambia dopo il primo caricamento.

## Verifica
`cd Godot && godot --headless --path . --import` termina senza errori.
