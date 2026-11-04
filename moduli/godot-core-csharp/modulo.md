---
id: godot-core-csharp
versione: 1
descrizione: Fondamenta C# per un progetto Godot 4: ServiceLocator, EventBus, test runner interno, BuildInfo, SaveService JSON, csproj e .gitignore.
quando_usarlo: Ogni nuovo progetto Godot 4 in C#.
quando_no: Progetti Godot in GDScript.
etichette: [godot]
richiede: [regole-base, godot-regole-csharp]
conflitti: [android-rn]
azioni_esterne: false
---

Astratto dal gioco `Streethole` (nome del progetto Godot: Pothole Patrol), senza codice di dominio.

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/Godot/APP_PROJECT.csproj` | `Godot/APP_PROJECT.csproj` (e creare `APP_PROJECT.sln` con `dotnet new sln`) |
| `files/Godot/Scripts/Core/DI/ServiceLocator.cs` | stesso percorso |
| `files/Godot/Scripts/Core/Events/EventBus.cs` | stesso percorso |
| `files/Godot/Scripts/Core/Services/SaveService.cs` | stesso percorso |
| `files/Godot/Scripts/Core/BuildInfo.cs` | stesso percorso |
| `files/Godot/Scripts/Domain/Models/SaveData.cs` | stesso percorso (da riempire) |
| `files/Godot/Scripts/Tests/TestRunner.cs` | stesso percorso |
| `files/.gitignore` | `.gitignore` |

## Segnaposto
`APP_PROJECT`: nome del progetto in PascalCase, senza spazi (es. `PotholePatrol`); è anche namespace C# e `project/assembly_name` in `project.godot`.

## Struttura attesa
Il progetto Godot sta in `Godot/`, non nella radice del repo. Cartelle di `Scripts/`: `Core/` (servizi, bus, autoload), `Domain/` (logica pura e modelli, senza nodi), `Gameplay/` (nodi di gioco), `Presentation/` (viste e controller), `Tests/`.

## Cosa fanno i pezzi
- **ServiceLocator**: contenitore statico di singleton (`Register<T>`, `Resolve<T>`, `TryResolve<T>`, `Clear`).
- **EventBus**: pubblica/iscrive eventi tipizzati; chi si iscrive si disiscrive in `_ExitTree` per evitare leak. Disaccoppia i componenti (es. un nemico pubblica un evento, il controller lo ascolta).
- **TestRunner**: framework di unit test minimale. Un metodo con `[GodotTest]` in una classe del namespace `APP_PROJECT.Tests` viene eseguito via reflection quando il gioco parte con `--run-tests`. Va agganciato dall'autoload `GameManager`, che deve chiamare `TestRunner.RunTests()` (o aggiungere il nodo) alla ricezione di `--run-tests`. Helper `Assert.IsTrue/IsFalse/AreEqual`.
- **BuildInfo**: `Version = "dev"` in locale; la CI riscrive la riga prima dell'export (vedi `godot-ci-android-apk-prova`) per mostrare quale build è installata.
- **SaveService**: salvataggio JSON in `user://savegame.json`, con fallback a un profilo nuovo se il file manca o è corrotto.

## Da creare a mano
`Godot/project.godot` (vedi `godot-progetto-base`), l'autoload `GameManager`, le scene.

## Passi manuali
Nessuno.

## Verifica
```bash
cd Godot && dotnet build APP_PROJECT.sln
```
Poi, con un test d'esempio, `godot --headless --path . --run-tests` stampa `[PASS]`.
