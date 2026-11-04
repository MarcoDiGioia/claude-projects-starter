// Traduzioni dell'app. La lingua è quella del telefono; se non è tra quelle
// supportate si usa l'inglese. Per aggiungere una frase: chiave in it.ts,
// poi la stessa chiave in tutte le altre lingue (TypeScript segnala quelle mancanti).
import it from './it';
import en from './en';
import es from './es';
import fr from './fr';
import de from './de';
import pt from './pt';

export type Chiave = keyof typeof it;
export type Dizionario = Record<Chiave, string>;
export type Lingua = 'it' | 'en' | 'es' | 'fr' | 'de' | 'pt';

const DIZIONARI: Record<Lingua, Dizionario> = { it, en, es, fr, de, pt };
const RISERVA: Lingua = 'en';

function linguaDelTelefono(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().locale;
  } catch {
    return RISERVA;
  }
}

export function scegliLingua(locale: string): Lingua {
  const codice = locale.slice(0, 2).toLowerCase();
  return codice in DIZIONARI ? (codice as Lingua) : RISERVA;
}

let lingua: Lingua = scegliLingua(linguaDelTelefono());

export function getLingua(): Lingua {
  return lingua;
}

/** Per i test, o per una futura scelta manuale nelle impostazioni. */
export function setLingua(nuova: Lingua): void {
  lingua = nuova;
}

/** Testo tradotto; i segnaposto {nome} vengono sostituiti con i valori passati. */
export function t(chiave: Chiave, valori?: Record<string, string | number>): string {
  const testo = DIZIONARI[lingua][chiave] ?? DIZIONARI.it[chiave];
  if (!valori) return testo;
  return testo.replace(/\{(\w+)\}/g, (match, nome: string) => (nome in valori ? String(valori[nome]) : match));
}

/** Liste separate da virgole nel dizionario (mesi, giorni). */
export function lista(chiave: Chiave): string[] {
  return t(chiave).split(',');
}
