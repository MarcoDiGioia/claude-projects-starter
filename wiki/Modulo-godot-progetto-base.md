# godot-progetto-base

project.godot di partenza (C

| | |
|---|---|
| Quando usarlo | Nuovo progetto Godot 4 in C |
| Quando no | Progetti Godot già creati dall'editor. |
| Richiede | godot-core-csharp |
| Azioni esterne | false |
| Versione | 1 |

Riferimenti del modulo: [https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/scaffold/godot-progetto-base](https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/scaffold/godot-progetto-base)

## Riferimenti
| Riferimento (nel modulo) | Destinazione (nel progetto) |
|---|---|
| `riferimenti/Godot/project.godot` | `Godot/project.godot` |

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
