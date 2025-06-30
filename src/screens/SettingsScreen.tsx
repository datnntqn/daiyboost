import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  settingText: {
    fontSize: 18,
    color: '#333333',
  },
  themeToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 3,
  },
  themeOption: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  themeOptionSelected: {
    backgroundColor: '#5DADE2',
  },
  themeOptionText: {
    color: '#333333',
    fontSize: 16,
  },
  themeOptionTextSelected: {
    color: '#FFFFFF',
  },
  adSpace: {
    marginTop: 'auto',
    backgroundColor: '#CCCCCC',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  adText: {
    color: '#666666',
    fontSize: 16,
  },
});

export default SettingsScreen;


