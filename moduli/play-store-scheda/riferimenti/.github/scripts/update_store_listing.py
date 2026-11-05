"""Aggiorna la scheda Play Store: testi (store/listings/) e immagini (store/screenshots/, store/grafiche/).

Uso: python update_store_listing.py <package name> [--solo-testi | --solo-immagini] [--dry-run]
La chiave del service account arriva dalla variabile GOOGLE_PLAY_SERVICE_ACCOUNT_JSON.

Immagini caricate (se le cartelle esistono), sostituendo quelle già presenti per quel tipo e lingua.
La lingua predefinita dell'app si legge da Play. Le lingue senza screenshot propri li ereditano da quella:
  store/screenshots/phone/             -> screenshot telefono per la lingua predefinita
  store/screenshots/phone-<xx>/        -> se esiste per la lingua predefinita (es. phone-it per it-IT), la lingua
                                          predefinita usa questa cartella e "phone" va a tutte le altre lingue della scheda
                                          (le altre lingue con una propria phone-<xx> usano quella)
  store/grafiche/icon-512.png          -> icona 512x512, lingua predefinita
  store/grafiche/feature-graphic-1024x500.png -> grafica in primo piano, lingua predefinita

--dry-run non contatta Play: controlla i file e stampa cosa verrebbe caricato.
"""
import argparse
import io
import json
import os
import pathlib
import sys

from google.auth.transport.requests import AuthorizedSession
from google.oauth2 import service_account
from PIL import Image

API = 'https://androidpublisher.googleapis.com/androidpublisher/v3/applications'
UPLOAD = 'https://androidpublisher.googleapis.com/upload/androidpublisher/v3/applications'
LIMITI = {'title': 30, 'shortDescription': 80, 'fullDescription': 4000}
SCREENSHOT_MIN, SCREENSHOT_MAX = 2, 8


def leggi(cartella: pathlib.Path) -> dict:
    scheda = {
        'language': cartella.name,
        'title': (cartella / 'title.txt').read_text(encoding='utf-8').strip(),
        'shortDescription': (cartella / 'short_description.txt').read_text(encoding='utf-8').strip(),
        'fullDescription': (cartella / 'full_description.txt').read_text(encoding='utf-8').strip(),
    }
    for campo, limite in LIMITI.items():
        if len(scheda[campo]) > limite:
            sys.exit(f'{cartella.name}: {campo} supera {limite} caratteri ({len(scheda[campo])})')
        if 'TODO:' in scheda[campo] or 'APP_DISPLAY_NAME' in scheda[campo]:
            sys.exit(f'{cartella.name}: {campo} contiene ancora un segnaposto del template')
    return scheda


def raccogli_immagini(lingua_predefinita: str, lingue_scheda: list[str]) -> list[tuple[str, str, list[pathlib.Path]]]:
    """Elenco (lingua, tipo immagine Play, file ordinati) di ciò che c'è nel repo, per la lingua predefinita letta da Play."""
    store = pathlib.Path('store')

    def png(cartella: str) -> list[pathlib.Path]:
        return sorted((store / cartella).glob('*.png'))

    def propri(lingua: str) -> list[pathlib.Path]:
        return png(f"screenshots/phone-{lingua.split('-')[0]}")

    gruppi = []
    predefinita = propri(lingua_predefinita) or png('screenshots/phone')
    gruppi.append((lingua_predefinita, 'phoneScreenshots', predefinita))
    if propri(lingua_predefinita):
        # la lingua predefinita ha screenshot localizzati: le altre lingue non devono ereditarli
        for lingua in lingue_scheda:
            if lingua != lingua_predefinita:
                gruppi.append((lingua, 'phoneScreenshots', propri(lingua) or png('screenshots/phone')))
    gruppi.append((lingua_predefinita, 'icon', sorted((store / 'grafiche').glob('icon-512.png'))))
    gruppi.append((lingua_predefinita, 'featureGraphic', sorted((store / 'grafiche').glob('feature-graphic-1024x500.png'))))
    gruppi = [g for g in gruppi if g[2]]
    for lingua, tipo, file in gruppi:
        if tipo == 'phoneScreenshots' and not SCREENSHOT_MIN <= len(file) <= SCREENSHOT_MAX:
            sys.exit(f'{lingua}: servono da {SCREENSHOT_MIN} a {SCREENSHOT_MAX} screenshot, ce ne sono {len(file)}')
    return gruppi


