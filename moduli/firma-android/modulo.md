---
id: firma-android
versione: 1
descrizione: Elenco dei secret del repo necessari per firmare e caricare l'app Android.
quando_usarlo: App Android su Play.
quando_no: App non su Play.
etichette: [play]
richiede: []
conflitti: []
azioni_esterne: true   # secret del repo, impostati solo da Marco
---

## Secret richiesti nel repo dell'app (GitHub → Settings → Secrets and variables → Actions)
- `KEYSTORE_BASE64`
- `KEYSTORE_PASSWORD`
- `KEY_ALIAS`
- `KEY_PASSWORD`
- `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`

## Regole
- Questi valori li imposta solo Marco: Claude non li vede, non li chiede in chat e non li scrive in nessun file.
- `.gitignore` (modulo `android-rn`) esclude `*.keystore`, `*.jks` e `mobile/android/keystore.properties`.

## Passi manuali (li fa Marco)
Impostare i cinque secret nel repo della nuova app.

## Verifica
I cinque nomi compaiono in Settings → Secrets del repo.
