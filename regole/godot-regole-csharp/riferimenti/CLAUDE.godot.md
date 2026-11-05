# Regole Godot 4 C#

Si applicano a tutto il codice del progetto Godot (C#). Il progetto sta in `Godot/`, non nella radice del repo: build e test vanno lanciati da lì.

## 1. Linguaggio e naming
- C# idiomatico: sempre C# (non GDScript) per i nuovi script, salvo richiesta esplicita.
- `PascalCase`: classi, metodi, proprietà, segnali. `camelCase`: variabili locali e parametri. `_camelCase`: campi privati.

## 2. API di Godot 4
- **Segnali**: attributo `[Signal]` e delegate `...EventHandler`; connessione con `node.MySignal += OnMySignal` o con le costanti `SignalName.MySignal`, mai stringhe magiche.
- **Export**: `[Export]` su proprietà o campi privati, non su campi pubblici senza necessità.
- **Lifecycle**: `_Ready()`, `_Process(double delta)`, `_PhysicsProcess(double delta)`.
- Tipi Godot (`Vector2`, `Vector3`, `Color`, `Transform2D/3D`).

## 3. Performance e nodi
- `GetNode<T>("Path")` si chiama in `_Ready()` e il riferimento si conserva in un campo. **Mai `GetNode` dentro `_Process` o `_PhysicsProcess`.**
- Preferire Scene Unique Nodes (`%NomeNodo`) ai percorsi lunghi.
- Scene da istanziare: `[Export] PackedScene`, poi `Instantiate()`.

## 4. Architettura
- Chiamate dirette verso i figli ("call down"), segnali verso i genitori ("signal up").
- Comunicazione fra componenti lontani: `EventBus`; servizi condivisi: `ServiceLocator` (modulo `godot-core-csharp`).
- La logica di dominio non conosce i nodi.

## 5. Memoria
- Nodi: `QueueFree()`, mai `Dispose`. `Dispose` solo per oggetti non-Node creati a runtime (es. `Resource`).

## 6. Test
- **Solo unit test** della logica pura del dominio (regole, generazione livelli, geometria). Niente test di partita scriptata (fragili, dipendono da tempi e posizioni) e niente test di nodi, rendering o input.
- Framework interno: metodo `[GodotTest]` in una classe del namespace `APP_PROJECT.Tests`; esecuzione con `--run-tests` (da qualunque scena).
- **Codice testabile**: la logica di dominio non chiama `GD.Randf`/`GD.RandRange` direttamente. Il caso si inietta (un seed o un `RandomNumberGenerator` passato dall'esterno), altrimenti il test non è deterministico.

## 7. Regole per l'IA
- Priorità: stabilità della build prima delle funzioni nuove.
- Prima di proporre modifiche: `dotnet build` pulito **e** unit test verdi.
- Aggiornare questo file se le regole cambiano; le decisioni di architettura vanno documentate (es. in `Documentazione/`).

## Comandi
```bash
cd Godot && dotnet build APP_PROJECT.sln
cd Godot && godot --headless --path . --run-tests    # su Windows: l'eseguibile _console per vedere l'output
cd Godot && godot --path .                           # avvio del gioco
```
Godot di solito non è nel PATH: indicare in `CLAUDE.md` del progetto dove si trova l'eseguibile su ogni macchina (percorsi locali, non da copiare tra progetti).
