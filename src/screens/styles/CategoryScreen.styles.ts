import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { getThemeColors } from '../../theme/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT, getShadowStyle as shadowStyle, getCommonStyles } from '../../theme/styleUtils';

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
    quoteCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      ...shadowStyle(isDarkMode),
    },
    quoteText: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 12,
    },
    favoriteButton: {
      alignSelf: 'flex-end' as const,
    },
    favoriteIcon: {
      fontSize: 24,
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
  };

  return StyleSheet.create(styles);
};



