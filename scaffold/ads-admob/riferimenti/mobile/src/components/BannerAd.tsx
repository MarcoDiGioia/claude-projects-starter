import React from 'react';
import { BannerAd as GoogleBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { ADS_CONFIG } from '@shared/utils/constants';
import { adsService } from '../services/AdsService';

interface Props {
  size?: BannerAdSize;
}

export default function BannerAd({ size = BannerAdSize.BANNER }: Props) {
  // Niente richieste di annunci finché l'utente non ha completato il consenso GDPR.
  if (!adsService.canRequestAds()) {
    return null;
  }

  return (
    <GoogleBannerAd
      unitId={ADS_CONFIG.BANNER_ID}
      size={size}
      requestOptions={{ requestNonPersonalizedAdsOnly: true }}
    />
  );
}
