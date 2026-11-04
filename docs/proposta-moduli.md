# Proposta: moduli di configurazione riutilizzabili

**Data**: 4 novembre 2026
**Stato**: proposta, nulla è ancora stato creato o modificato nelle app
**Obiettivo**: per ogni nuovo progetto, dire a Claude "ecco cosa voglio fare" e lasciare che scelga da solo i pezzi giusti da un cestino di moduli, li applichi e ti dica cosa resta da fare a mano.

---

## 1. Idea in breve

Un **modulo** è una cartella con tre cose: una scheda (`modulo.md`) che dice cosa fa e quando usarlo, i file da copiare, e i passi manuali che Claude non può fare al posto tuo. Tutti i moduli stanno in `moduli/` di questo repository e c'è un **catalogo** unico che Claude legge per primo.

Claude non sceglie "a sensazione": legge la descrizione del progetto, ne ricava poche **etichette** (Android? pubblicità? dati personali? lingue?), e una tabella etichetta → moduli dice quali moduli servono. Prima di applicare qualsiasi cosa ti mostra il piano e aspetta il tuo ok.

Questo non richiede skill vere: sono file in questo repository, che è il punto di riferimento. Se in seguito vorrai un comando comodo tipo "nuovo progetto", si può aggiungere una skill sopra (vedi sezione 6).

---

## 2. Struttura delle cartelle

```
claude-projects-starter/
├── README.md
├── docs/                         # proposta di progetto e manuale
└── moduli/
    ├── README.md                 # come si usa: la procedura che Claude segue
    ├── CATALOGO.md               # elenco moduli: id, descrizione di una riga, quando usarlo
    ├── SELEZIONE.md              # etichette + tabella etichetta → moduli
    ├── regole-base/              # sempre applicato, non si sceglie
    │   ├── modulo.md
    │   └── files/CLAUDE.base.md
    ├── android-rn/
    │   ├── modulo.md
    │   └── files/...
    ├── multi-ambiente/
    ├── i18n-6-lingue/
    ├── ads-admob/
    ├── ci-play-internal/
    ├── ci-play-production/
    ├── play-store-scheda/
    ├── play-store-grafiche/
    ├── privacy-policy/
    ├── play-console-checklist/
    └── firma-android/
```

Nella cartella di ogni modulo, `files/` contiene i file già nel percorso in cui finiranno nel progetto di destinazione, così si copiano con un solo comando.

---

## 3. La scheda del modulo (`modulo.md`)

Testo normale con una testata YAML, così lo leggi tu e lo legge Claude senza strumenti.

```markdown
---
id: ads-admob
versione: 1
descrizione: Banner + interstitial AdMob con consenso GDPR (UMP) e limite di frequenza.
quando_usarlo: App con pubblicità. Sempre se l'app si monetizza con AdMob.
quando_no: App senza ads, o con un altro circuito pubblicitario.
etichette: [ads]
richiede: [android-rn, multi-ambiente]
conflitti: []
azioni_esterne: false        # true = tocca servizi fuori dal repo (Play, GitHub, AdMob)
---

## File
| Da (nel modulo)                        | A (nel nuovo progetto)                      |
|----------------------------------------|---------------------------------------------|
| files/mobile/src/services/AdsService.ts | mobile/src/services/AdsService.ts       |
| files/mobile/src/components/BannerAd.tsx | mobile/src/components/BannerAd.tsx     |

## Segnaposto
APP_SLUG, APP_PACKAGE_ID, APP_DISPLAY_NAME (definiti in `moduli/README.md`)

## Modifiche a file esistenti
- `App.tsx`: `await adsService.init()` dopo notifiche
- `config/prod.ts`: inserire gli ID AdMob reali

## Passi manuali (a carico dell'utente)
- Creare l'app in AdMob e copiare App ID e ID unità nei file indicati
- Pubblicare il messaggio GDPR in AdMob → Privacy e messaggi

## Verifica
`npm run type-check`, `./gradlew assembleDebug`, banner visibile con ID di test in dev.
```

