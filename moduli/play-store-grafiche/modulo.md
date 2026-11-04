---
id: play-store-grafiche
versione: 1
descrizione: Cartelle e nomi file per icona, feature graphic e screenshot, che il workflow della scheda carica su Play.
quando_usarlo: Prima della prima pubblicazione.
quando_no: App non su Play.
etichette: [scheda-store]
richiede: [play-store-scheda]
conflitti: []
azioni_esterne: false
---

## Cartelle e file attesi dallo script `update_store_listing.py`
| Percorso | Contenuto |
|---|---|
| `store/grafiche/icon-512.png` | Icona 512×512 |
| `store/grafiche/feature-graphic-1024x500.png` | Feature graphic 1024×500 |
| `store/screenshots/phone/` | Screenshot telefono, nella lingua predefinita dell'app su Play (letta dall'API); le altre lingue la ereditano |
| `store/screenshots/phone-<xx>/` (es. `phone-it`) | Screenshot per la lingua `xx`; se presente, quella lingua usa questa cartella e `phone` va a tutte le altre lingue |

Le immagini sostituiscono quelle già su Play dello stesso tipo e lingua.

## Note
Questo modulo non ha file: nel template di progetto-gazza non esistono grafiche, solo la regola sopra. Misure e prompt di generazione da aggiungere al modulo quando si farà la prima app con grafiche.

## Passi manuali (li fa Marco)
Creare o approvare le immagini e metterle nelle cartelle.

## Verifica
`python .github/scripts/update_store_listing.py <package> --dry-run` elenca le immagini trovate.
