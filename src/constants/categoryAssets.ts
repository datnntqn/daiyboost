import { ImageSourcePropType } from 'react-native';

interface CategoryAsset {
  icon: string;
  activeIcon: string;
  background: ImageSourcePropType;
  gradient: string[];
  emoji: string;
}

export const categoryAssets: Record<string, CategoryAsset> = {
  'Happiness': {
    icon: '😊',
    activeIcon: '🌟',
    background: require('../../assets/backgrounds/happiness_bg.png'),
    gradient: ['#FFE5D9', '#FEC5BB'],
    emoji: '🌈',
  },
  'Productivity': {
    icon: '✅',
    activeIcon: '⚡',
    background: require('../../assets/backgrounds/productivity_bg.png'),
    gradient: ['#E2ECE9', '#BEE1E6'],
    emoji: '📈',
  },
  'Self-Love': {
    icon: '💙',
    activeIcon: '💝',
    background: require('../../assets/backgrounds/self_love_bg.png'),
    gradient: ['#FCD5CE', '#F8EDEB'],
    emoji: '🫂',
  },
  'Inspiration': {
    icon: '💡',
    activeIcon: '✨',
    background: require('../../assets/backgrounds/inspiration_bg.png'),
    gradient: ['#E8F4FD', '#D7E3FC'],
    emoji: '🎯',
  },
  'Success': {
    icon: '⭐',
    activeIcon: '🏆',
    background: require('../../assets/backgrounds/success_bg.png'),
    gradient: ['#E2ECE9', '#CCD5AE'],
    emoji: '🚀',
  },
  'Mindfulness': {
    icon: '🧘',
    activeIcon: '🌺',
    background: require('../../assets/backgrounds/mindfulness_bg.png'),
    gradient: ['#E8F4FD', '#FFE5D9'],
    emoji: '🌿',
  },
}; 