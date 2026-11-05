---
name: risparmio-token
description: Tecniche dettagliate per ridurre il consumo di token. Usala quando il contesto si riempie, quando una sessione è lunga o costosa, prima di un'esplorazione ampia del codice, o quando l'utente chiede di risparmiare token o di controllare i consumi.
---

# Risparmio di token

Le regole brevi stanno in `CLAUDE.md`; qui c'è il dettaglio, da leggere solo quando serve.

## Contesto

- **Compattare presto, con un'istruzione.** Verso il 60% del contesto, o a fine di un sotto-compito: `/compact` indicando cosa tenere (decisioni, file toccati, prossimo passo, test che falliscono). Non aspettare la compattazione automatica.
- **Cambio di argomento = nuova sessione.** `/clear` quando il compito successivo non dipende dal precedente. Per riprendere un lavoro lungo: riassumere stato e prossimo passo nel messaggio della PR o in un file, poi aprire una sessione nuova.
- **Controllare i consumi.** `/context` mostra cosa occupa la finestra; `/cost` il costo della sessione. Disattivare con `/mcp` i server MCP che non servono: ogni definizione di strumento pesa a ogni turno.

## Leggere e cercare

- Cercare con Grep/Glob, poi leggere solo l'intervallo utile (`offset` e `limit`). File grandi, mai interi se non necessario.
- Non rileggere un file già letto e non modificato nella sessione; non rileggere dopo una Edit riuscita (l'errore arriverebbe subito).
- Lanciare in parallelo le chiamate indipendenti: meno turni, meno contesto ripetuto.
- Non leggere lockfile, build, log, `node_modules`: sono già bloccati in `.claude/settings.json`.

## Output dei comandi

- Filtrare alla fonte: `| tail -n 40`, `| grep -E 'error|FAIL'`, `--quiet`, `--silent`, `git diff --stat` prima di `git diff`, `git log --oneline -n 10`.
- Test e build: mostrare solo il riepilogo e i fallimenti; in caso di errore, le righe attorno al primo errore, non l'intero log.
- Output lunghi: scriverli in un file nello scratchpad e leggerne solo la parte che serve.

## Subagenti e modelli

- Usare `esploratore` (modello leggero, sola lettura) per ricerche che richiederebbero molte letture: nel contesto principale torna solo la conclusione.
- Non usare subagenti per compiti piccoli o per lavoro che serve davvero nel contesto principale: ogni subagente riparte da zero e ricostruisce il contesto.
- Modello e sforzo in proporzione: modello leggero e sforzo basso per modifiche meccaniche, ricerche, formattazione; modello più capace e sforzo alto solo per progettazione, debug difficile, revisione. `/model` e `/effort` si cambiano a metà sessione, ma ciò fa perdere la cache: farlo a inizio compito, non a ogni turno.

## Prompt caching

La cache si rompe se il prefisso cambia. Quindi: non modificare `CLAUDE.md`, le impostazioni o i server MCP durante una sessione; tenere stabile ciò che sta all'inizio; tenere sessioni continue invece di riaprirle a pezzi. Nelle app che chiamano l'API: mettere prima le parti stabili (istruzioni di sistema, strumenti, documenti di riferimento) con `cache_control`, in fondo la parte variabile.

## Risposte

- Risposte brevi: prima il risultato, poi solo i dettagli necessari. Niente riassunti di ciò che il diff già mostra, niente ripetizione della domanda.
- Non incollare in chat codice o log già presenti nei file: citare `percorso:riga`.
- Un solo giro di verifica finale, non uno per ogni piccola modifica.

## `CLAUDE.md` snello

Viene caricato a ogni turno. Tenerlo sotto circa 150 righe: regole brevi e verificabili, dettagli in file separati (skill, documenti) che si leggono solo quando servono. Togliere ciò che il codice o git già dicono.
