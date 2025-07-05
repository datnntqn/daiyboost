import { Quote, CategoryData } from '../data/quotes';

export type RootStackParamList = {
  Welcome: undefined;
  MainQuote: undefined;
  Category: undefined;
  QuoteList: { category: string };
  NotificationSettings: undefined;
  Settings: undefined;
  CategoriesStack: undefined;
};

export type { Quote, CategoryData as Category };

