# Manuale d'uso di claude-projects-starter

Questo repository è il **cestino di moduli** per i tuoi nuovi progetti: dici a Claude cosa vuoi fare, Claude sceglie i moduli giusti, ti mostra il piano e, dopo il tuo ok, li applica. L'idea completa è in [`proposta-moduli.md`](proposta-moduli.md); qui c'è come si usa nella pratica.

> Stato: i moduli presi da `progetto-gazza` sono in `moduli/` (vedi la PR dedicata). I moduli per Godot e per i progetti monorepo non esistono ancora.

## 1. Cosa c'è nel repository

```
claude-projects-starter/
├── README.md
├── docs/
│   ├── proposta-moduli.md     # l'idea e le scelte di progetto
│   └── manuale.md             # questo file
└── moduli/
    ├── README.md              # la procedura che Claude segue
    ├── CATALOGO.md            # elenco dei moduli
    ├── SELEZIONE.md           # tabella etichetta → moduli
    └── <id>/
        ├── modulo.md          # scheda: cosa fa, quando usarlo, passi manuali, verifica
        └── files/             # i file, già nel percorso di destinazione
```

## 2. Iniziare un nuovo progetto

1. **Descrivi il progetto** a Claude in poche righe: che cosa fa, per quale piattaforma, se ha pubblicità, se va sul Play Store, in quali lingue. Esempio: *"App Android offline per segnare le spese di condominio, gratuita con pubblicità, in italiano e inglese, da mettere sul Play Store."*
2. **Indica il cestino**: scrivi "usa claude-projects-starter" nella richiesta, oppure metti quella riga nel `CLAUDE.md` del nuovo progetto, così non va ripetuta.
3. **Claude sceglie**: legge `moduli/CATALOGO.md`, ricava le etichette dalla tua descrizione e applica `moduli/SELEZIONE.md`. Se manca un'informazione che cambia la scelta, ti fa **una sola domanda**.
4. **Ti mostra il piano**: moduli scelti con la ragione di una riga, moduli esclusi, azioni esterne, passi manuali. **Non applica nulla finché non rispondi con il tuo ok.** Puoi chiedere di aggiungere o togliere moduli.
5. **Applica** i moduli nell'ordine delle dipendenze, nel repo del nuovo progetto, su un branch e con una PR.
6. **Verifica** con la sezione "Verifica" di ogni modulo (per le app React Native: type-check e `./gradlew assembleDebug`).
7. **Ti consegna la lista dei passi manuali** rimasti: quelli che puoi fare solo tu (secret del repo, Play Console, AdMob).

## 3. Cosa fa Claude da solo e cosa no

| Claude fa | Solo tu fai |
|---|---|
| Copiare i file dei moduli e sostituire i segnaposto | Impostare i secret del repo (chiavi, password, account di servizio) |
| Scrivere codice e testi dell'app, aprire la PR | Creare l'app in Play Console e in AdMob |
| Preparare workflow CI **manuali** | Lanciare i workflow da GitHub → Actions |
| Descrivere le azioni esterne nel piano | Dare l'ok alle azioni esterne e alla pubblicazione in produzione |

Le regole fisse (modulo `regole-base`): cloud prima di tutto, nessun segreto in chat o nei file, workflow CI solo manuali, niente produzione senza una tua richiesta esplicita, niente cancellazioni o disinstallazioni senza ok, nessuna PR unita senza il tuo ok.

## 4. Le azioni esterne

I moduli con `azioni_esterne: true` toccano servizi fuori dal repo (Play, un altro repo GitHub, i secret). Claude li elenca nel piano e li applica solo dopo il tuo ok:

- `ci-play-internal`: carica una build sul canale interno di Play (il workflow lo lanci tu).
- `ci-play-production`: pubblica in produzione. Si aggiunge **solo se lo chiedi tu**.
- `play-store-scheda`: scrive la scheda dello store su Play.
- `privacy-policy`: scrive in `MarcoDiGioia/MarcoDiGioia.github.io`.
- `firma-android`: elenca i secret da impostare; li imposti tu.

## 5. Dopo la prima applicazione

- Nel nuovo progetto Claude registra i moduli usati in `.gazza-moduli.json` (id e versione), così si sa chi usa quale versione.
- **Aggiornare un'app esistente** a una nuova versione di un modulo: Claude apre una PR nel repo di quell'app e decidi tu. I moduli non cambiano mai da soli progetti già esistenti.
- **Migliorie**: se in un'app migliori un file standard, la modifica va riportata nel modulo corrispondente (PR su questo repo).

## 6. Aggiungere o modificare un modulo

1. Crea `moduli/<id>/` con `modulo.md` e, se serve, `files/` (i file nel percorso in cui finiranno nel progetto).
2. La testata YAML di `modulo.md` ha i campi obbligatori `id`, `versione`, `descrizione`, `quando_usarlo`, `etichette`, `azioni_esterne`; facoltativi `quando_no`, `richiede`, `conflitti`. Sezioni consigliate: File, Segnaposto, Modifiche a file esistenti, Passi manuali, Verifica.
3. Aggiungi la riga in `moduli/CATALOGO.md` e, se serve una nuova etichetta, in `moduli/SELEZIONE.md`.
4. Alza `versione` a ogni modifica che cambia i file.
5. Apri una PR: si unisce solo con il tuo ok.

Regole per i moduli: nessun segreto nei file (dove serve, il modulo dice cosa impostare e dove); un modulo nuovo nasce meglio la seconda volta che serve a mano, non prima.

## 7. Cosa non c'è (ancora)

- **Skill**: non ne servono per usare il repo. Se in futuro ne vorrai una sottile, si crea dalle impostazioni di claude.ai (Claude non può crearla da qui); tutta la logica resta nel repo.
- **Moduli Godot e monorepo**: previsti dopo quelli di `progetto-gazza`.
- **Grafiche store e privacy policy**: i moduli `play-store-grafiche` e `privacy-policy` hanno solo la scheda, senza file da copiare.
