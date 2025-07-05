import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const NOTIFICATION_SETTINGS_KEY = '@notification_settings';
const QUOTES_DATA_KEY = '@quotes_data';

export interface NotificationSettings {
  isEnabled: boolean;
  preferredTime: string;
  sound: boolean;
  vibration: boolean;
}

const defaultSettings: NotificationSettings = {
  isEnabled: false,
  preferredTime: '09:00',
  sound: true,
  vibration: true,
};

class NotificationService {
  constructor() {
    this.configure();
  }

  configure = () => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    // Configure channel for Android
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'daily-quotes',
          channelName: 'Daily Quotes',
          channelDescription: 'Daily inspirational quotes notifications',
          playSound: true,
          soundName: 'default',
          importance: 4,
          vibrate: true,
        },
        (created) => console.log(`Channel created: ${created}`)
      );
    }
  };

  getSettings = async (): Promise<NotificationSettings> => {
    try {
      const settings = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
      return settings ? JSON.parse(settings) : defaultSettings;
    } catch (error) {
      console.error('Error getting notification settings:', error);
      return defaultSettings;
    }
  };

  saveSettings = async (settings: NotificationSettings): Promise<void> => {
    try {
      await AsyncStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings));
      if (settings.isEnabled) {
        this.scheduleDailyNotification(settings);
      } else {
        this.cancelAllNotifications();
      }
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  getRandomQuote = async (): Promise<string> => {
    try {
      const quotesData = await AsyncStorage.getItem(QUOTES_DATA_KEY);
      const quotes = quotesData ? JSON.parse(quotesData) : [];
      if (quotes.length === 0) {
        return 'Be the change you wish to see in the world.';
      }
      return quotes[Math.floor(Math.random() * quotes.length)].text;
    } catch (error) {
      console.error('Error getting random quote:', error);
      return 'Be the change you wish to see in the world.';
    }
  };

  scheduleDailyNotification = async (settings: NotificationSettings) => {
    const [hours, minutes] = settings.preferredTime.split(':');
    const quote = await this.getRandomQuote();

    // Cancel existing notifications
    this.cancelAllNotifications();

    // Schedule new notification
    PushNotification.localNotificationSchedule({
      channelId: 'daily-quotes',
      title: 'Daily Quote',
      message: quote,
      date: this.getNextNotificationDate(hours, minutes),
      repeatType: 'day',
      playSound: settings.sound,
      vibrate: settings.vibration,
    });
  };

  getNextNotificationDate = (hours: string, minutes: string): Date => {
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(parseInt(hours, 10));
    scheduledTime.setMinutes(parseInt(minutes, 10));
    scheduledTime.setSeconds(0);

    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    return scheduledTime;
  };

  cancelAllNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
  };
}

export default new NotificationService(); 