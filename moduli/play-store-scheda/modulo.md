---
id: play-store-scheda
versione: 1
descrizione: Testi della scheda Play in 7 lingue e workflow manuale che li carica (con immagini e screenshot) via API.
quando_usarlo: App su Play, quando i testi sono pronti.
quando_no: Prima di avere i testi; app non su Play.
etichette: [scheda-store]
richiede: [ci-play-internal]
conflitti: []
azioni_esterne: true   # scrive la scheda su Google Play
---

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/store/listings/<lingua>/{title,short_description,full_description}.txt` (it-IT, en-US, en-GB, es-ES, fr-FR, de-DE, pt-PT) | `store/listings/` |
| `files/.github/workflows/update-store-listing.yml` | `.github/workflows/update-store-listing.yml` |
| `files/.github/scripts/update_store_listing.py` | `.github/scripts/update_store_listing.py` |

## Segnaposto
`APP_DISPLAY_NAME` (titolo), `APP_PACKAGE` (workflow).

## Note
- Limiti: titolo 30, descrizione breve 80, descrizione completa 4000 caratteri.
- I file contengono `TODO:` finché i testi non sono scritti: lo script si rifiuta di caricare testi con `TODO:` o `APP_DISPLAY_NAME`.
- Il workflow ha una scelta: `testi e immagini` / `solo immagini` / `solo testi`. Solo `workflow_dispatch`; deve essere sul branch predefinito per poterlo lanciare.
- Immagini: vedi `play-store-grafiche`.
- Prova locale senza toccare Play: `python .github/scripts/update_store_listing.py <package> --dry-run`.
- L'account di servizio deve avere il permesso "Gestisci la presenza nello store".

## Passi manuali (li fa Marco)
Lanciare il workflow da GitHub → Actions.

## Verifica
`--dry-run` dello script senza errori, con i testi compilati.
