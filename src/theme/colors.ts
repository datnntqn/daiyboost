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
  backgroundSecondary: '#F8FAFC',
  text: '#1E293B',
  textSecondary: '#64748B',
  primary: '#0EA5E9',
  border: '#E2E8F0',
  switchTrackActive: '#93C5FD',
  switchTrackInactive: '#E2E8F0',
  switchThumbActive: '#3B82F6',
  switchThumbInactive: '#FFFFFF',
  cardBackground: '#FFFFFF',
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
};

export const darkColors = {
  background: '#1E293B',
  backgroundSecondary: '#0F172A',
  text: '#F8FAFC',
  textSecondary: '#CBD5E1',
  primary: '#38BDF8',
  border: '#334155',
  switchTrackActive: '#60A5FA',
  switchTrackInactive: '#334155',
  switchThumbActive: '#38BDF8',
  switchThumbInactive: '#94A3B8',
  cardBackground: '#334155',
  modalOverlay: 'rgba(0, 0, 0, 0.7)',
}; 