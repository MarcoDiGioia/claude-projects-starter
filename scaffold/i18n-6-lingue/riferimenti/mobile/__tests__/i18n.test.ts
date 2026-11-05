import itDiz from '@shared/i18n/it';
import en from '@shared/i18n/en';
import es from '@shared/i18n/es';
import fr from '@shared/i18n/fr';
import de from '@shared/i18n/de';
import pt from '@shared/i18n/pt';
import { scegliLingua, setLingua, t } from '@shared/i18n';

const segnaposto = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort().join(',');

describe('traduzioni', () => {
  afterEach(() => setLingua('it'));

  it.each([['en', en], ['es', es], ['fr', fr], ['de', de], ['pt', pt]])('%s ha tutte le chiavi con gli stessi segnaposto', (_l, diz) => {
    for (const chiave of Object.keys(itDiz) as (keyof typeof itDiz)[]) {
      expect(diz[chiave]).toBeTruthy();
      expect(segnaposto(diz[chiave])).toBe(segnaposto(itDiz[chiave]));
    }
  });

  it('sceglie la lingua del telefono, inglese se non supportata', () => {
    expect(scegliLingua('de-AT')).toBe('de');
    expect(scegliLingua('ja-JP')).toBe('en');
  });

  it('sostituisce i segnaposto', () => {
    setLingua('en');
    expect(t('esempio.giorni', { n: 3 })).toBe('In 3 days');
  });
});
