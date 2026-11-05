# Moduli

Cestino di moduli per Claude. Un modulo **non è codice da inserire in altri software**: è un insieme di indicazioni e riferimenti che Claude legge mentre sviluppa, un po' come una skill che si carica solo quando serve. Vedi `../docs/proposta-moduli.md` per l'idea completa.

I moduli nascono da progetti reali, ripuliti dal contesto specifico: React Native per Android (`android-rn`, `ads-admob`, `ci-play-*`...), monorepo npm workspaces (`monorepo-*`) e Godot 4 in C# (`godot-*`).

> **Area separata.** Questa cartella è la libreria per i repository (template, moduli, regole tecniche, scaffold) e non fa parte dell'inizializzazione del progetto Claude, che è indipendente da codice e repository.
>
> **Due usi.** (1) Estendere un progetto Claude: le regole e le skill (`regole-base`, `risparmio-token`, `privacy-policy`) si leggono da qui quando servono, tramite il blocco in [`../PROGETTO.md`](../PROGETTO.md); non si installano nei repository. (2) Scaffold di un repository: la procedura sotto, solo quando l'utente crea o modifica un repo.

## Come Claude li usa

- **Si legge, non si clona.** Claude non clona questo repository e non lo aggiunge ai progetti (né come dipendenza, né come sottomodulo). Legge dall'indirizzo pubblico solo i file che servono:
  `https://raw.githubusercontent.com/MarcoDiGioia/claude-projects-starter/main/<percorso>`
- **I riferimenti sono materiale di lavoro.** I file in `<area>/<id>/riferimenti/` mostrano come Claude fa quella cosa. Se calzano esattamente alle necessità del progetto, Claude può scriverli tali e quali; altrimenti li adatta o ne prende solo le parti utili. Il progetto di destinazione contiene solo ciò che Claude scrive per lui, non una copia del repository.
- **Niente legami col repository.** Nel progetto non restano percorsi, dipendenze o rimandi a questo repository, a parte il registro `.moduli.json`.

## Procedura (la segue Claude per ogni nuovo progetto)

1. Leggere `CATALOGO.md` e la descrizione del progetto; ricavarne le etichette. Se manca un'informazione che cambia la scelta, fare una sola domanda.
2. Applicare `SELEZIONE.md` (etichetta → moduli) e aggiungere le dipendenze (`richiede`).
3. **Mostrare il piano all'utente e aspettare il suo ok**: moduli scelti con la ragione, moduli esclusi, azioni esterne, passi manuali.
4. Leggere la scheda `modulo.md` di ogni modulo scelto e, di ognuno, solo i riferimenti che servono.
5. Scrivere nel repo del progetto, su un branch, i file necessari (tali e quali o adattati), nell'ordine delle dipendenze.
6. Eseguire la sezione "Verifica" di ogni modulo.
7. Registrare i moduli usati in `.moduli.json` nel progetto (id e versione).
8. Consegnare la lista dei passi manuali rimasti.

## Regole

- `regole-base` si applica sempre; `risparmio-token` è consigliato sempre.
- I moduli con `azioni_esterne: true` si applicano solo dopo l'ok dell'utente.
- Nessun modulo contiene segreti: dove serve, dice cosa impostare e dove, e lo imposta l'utente.
- Mai modificare progetti già esistenti per conto proprio: si apre una PR nel repo dell'app e decide l'utente.

## Segnaposto

Nei riferimenti compaiono segnaposto da sostituire con i valori del progetto: `APP_SLUG` (es. `mia_app`), `APP_PACKAGE_ID` (es. `com.esempio.miaapp`), `APP_DISPLAY_NAME` (es. `Mia App`). I moduli monorepo usano anche `APP_SCOPE` (scope npm, es. `miaapp`); i moduli Godot usano `APP_PROJECT` (nome PascalCase del progetto, anche namespace C#) e `APP_PACKAGE_ID` (package Android completo, vale anche per le app React Native). `APP_AUTHOR` è il nome dell'autore nella configurazione. Claude li sostituisce mentre scrive i file nel progetto.

## Cartelle `riferimenti/`

I file in `riferimenti/` hanno già il percorso che avrebbero nel progetto, così la tabella "Riferimento → Destinazione" di ogni scheda è immediata da leggere. Nei moduli Godot `APP_PROJECT` compare anche nei nomi di file (`APP_PROJECT.csproj`): il nome va sostituito anche nel file che Claude scrive.
