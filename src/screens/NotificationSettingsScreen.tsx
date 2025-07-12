import React, { useEffect, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Platform, SafeAreaView, ScrollView, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import NotificationService, { NotificationSettings } from '../services/NotificationService';
import { createStyles } from './styles/NotificationSettings.styles';
import { useTheme } from '../context/ThemeContext';
import { lightColors, darkColors } from '../theme/colors';

const NotificationSettingsScreen = () => {
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);
  const colors = isDarkMode ? darkColors : lightColors;
  const [settings, setSettings] = useState<NotificationSettings>({
    isEnabled: false,
    preferredTime: '09:00',
    sound: true,
    vibration: true,
  });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempTime, setTempTime] = useState(new Date());

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedSettings = await NotificationService.getSettings();
    setSettings(savedSettings);
    // Set initial tempTime
    const [hours, minutes] = savedSettings.preferredTime.split(':');
    const initialTime = new Date();
    initialTime.setHours(parseInt(hours, 10));
    initialTime.setMinutes(parseInt(minutes, 10));
    setTempTime(initialTime);
  };

  const handleSettingChange = async (key: keyof NotificationSettings, value: boolean | string) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await NotificationService.saveSettings(newSettings);
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempTime(selectedDate);
    }
  };

  const handleTimePickerDone = () => {
    const hours = tempTime.getHours().toString().padStart(2, '0');
    const minutes = tempTime.getMinutes().toString().padStart(2, '0');
    handleSettingChange('preferredTime', `${hours}:${minutes}`);
    setShowTimePicker(false);
  };

  const handleTimePickerCancel = () => {
    // Reset tempTime to current setting
    const [hours, minutes] = settings.preferredTime.split(':');
    const currentTime = new Date();
    currentTime.setHours(parseInt(hours, 10));
    currentTime.setMinutes(parseInt(minutes, 10));
    setTempTime(currentTime);
    setShowTimePicker(false);
  };

  const renderTimePicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showTimePicker}
          onRequestClose={handleTimePickerCancel}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={handleTimePickerCancel}>
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Choose Time</Text>
                <TouchableOpacity onPress={handleTimePickerDone}>
                  <Text style={styles.modalDoneText}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempTime}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={handleTimeChange}
                style={styles.dateTimePicker}
                textColor={colors.text}
              />
            </View>
          </View>
        </Modal>
      );
    }

    // For Android, show the native picker
    return showTimePicker && (
      <DateTimePicker
        value={tempTime}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={(event, date) => {
          setShowTimePicker(false);
          if (date && event.type !== 'dismissed') {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            handleSettingChange('preferredTime', `${hours}:${minutes}`);
          }
        }}
        textColor={colors.text}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false}>
        <View style={styles.content}>
          <View style={styles.section}>
            <View>
              <Text style={styles.sectionTitle}>Daily Reminder</Text>
              <Text style={styles.sectionDescription}>Get daily inspirational quotes</Text>
            </View>
            <Switch
              value={settings.isEnabled}
              onValueChange={(value) => handleSettingChange('isEnabled', value)}
              trackColor={{ false: isDarkMode ? darkColors.switchTrackInactive : lightColors.switchTrackInactive, 
                          true: isDarkMode ? darkColors.switchTrackActive : lightColors.switchTrackActive }}
              thumbColor={settings.isEnabled ? 
                (isDarkMode ? darkColors.switchThumbActive : lightColors.switchThumbActive) : 
                (isDarkMode ? darkColors.switchThumbInactive : lightColors.switchThumbInactive)}
              style={styles.switch}
            />
          </View>

          <View style={styles.timeSection}>
            <TouchableOpacity 
              style={styles.timeHeader} 
              onPress={() => setShowTimePicker(true)}
              disabled={!settings.isEnabled}
            >
              <View>
                <Text style={[styles.sectionTitle, !settings.isEnabled && styles.disabledText]}>
                  Preferred Time
                </Text>
                <Text style={[styles.sectionDescription, !settings.isEnabled && styles.disabledText]}>
                  When would you like to receive quotes?
                </Text>
              </View>
              <Text style={[styles.timeText, !settings.isEnabled && styles.disabledText]}>
                {settings.preferredTime}
              </Text>
            </TouchableOpacity>
          </View>

          {renderTimePicker()}

          <View style={styles.section}>
            <View>
              <Text style={[styles.sectionTitle, !settings.isEnabled && styles.disabledText]}>
                Sound
              </Text>
              <Text style={[styles.sectionDescription, !settings.isEnabled && styles.disabledText]}>
                Play sound with notifications
              </Text>
            </View>
            <Switch
              value={settings.sound}
              onValueChange={(value) => handleSettingChange('sound', value)}
              trackColor={{ false: isDarkMode ? darkColors.switchTrackInactive : lightColors.switchTrackInactive, 
                          true: isDarkMode ? darkColors.switchTrackActive : lightColors.switchTrackActive }}
              thumbColor={settings.sound ? 
                (isDarkMode ? darkColors.switchThumbActive : lightColors.switchThumbActive) : 
                (isDarkMode ? darkColors.switchThumbInactive : lightColors.switchThumbInactive)}
              style={styles.switch}
              disabled={!settings.isEnabled}
            />
          </View>

          <View style={styles.section}>
            <View>
              <Text style={[styles.sectionTitle, !settings.isEnabled && styles.disabledText]}>
                Vibration
              </Text>
              <Text style={[styles.sectionDescription, !settings.isEnabled && styles.disabledText]}>
                Vibrate with notifications
              </Text>
            </View>
            <Switch
              value={settings.vibration}
              onValueChange={(value) => handleSettingChange('vibration', value)}
              trackColor={{ false: isDarkMode ? darkColors.switchTrackInactive : lightColors.switchTrackInactive, 
                          true: isDarkMode ? darkColors.switchTrackActive : lightColors.switchTrackActive }}
              thumbColor={settings.vibration ? 
                (isDarkMode ? darkColors.switchThumbActive : lightColors.switchThumbActive) : 
                (isDarkMode ? darkColors.switchThumbInactive : lightColors.switchThumbInactive)}
              style={styles.switch}
              disabled={!settings.isEnabled}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationSettingsScreen;


