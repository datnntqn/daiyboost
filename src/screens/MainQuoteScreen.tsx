import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { quotes, categoryData } from '../data/quotes';
import { styles } from './styles/MainQuoteScreen.styles';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const MainQuoteScreen: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);

  const currentQuote = quotes[currentQuoteIndex];
  const currentCategory = categoryData[currentQuote.category];

  useEffect(() => {
    if (currentSound) {
      currentSound.release();
    }

    if (currentCategory.sound) {
      const sound = new Sound(currentCategory.sound, Sound.MAIN_BUNDLE, (error) => {
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
    } else {
      setCurrentSound(null);
    }

    return () => {
      if (currentSound) {
        currentSound.release();
      }
    };
  }, [currentQuoteIndex, isMuted]);

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

  return (
    <ImageBackground 
      source={currentCategory.backgroundImage} 
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


