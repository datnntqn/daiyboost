export type CategoryType = 'Happiness' | 'Productivity' | 'Self-Love' | 'Inspiration' | 'Success' | 'Mindfulness';

export interface Quote {
  id: string;
  text: string;
  category: CategoryType;
}

export interface FavoriteQuote extends Quote {
  addedAt: string;
} 