Campi obbligatori: `id`, `versione`, `descrizione`, `quando_usarlo`, `etichette`, `azioni_esterne`. Gli altri sono facoltativi.

---

## 4. Moduli proposti

Il primo gruppo (app React Native per Android) viene da file collaudati in progetti reali, quindi il lavoro è soprattutto di riordino.

| Modulo | Cosa fa (una riga) | Quando usarlo | Esterno? |
|---|---|---|---|
| `regole-base` | Regole valide per tutti i progetti (vedi sotto) in un `CLAUDE.md` di partenza | Sempre | no |
| `android-rn` | Scheletro React Native 0.85: babel, metro, tsconfig, alias, servizi singleton | App mobile Android | no |
| `multi-ambiente` | Config dev/test/prod, `ENVIRONMENTS.md`, `.env.example` | Qualsiasi app con ads, DB o ID diversi per ambiente | no |
| `i18n-6-lingue` | Traduzioni it/en/es/fr/de/pt con `t()` e test | App pubblicata in più lingue (di default sì) | no |
| `ads-admob` | Banner, interstitial, consenso GDPR, limite di frequenza | App con pubblicità | no (passi manuali su AdMob) |
| `ci-play-internal` | Workflow manuale di build e caricamento sul canale interno | App che va su Play | sì: carica su Play |
| `ci-play-production` | Workflow manuale per la produzione | Solo quando l'utente chiede di pubblicare | sì: pubblica |
| `play-store-scheda` | `store/listings/`, `whatsnew/`, script e workflow di caricamento | App su Play, quando i testi sono pronti | sì: scrive su Play |
| `play-store-grafiche` | Misure e prompt per icona, feature graphic, screenshot | Prima della prima pubblicazione | no |
| `privacy-policy` | Pagina multilingua su GitHub Pages + link | App che raccoglie dati o usa ads (quasi sempre) | sì: scrive in un altro repo |
| `play-console-checklist` | Elenco dei passi a mano in Play Console (contenuti app, accesso account di servizio, Data safety) | App su Play | no (solo istruzioni) |
| `firma-android` | Procedura per la chiave di firma condivisa e i secret nel repo | Nuova app Android | sì: secret del repo |

Candidati per dopo, quando servono: `sito-statico` (GitHub Pages), `app-web-pwa`, `notifiche-locali`, `backup-export` (esporta dati locali), `acquisti-in-app`.

### Regole base (sempre applicate)

Prese dalla memoria di progetto e da `CLAUDE.md`, scritte una volta sola:

1. Cloud prima di tutto: il lavoro vive in repository remoti; i dispositivi locali sono solo un'area temporanea e ogni risultato torna sul repository.
2. Nessun segreto in chat o nei file: chiavi, password e JSON dell'account di servizio vanno solo nei secret del repo, impostati dall'utente.
3. Workflow CI solo manuali (`workflow_dispatch`), uso minimo di Actions.
4. Niente pubblicazione in produzione senza richiesta esplicita dell'utente.
5. Niente disinstallazioni o cancellazioni senza ok.
6. Una PR si unisce solo dopo l'ok dell'utente su quella PR.
7. Niente push di codice non verificato (type-check e build prima di ogni push).
8. Commit in inglese `[nome-app] descrizione`, ricordati di riportare i miglioramenti nel modulo.

---

## 5. Come Claude sceglie i moduli

Procedura in `moduli/README.md`:

1. **Leggere la descrizione** del progetto e ricavarne le etichette. Se manca un'informazione che cambia la scelta (es. "va su Play?"), fare una domanda sola, non un questionario.
2. **Applicare `SELEZIONE.md`**: tabella etichetta → moduli, più le dipendenze (`richiede`).
3. **Mostrare il piano**: moduli scelti con la ragione di una riga, moduli esclusi, azioni esterne, passi manuali. Aspettare il tuo ok.
4. **Applicare** i moduli nell'ordine delle dipendenze, nel repo del nuovo progetto, su un branch.
5. **Verificare** (type-check, build) come richiesto da ogni modulo.
6. **Registrare** i moduli usati in `.moduli.json` nel nuovo progetto (id e versione).
7. **Consegnare** la lista dei passi manuali rimasti.

