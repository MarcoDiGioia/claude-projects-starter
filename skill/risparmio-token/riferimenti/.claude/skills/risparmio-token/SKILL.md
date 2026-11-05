---
name: risparmio-token
description: Tecniche per ridurre lo spreco di token senza perdere qualità. Usala quando il contesto si riempie, quando una sessione è lunga o costosa, prima di un'esplorazione ampia del codice, o quando l'utente chiede di risparmiare token o di controllare i consumi.
---

# Risparmio di token

## Regola salda

**Il risparmio non deve mai ridurre la qualità del lavoro.** Se le due cose sono in conflitto, vince la qualità. Qui si taglia solo lo spreco: letture ripetute, output rumoroso, contesto inutile. Non si taglia mai: ragionamento, letture necessarie, verifiche (test, build, type-check), completezza delle risposte, sicurezza. Se una tecnica sotto rischia di far perdere informazione che serve, non usarla.

Le regole brevi stanno in `CLAUDE.md`; qui c'è il dettaglio.

## Contesto

- **Controllare i consumi.** `/context` mostra cosa occupa la finestra; `/cost` il costo della sessione. Con `/mcp` disattivare i server che non servono: ogni definizione di strumento pesa a ogni turno.
- **Compattare con criterio.** Solo a fine di un sotto-compito, con `/compact` indicando cosa tenere (decisioni, file toccati, prossimo passo, test che falliscono). Mai con un lavoro a metà o un errore non risolto. Se serve tutto il contesto, non compattare.
- **Cambio di argomento = nuova sessione.** `/clear` quando il compito successivo non dipende dal precedente. Per riprendere un lavoro lungo, riassumere stato e prossimo passo in un file o nella PR e aprire una sessione nuova.

## Leggere e cercare

- Cercare con Grep/Glob, poi leggere. Se un intervallo di righe non basta per capire (dipendenze, chiamanti, contesto), leggere il file intero: capire bene costa meno che sbagliare.
- Non rileggere un file già letto e non cambiato nella sessione. Se può essere cambiato (altro processo, rigenerazione), rileggerlo.
- Lanciare in parallelo le chiamate indipendenti.

## Output dei comandi

- Togliere il rumore, non l'informazione: `--quiet`, `git diff --stat` prima del diff completo, `git log --oneline -n 10`.
- Se un comando fallisce, mostrare l'errore intero con le righe attorno. Mai nascondere un fallimento per accorciare l'output.
- Per output molto lunghi: salvarli in un file nello scratchpad e leggere le parti che servono.

## Subagenti

- `esploratore` (sola lettura, stesso modello della sessione) fa ricerche che richiederebbero molte letture; nel contesto principale torna la conclusione. Controllare le conclusioni importanti leggendo le righe citate.
- Niente subagenti per compiti piccoli o per lavoro che serve nel contesto principale: ogni subagente riparte da zero.
- Per risparmiare di più su ricerche semplici si può scegliere un modello più leggero con `model: haiku` nel file dell'agente; è una scelta dell'utente, non il predefinito.

## Modello e sforzo

Non abbassarli per risparmiare: il predefinito resta il riferimento. Cambiarli solo se l'utente lo chiede. Un cambio a metà sessione rompe la cache del prompt.

## Prompt caching

La cache si rompe se il prefisso cambia. Quindi: non modificare `CLAUDE.md` o i server MCP durante una sessione; preferire sessioni continue a riaperture a pezzi. Nelle app che chiamano l'API: parti stabili (istruzioni di sistema, strumenti, documenti di riferimento) per prime con `cache_control`, la parte variabile in fondo.

## Risposte

- Niente ripetizioni: prima il risultato, poi i dettagli che servono. Non riassumere ciò che il diff mostra già.
- Citare `percorso:riga` invece di incollare codice già nei file.
- Le verifiche (test, build, type-check) si fanno sempre come richiesto da `CLAUDE.md`; non si saltano né si riducono per risparmiare.

## `CLAUDE.md` snello

Viene caricato a ogni turno. Tenerlo corto, con regole verificabili, e mettere i dettagli in skill o documenti che si leggono solo quando servono. Togliere ciò che il codice o git già dicono.
