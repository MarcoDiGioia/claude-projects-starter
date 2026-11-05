---
id: godot-regole-csharp
versione: 1
descrizione: Regole di codice, architettura e test per progetti Godot 4 in C#, da unire nel CLAUDE.md.
quando_usarlo: Ogni nuovo progetto Godot 4 in C#.
quando_no: Progetti Godot in GDScript.
etichette: [godot]
richiede: [regole-base]
conflitti: []
azioni_esterne: false
---

Senza percorsi locali né server MCP personali (`.mcp.json` resta fuori dal repository, vedi `godot-core-csharp/.gitignore`).

## Riferimenti
| Riferimento (nel modulo) | Destinazione (nel progetto) |
|---|---|
| `riferimenti/CLAUDE.godot.md` | in coda al `CLAUDE.md` del progetto (dopo `regole-base`) |

## Segnaposto
`APP_PROJECT`.

## Passi manuali
Aggiungere nel `CLAUDE.md` del progetto il percorso dell'eseguibile Godot sulle tue macchine.

## Verifica
Il `CLAUDE.md` contiene sia le regole base sia le regole Godot.
