import { Dimensions, ViewStyle, TextStyle, ImageStyle } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

type Style = ViewStyle | TextStyle | ImageStyle;
type Styles = Record<string, Style>;

// Shadow Utilities
export const getShadowStyle = (isDarkMode: boolean): ViewStyle => ({
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: isDarkMode ? 0.5 : 0.1,
  shadowRadius: 4,
  elevation: isDarkMode ? 8 : 4,
});

// Common style utilities
export const getCommonStyles = (isDarkMode: boolean): Styles => ({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center' as const,
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: isDarkMode ? '#ffffff' : '#000000',
    marginBottom: 20,
    textAlign: 'center' as const,
  },
  header: {
    padding: 16,
    marginTop: 44,
  },
  backButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: isDarkMode ? '#ffffff' : '#000000',
    marginRight: 8,
  },
  backText: {
    fontSize: 16,
    color: isDarkMode ? '#ffffff' : '#000000',
  },
  headerTitle: {
    fontSize: 24,
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
}); 