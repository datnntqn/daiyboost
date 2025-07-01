import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { quotes, CategoryKey } from '../data/quotes';
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
  const [isFavorite, setIsFavorite] = useState(false);

  const currentQuote = quotes[currentQuoteIndex];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuoteIndex, isMuted, currentQuote.category]);

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    setIsFavorite(false); // Reset favorite for new quote
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (currentSound) {
      if (isMuted) {
        currentSound.play();
      } else {
        currentSound.stop();
      }
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    // Share functionality would go here
    Alert.alert('Share', 'Share functionality would be implemented here');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E8F4FD', '#FFE5D9']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Mute Button */}
        <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
          <Text style={styles.muteButtonText}>{isMuted ? '🔇' : '🔊'}</Text>
        </TouchableOpacity>

        {/* Quote Card */}
        <View style={styles.quoteCard}>
          {/* Header with Share Icon */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleShare}>
              <Text style={styles.shareIcon}>📤</Text>
            </TouchableOpacity>
          </View>

          {/* Quote Content */}
          <View style={styles.quoteContent}>
            <Text style={styles.quoteText}>{currentQuote.text}</Text>
          </View>

          {/* Footer with Next Button and Favorite */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuote}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
              <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}>
                {isFavorite ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ad Banner */}
        <View style={styles.adBanner}>
          <Text style={styles.adText}>Ad</Text>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('Category')}
          >
            <Text style={styles.navButtonText}>Categories</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.navButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default MainQuoteScreen;