Esempio di tabella `SELEZIONE.md`:

| Etichetta | Come si riconosce nella descrizione | Moduli |
|---|---|---|
| `android` | "app Android", "app mobile", nessuna piattaforma indicata per un'app | `android-rn`, `multi-ambiente` |
| `ads` | "gratuita con pubblicità", "monetizzata con AdMob" | `ads-admob` |
| `multilingua` | più lingue, o nessuna indicazione (default) | `i18n-6-lingue` |
| `play` | "sul Play Store", "pubblicare" | `ci-play-internal`, `play-console-checklist`, `firma-android` |
| `scheda-store` | "scheda store", "testi dello store" | `play-store-scheda`, `play-store-grafiche` |
| `dati-utente` | raccoglie o salva dati dell'utente, usa ads | `privacy-policy` |
| `produzione` | "pubblica in produzione" detto esplicitamente | `ci-play-production` |

Esempio: *"App Android offline per segnare le spese di condominio, gratuita con pubblicità, in italiano e inglese, da mettere sul Play Store."* → etichette `android`, `ads`, `play`, `dati-utente`, `multilingua` → `regole-base`, `android-rn`, `multi-ambiente`, `i18n-6-lingue`, `ads-admob`, `ci-play-internal`, `play-console-checklist`, `firma-android`, `privacy-policy`. Esclusi: `ci-play-production` (nessuna richiesta di pubblicare), `play-store-scheda` (si aggiunge quando i testi sono pronti).

### Tre salvaguardie

- I moduli con `azioni_esterne: true` non agiscono da soli: Claude li elenca nel piano e li applica solo dopo l'ok.
- Nessun modulo contiene segreti. Dove serve un segreto, il modulo dice cosa impostare e dove, e lo imposti tu.
- Un modulo non cambia mai progetti già esistenti per conto suo. Per aggiornare un'app a una versione nuova di un modulo, Claude apre una PR nel repo di quell'app, e tu decidi.

---

## 6. Skill vere: cosa si può e cosa no

Da una sessione di lavoro come questa **non posso creare skill**. Se vuoi un comando comodo (es. "nuovo-progetto") si crea dalle impostazioni di claude.ai (Impostazioni → Funzionalità → Skill). La skill sarebbe sottile: poche righe che dicono "clona `claude-projects-starter` e segui `moduli/README.md`". Tutta la logica resta nel repo, quindi un solo posto da tenere aggiornato. Funziona anche senza la skill: basta scrivere "segui claude-projects-starter/moduli" nella richiesta, o mettere quella riga nel `CLAUDE.md` del nuovo progetto.

---

## 7. Piano in fasi

1. **Fase 1, convenzioni**: `moduli/README.md`, `CATALOGO.md`, `SELEZIONE.md` e le schede dei primi moduli. *(fatta)*
2. **Fase 2, prova a vuoto**: far scegliere i moduli a Claude da 2 o 3 descrizioni di progetti finti (senza creare repository) e correggere la tabella finché i risultati hanno senso.
3. **Fase 3, primo progetto vero**: usarlo per un progetto reale e riportare i miglioramenti nei moduli.
4. **Fase 4, progetti esistenti**: valutare l'aggiornamento di progetti già avviati, uno per volta e con l'ok dell'utente (vedi `docs/manuale.md`).
5. **Fase 5 (facoltativa)**: skill sottile dalle impostazioni di claude.ai.

---

## 8. Rischi e scelte aperte

- **Duplicazione tra moduli**: se due moduli hanno bisogno dello stesso file, va in uno solo e l'altro lo richiede (`richiede`).
- **Moduli che invecchiano**: il registro `.moduli.json` in ogni app permette di sapere chi usa quale versione.
- **Troppi moduli troppo presto**: meglio pochi e buoni; ogni modulo nuovo nasce solo la seconda volta che serve a mano.
- **Progetti non Android**: la struttura li ammette (`sito-statico`, `app-web-pwa`), ma `regole-base` è l'unico modulo certo per ora.
