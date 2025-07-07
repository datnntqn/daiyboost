import { Platform } from 'react-native';

/**
 * Check if a font is available on the device
 * This is useful for debugging font loading issues
 */
export const checkFontAvailability = (fontFamily: string): boolean => {
  // This function is just for documentation purposes
  // React Native doesn't provide a direct API to check font availability
  console.log(`Font check requested for: ${fontFamily}`);
  return true;
};

/**
 * Get the appropriate font family name based on the platform
 * This handles any platform-specific font naming differences
 */
export const getFontFamily = (fontFamily: string): string => {
  // Some platforms may need font name adjustments
  if (Platform.OS === 'ios') {
    return fontFamily;
  } else if (Platform.OS === 'android') {
    // Android might need different handling in some cases
    return fontFamily;
  }
  return fontFamily;
};

export default {
  checkFontAvailability,
  getFontFamily,
}; 