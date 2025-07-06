import { CategoryType } from './categories';

export interface Quote {
  id: string;
  text: string;
  author?: string;
  category: CategoryType;
  isFavorite?: boolean;
}

export interface QuoteState {
  quotes: Quote[];
  currentQuoteIndex: number;
  favorites: string[]; // Array of quote IDs
}

export interface FavoriteQuote extends Quote {
  addedAt: string;
} 