import { StyleSheet, Platform } from 'react-native';
import { lightColors, darkColors } from '../../theme/colors';

export const createTabBarStyles = (isDarkMode: boolean) => {
  const colors = isDarkMode ? darkColors : lightColors;

  return StyleSheet.create({
    tabBar: {
      position: 'absolute',
      left: 20,
      right: 20,
      bottom: Platform.OS === 'ios' ? 24 : 16,
      height: Platform.OS === 'ios' ? 80 : 70,
      paddingTop: Platform.OS === 'ios' ? 12 : 8,
      paddingBottom: Platform.OS === 'ios' ? 24 : 8,
      backgroundColor: colors.background,
      borderRadius: 24,
      shadowColor: colors.text,
      shadowOffset: { 
        width: 0, 
        height: 4 
      },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 12,
      elevation: 8,
      borderTopWidth: 0,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: colors.border,
    },
    tabBarLabel: {
      fontSize: 12,
      fontWeight: '500',
      marginBottom: Platform.OS === 'ios' ? 0 : 4,
    },
    tabBarIcon: {
      width: 24,
      height: 24,
      marginTop: 4,
    },
  });
}; 