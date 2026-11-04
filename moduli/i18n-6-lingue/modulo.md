---
id: i18n-6-lingue
versione: 1
descrizione: Traduzioni it/en/es/fr/de/pt con t('chiave'), lista('chiave') e test di completezza.
quando_usarlo: App in più lingue (default per le app React Native del cestino).
quando_no: App volutamente in una sola lingua.
etichette: [multilingua]
richiede: [android-rn]
conflitti: []
azioni_esterne: false
---

## File
| Da (nel modulo) | A (nel nuovo progetto) |
|---|---|
| `files/shared/src/i18n/` (`index.ts`, `it.ts`, `en.ts`, `es.ts`, `fr.ts`, `de.ts`, `pt.ts`) | `shared/src/i18n/` |
| `files/mobile/__tests__/i18n.test.ts` | `mobile/__tests__/i18n.test.ts` |

## Note
- Lingua del telefono, inglese se non supportata.
- `it.ts` è il riferimento: le altre lingue sono tipizzate `Dizionario`, quindi TypeScript segnala le chiavi mancanti.
- Nei servizi e nei context usare `t()`, mai testi fissi. I valori salvati nel DB (es. categorie) restano in italiano e si traducono solo a schermo.
- Serve la config Jest in `package.json` (già in `android-rn`): `moduleDirectories` è necessaria perché `shared/` non ha `node_modules`.
- Scheda store e note di rilascio vanno anch'esse in 6 lingue (vedi `play-store-scheda` e `ci-play-internal`).

## Passi manuali
Scrivere le chiavi dell'app in `it.ts` e tradurle nelle altre lingue.

## Verifica
`npm run type-check` e `npm test`.
