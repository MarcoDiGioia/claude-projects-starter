# Moduli

Cestino di moduli di configurazione riutilizzabili. Vedi `../docs/proposta-moduli.md` per l'idea completa.

Estratti dal `template/` e dal `CLAUDE.md` di `MarcoDiGioia/progetto-gazza` (stato del 4 novembre 2026, template preso da `luna`) per i moduli `monorepo-*` dal monorepo `MarcoDiGioia/Associati`, per i moduli `godot-*` dal gioco `MarcoDiGioia/Streethole`. Quando in un'app si migliora un file standard, la modifica va riportata nel modulo corrispondente (e viceversa).

## Procedura (la segue Claude per ogni nuovo progetto)

1. Leggere `CATALOGO.md` e la descrizione del progetto; ricavarne le etichette. Se manca un'informazione che cambia la scelta, fare una sola domanda.
2. Applicare `SELEZIONE.md` (etichetta → moduli) e aggiungere le dipendenze (`richiede`).
3. **Mostrare il piano a Marco e aspettare il suo ok**: moduli scelti con la ragione, moduli esclusi, azioni esterne, passi manuali.
4. Applicare i moduli nell'ordine delle dipendenze, nel repo del nuovo progetto, su un branch.
5. Eseguire la sezione "Verifica" di ogni modulo.
6. Registrare i moduli usati in `.gazza-moduli.json` nel nuovo progetto (id e versione).
7. Consegnare la lista dei passi manuali rimasti.

## Regole

- `regole-base` si applica sempre.
- I moduli con `azioni_esterne: true` si applicano solo dopo l'ok di Marco.
- Nessun modulo contiene segreti: dove serve, dice cosa impostare e dove, e lo imposta Marco.
- Mai modificare progetti già esistenti per conto proprio: si apre una PR nel repo dell'app e decide Marco.

## Segnaposto

Come in `progetto-gazza/template/README.md`: `APP_SLUG` (es. `ricorda_farmaci`), `APP_PACKAGE` (es. `ricordafarmaci`, package `com.progettogazza.<...>`), `APP_DISPLAY_NAME` (es. `Ricorda Farmaci`). I moduli monorepo usano anche `APP_SCOPE` (scope npm, es. `associati`); i moduli Godot usano `APP_PROJECT` (nome PascalCase del progetto, anche namespace C#) e `APP_PACKAGE_ID` (package Android completo). Dopo la copia:

```bash
grep -rl 'APP_' --exclude-dir=node_modules . | xargs sed -i \
  -e 's/APP_SLUG/<app_slug>/g' -e 's/APP_PACKAGE/<app_package>/g' -e 's/APP_DISPLAY_NAME/<Nome App>/g' -e 's/APP_SCOPE/<scope>/g' -e 's/APP_PROJECT/<NomeProgetto>/g' -e 's/APP_PACKAGE_ID/<com.esempio.gioco>/g'
```

## Cartelle `files/`

I file in `files/` stanno già nel percorso in cui finiscono nel nuovo progetto: si copiano con `cp -r moduli/<id>/files/. <nuovo-progetto>/`.

Nota: nei moduli Godot `APP_PROJECT` compare anche nei nomi di file (`APP_PROJECT.csproj`): rinominarli oltre a sostituire il testo.
