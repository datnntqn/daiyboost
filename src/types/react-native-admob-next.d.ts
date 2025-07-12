declare module 'react-native-admob-next' {
  export function initializeAdMob(config: { appId: string; delay?: number }): void;

  export const InterstitialAd: {
    createForAdRequest: (unitId: string, requestConfig?: any) => {
      load: () => void;
      show: () => Promise<void>;
      isLoaded: () => Promise<boolean>;
      addAdEventListener: (event: string, callback: () => void) => void;
      removeAllListeners: () => void;
    };
  };

  export const BannerAd: React.FC<{
    size: string;
    unitId: string;
    requestOptions?: {
      requestNonPersonalizedAdsOnly?: boolean;
      keywords?: string[];
    };
  }>;

  export const BannerAdSize: {
    BANNER: string;
    LARGE_BANNER: string;
    MEDIUM_RECTANGLE: string;
    FULL_BANNER: string;
    LEADERBOARD: string;
    SMART_BANNER: string;
  };

  export const AdEventType: {
    LOADED: string;
    ERROR: string;
    OPENED: string;
    CLICKED: string;
    LEFT_APPLICATION: string;
    CLOSED: string;
  };
} 