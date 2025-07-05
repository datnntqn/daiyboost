import { StyleSheet } from 'react-native';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    },
    safeArea: {
      flex: 1,
    },
    header: {
      padding: 16,
      marginTop: 44,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: isDarkMode ? '#cccccc' : '#666666',
    },
    listContainer: {
      padding: 16,
    },
    categoryCard: {
      height: 160,
      borderRadius: 16,
      marginBottom: 16,
      overflow: 'hidden',
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    categoryBackground: {
      flex: 1,
      justifyContent: 'center',
    },
    gradientOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    categoryContent: {
      padding: 16,
      zIndex: 1,
    },
    categoryEmoji: {
      fontSize: 32,
      marginBottom: 8,
    },
    categoryTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 8,
    },
    categoryDescription: {
      fontSize: 14,
      color: isDarkMode ? '#cccccc' : '#666666',
    },
  }); 