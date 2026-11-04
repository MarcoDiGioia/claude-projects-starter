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

Astratto dal `CLAUDE.md` di `Streethole`, senza i percorsi della macchina di Marco né il server MCP locale (`.mcp.json` resta fuori dal repo, vedi `godot-core-csharp/.gitignore`).

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/CLAUDE.godot.md` | in coda al `CLAUDE.md` del progetto (dopo `regole-base`) |

## Segnaposto
`APP_PROJECT`.

## Passi manuali
Aggiungere nel `CLAUDE.md` del progetto il percorso dell'eseguibile Godot sulle macchine di Marco.

## Verifica
Il `CLAUDE.md` contiene sia le regole base sia le regole Godot.
