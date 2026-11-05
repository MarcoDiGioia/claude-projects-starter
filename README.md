# claude-projects-starter

Un **cestino di moduli di configurazione riutilizzabili** per i tuoi progetti software, pensato per lavorare con [Claude Code](https://claude.ai/code). Descrivi il progetto, Claude sceglie i moduli giusti, ti mostra il piano e, dopo il tuo ok, li applica: regole di lavoro, scheletro del codice, workflow di CI, procedure di pubblicazione.

Funziona sia per **progetti nuovi** sia per **progetti già avviati**, e non richiede skill né strumenti speciali: i moduli sono file e schede di testo in questo repository.

## Come funziona in breve

1. **Dai accesso a Claude a questo repository** (o scrivi "usa claude-projects-starter" nella richiesta).
2. **Descrivi il progetto** in poche righe: che cosa fa, per quale piattaforma, se ha pubblicità, se va su uno store, in quali lingue.
3. Claude ricava poche **etichette** dalla descrizione e, con la tabella di [`moduli/SELEZIONE.md`](moduli/SELEZIONE.md), sceglie i moduli.
4. Claude ti mostra il **piano**: moduli scelti e perché, moduli esclusi, azioni esterne, passi manuali. **Non applica nulla finché non dai l'ok.**
5. Claude applica i moduli su un branch, verifica (build, test) e apre una pull request. Ti consegna la lista dei **passi manuali** che solo tu puoi fare (secret, console degli store).

## Esempio

> *"App Android offline per segnare le spese di condominio, gratuita con pubblicità, in italiano e inglese, da mettere sul Play Store."*

Claude sceglie `regole-base`, `android-rn`, `multi-ambiente`, `i18n-6-lingue`, `ads-admob`, `ci-play-internal`, `play-console-checklist`, `firma-android` e `privacy-policy`. Esclude `ci-play-production` (nessuna richiesta di pubblicare) e `play-store-scheda` (si aggiunge quando i testi sono pronti).

Per un progetto esistente: *"Applica a questo repository le regole base e il workflow di build manuale, senza toccare il resto."*

## Cosa c'è dentro

```
claude-projects-starter/
├── README.md
├── docs/
│   ├── manuale.md            # manuale d'uso: progetti nuovi e già avviati
│   └── proposta-moduli.md    # idea e scelte di progetto
└── moduli/
    ├── README.md             # la procedura che Claude segue
    ├── CATALOGO.md           # elenco dei moduli
    ├── SELEZIONE.md          # tabella etichetta → moduli
    └── <id>/
        ├── modulo.md         # scheda: cosa fa, quando usarlo, passi manuali, verifica
        └── files/            # i file, già nel percorso di destinazione
```

## Moduli disponibili

| Famiglia | Moduli |
|---|---|
| Per tutti | `regole-base`, `risparmio-token` |
| App React Native per Android | `android-rn`, `multi-ambiente`, `i18n-6-lingue`, `ads-admob` |
| Pubblicazione su Google Play | `ci-play-internal`, `ci-play-production`, `play-store-scheda`, `play-store-grafiche`, `play-console-checklist`, `firma-android`, `privacy-policy` |
| Monorepo npm workspaces *(bozza)* | `monorepo-npm-workspaces`, `monorepo-shared-zod`, `monorepo-backend-nestjs`, `monorepo-frontend-expo` |
| Godot 4 in C# *(bozza)* | `godot-regole-csharp`, `godot-core-csharp`, `godot-progetto-base`, `godot-ci-android-apk-prova`, `godot-ci-android-aab-play`, `godot-ci-desktop` |

Dettagli e dipendenze in [`moduli/CATALOGO.md`](moduli/CATALOGO.md).

## Principi

- **Prima il piano, poi le modifiche.** Nulla viene applicato senza il tuo ok.
- **Nessun segreto nei file né in chat.** Dove serve una chiave, il modulo dice cosa impostare e dove; lo imposti tu.
- **Workflow CI solo manuali** (`workflow_dispatch`), per risparmiare minuti di Actions.
- **Niente pubblicazione in produzione** senza una tua richiesta esplicita.
- **I progetti esistenti non cambiano da soli:** ogni aggiornamento passa da una pull request che decidi tu.

- **Meno token possibile.** Risposte brevi, letture parziali, output dei comandi filtrato, ricerche delegate a un subagente leggero, contesto compattato: regole, skill, subagente e impostazioni nel modulo `risparmio-token`, consigliato da `regole-base`.

Sono i valori predefiniti di [`moduli/regole-base`](moduli/regole-base/modulo.md): adattali al tuo modo di lavorare.

## Documentazione

- [Manuale d'uso](docs/manuale.md): come usare i moduli in progetti nuovi e già avviati, come aggiornarli, come scriverne di nuovi.
- [Proposta](docs/proposta-moduli.md): perché è fatto così.
- [Procedura di Claude](moduli/README.md) e [catalogo](moduli/CATALOGO.md).

## Stato

I moduli per React Native e Android derivano da progetti reali. I moduli monorepo e Godot sono bozze mai provate su un progetto nuovo.
