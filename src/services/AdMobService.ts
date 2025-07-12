import {
  InterstitialAd,
  TestIds,
  AdEventType,
  MobileAds,
} from 'react-native-google-mobile-ads';
import AdMobConfig from '../constants/adMobConfig';

class AdMobService {
  private static instance: AdMobService;
  private interstitialAd: InterstitialAd | null = null;
  private isInterstitialAdLoading = false;

  // Production ad unit IDs
  private readonly INTERSTITIAL_AD_UNIT_ID = __DEV__ 
    ? TestIds.INTERSTITIAL
    : AdMobConfig.interstitial;

  private constructor() {}

  public static getInstance(): AdMobService {
    if (!AdMobService.instance) {
      AdMobService.instance = new AdMobService();
    }
    return AdMobService.instance;
  }

  public async initialize(): Promise<void> {
    try {
      await MobileAds().initialize();
      console.log('AdMob initialized successfully');
      this.loadInterstitialAd();
    } catch (error) {
      console.error('Failed to initialize AdMob:', error);
    }
  }

  private async loadInterstitialAd(): Promise<void> {
    if (this.isInterstitialAdLoading || this.interstitialAd) {
      return;
    }

    this.isInterstitialAdLoading = true;

    try {
      const interstitial = InterstitialAd.createForAdRequest(this.INTERSTITIAL_AD_UNIT_ID);

      // Add event handlers
      interstitial.addAdEventListener(AdEventType.LOADED, () => {
        this.interstitialAd = interstitial;
        this.isInterstitialAdLoading = false;
        console.log('Interstitial ad loaded successfully');
      });

      interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
        console.error('Interstitial ad failed to load:', error);
        this.interstitialAd = null;
        this.isInterstitialAdLoading = false;
      });

      interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('Interstitial ad closed');
        this.interstitialAd = null;
        this.loadInterstitialAd(); // Load the next ad
      });

      // Load the ad
      await interstitial.load();
    } catch (error) {
      console.error('Error loading interstitial ad:', error);
      this.interstitialAd = null;
      this.isInterstitialAdLoading = false;
    }
  }

  public async showInterstitialAd(): Promise<boolean> {
    try {
      if (!this.interstitialAd) {
        console.log('Interstitial ad not ready, loading new ad');
        await this.loadInterstitialAd();
        return false;
      }

      if (this.interstitialAd.loaded) {
        await this.interstitialAd.show();
        return true;
      } else {
        console.log('Interstitial ad not loaded yet');
        return false;
      }
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
      return false;
    }
  }
}

export default AdMobService; 