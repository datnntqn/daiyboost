import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../theme/colors';

export const createStyles = (isDarkMode: boolean) => {
  const colors = isDarkMode ? darkColors : lightColors;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
      paddingHorizontal: 20,
      paddingTop: 60,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 40,
    },
    backButton: {
      marginRight: 20,
      padding: 5,
    },
    backIcon: {
      fontSize: 20,
      color: colors.text,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      flex: 1,
    },
    sectionTitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 30,
      marginBottom: 15,
      marginLeft: 5,
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.cardBackground,
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderRadius: 15,
      marginBottom: 15,
      shadowColor: colors.text,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: isDarkMode ? 0.2 : 0.05,
      shadowRadius: 2,
      elevation: 2,
      borderWidth: 1,
      borderColor: colors.border,
    },
    settingContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingIcon: {
      fontSize: 18,
      marginRight: 15,
      width: 25,
      textAlign: 'center',
    },
    settingText: {
      fontSize: 18,
      color: colors.text,
      fontWeight: '500',
      flex: 1,
    },
    chevron: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    themeToggleContainer: {
      flexDirection: 'row',
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 20,
      padding: 3,
    },
    themeOption: {
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 17,
      minWidth: 60,
      alignItems: 'center',
    },
    themeOptionSelected: {
      backgroundColor: colors.primary,
    },
    themeOptionText: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: '500',
    },
    themeOptionTextSelected: {
      color: colors.background,
    },
    adSpace: {
      marginTop: 40,
      backgroundColor: isDarkMode ? colors.cardBackground : '#E8F4FD',
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
    },
    adText: {
      color: colors.textSecondary,
      fontSize: 16,
    },
    themeToggleText: {
      fontSize: 24,
    },
  });
};


