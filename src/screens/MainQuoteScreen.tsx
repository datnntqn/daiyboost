import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { quotes } from '../data/quotes';

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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  quoteText: {
    fontSize: 28,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'serif', // Placeholder, will refine with actual font
  },
  nextButton: {
    backgroundColor: '#5DADE2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  shareButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 10,
  },
  iconText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default MainQuoteScreen;


