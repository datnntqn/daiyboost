import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView, LogBox } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { quotes } from '../data/quotes';
import { styles } from './styles/MainQuoteScreen.styles';

// Bỏ qua cảnh báo
LogBox.ignoreLogs(['Require cycle:']);

type MainQuoteScreenProps = {};

const MainQuoteScreen: React.FC<MainQuoteScreenProps> = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Đảm bảo có dữ liệu hợp lệ với useMemo
  const safeQuote = useMemo(() => {
    return quotes && quotes.length > 0 ? quotes[currentQuoteIndex % quotes.length] : {
      id: '0',
      text: 'The best way to predict the future is to create it.',
      category: 'Productivity'
    };
  }, [currentQuoteIndex]);
  
  // Log để debug
  useEffect(() => {
    console.log("Current quote:", safeQuote);
    console.log("Total quotes:", quotes.length);
  }, [safeQuote]);

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    setIsFavorite(false); // Reset favorite for new quote
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    // Share functionality would go here
    Alert.alert('Share', 'Share functionality would be implemented here');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#E8F4FD', '#FFE5D9']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Quote Card */}
        <View style={styles.quoteCard}>
          {/* Header with Category Icons */}
          <View style={styles.header}>
            <Text style={styles.categoryIcon}>📮</Text>
            <TouchableOpacity onPress={handleShare}>
              <Text style={styles.shareIcon}>📤</Text>
            </TouchableOpacity>
          </View>

          {/* Quote Content */}
          <View style={styles.quoteContent}>
            <Text style={[styles.quoteText, {opacity: 1}]}>
              {safeQuote.text}
            </Text>
          </View>

          {/* Favorite Button (Inside Circle) */}
          <View style={styles.favoriteContainer}>
            <View style={styles.favoriteBackground} />
            <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
              <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}>
                {isFavorite ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNextQuote}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Categories</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default MainQuoteScreen;


