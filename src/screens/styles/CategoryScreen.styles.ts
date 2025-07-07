import { StyleSheet, ViewStyle, TextStyle, ImageStyle, Platform } from 'react-native';
import { getThemeColors } from '../../theme/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT, getCommonStyles } from '../../theme/styleUtils';

type Style = ViewStyle | TextStyle | ImageStyle;
type Styles = Record<string, Style>;

export const createStyles = (isDarkMode: boolean) => {
  const colors = getThemeColors(isDarkMode);
  const commonStyles = getCommonStyles(isDarkMode);

  const styles: Styles = {
    ...commonStyles,
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
    header: {
      paddingHorizontal: 16,
      paddingTop: Platform.OS === 'ios' ? 8 : 16,
      paddingBottom: 16,
      flexDirection: 'column' as const,
      gap: 8,
    },
    backButton: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      alignSelf: 'flex-start' as const,
    },
    backButtonText: {
      fontSize: 20,
      color: colors.text,
      marginRight: 4,
    },
    backText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: colors.subText,
      marginBottom: 8,
    },
    listContainer: {
      padding: 16,
    },
    quoteCard: {
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.95)',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      ...Platform.select({
        ios: {
          shadowColor: isDarkMode ? '#000' : '#2c2c2c',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isDarkMode ? 0.3 : 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    quoteText: {
      fontSize: 17,
      lineHeight: 24,
      color: colors.text,
      marginBottom: 16,
      fontWeight: '400',
    },
    actionBar: {
      flexDirection: 'row' as const,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    },
    actionButton: {
      flexDirection: 'row' as const,
      alignItems: 'center',
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
      padding: 8,
      borderRadius: 20,
      minWidth: 36,
      justifyContent: 'center',
    },
    actionButtonText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 4,
    },
    actionIcon: {
      fontSize: 20,
    },
    actionButtonIcon: {
      width: 20,
      height: 20,
      tintColor: isDarkMode ? colors.text : colors.text,
    },
    leftActions: {
      flexDirection: 'row' as const,
      gap: 12,
    },
    rightActions: {
      flexDirection: 'row' as const,
      gap: 12,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      padding: 20,
    },
    emptyText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
      textAlign: 'center' as const,
    },
    emptySubText: {
      fontSize: 16,
      color: colors.subText,
      textAlign: 'center' as const,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)',
    },
    errorText: {
      fontSize: 18,
      color: colors.text,
      marginBottom: 16,
      textAlign: 'center',
    },
  };

  return StyleSheet.create(styles);
};



