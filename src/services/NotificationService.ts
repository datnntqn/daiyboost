import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { 
  AndroidImportance, 
  AndroidStyle, 
  TimestampTrigger, 
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import { quotes } from '../data/quotes';
import { categoryAssets } from '../constants/categoryAssets';

export interface NotificationSettings {
  isEnabled: boolean;
  preferredTime: string;
  sound: boolean;
  vibration: boolean;
}

const SETTINGS_KEY = '@notification_settings';

const defaultSettings: NotificationSettings = {
  isEnabled: false,
  preferredTime: '09:00',
  sound: true,
  vibration: true,
};

class NotificationService {
  private static instance: NotificationService;
  private settings: NotificationSettings = defaultSettings;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async getSettings(): Promise<NotificationSettings> {
    try {
      const savedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
      if (savedSettings) {
        this.settings = JSON.parse(savedSettings);
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
    return this.settings;
  }

  async saveSettings(settings: NotificationSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      this.settings = settings;
      
      if (settings.isEnabled) {
        await this.scheduleNotification();
      } else {
        await this.cancelAllNotifications();
      }
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  }

  private getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  async scheduleNotification(): Promise<void> {
    try {
      // Cancel existing notifications first
      await this.cancelAllNotifications();

      const [hours, minutes] = this.settings.preferredTime.split(':');
      const now = new Date();
      const scheduledTime = new Date();
      scheduledTime.setHours(parseInt(hours, 10));
      scheduledTime.setMinutes(parseInt(minutes, 10));
      scheduledTime.setSeconds(0);

      // If the time has passed for today, schedule for tomorrow
      if (scheduledTime.getTime() <= now.getTime()) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }

      const randomQuote = this.getRandomQuote();
      const categoryAsset = categoryAssets[randomQuote.category];

      // Create a channel
      const channelId = await notifee.createChannel({
        id: 'daily_quotes',
        name: 'Daily Quotes',
        importance: AndroidImportance.HIGH,
        sound: this.settings.sound ? 'default' : undefined,
        vibration: this.settings.vibration,
      });

      // Create a trigger
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: scheduledTime.getTime(),
        repeatFrequency: RepeatFrequency.DAILY,
      };

      // Display notification
      await notifee.createTriggerNotification(
        {
          title: `${categoryAsset.emoji} Daily ${randomQuote.category} Quote`,
          body: randomQuote.text,
          android: {
            channelId,
            importance: AndroidImportance.HIGH,
            sound: this.settings.sound ? 'default' : undefined,
            vibrationPattern: this.settings.vibration ? [300, 500] : undefined,
            style: {
              type: AndroidStyle.BIGTEXT,
              text: randomQuote.text,
            },
            pressAction: {
              id: 'default',
            },
          },
          ios: {
            sound: this.settings.sound ? 'default' : undefined,
            categoryId: 'daily_quotes',
            threadId: 'daily_quotes',
            critical: true,
            criticalVolume: 0.8,
          },
        },
        trigger,
      );
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  async cancelAllNotifications(): Promise<void> {
    try {
      await notifee.cancelAllNotifications();
    } catch (error) {
      console.error('Error canceling notifications:', error);
    }
  }
}

export default NotificationService.getInstance(); 