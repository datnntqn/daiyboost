import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { styles } from './styles/SettingsScreen.styles';

const SettingsScreen: React.FC = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#E9FDF2' : '#181818' }]}>
      <Text style={[styles.title, { color: theme === 'light' ? '#333333' : '#FFFFFF' }]}>Settings</Text>

      <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Category')}>
        <Text style={styles.settingText}>Categories</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('NotificationSettings')}>
        <Text style={styles.settingText}>Notifications</Text>
      </TouchableOpacity>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Theme</Text>
        <View style={styles.themeToggleContainer}>
          <TouchableOpacity
            style={[styles.themeOption, theme === 'light' && styles.themeOptionSelected]}
            onPress={() => toggleTheme()}
          >
            <Text style={[styles.themeOptionText, theme === 'light' && styles.themeOptionTextSelected]}>Light</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themeOption, theme === 'dark' && styles.themeOptionSelected]}
            onPress={() => toggleTheme()}
          >
            <Text style={[styles.themeOptionText, theme === 'dark' && styles.themeOptionTextSelected]}>Dark</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: theme === 'light' ? '#828282' : '#F2F2F2' }]}>Premium Features</Text>

      <TouchableOpacity style={styles.settingItem} onPress={() => console.log('Go Ad-Free pressed')}>
        <Text style={styles.settingText}>Go Ad-Free</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={() => console.log('Unlock All Features pressed')}>
        <Text style={styles.settingText}>Unlock All Features</Text>
      </TouchableOpacity>

      {/* Ad Space Placeholder */}
      <View style={styles.adSpace}>
        <Text style={styles.adText}>Ad</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;


