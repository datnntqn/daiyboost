export type CategoryType = 'happiness' | 'mindfulness' | 'self_love' | 'success' | 'general';

export interface CategoryBackground {
  name: CategoryType;
  backgroundImage: any; // Require type for React Native images
  soundFile?: string;
}

export const categoryBackgrounds: CategoryBackground[] = [
  {
    name: 'happiness',
    backgroundImage: require('../../assets/backgrounds/happiness.jpg'),
    soundFile: 'happiness_sound.mp3'
  },
  {
    name: 'mindfulness',
    backgroundImage: require('../../assets/backgrounds/mindfulness.jpg'),
    soundFile: 'meditation-music.mp3'
  },
  {
    name: 'self_love',
    backgroundImage: require('../../assets/backgrounds/self_love.jpg')
  },
  {
    name: 'success',
    backgroundImage: require('../../assets/backgrounds/success.jpg')
  },
  {
    name: 'general',
    backgroundImage: require('../../assets/main_quote_background.png')
  }
]; 