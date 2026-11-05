# Manuale d'uso di claude-projects-starter

Questo manuale spiega come usare il cestino di moduli in **progetti nuovi** e in **progetti già avviati**, come tenere traccia di cosa è stato applicato, come aggiornare i moduli e come scriverne di nuovi. L'idea di fondo è in [`proposta-moduli.md`](https://github.com/MarcoDiGioia/claude-projects-starter/blob/main/docs/proposta-moduli.md).

## Indice

1. [Concetti](#1-concetti)
2. [Prima di iniziare](#2-prima-di-iniziare)
3. [Progetto nuovo](#3-progetto-nuovo)
4. [Progetto già avviato](#4-progetto-già-avviato)
5. [Il registro `.moduli.json`](#5-il-registro-modulijson)
6. [Aggiornare un modulo già applicato](#6-aggiornare-un-modulo-già-applicato)
7. [Cosa fa Claude e cosa fai tu](#7-cosa-fa-claude-e-cosa-fai-tu)
8. [Azioni esterne](#8-azioni-esterne)
9. [Scrivere o modificare un modulo](#9-scrivere-o-modificare-un-modulo)
10. [Domande frequenti](#10-domande-frequenti)

## 1. Concetti

- **Modulo**: una cartella in `moduli/<id>/` con una scheda `modulo.md` (cosa fa, quando usarlo, dipendenze, passi manuali, verifica) e, di solito, una cartella `riferimenti/` con i file di esempio che Claude può scrivere tali e quali o adattare. I moduli sono istruzioni per Claude, non codice da inserire in altri software.
- **Etichetta**: una parola che descrive il progetto (`android`, `ads`, `play`, `monorepo`, `godot`...). Claude le ricava dalla tua descrizione.
- **Selezione**: la tabella [`moduli/SELEZIONE.md`](https://github.com/MarcoDiGioia/claude-projects-starter/blob/main/moduli/SELEZIONE.md) che collega etichette e moduli.
- **Dipendenze**: il campo `richiede` di un modulo elenca i moduli che servono prima; il campo `conflitti` quelli incompatibili.
- **Segnaposto**: nomi come `APP_SLUG`, `APP_DISPLAY_NAME`, `APP_PACKAGE_ID`, `APP_PROJECT`, `APP_SCOPE`, `APP_AUTHOR` nei file dei moduli, da sostituire con i valori del progetto (elenco in [`moduli/README.md`](https://github.com/MarcoDiGioia/claude-projects-starter/blob/main/moduli/README.md)).
- **Azione esterna**: un modulo con `azioni_esterne: true` tocca qualcosa fuori dal repository (uno store, un secret, un altro repository).

## 2. Prima di iniziare

1. **Dai accesso a Claude** al repository del tuo progetto, con permesso di scrittura. Questo repository è pubblico: Claude lo legge senza accessi e senza clonarlo.
2. **Dillo a Claude**: scrivi "usa claude-projects-starter" nella richiesta. Per non ripeterlo, aggiungi la stessa riga nel `CLAUDE.md` del progetto.
3. Se il progetto non esiste ancora, crea un repository vuoto (Claude non crea repository per te).
4. Leggi [`moduli/CATALOGO.md`](https://github.com/MarcoDiGioia/claude-projects-starter/blob/main/moduli/CATALOGO.md) per sapere cosa è disponibile.

## 3. Progetto nuovo

### Passo per passo

1. **Descrivi il progetto**: scopo, piattaforma, monetizzazione, store, lingue. Più sei preciso, meno domande ti farà Claude (ne fa una sola, solo se manca un'informazione che cambia la scelta).
2. **Leggi il piano** che Claude ti mostra: moduli scelti con la ragione di una riga, moduli esclusi, azioni esterne, passi manuali. Puoi chiedere di aggiungere o togliere moduli.
3. **Dai l'ok.** Senza ok non cambia nulla.
4. **Claude applica** i moduli nell'ordine delle dipendenze, su un branch del repository del progetto: legge dai moduli solo i riferimenti che servono, scrive nel progetto i file (tali e quali se calzano, altrimenti adattati), sostituisce i segnaposto, fa le modifiche descritte nella scheda.
5. **Claude verifica** con la sezione "Verifica" di ogni modulo (per esempio type-check e build) e riporta l'esito con l'output reale.
6. **Claude registra** i moduli applicati in `.moduli.json` (vedi sezione 5) e apre una pull request.
7. **Tu fai i passi manuali** elencati (secret, console degli store, chiavi) e unisci la pull request quando sei soddisfatto.

### Esempi di richiesta

- *"Usa claude-projects-starter. Voglio un'app Android per tenere traccia degli abbonamenti, gratuita con pubblicità, in italiano e inglese, da pubblicare sul Play Store."*
- *"Usa claude-projects-starter. Monorepo con un'API NestJS e un'app Expo che condividono gli schemi di validazione."*
- *"Usa claude-projects-starter. Gioco Godot 4 in C#, con APK di prova su telefono e, più avanti, build per PC."*

## 4. Progetto già avviato

Per un progetto esistente la regola è: **si aggiunge, non si sovrascrive.** Claude non tocca ciò che funziona senza dirtelo.

### Passo per passo

1. **Chiedi un'analisi, non un'applicazione.** Per esempio: *"Usa claude-projects-starter. Analizza questo repository e dimmi quali moduli ha già in pratica, quali mancano e quali ha senso adottare. Non modificare nulla."*
2. **Claude confronta** il progetto con il catalogo e ti presenta una tabella per modulo: *già presente*, *presente con differenze*, *assente*, *non adatto*. Per i moduli "con differenze" elenca file per file cosa cambierebbe.
3. **Scegli** quali moduli adottare, in che ordine, e se uno alla volta o insieme. Consiglio: **un modulo per pull request**, partendo dai più innocui (`regole-base`, documentazione, checklist) e lasciando per ultimi quelli che toccano la CI o la struttura del codice.
4. **Claude applica con queste regole:**
   - file assente → lo aggiunge;
   - file identico → non lo tocca;
   - file diverso → non lo sovrascrive: mostra la differenza e propone una fusione (per esempio unire gli script di `package.json`, aggiungere le regole in coda a un `CLAUDE.md`), e aspetta il tuo ok;
   - mai cancellazioni di file esistenti senza ok esplicito;
   - tutto su un branch, mai direttamente su `main`.
5. **Verifica:** build e test del progetto devono passare prima e dopo. Se erano già rossi prima, Claude te lo dice e non attribuisce il problema al modulo.
6. **Registro:** Claude crea o aggiorna `.moduli.json` indicando anche i moduli adottati solo in parte (campo `note`).
7. **Pull request** per ogni modulo; unisci quando hai controllato.

### Moduli che richiedono più cautela su un progetto esistente

| Tipo di modulo | Cosa controllare |
|---|---|
| Workflow CI (`ci-*`, `godot-ci-*`) | Che non sostituiscano workflow esistenti; i nuovi sono solo manuali. Nomi dei secret già in uso. |
| Struttura del codice (`android-rn`, `monorepo-*`, `godot-core-csharp`) | Spostano o aggiungono cartelle e configurazioni: valuta se il progetto è già organizzato in modo diverso. Spesso conviene adottare solo parti. |
| Regole (`regole-base`, `risparmio-token`, `godot-regole-csharp`) | Si fondono nel `CLAUDE.md` esistente; se ci sono regole in conflitto decidi tu quale vale. `risparmio-token` porta anche una skill e il subagente `esploratore` in `.claude/`. |
| Moduli con azioni esterne | Chiedono sempre il tuo ok esplicito (sezione 8). |

### Esempi di richiesta

- *"Usa claude-projects-starter. Aggiungi a questo repository solo `regole-base`, fondendolo col `CLAUDE.md` che c'è già."*
- *"Usa claude-projects-starter. Il workflow di build manuale di questo gioco Godot esiste già: confrontalo con `godot-ci-android-apk-prova` e dimmi cosa varrebbe la pena prendere."*
- *"Usa claude-projects-starter. Dimmi quali moduli adottare per questo monorepo, senza modificare nulla."*

## 5. Il registro `.moduli.json`

Nella radice di ogni progetto Claude tiene un piccolo file che dice quali moduli sono stati applicati e a quale versione. Serve a sapere, più avanti, se un progetto è indietro rispetto al cestino.

```json
{
  "fonte": "claude-projects-starter",
  "moduli": [
    { "id": "regole-base", "versione": 2 },
    { "id": "risparmio-token", "versione": 1 },
    { "id": "android-rn", "versione": 1, "note": "adottato solo babel e metro" }
  ]
}
```

Non contiene segreti. È un file di testo: puoi correggerlo a mano.

## 6. Aggiornare un modulo già applicato

Quando un modulo del cestino migliora, il campo `versione` della sua scheda sale. Per aggiornare un progetto:

1. Chiedi: *"Usa claude-projects-starter. Controlla se i moduli di questo progetto sono aggiornati."* Claude confronta `.moduli.json` con le versioni attuali.
2. Per ogni modulo indietro, Claude mostra cosa è cambiato.
3. Se accetti, Claude apre una pull request nel repository del progetto (mai modifiche dirette) e aggiorna `.moduli.json`.

**Nell'altro verso:** se in un progetto trovi un bug o un miglioramento in un file standard, riportalo nel modulo corrispondente con una pull request su questo repository e alza `versione`.

## 7. Cosa fa Claude e cosa fai tu

| Claude fa | Solo tu fai |
|---|---|
| Analizzare il progetto e proporre i moduli | Decidere quali moduli adottare |
| Scrivere nel progetto i file dei moduli (tali e quali o adattati), sostituire i segnaposto, fondere i file esistenti (col tuo ok) | Impostare i secret del repository (chiavi, password, account di servizio) |
| Preparare workflow CI **manuali** | Lanciare i workflow |
| Scrivere codice e testi, aprire le pull request | Creare le app e gli account sugli store e sulle console |
| Descrivere le azioni esterne nel piano | Dare l'ok alle azioni esterne e alla pubblicazione in produzione |

## 8. Azioni esterne

I moduli con `azioni_esterne: true` sono elencati nel piano e applicati solo dopo il tuo ok esplicito. Nel catalogo sono segnati con "sì" nella colonna *Esterno?*. Esempi: caricare una build su uno store, scrivere la scheda di un'app, scrivere in un altro repository, indicare i secret da creare.

Per i secret: Claude **non li vede, non li chiede in chat e non li scrive nei file**. Il modulo dice quali nomi creare e dove; li imposti tu (nelle impostazioni del repository o con la CLI di GitHub leggendo il valore da stdin).

## 9. Scrivere o modificare un modulo

1. Crea `moduli/<id>/` con `modulo.md` e, se serve, `riferimenti/` (file di esempio nel percorso che avrebbero nel progetto).
2. Nella testata YAML di `modulo.md`:

   ```yaml
   ---
   id: nome-modulo
   versione: 1
   descrizione: Una riga su cosa fa.
   quando_usarlo: In quali progetti.
   quando_no: In quali no.            # facoltativo
   etichette: [android]
   richiede: [regole-base]            # facoltativo
   conflitti: []                      # facoltativo
   azioni_esterne: false
   ---
   ```

   Campi obbligatori: `id`, `versione`, `descrizione`, `quando_usarlo`, `etichette`, `azioni_esterne`.
3. Sezioni consigliate: *Riferimenti* (tabella riferimento → destinazione), *Segnaposto*, *Modifiche a file esistenti*, *Passi manuali*, *Verifica*.
4. Aggiungi la riga in `moduli/CATALOGO.md` e, se serve una nuova etichetta, in `moduli/SELEZIONE.md`.
5. Alza `versione` a ogni modifica che cambia i file.
6. Apri una pull request.

Regole per i moduli:

- **Nessun segreto** nei file, nemmeno di esempio: usa valori palesemente finti.
- **Nessun riferimento a persone, aziende o progetti reali**: usa segnaposto e nomi neutri (`mia-app`, `<tuo-utente>`).
- **Workflow solo manuali** (`workflow_dispatch`).
- **Pochi moduli, buoni**: un modulo nuovo nasce meglio la seconda volta che serve a mano, non prima.
- Un modulo dichiara in `conflitti` ciò che non può convivere con lui.

## 10. Domande frequenti

**Devo usare tutti i moduli?** No. Solo `regole-base` è sempre consigliato (e `risparmio-token` fortemente raccomandato); il resto si sceglie.

**Posso usare un modulo a metà?** Sì. Chiedi a Claude di adottarne solo le parti che ti servono; verrà annotato in `.moduli.json`.

**I moduli funzionano senza Claude?** Sono pensati per Claude. Le schede si leggono anche a mano, ma nessun file va copiato in blocco in un altro software: sono riferimenti da adattare.

**Devo clonare il repository?** No. Claude legge dall'indirizzo pubblico solo i file che servono (vedi [`moduli/README.md`](https://github.com/MarcoDiGioia/claude-projects-starter/blob/main/moduli/README.md)).

**Serve una skill?** No: i moduli fanno già da skill che Claude carica quando servono. Se vorrai un comando comodo, una skill sottile può dire solo "segui `moduli/README.md` di claude-projects-starter".

**Cosa succede se la scelta di Claude non mi convince?** Il piano è sempre mostrato prima di agire: chiedi di cambiarlo. Dopo l'applicazione, tutto è in una pull request: si può modificare o chiudere senza conseguenze.

**I moduli monorepo e Godot sono affidabili?** Sono bozze mai provate su un progetto nuovo. Trattali come punto di partenza e riporta le correzioni nei moduli.

**C'è una wiki?** Questo manuale vive in `docs/` ed è la fonte di riferimento. Se vuoi una wiki GitHub, abilitala nelle impostazioni del repository e copia le sezioni di questo file nelle pagine.
