import { TestIds } from 'react-native-google-mobile-ads';

interface AdMobIds {
  appId: string;
  banner: string;
  interstitial: string;
  rewarded: string;
  native: string;
}

const TEST_ADS: AdMobIds = {
  appId: 'ca-app-pub-3940256099942544~1458002511',
  banner: TestIds.BANNER,
  interstitial: TestIds.INTERSTITIAL,
  rewarded: TestIds.REWARDED,
  native: TestIds.NATIVE,
};

const PRODUCTION_ADS: AdMobIds = {
  appId: 'ca-app-pub-2173647302965810~3517193664',
  banner: 'ca-app-pub-2173647302965810/9048721944',
  interstitial: 'ca-app-pub-2173647302965810/9038233213',
  rewarded: 'ca-app-pub-2173647302965810/2148271672',
  native: 'ca-app-pub-2173647302965810/9397325862',
};

// Use TEST_ADS for development and PRODUCTION_ADS for production
const AdMobConfig = __DEV__ ? TEST_ADS : PRODUCTION_ADS;

export default AdMobConfig; 