import { StyleSheet, Platform } from 'react-native';
import { lightColors, darkColors } from '../../theme/colors';

export const createStyles = (isDarkMode: boolean) => {
  const colors = isDarkMode ? darkColors : lightColors;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
      paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    header: {
      marginBottom: 30,
    },
    appTitle: {
      fontSize: 16,
      color: '#5DADE2',
      textAlign: 'left',
      marginBottom: 5,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#2C3E50',
      textAlign: 'left',
      marginBottom: 30,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 15,
      paddingHorizontal: 15,
      paddingVertical: 12,
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
    searchIcon: {
      fontSize: 16,
      marginRight: 10,
    },
    searchBar: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      padding: 0,
    },
    listContainer: {
      paddingHorizontal: 20,
      paddingBottom: Platform.OS === 'ios' ? 120 : 100,
    },
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
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
    categoryIcon: {
      fontSize: 24,
      marginRight: 15,
      width: 30,
      textAlign: 'center',
    },
    categoryText: {
      fontSize: 18,
      color: colors.text,
      fontWeight: '500',
      flex: 1,
    },
    adBanner: {
      backgroundColor: isDarkMode ? colors.cardBackground : '#E8F4FD',
      marginHorizontal: 20,
      marginBottom: Platform.OS === 'ios' ? 100 : 80,
      padding: 15,
      borderRadius: 15,
      alignItems: 'center',
    },
    adText: {
      color: colors.textSecondary,
      fontSize: 16,
    },
  });
};


