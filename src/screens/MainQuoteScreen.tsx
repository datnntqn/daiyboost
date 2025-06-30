import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { quotes } from '../data/quotes';
import { styles } from './styles/MainQuoteScreen.styles';

const MainQuoteScreen: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const currentQuote = quotes[currentQuoteIndex].text;

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const handleShare = () => {
    console.log('Share current quote:', currentQuote);
    // Implement actual sharing logic here
  };

  const handleFavorite = () => {
    console.log('Add to favorites:', currentQuote);
    // Implement actual favorite logic here
  };

  return (
    <ImageBackground 
      source={require("../../assets/main_quote_background.png")} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          {/* Placeholder for Share Icon */}
          <Text style={styles.iconText}>Share</Text>
        </TouchableOpacity>
        <Text style={styles.quoteText}>{currentQuote}</Text>
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


