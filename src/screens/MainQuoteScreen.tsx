import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { quotes, getBackgroundImage, CategoryKey } from '../data/quotes';
import { styles } from './styles/MainQuoteScreen.styles';
import { RootStackParamList } from '../types/navigation';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

// Định nghĩa trực tiếp các đường dẫn âm thanh
const SOUND_PATHS: Record<CategoryKey, string> = {
  'Happiness': 'meditation-music.mp3',
  'Productivity': 'productivity_sound.mp3',
  'Self-Love': 'meditation-music.mp3',
  'Inspiration': 'meditation-music.mp3',
  'Success': 'meditation-music.mp3',
  'Mindfulness': 'meditation-music.mp3',
};

type MainQuoteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainQuote'>;

type MainQuoteScreenProps = {
  navigation: MainQuoteScreenNavigationProp;
};

const MainQuoteScreen: React.FC<MainQuoteScreenProps> = ({ navigation }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const [backgroundSource, setBackgroundSource] = useState<any>(null);

  const currentQuote = quotes[currentQuoteIndex];
  
  // Sử dụng useEffect để tải hình ảnh nền
  useEffect(() => {
    try {
      const bgImage = getBackgroundImage(currentQuote.category);
      setBackgroundSource(bgImage);
    } catch (error) {
      console.error('Error setting background image:', error);
      setBackgroundSource(require('../../assets/main_quote_background.png'));
    }
  }, [currentQuote.category]);
  
  useEffect(() => {
    // Cleanup previous sound
    if (currentSound) {
      currentSound.release();
      setCurrentSound(null);
    }

    try {
      // Xác định đường dẫn âm thanh dựa trên danh mục
      const category = currentQuote.category as CategoryKey;
      const soundFileName = SOUND_PATHS[category] || 'meditation-music.mp3';

      // Load new sound sử dụng đường dẫn trực tiếp
      const sound = new Sound(soundFileName, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('Failed to load the sound:', error);
          // Try to load default sound if specific sound fails
          const defaultSound = new Sound('camp-fire.mp3', Sound.MAIN_BUNDLE, (defaultError) => {
            if (defaultError) {
              console.log('Failed to load default sound:', defaultError);
              Alert.alert('Error', 'Failed to load audio files. Please check if audio files exist.');
              return;
            }
            console.log('Default sound loaded successfully');
            if (!isMuted) {
              defaultSound.play();
            }
            setCurrentSound(defaultSound);
          });
          return;
        }
        // loaded successfully
        console.log('Sound loaded successfully - duration: ' + sound.getDuration() + 's, channels: ' + sound.getNumberOfChannels());
        if (!isMuted) {
          sound.play((success) => {
            if (success) {
              console.log('Successfully finished playing');
            } else {
              console.log('Playback failed due to audio decoding errors');
            }
          });
        }
        setCurrentSound(sound);
      });

      return () => {
        if (sound) {
          sound.release();
        }
      };
    } catch (error) {
      console.error('Error loading sound:', error);
      Alert.alert('Error', 'An unexpected error occurred while loading audio.');
      return () => {};
    }
  }, [currentQuoteIndex, isMuted, currentQuote.category]);

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const handleShare = () => {
    console.log('Share current quote:', currentQuote.text);
    // Implement actual sharing logic here
  };

  const handleFavorite = () => {
    console.log('Add to favorites:', currentQuote.text);
    // Implement actual favorite logic here
  };

  const toggleMute = () => {
    if (currentSound) {
      if (isMuted) {
        currentSound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      } else {
        currentSound.pause();
      }
    }
    setIsMuted(!isMuted);
  };

  // Nếu backgroundSource chưa sẵn sàng, hiển thị một màn hình trống
  if (!backgroundSource) {
    return (
      <View style={styles.background}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground 
      source={backgroundSource}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.topButtons}>
          <TouchableOpacity onPress={() => navigation.navigate('Category')} style={styles.categoryButton}>
            <Text style={styles.iconText}>Categories</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsButton}>
            <Text style={styles.iconText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          {/* Placeholder for Share Icon */}
          <Text style={styles.iconText}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={toggleMute} style={styles.soundButton}>
          <Text style={styles.iconText}>{isMuted ? 'Unmute' : 'Mute'}</Text>
        </TouchableOpacity>

        <Text style={styles.quoteText}>{currentQuote.text}</Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuote}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavorite} style={styles.favoriteButton}>
          {/* Placeholder for Favorite Icon */}
          <Text style={styles.iconText}>Favorite</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default MainQuoteScreen;


