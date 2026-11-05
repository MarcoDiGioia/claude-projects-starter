# claude-projects-starter

Un **cestino di moduli per Claude**, pensato per lavorare con [Claude Code](https://claude.ai/code). I moduli sono indicazioni e riferimenti che Claude legge quando servono, come skill che si carica da sé al bisogno: regole di lavoro, scheletri di codice, workflow di CI, procedure di pubblicazione. Descrivi il progetto, Claude sceglie i moduli giusti, ti mostra il piano e, dopo il tuo ok, ne applica quanto serve.

Funziona sia per **progetti nuovi** sia per **progetti già avviati**. Il repository **non si clona e non entra nei tuoi progetti**: Claude legge dall'indirizzo pubblico solo i file che gli servono e scrive nel progetto soltanto ciò che serve, tale e quale se calza, altrimenti adattato.

## Come funziona in breve

1. **Scrivi "usa claude-projects-starter"** nella richiesta. Il repository è pubblico: non serve dargli accesso.
2. **Descrivi il progetto** in poche righe: che cosa fa, per quale piattaforma, se ha pubblicità, se va su uno store, in quali lingue.
3. Claude ricava poche **etichette** dalla descrizione e, con la tabella di [`moduli/SELEZIONE.md`](moduli/SELEZIONE.md), sceglie i moduli.
4. Claude ti mostra il **piano**: moduli scelti e perché, moduli esclusi, azioni esterne, passi manuali. **Non applica nulla finché non dai l'ok.**
5. Claude scrive nel progetto, su un branch, quanto serve dai moduli scelti, verifica (build, test) e apre una pull request. Ti consegna la lista dei **passi manuali** che solo tu puoi fare (secret, console degli store).

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
        └── riferimenti/     # file di riferimento, nel percorso che avrebbero nel progetto
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

- **Meno spreco di token, mai meno qualità.** Niente letture ripetute, output senza rumore, ricerche delegate, contesto compattato con criterio: regole, skill e subagente nel modulo `risparmio-token`, consigliato da `regole-base`. Nel conflitto vince sempre la qualità.

Sono i valori predefiniti di [`moduli/regole-base`](moduli/regole-base/modulo.md): adattali al tuo modo di lavorare.

## Documentazione

- [Manuale d'uso](docs/manuale.md): come usare i moduli in progetti nuovi e già avviati, come aggiornarli, come scriverne di nuovi.
- [Proposta](docs/proposta-moduli.md): perché è fatto così.
- [Procedura di Claude](moduli/README.md) e [catalogo](moduli/CATALOGO.md).

## Documentazione di consultazione

La cartella [`wiki/`](wiki/README.md) raccoglie la documentazione di consultazione: manuale, procedura, catalogo e una pagina per modulo. È generata da `moduli/` e `docs/` con `scripts/genera-wiki.sh wiki --markdown`; la fonte di verità resta `moduli/` e `docs/`. Lo stesso script, senza `--markdown`, produce le pagine per una wiki GitHub.

## Licenza

Distribuito con licenza [GNU GPL v3](LICENSE).

## Stato

I moduli per React Native e Android derivano da progetti reali. I moduli monorepo e Godot sono bozze mai provate su un progetto nuovo.
