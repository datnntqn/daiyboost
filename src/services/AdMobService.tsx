import React from 'react';
import {
  InterstitialAd,
  AdEventType,
  BannerAd,
  BannerAdSize,
} from 'react-native-admob-next';
import AdMobConfig from '../constants/adMobConfig';

type InterstitialAdInstance = ReturnType<typeof InterstitialAd.createForAdRequest>;

class AdMobService {
  private quoteViewCount: number = 0;
  private interstitialAd: InterstitialAdInstance | null = null;

  constructor() {
    this.initializeInterstitialAd();
  }

  private initializeInterstitialAd() {
    this.interstitialAd = InterstitialAd.createForAdRequest(AdMobConfig.interstitial, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['motivation', 'quotes', 'inspiration'],
    });

    this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      console.log('Interstitial ad loaded');
    });

    this.interstitialAd.addAdEventListener(AdEventType.ERROR, () => {
      console.error('Interstitial ad error occurred');
    });

    this.loadInterstitialAd();
  }

  private loadInterstitialAd() {
    if (this.interstitialAd) {
      this.interstitialAd.load();
    }
  }

  public async onQuoteView() {
    this.quoteViewCount++;
    
    const threshold = Math.floor(Math.random() * 4) + 5;
    
    if (this.quoteViewCount >= threshold) {
      this.quoteViewCount = 0;
      await this.showInterstitialAd();
    }
  }

  public async onFavoritesNavigate() {
    await this.showInterstitialAd();
  }

  private async showInterstitialAd() {
    try {
      if (this.interstitialAd) {
        const isLoaded = await this.interstitialAd.isLoaded();
        if (isLoaded) {
          await this.interstitialAd.show();
          this.loadInterstitialAd();
        }
      }
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
    }
  }

  public static BannerAdComponent(): React.ReactElement {
    return React.createElement(BannerAd, {
      size: BannerAdSize.BANNER,
      unitId: AdMobConfig.banner,
      requestOptions: {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['motivation', 'quotes', 'inspiration'],
      }
    });
  }
}

export const adMobService = new AdMobService(); 