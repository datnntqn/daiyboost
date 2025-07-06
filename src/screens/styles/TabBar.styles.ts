import { StyleSheet, Platform, Dimensions } from 'react-native';
import { lightColors, darkColors } from '../../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_WIDTH = SCREEN_WIDTH - 40; // 20px padding on each side
const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 70 : 65;
const BOTTOM_INSET = Platform.OS === 'ios' ? 24 : 16;

export const createTabBarStyles = (isDarkMode: boolean) => {
  const colors = isDarkMode ? darkColors : lightColors;

  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: BOTTOM_INSET,
      left: 20,
      right: 20,
      height: TAB_BAR_HEIGHT,
      width: TAB_BAR_WIDTH,
      alignSelf: 'center',
      borderRadius: 24,
      overflow: 'hidden', // Important for the blur effect
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isDarkMode ? 0.3 : 0.1,
          shadowRadius: 12,
        },
        android: {
          elevation: 8,
          backgroundColor: isDarkMode 
            ? 'rgba(26, 26, 26, 0.85)' 
            : 'rgba(255, 255, 255, 0.85)',
        },
      }),
    },
    blurView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingTop: Platform.OS === 'ios' ? 12 : 8,
      paddingBottom: Platform.OS === 'ios' ? 12 : 8,
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabBarLabel: {
      fontSize: 12,
      fontWeight: '500',
      marginTop: 4,
      color: colors.text,
    },
    tabBarIcon: {
      width: 24,
      height: 24,
      tintColor: colors.text,
    },
    activeTabBarLabel: {
      color: colors.primary,
    },
    activeTabBarIcon: {
      tintColor: colors.primary,
    },
  });
}; 