// Định nghĩa kiểu cho dữ liệu
export type CategoryKey = 'Happiness' | 'Productivity' | 'Self-Love' | 'Inspiration' | 'Success' | 'Mindfulness';

export interface Quote {
  id: string;
  text: string;
  category: CategoryKey;
  author: string;
}

export interface CategoryData {
  id: string;
  name: string;
  backgroundPath: string;
  soundPath: string;
}

type CategoryDataMap = {
  [key in CategoryKey]: CategoryData;
};

export const quotes: Quote[] = [
  { 
    id: '1', 
    text: 'The best way to predict the future is to create it.', 
    category: 'Productivity',
    author: 'Peter Drucker'
  },
  { 
    id: '2', 
    text: 'Happiness is a journey, not a destination.', 
    category: 'Happiness',
    author: 'Ralph Waldo Emerson'
  },
  { 
    id: '3', 
    text: 'The only limit to our happiness is our imagination.', 
    category: 'Happiness',
    author: 'Walt Disney'
  },
  { 
    id: '4', 
    text: 'Focus on being productive, not busy.', 
    category: 'Productivity',
    author: 'Tim Ferriss'
  },
  { 
    id: '5', 
    text: 'You yourself, as much as anybody in the entire universe, deserve your love and affection.', 
    category: 'Self-Love',
    author: 'Buddha'
  },
  { 
    id: '6', 
    text: 'Believe you can and you\'re halfway there.', 
    category: 'Inspiration',
    author: 'Theodore Roosevelt'
  },
  { 
    id: '7', 
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', 
    category: 'Success',
    author: 'Winston Churchill'
  },
  { 
    id: '8', 
    text: 'The only way to do great work is to love what you do.', 
    category: 'Success',
    author: 'Steve Jobs'
  },
  { 
    id: '9', 
    text: 'Be present in all things and thankful for all things.', 
    category: 'Mindfulness',
    author: 'Maya Angelou'
  },
  { 
    id: '10', 
    text: 'Every moment is a fresh beginning.', 
    category: 'Mindfulness',
    author: 'T.S. Eliot'
  },
  { 
    id: '11', 
    text: 'The purpose of our lives is to be happy.', 
    category: 'Happiness',
    author: 'Dalai Lama'
  },
  { 
    id: '12', 
    text: 'Happiness is not something ready made. It comes from your own actions.', 
    category: 'Happiness',
    author: 'Dalai Lama'
  },
  { 
    id: '13', 
    text: 'The secret of getting ahead is getting started.', 
    category: 'Productivity',
    author: 'Mark Twain'
  },
  { 
    id: '14', 
    text: 'To love oneself is the beginning of a lifelong romance.', 
    category: 'Self-Love',
    author: 'Oscar Wilde'
  },
  { 
    id: '15', 
    text: 'The future belongs to those who believe in the beauty of their dreams.', 
    category: 'Inspiration',
    author: 'Eleanor Roosevelt'
  },
  { 
    id: '16', 
    text: 'The only place where success comes before work is in the dictionary.', 
    category: 'Success',
    author: 'Vidal Sassoon'
  },
  { 
    id: '17', 
    text: 'The present moment is filled with joy and happiness. If you are attentive, you will see it.', 
    category: 'Mindfulness',
    author: 'Thich Nhat Hanh'
  },
  { 
    id: '18', 
    text: 'Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.', 
    category: 'Mindfulness',
    author: 'Thich Nhat Hanh'
  },
  { 
    id: '19', 
    text: 'Do more of what makes you happy.', 
    category: 'Happiness',
    author: 'Anonymous'
  },
  { 
    id: '20', 
    text: 'Smile big, Laugh often. Never take this life for granted.', 
    category: 'Happiness',
    author: 'Anonymous'
  },
];

export const categoryData: CategoryDataMap = {
  'Happiness': { 
    id: '1', 
    name: 'Happiness', 
    backgroundPath: 'happiness_bg',
    soundPath: 'happiness_sound'
  },
  'Productivity': { 
    id: '2', 
    name: 'Productivity', 
    backgroundPath: 'productivity_bg',
    soundPath: 'productivity_sound'
  },
  'Self-Love': { 
    id: '3', 
    name: 'Self-Love', 
    backgroundPath: 'self_love_bg',
    soundPath: 'happiness_sound'
  },
  'Inspiration': { 
    id: '4', 
    name: 'Inspiration', 
    backgroundPath: 'inspiration_bg',
    soundPath: 'happiness_sound'
  },
  'Success': { 
    id: '5', 
    name: 'Success', 
    backgroundPath: 'success_bg',
    soundPath: 'happiness_sound'
  },
  'Mindfulness': { 
    id: '6', 
    name: 'Mindfulness', 
    backgroundPath: 'mindfulness_bg',
    soundPath: 'happiness_sound'
  },
};

export const categories: CategoryData[] = Object.values(categoryData);

// Các hàm helper để lấy tài nguyên
export const getBackgroundImage = (category: CategoryKey | string): any => {
  if (!category) {
    return require('../../assets/main_quote_background.png');
  }
  
  const categoryKey = category as CategoryKey;
  
  try {
    switch (categoryKey) {
      case 'Happiness':
        return require('../../assets/backgrounds/happiness.jpg');
      case 'Productivity':
        return require('../../assets/backgrounds/productivity.jpg');
      case 'Self-Love':
        return require('../../assets/backgrounds/self_love.jpg');
      case 'Inspiration':
        return require('../../assets/backgrounds/inspiration.jpg');
      case 'Success':
        return require('../../assets/backgrounds/success.jpg');
      case 'Mindfulness':
        return require('../../assets/backgrounds/mindfulness.jpg');
      default:
        return require('../../assets/main_quote_background.png');
    }
  } catch (error) {
    console.error('Error loading background image:', error);
    return require('../../assets/main_quote_background.png');
  }
};

export const getSoundFile = (category: CategoryKey | string): any => {
  if (!category) {
    return require('../../assets/sounds/camp-fire.mp3');
  }
  
  const categoryKey = category as CategoryKey;
  const path = categoryData[categoryKey]?.soundPath;
  
  if (!path) {
    return require('../../assets/sounds/camp-fire.mp3');
  }
  
  try {
    switch (path) {
      case 'happiness_sound':
        return require('../../assets/sounds/camp-fire.mp3');
      case 'productivity_sound':
        return require('../../assets/sounds/camp-fire.mp3');
      default:
        return require('../../assets/sounds/camp-fire.mp3');
    }
  } catch (error) {
    console.error('Error loading sound file:', error);
    return require('../../assets/sounds/camp-fire.mp3');
  }
};


