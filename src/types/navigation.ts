import { Quote, CategoryData } from '../data/quotes';

export type RootStackParamList = {
  Welcome: undefined;
  MainQuote: undefined;
  Categories: undefined;
  Category: { category?: string };
  QuoteList: { category: string };
  NotificationSettings: undefined;
  Settings: undefined;
  CategoriesStack: undefined;
  SettingsMain: undefined;
  Favorites: undefined;
};

export type { Quote, CategoryData as Category };

