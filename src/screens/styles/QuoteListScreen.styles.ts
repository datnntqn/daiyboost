import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../theme/colors';

export const createStyles = (isDarkMode: boolean) => {
  const colors = isDarkMode ? darkColors : lightColors;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
      paddingTop: 60,
    },
    header: {
      paddingHorizontal: 20,
      marginBottom: 30,
    },
    appTitle: {
      fontSize: 16,
      color: colors.primary,
      marginBottom: 5,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
    },
    listContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    quoteItem: {
      backgroundColor: colors.background,
      padding: 20,
      borderRadius: 15,
      marginBottom: 15,
      shadowColor: colors.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: isDarkMode ? 0.2 : 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    quoteText: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
      marginBottom: 15,
    },
    favoriteButton: {
      alignSelf: 'flex-end',
    },
    favoriteIcon: {
      fontSize: 20,
    },
    favoriteIconActive: {
      opacity: 1,
    },
  });
};


