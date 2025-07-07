interface ThemeColors {
  background: string;
  cardBackground: string;
  cardBorder: string;
  text: string;
  subText: string;
  headerText: string;
  gradientOverlay: string[];
}

export const getThemeColors = (isDarkMode: boolean): ThemeColors => ({
  background: isDarkMode ? '#1a1a1a' : '#ffffff',
  cardBackground: isDarkMode ? 'rgba(42, 42, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)',
  cardBorder: isDarkMode ? 'rgba(58, 58, 58, 0.5)' : 'rgba(229, 229, 229, 0.5)',
  text: isDarkMode ? '#FFFFFF' : '#333333',
  subText: isDarkMode ? '#AAAAAA' : '#666666',
  headerText: isDarkMode ? '#FFFFFF' : '#333333',
  gradientOverlay: isDarkMode 
    ? ['rgba(26, 26, 26, 0.9)', 'rgba(26, 26, 26, 0.7)']
    : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']
});

export const lightColors = {
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  text: '#000000',
  textSecondary: '#666666',
  primary: '#007AFF',
  border: '#E5E5E5',
  switchTrackActive: '#34C759',
  switchTrackInactive: '#E9E9EA',
  switchThumbActive: '#FFFFFF',
  switchThumbInactive: '#FFFFFF',
  cardBackground: '#FFFFFF',
  modalOverlay: 'rgba(0, 0, 0, 0.4)',
  card: '#FFFFFF',
};

export const darkColors = {
  background: '#000000',
  backgroundSecondary: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#EBEBF5',
  primary: '#0A84FF',
  border: '#38383A',
  switchTrackActive: '#32D74B',
  switchTrackInactive: '#39393D',
  switchThumbActive: '#FFFFFF',
  switchThumbInactive: '#FFFFFF',
  cardBackground: '#1C1C1E',
  modalOverlay: 'rgba(0, 0, 0, 0.6)',
  card: '#1C1C1E',
};

export const colors = {
  // Light theme colors
  lightBackground: '#FFFFFF',
  lightText: '#000000',
  lightBorder: '#E5E5EA',
  lightSecondary: '#F2F2F7',

  // Dark theme colors
  darkBackground: '#000000',
  darkText: '#FFFFFF',
  darkBorder: '#38383A',
  darkSecondary: '#1C1C1E',

  // Common colors
  gold: '#FFD700',
}; 