def prepara(file: pathlib.Path, tipo: str) -> bytes:
    """Play vuole PNG/JPEG a 24 bit senza trasparenza (l'icona può averla): appiattisco in memoria, il file nel repo non cambia."""
    immagine = Image.open(file)
    attese = {'icon': (512, 512), 'featureGraphic': (1024, 500)}.get(tipo)
    if attese and immagine.size != attese:
        sys.exit(f'{file}: dimensioni {immagine.size}, attese {attese}')
    if tipo == 'phoneScreenshots':
        lato_corto, lato_lungo = sorted(immagine.size)
        if lato_corto < 320 or lato_lungo > 3840:
            sys.exit(f'{file}: dimensioni {immagine.size} fuori dai limiti Play (320-3840 px)')
    if immagine.format != 'PNG':
        sys.exit(f'{file}: non è un PNG')
    if tipo != 'icon' and (immagine.mode in ('RGBA', 'LA', 'P') or 'transparency' in immagine.info):
        sfondo = Image.new('RGB', immagine.size, (255, 255, 255))
        sfondo.paste(immagine.convert('RGBA'), mask=immagine.convert('RGBA').getchannel('A'))
        immagine = sfondo
    dati = io.BytesIO()
    immagine.save(dati, format='PNG')
    return dati.getvalue()


def controlla(risposta, azione: str) -> dict:
    if not risposta.ok:
        sys.exit(f'{azione} non riuscito ({risposta.status_code}): {risposta.text}')
    return risposta.json() if risposta.content else {}


def carica_immagini(sessione, base: str, package: str, edit: str, gruppi) -> int:
    totale = 0
    # Prima verifico tutti i file, poi tocco Play: un file sbagliato non lascia caricamenti a metà.
    pronte = [(lingua, tipo, [(f, prepara(f, tipo)) for f in file]) for lingua, tipo, file in gruppi]
    for lingua, tipo, file in pronte:
        url = f'{base}/{edit}/listings/{lingua}/{tipo}'
        controlla(sessione.delete(url), f'Rimozione {tipo} {lingua}')
        for percorso, dati in file:
            url_upload = f'{UPLOAD}/{package}/edits/{edit}/listings/{lingua}/{tipo}'
            controlla(
                sessione.post(url_upload, params={'uploadType': 'media'}, data=dati, headers={'Content-Type': 'image/png'}),
                f'Caricamento {percorso}',
            )
            print(f'✓ {lingua} {tipo}: {percorso}')
            totale += 1
    return totale


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('package')
    gruppo = parser.add_mutually_exclusive_group()
    gruppo.add_argument('--solo-testi', action='store_true')
    gruppo.add_argument('--solo-immagini', action='store_true')
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--lingua-predefinita', default='it-IT', help='solo per --dry-run: su Play si legge dall\'app')
    args = parser.parse_args()

    testi = not args.solo_immagini
    immagini = not args.solo_testi
    cartelle = [d for d in sorted(pathlib.Path('store/listings').iterdir()) if d.is_dir()]
    schede = [leggi(d) for d in cartelle] if testi else []
    lingue_scheda = [d.name for d in cartelle]

    if args.dry_run:
        for scheda in schede:
            print(f"testi {scheda['language']}: {scheda['title']}")
        if immagini:
            for lingua, tipo, file in raccogli_immagini(args.lingua_predefinita, lingue_scheda):
                for f in file:
                    prepara(f, tipo)
                    print(f'immagine {lingua} {tipo}: {f}')
        print(f'Controllo riuscito (dry-run, lingua predefinita {args.lingua_predefinita}, nulla caricato)')
        return

    credenziali = service_account.Credentials.from_service_account_info(
        json.loads(os.environ['GOOGLE_PLAY_SERVICE_ACCOUNT_JSON']),
        scopes=['https://www.googleapis.com/auth/androidpublisher'],
    )
    sessione = AuthorizedSession(credenziali)
    base = f'{API}/{args.package}/edits'

    edit = controlla(sessione.post(base), 'Apertura modifica')['id']
    for scheda in schede:
        url = f"{base}/{edit}/listings/{scheda['language']}"
        controlla(sessione.put(url, json=scheda), f"Scheda {scheda['language']}")
        print(f"✓ {scheda['language']}: {scheda['title']}")
    caricate = 0
    if immagini:
        lingua_predefinita = controlla(sessione.get(f'{base}/{edit}/details'), 'Lettura lingua predefinita').get('defaultLanguage')
        if not lingua_predefinita:
            sys.exit('Play non indica la lingua predefinita dell\'app')
        print(f'Lingua predefinita su Play: {lingua_predefinita}')
        caricate = carica_immagini(sessione, base, args.package, edit, raccogli_immagini(lingua_predefinita, lingue_scheda))
    controlla(sessione.post(f'{base}/{edit}:commit'), 'Salvataggio')
    print(f'Schede aggiornate: {len(schede)}, immagini caricate: {caricate}')


if __name__ == '__main__':
    main()
