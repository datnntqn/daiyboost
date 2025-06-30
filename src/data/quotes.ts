export const quotes = [
  { id: '1', text: 'The best way to predict the future is to create it.', category: 'Productivity' },
  { id: '2', text: 'Happiness is a journey, not a destination.', category: 'Happiness' },
  { id: '3', text: 'The only limit to our happiness is our imagination.', category: 'Happiness' },
  { id: '4', text: 'Focus on being productive, not busy.', category: 'Productivity' },
  { id: '5', text: 'You yourself, as much as anybody in the entire universe, deserve your love and affection.', category: 'Self-Love' },
  { id: '6', text: 'Believe you can and you\'re halfway there.', category: 'Inspiration' },
  { id: '7', text: 'The secret of getting ahead is getting started.', category: 'Productivity' },
  { id: '8', text: 'To love oneself is the beginning of a lifelong romance.', category: 'Self-Love' },
  { id: '9', text: 'The future belongs to those who believe in the beauty of their dreams.', category: 'Inspiration' },
  { id: '10', text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', category: 'Success' },
  { id: '11', text: 'The only place where success comes before work is in the dictionary.', category: 'Success' },
  { id: '12', text: 'The present moment is filled with joy and happiness. If you are attentive, you will see it.', category: 'Mindfulness' },
  { id: '13', text: 'Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.', category: 'Mindfulness' },
  { id: '14', text: 'Do more of what makes you happy.', category: 'Happiness' },
  { id: '15', text: 'Smile big, Laugh often. Never take this life for granted.', category: 'Happiness' },
];

export const categoryData = {
  'Happiness': { 
    id: '1', 
    name: 'Happiness', 
    backgroundImage: require('../../assets/backgrounds/happiness_bg.png'),
    sound: require('../../assets/sounds/happiness_sound.mp3')
  },
  'Productivity': { 
    id: '2', 
    name: 'Productivity', 
    backgroundImage: require('../../assets/backgrounds/productivity_bg.png'),
    sound: require('../../assets/sounds/productivity_sound.mp3')
  },
  'Self-Love': { 
    id: '3', 
    name: 'Self-Love', 
    backgroundImage: require('../../assets/backgrounds/self_love_bg.png'),
    sound: require('../../assets/sounds/self_love_sound.mp3')
  },
  'Inspiration': { 
    id: '4', 
    name: 'Inspiration', 
    backgroundImage: require('../../assets/backgrounds/inspiration_bg.png'),
    sound: require('../../assets/sounds/inspiration_sound.mp3')
  },
  'Success': { 
    id: '5', 
    name: 'Success', 
    backgroundImage: require('../../assets/backgrounds/success_bg.png'),
    sound: require('../../assets/sounds/success_sound.mp3')
  },
  'Mindfulness': { 
    id: '6', 
    name: 'Mindfulness', 
    backgroundImage: require('../../assets/backgrounds/mindfulness_bg.png'),
    sound: require('../../assets/sounds/mindfulness_sound.mp3')
  },
};

export const categories = Object.values(categoryData);


