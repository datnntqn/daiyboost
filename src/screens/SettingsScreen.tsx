import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { styles } from './styles/SettingsScreen.styles';
import { RootStackParamList } from '../types/navigation';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

type SettingsScreenProps = {
  navigation: SettingsScreenNavigationProp;
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <TouchableOpacity 
        style={styles.settingItem} 
        onPress={() => navigation.navigate('CategoriesStack')}
      >
        <View style={styles.settingContent}>
          <Text style={styles.settingIcon}>🔲</Text>
          <Text style={styles.settingText}>Categories</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.settingItem} 
        onPress={() => navigation.navigate('NotificationSettings')}
      >
        <View style={styles.settingContent}>
          <Text style={styles.settingIcon}>🔔</Text>
          <Text style={styles.settingText}>Notifications</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <View style={styles.settingItem}>
        <View style={styles.settingContent}>
          <Text style={styles.settingIcon}>☀️</Text>
          <Text style={styles.settingText}>Theme</Text>
        </View>
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={styles.themeToggleText}>{theme === 'light' ? '🌞' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Premium Features</Text>

      <TouchableOpacity 
        style={styles.settingItem} 
        onPress={() => console.log('Go Ad-Free pressed')}
      >
        <View style={styles.settingContent}>
          <Text style={styles.settingIcon}>⭐</Text>
          <Text style={styles.settingText}>Go Ad-Free</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.settingItem} 
        onPress={() => console.log('Unlock All Features pressed')}
      >
        <View style={styles.settingContent}>
          <Text style={styles.settingIcon}>🔓</Text>
          <Text style={styles.settingText}>Unlock All Features</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      {/* Ad Space Placeholder */}
      <View style={styles.adSpace}>
        <Text style={styles.adText}>Ad</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;


