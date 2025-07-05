import { StyleSheet, Dimensions } from 'react-native';

interface ThemeColors {
  background: string;
  cardBackground: string;
  cardBorder: string;
  badgeBackground: string;
  text: string;
  subText: string;
  removeButtonBackground: string;
  deleteActionBackground: string;
  deleteActionText: string;
  gradientOverlay: string[];
}

const getThemeColors = (isDarkMode: boolean): ThemeColors => ({
  background: isDarkMode ? '#1a1a1a' : '#ffffff',
  cardBackground: isDarkMode ? 'rgba(42, 42, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)',
  cardBorder: isDarkMode ? 'rgba(58, 58, 58, 0.5)' : 'rgba(229, 229, 229, 0.5)',
  badgeBackground: isDarkMode ? 'rgba(58, 58, 58, 0.9)' : 'rgba(245, 245, 245, 0.9)',
  text: isDarkMode ? '#FFFFFF' : '#333333',
  subText: isDarkMode ? '#AAAAAA' : '#666666',
  removeButtonBackground: isDarkMode ? '#3A3A3A' : '#FFE5E5',
  deleteActionBackground: isDarkMode ? '#FF4949' : '#FF6B6B',
  deleteActionText: '#FFFFFF',
  gradientOverlay: isDarkMode 
    ? ['rgba(26, 26, 26, 0.9)', 'rgba(26, 26, 26, 0.7)']
    : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']
});

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const createStyles = (isDarkMode: boolean) => {
  const colors = getThemeColors(isDarkMode);

  return StyleSheet.create({
    // Container Styles
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    backgroundImage: {
      position: 'absolute',
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      opacity: 0.8,
    },
    gradientOverlay: {
      position: 'absolute',
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      zIndex: 1,
    },
    contentContainer: {
      flex: 1,
      zIndex: 2,
    },
    listContainer: {
      padding: 16,
      paddingBottom: 32,
    },

    // Quote Card Styles
    quoteCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      ...getShadowStyle(isDarkMode),
    },
    quoteHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    quoteText: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
      fontWeight: '400',
    },

    // Category Badge Styles
    categoryBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.badgeBackground,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
    },
    categoryIcon: {
      fontSize: 16,
      marginRight: 6,
    },
    categoryText: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '500',
    },

    // Swipe Action Styles
    rightAction: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: colors.deleteActionBackground,
      width: 100,
      marginBottom: 16,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
    },
    deleteAction: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    actionText: {
      color: colors.deleteActionText,
      fontWeight: '600',
      fontSize: 16,
      backgroundColor: 'transparent',
    },

    // Remove Button Styles
    removeButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.removeButtonBackground,
      justifyContent: 'center',
      alignItems: 'center',
      ...getButtonShadowStyle(),
    },
    trashIcon: {
      fontSize: 18,
    },

    // Empty State Styles
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
      zIndex: 2,
    },
    emptyText: {
      fontSize: 20,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 12,
      textAlign: 'center',
    },
    emptySubText: {
      fontSize: 16,
      color: colors.subText,
      textAlign: 'center',
      lineHeight: 24,
      maxWidth: '80%',
    },
  });
};

// Shadow Utilities
const getShadowStyle = (isDarkMode: boolean) => ({
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: isDarkMode ? 0.5 : 0.1,
  shadowRadius: 4,
  elevation: isDarkMode ? 8 : 4,
});

const getButtonShadowStyle = () => ({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
}); 