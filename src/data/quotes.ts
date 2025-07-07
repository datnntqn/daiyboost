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
  {
    id: '19',
    text: 'Focus on being productive instead of busy.',
    category: 'Productivity', 
    author: 'Tim Ferriss'
  },
  {
    id: '20',
    text: 'The present moment is filled with joy and happiness. If you are attentive, you will see it.',
    category: 'Mindfulness',
    author: 'Thich Nhat Hanh'
  },
  {
    id: '21',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    category: 'Success',
    author: 'Winston Churchill'
  },
  {
    id: '22',
    text: 'To love oneself is the beginning of a lifelong romance.',
    category: 'Self-Love',
    author: 'Oscar Wilde'
  },
  {
    id: '23',
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    category: 'Inspiration',
    author: 'Eleanor Roosevelt'
  },
  {
    id: '24',
    text: 'Do the hard jobs first. The easy jobs will take care of themselves.',
    category: 'Productivity',
    author: 'Dale Carnegie'
  },
  {
    id: '25',
    text: 'The successful warrior is the average man with laser-like focus.',
    category: 'Success',
    author: 'Bruce Lee'
  },
  {
    id: '26',
    text: 'Breathe and let be. Follow the currents of life.',
    category: 'Mindfulness',
    author: 'Jon Kabat-Zinn'
  },
  {
    id: '27',
    text: 'You yourself, as much as anybody in the entire universe, deserve your love and affection.',
    category: 'Self-Love',
    author: 'Buddha'
  },
  {
    id: '28',
    text: 'The only limit to our realization of tomorrow will be our doubts of today.',
    category: 'Inspiration',
    author: 'Franklin D. Roosevelt'
  },
  {
    id: '29',
    text: "Your time is limited, so don't waste it living someone else's life.",
    category: 'Success',
    author: 'Steve Jobs'
  },
  {
    id: '30',
    text: 'Happiness is not something ready-made. It comes from your own actions.',
    category: 'Happiness',
    author: 'Dalai Lama'
  },
  {
    id: '31',
    text: 'The quieter you become, the more you can hear.',
    category: 'Mindfulness',
    author: 'Ram Dass'
  },
  {
    id: '32',
    text: 'Self-care is not self-indulgence, it is self-preservation.',
    category: 'Self-Love',
    author: 'Audre Lorde'
  },
  {
    id: '33',
    text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
    category: 'Productivity',
    author: 'Stephen Covey'
  },
  {
    id: '34',
    text: 'Life is 10% what happens to you and 90% how you react to it.',
    category: 'Inspiration',
    author: 'Charles R. Swindoll'
  },
  {
    id: '35',
    text: 'Success usually comes to those who are too busy to be looking for it.',
    category: 'Success',
    author: 'Henry David Thoreau'
  },
  {
    id: '36',
    text: 'The greatest happiness of life is the conviction that we are loved.',
    category: 'Happiness',
    author: 'Victor Hugo'
  },
  {
    id: '37',
    text: 'Be present in all things and thankful for all things.',
    category: 'Mindfulness',
    author: 'Maya Angelou'
  },
  {
    id: '38',
    text: 'You are enough just as you are.',
    category: 'Self-Love',
    author: 'Meghan Markle'
  },
  {
    id: '39',
    text: "Don't count the days, make the days count.",
    category: 'Productivity',
    author: 'Muhammad Ali'
  },
  {
    id: '40',
    text: 'The only way to do great work is to love what you do.',
    category: 'Inspiration',
    author: 'Steve Jobs'
  },
  {
    id: '41',
    text: 'Success is walking from failure to failure with no loss of enthusiasm.',
    category: 'Success',
    author: 'Winston Churchill'
  },
  {
    id: '42',
    text: 'The purpose of our lives is to be happy.',
    category: 'Happiness',
    author: 'Dalai Lama'
  },
  {
    id: '43',
    text: 'Life is available only in the present moment.',
    category: 'Mindfulness',
    author: 'Thich Nhat Hanh'
  },
  {
    id: '44',
    text: 'When you recover or discover something that nourishes your soul and brings joy, care enough about yourself to make room for it in your life.',
    category: 'Self-Love',
    author: 'Jean Shinoda Bolen'
  },
  {
    id: '45',
    text: 'Until we can manage time, we can manage nothing else.',
    category: 'Productivity',
    author: 'Peter Drucker'
  },
  {
    id: '46',
    text: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.',
    category: 'Inspiration',
    author: 'Ralph Waldo Emerson'
  },
  {
    id: '47',
    text: 'The road to success and the road to failure are almost exactly the same.',
    category: 'Success',
    author: 'Colin R. Davis'
  },
  {
    id: '48',
    text: 'Happiness is not in the mere possession of money; it lies in the joy of achievement.',
    category: 'Happiness',
    author: 'Franklin D. Roosevelt'
  },
  {
    id: '49',
    text: 'The most precious gift we can offer others is our presence.',
    category: 'Mindfulness',
    author: 'Thich Nhat Hanh'
  },
  {
    id: '50',
    text: "You have been criticizing yourself for years and it hasn't worked. Try approving of yourself and see what happens.",
    category: 'Self-Love',
    author: 'Louise Hay'
  },
  {
    id: '51',
    text: 'Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.',
    category: 'Productivity',
    author: 'Paul J. Meyer'
  },
  {
    id: '52',
    text: 'The only person you are destined to become is the person you decide to be.',
    category: 'Inspiration',
    author: 'Ralph Waldo Emerson'
  },
  {
    id: '53',
    text: 'Success is not the key to happiness. Happiness is the key to success.',
    category: 'Success',
    author: 'Albert Schweitzer'
  },
  {
    id: '54',
    text: 'The most wasted of all days is one without laughter.',
    category: 'Happiness',
    author: 'E.E. Cummings'
  },
  {
    id: '55',
    text: 'Walk as if you are kissing the Earth with your feet.',
    category: 'Mindfulness',
    author: 'Thich Nhat Hanh'
  },
  {
    id: '56',
    text: 'You are worthy of the love you keep trying to give to everyone else.',
    category: 'Self-Love',
    author: 'Unknown'
  },
  {
    id: '57',
    text: 'Time management is life management.',
    category: 'Productivity',
    author: 'Robin Sharma'
  },
  {
    id: '58',
    text: 'The only impossible journey is the one you never begin.',
    category: 'Inspiration',
    author: 'Tony Robbins'
  },
  {
    id: '59',
    text: 'Success is liking yourself, liking what you do, and liking how you do it.',
    category: 'Success',
    author: 'Maya Angelou'
  },
  {
    id: '60',
    text: 'Happiness is when what you think, what you say, and what you do are in harmony.',
    category: 'Happiness',
    author: 'Mahatma Gandhi'
  },
  {
    id: '61',
    text: "In today's rush, we all think too much, seek too much, want too much and forget about the joy of just being.",
    category: 'Mindfulness',
    author: 'Eckhart Tolle'
  },
  {
    id: '62',
    text: 'To fall in love with yourself is the first secret to happiness.',
    category: 'Self-Love',
    author: 'Robert Morley'
  },
  {
    id: '63',
    text: 'Focus on being productive rather than busy.',
    category: 'Productivity',
    author: 'Tim Ferriss'
  },
  {
    id: '64',
    text: 'The future depends on what you do today.',
    category: 'Inspiration',
    author: 'Mahatma Gandhi'
  },
  {
    id: '65',
    text: "Success is not about the destination, it's about the journey.",
    category: 'Success',
    author: 'Zig Ziglar'
  },
  {
    id: '66',
    text: "The happiest people don't have the best of everything, they make the best of everything.",
    category: 'Happiness',
    author: 'Unknown'
  },
  {
    id: '67',
    text: "Mindfulness isn't difficult, we just need to remember to do it.",
    category: 'Mindfulness',
    author: 'Sharon Salzberg'
  },
  {
    id: '68',
    text: 'Self-love is not selfish; you cannot truly love another until you know how to love yourself.',
    category: 'Self-Love',
    author: 'Unknown'
  }
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


