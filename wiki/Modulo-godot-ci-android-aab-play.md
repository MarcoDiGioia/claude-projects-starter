# godot-ci-android-aab-play

Workflow manuale che esporta l'AAB firmato con la chiave di upload e lo carica sulla traccia interna di Play, con guida a chiave, secret e Play Console.

| | |
|---|---|
| Quando usarlo | Gioco Godot che va su Google Play. |
| Quando no | Giochi non destinati a Play. |
| Richiede | godot-progetto-base |
| Conflitti | android-rn |
| Azioni esterne | true |
| Versione | 1 |

Riferimenti del modulo: [https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/scaffold/godot-ci-android-aab-play](https://github.com/MarcoDiGioia/claude-projects-starter/tree/main/scaffold/godot-ci-android-aab-play)

**Scelta**: trigger solo `workflow_dispatch` (regola: workflow CI solo manuali), niente caricamento a ogni push.

## Riferimenti
| Riferimento (nel modulo) | Destinazione (nel progetto) |
|---|---|
| `riferimenti/.github/workflows/release-play-store.yml` | `.github/workflows/release-play-store.yml` |

## Segnaposto
`APP_PROJECT`, `APP_PACKAGE_ID` (package Android, es. `com.esempio.nomegioco`).

## Come funziona
- Versione: `version/code` = numero di esecuzione (cresce sempre, come vuole Play); nome versione `0.1.<esecuzione>` o quello scelto al lancio.
- Il preset `Android` resta in formato APK nel repo; il passaggio ad AAB (`gradle_build/export_format=1`) avviene solo nel runner.
- Controlla subito i secret e rifiuta un AAB firmato con la chiave di debug.
- Se manca `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`, l'AAB resta negli artifact.
- Da verificare alla prima build: `target_sdk` del preset e requisiti correnti di Google Play.

## Secret richiesti (li imposta solo l'utente)
| Secret | Contenuto |
|---|---|
| `ANDROID_UPLOAD_KEYSTORE_BASE64` | keystore di upload in base64 |
| `ANDROID_UPLOAD_KEY_ALIAS` | alias della chiave |
| `ANDROID_UPLOAD_KEYSTORE_PASSWORD` | password (keystore e chiave) |
| `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | facoltativo: JSON dell'account di servizio |

Nota: i nomi sono diversi da quelli dei moduli React Native (`KEYSTORE_BASE64`...): non vanno mescolati nello stesso repository. Chiave e secret non passano mai dalla chat né dai file.

## Passi manuali (a carico dell'utente)
1. Generare la chiave di upload sul proprio computer: `keytool -genkeypair -v -keystore upload.keystore -alias upload -keyalg RSA -keysize 2048 -validity 10000`; conservarla in un gestore di password con una copia di sicurezza.
2. Impostare i secret nel repo (Settings → Secrets and variables → Actions, o `gh secret set` con i valori da stdin).
3. In Play Console: creare l'app (package `APP_PACKAGE_ID`, che non si cambia più), attivare Play App Signing, caricare **a mano** il primo AAB scaricato dagli artifact, creare la lista tester del test interno. Compilare le schede obbligatorie: privacy policy, sicurezza dei dati, classificazione dei contenuti, pubblico, annunci.
4. Per il caricamento automatico (solo dopo il primo a mano): attivare Google Play Android Developer API in Google Cloud, creare un account di servizio e la sua chiave JSON, invitarlo in Play Console → Utenti e autorizzazioni con permesso sulle tracce di test, salvare il JSON nel secret e cancellarlo dal computer.
5. Lanciare il workflow da GitHub → Actions.

## Verifica
Un'esecuzione manuale produce l'artifact `APP_PROJECT-aab-<n>` e il passo "Verifica firma e package" è verde.
