# Blocco per le istruzioni di progetto Claude

Questa è l'area "inizializzazione del progetto Claude": **non dipende da codice né da repository**. I moduli, i template e le regole tecniche per i repository (cartella `moduli/`) sono un'area separata, che si usa solo quando si lavora su un repository concreto.

Questo file contiene il testo da incollare nelle **istruzioni di progetto** di un progetto Claude. Resta corto di proposito: le istruzioni di progetto occupano contesto a ogni turno. Il dettaglio sta in questo repository pubblico e Claude lo legge solo quando serve, senza installare né copiare nulla.

Base degli indirizzi: `https://raw.githubusercontent.com/MarcoDiGioia/claude-projects-starter/main/`

---

## Testo da incollare

```
## Riferimenti (claude-projects-starter)

Il repository pubblico MarcoDiGioia/claude-projects-starter contiene regole, skill e procedure che questo progetto usa come riferimenti. Non si clonano e non si installano: si leggono dall'indirizzo raw
https://raw.githubusercontent.com/MarcoDiGioia/claude-projects-starter/main/<percorso>
solo quando il compito lo richiede, e si rileggono a ogni uso (possono essere aggiornati). Se non sono raggiungibili, dirlo all'utente e proseguire con le regole qui sotto.

Regole sempre valide:
1. Nessun segreto in chat o nei file.
2. Niente pubblicazione in produzione, cancellazioni o merge senza ok esplicito dell'utente.
3. Prima il piano, poi le modifiche; ogni modifica a un repository passa da un branch e da una PR.
4. Niente push non verificato: servono build/test o un controllo concreto, con output reale.
5. Risparmiare token solo eliminando lo spreco, mai riducendo la qualità.

Quando leggere cosa:
- Sessione lunga, esplorazione ampia del codice, consumi: moduli/risparmio-token/riferimenti/.claude/skills/risparmio-token/SKILL.md
- Ricerche ampie in sola lettura: seguire moduli/risparmio-token/riferimenti/.claude/agents/esploratore.md come procedura
- Regole di lavoro complete: moduli/regole-base/riferimenti/CLAUDE.base.md
- Nuovo repository o scaffold (app, CI, store, monorepo, Godot): moduli/README.md, moduli/SELEZIONE.md e le schede in moduli/<id>/modulo.md; presentare il piano e attendere l'ok prima di scrivere
- Nuova privacy policy per un'app: moduli/privacy-policy/modulo.md

La memoria del progetto contiene solo i fatti specifici dell'utente (repository, app, convenzioni), non copie dei riferimenti.
```

---

## Come si usa

1. Incolla il testo sopra nelle istruzioni del progetto Claude.
2. Aggiungi sotto le istruzioni specifiche del progetto (lingua, repository, convenzioni).
3. Salva nella memoria di progetto i fatti che cambiano da progetto a progetto.
4. Aggiornando questo repository, tutti i progetti usano subito i riferimenti nuovi; il blocco da incollare cambia solo se cambia l'indice.

Limiti: Claude deve decidere di leggere il riferimento (per questo l'indice dice *quando*) e serve rete verso GitHub. Un subagente non si installa con questo metodo: la sua scheda viene seguita come procedura.
