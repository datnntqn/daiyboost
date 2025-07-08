import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDarkMode ? 
        'rgba(0, 0, 0, 0.95)' : 
        'rgba(242, 242, 247, 0.95)',
    },
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? 
        'rgba(0, 0, 0, 0.95)' : 
        'rgba(242, 242, 247, 0.95)',
      paddingBottom: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: 'transparent',
      marginBottom: 16,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? 
        'rgba(255, 255, 255, 0.1)' : 
        'rgba(0, 0, 0, 0.05)',
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 10,
    },
    backButtonText: {
      fontSize: 20,
      color: isDarkMode ? colors.darkText : colors.lightText,
      marginRight: 4,
    },
    title: {
      fontSize: 32,
      fontWeight: Platform.OS === 'ios' ? '700' : '700',
      color: isDarkMode ? colors.darkText : colors.lightText,
      letterSpacing: 0.35,
    },
    section: {
      marginVertical: 16,
      width: width,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '600',
      marginBottom: 10,
      paddingHorizontal: 16,
      color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    sectionBackground: {
      backgroundColor: isDarkMode ? 
        'rgba(255, 255, 255, 0.08)' : 
        'rgba(255, 255, 255, 0.95)',
      borderRadius: 12,
      marginHorizontal: 16,
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowColor: isDarkMode ? '#FFF' : '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: isDarkMode ? 0.1 : 0.05,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
      }),
      borderWidth: 1,
      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? 
        'rgba(255, 255, 255, 0.1)' : 
        'rgba(0, 0, 0, 0.05)',
    },
    lastSettingItem: {
      borderBottomWidth: 0,
    },
    settingContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 8,
      tintColor: isDarkMode ? colors.darkText : colors.lightText,
    },
    chevronIcon: {
      width: 16,
      height: 16,
      tintColor: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
      marginLeft: 8,
    },
    settingText: {
      fontSize: 17,
      color: isDarkMode ? colors.darkText : colors.lightText,
      fontWeight: '400',
      flex: 1,
    },
    themeToggle: {
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 24,
    },
    premiumIcon: {
      tintColor: colors.gold,
    },
    premiumSection: {
      marginTop: 24,
    },
    adSpace: {
      marginTop: 'auto',
      marginHorizontal: 16,
      marginBottom: 16,
      height: 100,
      backgroundColor: isDarkMode ? 
        'rgba(255, 255, 255, 0.08)' : 
        'rgba(255, 255, 255, 0.95)',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      ...Platform.select({
        ios: {
          shadowColor: isDarkMode ? '#FFF' : '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: isDarkMode ? 0.1 : 0.05,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    adText: {
      color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
      fontSize: 15,
      fontWeight: '500',
    },
  });


