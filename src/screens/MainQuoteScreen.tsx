import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView, StatusBar, LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { quotes } from '../data/quotes';
import { createStyles } from './styles/MainQuoteScreen.styles';
import { useTheme } from '../context/ThemeContext';
import { categoryAssets } from '../constants/categoryAssets';
import { Quote, CategoryType } from '../types/quote';

// Bỏ qua cảnh báo
LogBox.ignoreLogs(['Require cycle:']);

type MainQuoteScreenProps = {};

const MainQuoteScreen: React.FC<MainQuoteScreenProps> = () => {
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteQuotes, setFavoriteQuotes] = useState<Quote[]>([]);

  // Đảm bảo có dữ liệu hợp lệ với useMemo
  const safeQuote = useMemo(() => {
    return quotes && quotes.length > 0 ? quotes[currentQuoteIndex % quotes.length] : {
      id: '0',
      text: 'The best way to predict the future is to create it.',
      category: 'Productivity' as CategoryType
    };
  }, [currentQuoteIndex]);

  const checkIfFavorite = useCallback(() => {
    const isFav = favoriteQuotes.some(quote => quote.id === safeQuote.id);
    setIsFavorite(isFav);
  }, [favoriteQuotes, safeQuote.id]);

  useEffect(() => {
    loadFavoriteQuotes();
  }, []);

  useEffect(() => {
    checkIfFavorite();
  }, [checkIfFavorite]);

  const loadFavoriteQuotes = async () => {
    try {
      const savedQuotes = await AsyncStorage.getItem('favorite_quotes');
      if (savedQuotes) {
        setFavoriteQuotes(JSON.parse(savedQuotes));
      }
    } catch (error) {
      console.error('Error loading favorite quotes:', error);
    }
  };

  const categoryAsset = categoryAssets[safeQuote.category];
  const gradientColors = isDarkMode ? 
    ['#1a1a1a', '#2d2d2d'] : 
    categoryAsset.gradient;

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const toggleFavorite = async () => {
    try {
      let updatedFavorites: Quote[];
      if (isFavorite) {
        updatedFavorites = favoriteQuotes.filter(quote => quote.id !== safeQuote.id);
      } else {
        updatedFavorites = [...favoriteQuotes, safeQuote];
      }
      
      await AsyncStorage.setItem('favorite_quotes', JSON.stringify(updatedFavorites));
      setFavoriteQuotes(updatedFavorites);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite quotes:', error);
    }
  };

  const handleShare = () => {
    // Share functionality would go here
    Alert.alert('Share', 'Share functionality would be implemented here');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#ffffff'}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff' }]}>
        <LinearGradient
          colors={gradientColors}
          style={styles.gradientBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          {/* Quote Card */}
          <View style={styles.quoteCard}>
            {/* Header with Category Badge */}
            <View style={styles.header}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryIcon}>{categoryAsset.emoji}</Text>
                <Text style={styles.categoryName}>{safeQuote.category}</Text>
              </View>
              <TouchableOpacity onPress={handleShare}>
                <Text style={styles.shareIcon}>📤</Text>
              </TouchableOpacity>
            </View>

            {/* Quote Content */}
            <View style={styles.quoteContent}>
              <Text style={styles.quoteText}>
                {safeQuote.text}
              </Text>
            </View>

            {/* Favorite Button (Inside Circle) */}
            <View style={styles.favoriteContainer}>
              <View style={styles.favoriteBackground} />
              <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
                <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}>
                  {isFavorite ? categoryAsset.activeIcon : categoryAsset.icon}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Next Button */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuote}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
};

export default MainQuoteScreen;


