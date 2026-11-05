# firma-android

Elenco dei secret del repo necessari per firmare e caricare l'app Android.

| | |
|---|---|
| Quando usarlo | App Android su Play. |
| Quando no | App non su Play. |
| Azioni esterne | true |
| Versione | 1 |

Riferimenti del modulo: [https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/template/firma-android](https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/template/firma-android)

## Secret richiesti nel repo dell'app (GitHub → Settings → Secrets and variables → Actions)
- `KEYSTORE_BASE64`
- `KEYSTORE_PASSWORD`
- `KEY_ALIAS`
- `KEY_PASSWORD`
- `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`

## Regole
- Questi valori li imposta solo l'utente: Claude non li vede, non li chiede in chat e non li scrive in nessun file.
- `.gitignore` (modulo `android-rn`) esclude `*.keystore`, `*.jks` e `mobile/android/keystore.properties`.

## Passi manuali (a carico dell'utente)
Impostare i cinque secret nel repo della nuova app.

## Verifica
I cinque nomi compaiono in Settings → Secrets del repo.
