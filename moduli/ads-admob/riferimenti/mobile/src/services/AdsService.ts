import mobileAds, {
  AdsConsent,
  AdsConsentPrivacyOptionsRequirementStatus,
  AdEventType,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import { ADS_CONFIG } from '@shared/utils/constants';

const CONSENT_TIMEOUT_MS = 10000;
const INTERSTITIAL_ATTESA_INIZIALE_MS = 2 * 60 * 1000;
const INTERSTITIAL_INTERVALLO_MIN_MS = 3 * 60 * 1000;

class AdsService {
  private static instance: AdsService;
  private interstitialAd: InterstitialAd | null = null;
  private azioniCount = 0;
  private adLoaded = false;
  private isInitialized = false;
  private adsAllowed = false;
  private privacyOptionsRequired = false;
  // Un annuncio a tutto schermo disturba: non subito dopo l'avvio (primo uso) e non più spesso di uno ogni pochi minuti.
  private readonly avviatoAlle = Date.now();
  private ultimoInterstitialAlle = 0;

  private constructor() {}

  static getInstance(): AdsService {
    if (!AdsService.instance) {
      AdsService.instance = new AdsService();
    }
    return AdsService.instance;
  }

  /**
   * Raccoglie il consenso GDPR (UMP) e solo dopo inizializza l'SDK AdMob.
   * Il form di consenso compare solo agli utenti nello Spazio Economico Europeo
   * e solo finché non hanno scelto. Se la rete manca o UMP non risponde entro
   * CONSENT_TIMEOUT_MS, l'app parte comunque senza annunci.
   */
  async init(): Promise<void> {
    if (this.isInitialized) return;
    this.isInitialized = true;

    try {
      const info = await Promise.race([
        AdsConsent.gatherConsent(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('consent timeout')), CONSENT_TIMEOUT_MS),
        ),
      ]);
      this.adsAllowed = info.canRequestAds;
      this.privacyOptionsRequired =
        info.privacyOptionsRequirementStatus ===
        AdsConsentPrivacyOptionsRequirementStatus.REQUIRED;
    } catch (error) {
      console.warn('Consent gathering failed:', error);
      // Consenso già dato in una sessione precedente: si può procedere lo stesso.
      try {
        const info = await AdsConsent.getConsentInfo();
        this.adsAllowed = info.canRequestAds;
      } catch {
        this.adsAllowed = false;
      }
    }

    if (!this.adsAllowed) return;

    try {
      await mobileAds().initialize();
      this.preloadInterstitial();
    } catch (error) {
      console.error('MobileAds initialization failed:', error);
      this.adsAllowed = false;
    }
  }

  /** true se l'utente ha completato il consenso e si possono richiedere annunci. */
  canRequestAds(): boolean {
    return this.adsAllowed;
  }

  /** true se nelle Impostazioni va mostrata la voce "Preferenze privacy annunci". */
  isPrivacyOptionsRequired(): boolean {
    return this.privacyOptionsRequired;
  }

  /** Riapre il form UMP per modificare il consenso. */
  async showPrivacyOptions(): Promise<void> {
    const info = await AdsConsent.showPrivacyOptionsForm();
    this.adsAllowed = info.canRequestAds;
  }

  private preloadInterstitial(): void {
    try {
      this.interstitialAd = InterstitialAd.createForAdRequest(ADS_CONFIG.INTERSTITIAL_ID, {
        requestNonPersonalizedAdsOnly: true,
      });
      this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => { this.adLoaded = true; });
      this.interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
        this.adLoaded = false;
        this.preloadInterstitial();
      });
      this.interstitialAd.addAdEventListener(AdEventType.ERROR, () => { this.adLoaded = false; });
      this.interstitialAd.load();
    } catch (error) {
      console.error('Error preloading interstitial:', error);
    }
  }

  registraAzione(): void {
    this.azioniCount++;
    if (this.azioniCount % 3 === 0) {
      this.mostraInterstitial();
    }
  }

  /** Mostra l'interstitial se è pronto e se il tetto di frequenza lo permette. */
  private mostraInterstitial(): void {
    const ora = Date.now();
    if (!this.adLoaded || !this.interstitialAd) return;
    if (ora - this.avviatoAlle < INTERSTITIAL_ATTESA_INIZIALE_MS) return;
    if (this.ultimoInterstitialAlle && ora - this.ultimoInterstitialAlle < INTERSTITIAL_INTERVALLO_MIN_MS) return;
    try {
      this.interstitialAd.show();
      this.ultimoInterstitialAlle = ora;
    } catch (error) {
      console.error('Error showing interstitial:', error);
    }
  }
}

export const adsService = AdsService.getInstance();
