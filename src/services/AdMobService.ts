import { MobileAds } from 'react-native-google-mobile-ads';
import AdMobConfig from '../constants/adMobConfig';

class AdMobService {
  private static instance: AdMobService;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): AdMobService {
    if (!AdMobService.instance) {
      AdMobService.instance = new AdMobService();
    }
    return AdMobService.instance;
  }

  public async initialize(): Promise<void> {
    try {
      if (!this.initialized) {
        await MobileAds().initialize();
        MobileAds().setRequestConfiguration({
          testDeviceIdentifiers: __DEV__ ? ['EMULATOR'] : []
        });
        this.initialized = true;
        console.log('AdMob initialized successfully with appId:', AdMobConfig.appId);
      }
    } catch (error) {
      console.error('Failed to initialize AdMob:', error);
      this.initialized = false;
    }
  }

  public isInitialized(): boolean {
    return this.initialized;
  }
}

export default AdMobService; 