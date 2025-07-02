import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles/NotificationSettingsScreen.styles';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { quotes } from '../data/quotes';

const NotificationSettingsScreen: React.FC = () => {
  const [dailyReminder, setDailyReminder] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [preferredTime, setPreferredTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  const requestNotificationPermissions = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.requestPermissions().then(
        (permissions) => {
          console.log('Permissions:', permissions);
        },
      );
    }
  };

  const scheduleDailyNotification = (time: Date) => {
    PushNotificationIOS.cancelAllLocalNotifications();

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    PushNotificationIOS.scheduleLocalNotification({
      alertBody: randomQuote.text,
      alertTitle: 'Daily Boost',
      fireDate: time.toISOString(),
      repeatInterval: 'day',
      userInfo: { id: 'daily_boost_quote', category: randomQuote.category },
      soundName: soundEnabled ? 'default' : undefined,
    });
    Alert.alert('Notification Set', `Daily reminder set for ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
  };

  const onTimeChange = (event: any, selectedDate?: Date) => {
    const currentTime = selectedDate || preferredTime;
    setShowTimePicker(Platform.OS === 'ios');
    setPreferredTime(currentTime);
    if (dailyReminder) {
      scheduleDailyNotification(currentTime);
    }
  };

  const handleDailyReminderToggle = (value: boolean) => {
    setDailyReminder(value);
    if (!value) {
      PushNotificationIOS.cancelAllLocalNotifications();
      Alert.alert('Reminders Off', 'Daily reminders have been turned off.');
    } else {
      scheduleDailyNotification(preferredTime);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification{'\n'}Settings</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Daily Reminder</Text>
        <Switch
          style={styles.switch}
          onValueChange={handleDailyReminderToggle}
          value={dailyReminder}
          trackColor={{ false: '#E0E0E0', true: '#A8C8EC' }}
          thumbColor={dailyReminder ? '#5DADE2' : '#FFFFFF'}
        />
      </View>

      <TouchableOpacity style={styles.settingItem} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.settingText}>Preferred Time</Text>
        <Text style={styles.settingValue}>
          {preferredTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={preferredTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Sound</Text>
        <Switch
          style={styles.switch}
          onValueChange={setSoundEnabled}
          value={soundEnabled}
          trackColor={{ false: '#E0E0E0', true: '#A8C8EC' }}
          thumbColor={soundEnabled ? '#5DADE2' : '#FFFFFF'}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Vibration</Text>
        <Switch
          style={styles.switch}
          onValueChange={setVibrationEnabled}
          value={vibrationEnabled}
          trackColor={{ false: '#E0E0E0', true: '#A8C8EC' }}
          thumbColor={vibrationEnabled ? '#5DADE2' : '#FFFFFF'}
        />
      </View>

      {/* Ad Space Placeholder */}
      <View style={styles.adSpace}>
        <Text style={styles.adText}>Ad</Text>
      </View>
    </View>
  );
};

export default NotificationSettingsScreen;


