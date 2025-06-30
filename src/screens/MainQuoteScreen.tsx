import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { quotes, getBackgroundImage } from '../data/quotes';
import { styles } from './styles/MainQuoteScreen.styles';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

// Định nghĩa trực tiếp các đường dẫn âm thanh
const SOUND_PATHS = {
  'Happiness': 'happiness_sound.mp3',
  'Productivity': 'productivity_sound.mp3',
  'Self-Love': 'happiness_sound.mp3',
  'Inspiration': 'happiness_sound.mp3',
  'Success': 'happiness_sound.mp3',
  'Mindfulness': 'happiness_sound.mp3',
};

const MainQuoteScreen: React.FC = () => {
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
    }

    try {
      // Xác định đường dẫn âm thanh dựa trên danh mục
      const category = currentQuote.category as keyof typeof SOUND_PATHS;
      const soundFileName = SOUND_PATHS[category] || 'happiness_sound.mp3';

      // Load new sound sử dụng đường dẫn trực tiếp
      const sound = new Sound(soundFileName, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          Alert.alert('Error', 'Failed to load sound for this category.');
          return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());
        if (!isMuted) {
          sound.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
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
      return () => {};
    }
  }, [currentQuoteIndex, isMuted, currentQuote.category, currentSound]);

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


