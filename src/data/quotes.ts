// Định nghĩa kiểu cho dữ liệu
type CategoryKey = 'Happiness' | 'Productivity' | 'Self-Love' | 'Inspiration' | 'Success' | 'Mindfulness';

type CategoryData = {
  [key in CategoryKey]: {
    id: string;
    name: string;
    backgroundPath: string;
    soundPath: string;
  }
};

export const quotes = [
  { id: '1', text: 'The best way to predict the future is to create it.', category: 'Productivity' as CategoryKey },
  { id: '2', text: 'Happiness is a journey, not a destination.', category: 'Happiness' as CategoryKey },
  { id: '3', text: 'The only limit to our happiness is our imagination.', category: 'Happiness' as CategoryKey },
  { id: '4', text: 'Focus on being productive, not busy.', category: 'Productivity' as CategoryKey },
  { id: '5', text: 'You yourself, as much as anybody in the entire universe, deserve your love and affection.', category: 'Self-Love' as CategoryKey },
  { id: '6', text: 'Believe you can and you\'re halfway there.', category: 'Inspiration' as CategoryKey },
  { id: '7', text: 'The secret of getting ahead is getting started.', category: 'Productivity' as CategoryKey },
  { id: '8', text: 'To love oneself is the beginning of a lifelong romance.', category: 'Self-Love' as CategoryKey },
  { id: '9', text: 'The future belongs to those who believe in the beauty of their dreams.', category: 'Inspiration' as CategoryKey },
  { id: '10', text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', category: 'Success' as CategoryKey },
  { id: '11', text: 'The only place where success comes before work is in the dictionary.', category: 'Success' as CategoryKey },
  { id: '12', text: 'The present moment is filled with joy and happiness. If you are attentive, you will see it.', category: 'Mindfulness' as CategoryKey },
  { id: '13', text: 'Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.', category: 'Mindfulness' as CategoryKey },
  { id: '14', text: 'Do more of what makes you happy.', category: 'Happiness' as CategoryKey },
  { id: '15', text: 'Smile big, Laugh often. Never take this life for granted.', category: 'Happiness' as CategoryKey },
];

export const categoryData: CategoryData = {
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

export const categories = Object.values(categoryData);

// Các hàm helper để lấy tài nguyên
export const getBackgroundImage = (category: CategoryKey | string) => {
  if (!category) {
    return require('../../assets/main_quote_background.png');
  }
  
  const categoryKey = category as CategoryKey;
  const path = categoryData[categoryKey]?.backgroundPath;
  
  if (!path) {
    return require('../../assets/main_quote_background.png');
  }
  
  try {
    switch (path) {
      case 'happiness_bg':
        return require('../../assets/backgrounds/happiness_bg.png');
      case 'productivity_bg':
        return require('../../assets/backgrounds/productivity_bg.png');
      case 'self_love_bg':
        return require('../../assets/backgrounds/self_love_bg.png');
      case 'inspiration_bg':
        return require('../../assets/backgrounds/inspiration_bg.png');
      case 'success_bg':
        return require('../../assets/backgrounds/success_bg.png');
      case 'mindfulness_bg':
        return require('../../assets/backgrounds/mindfulness_bg.png');
      default:
        return require('../../assets/main_quote_background.png');
    }
  } catch (error) {
    console.error('Error loading background image:', error);
    return require('../../assets/main_quote_background.png');
  }
};

export const getSoundFile = (category: CategoryKey | string) => {
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


