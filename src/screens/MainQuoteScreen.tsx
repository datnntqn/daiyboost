import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  LogBox, 
  ImageBackground,
  Image,
  GestureResponderEvent
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { quotes } from '../data/quotes';
import { createStyles } from './styles/MainQuoteScreen.styles';
import { useTheme } from '../context/ThemeContext';
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
  const [_totalFavorites, setTotalFavorites] = useState(0);
  const [startY, setStartY] = useState(0);

  // Đảm bảo có dữ liệu hợp lệ với useMemo
  const safeQuote = useMemo(() => {
    return quotes && quotes.length > 0 ? quotes[currentQuoteIndex % quotes.length] : {
      id: '0',
      text: 'Be kind to yourself every day.',
      category: 'Self-Love' as CategoryType
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
  }, [checkIfFavorite, safeQuote.id]);

  const loadFavoriteQuotes = async () => {
    try {
      const savedQuotes = await AsyncStorage.getItem('favorite_quotes');
      if (savedQuotes) {
        const parsedQuotes = JSON.parse(savedQuotes);
        setFavoriteQuotes(parsedQuotes);
        setTotalFavorites(parsedQuotes.length);
      }
    } catch (error) {
      console.error('Error loading favorite quotes:', error);
    }
  };

  const backgroundImage = require('../../assets/beach.jpg');

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
      setTotalFavorites(updatedFavorites.length);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite quotes:', error);
    }
  };

  // Xử lý sự kiện vuốt lên
  const handleTouchStart = (event: GestureResponderEvent) => {
    setStartY(event.nativeEvent.pageY);
  };

  const handleTouchEnd = (event: GestureResponderEvent) => {
    const endY = event.nativeEvent.pageY;
    const deltaY = startY - endY;
    
    // Nếu vuốt lên (deltaY > 0) và khoảng cách đủ lớn (> 50)
    if (deltaY > 50) {
      handleNextQuote();
    }
  };

  // Xác định nguồn hình ảnh cho nút yêu thích
  const favoriteIconSource = isFavorite 
    ? require('../../assets/icons/heart-active.png')
    : require('../../assets/icons/heart-inactive.png');

  return (
    <View 
      style={styles.container}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ImageBackground 
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          {/* Favorite Button */}
          <View style={styles.favoriteButtonContainer}>
            <TouchableOpacity 
              style={styles.favoriteIconButton} 
              onPress={toggleFavorite}
            >
              <Image 
                source={favoriteIconSource}
                style={[
                  styles.favoriteIconImage, 
                  isFavorite ? { tintColor: '#ff4c4c' } : { tintColor: '#fff' }
                ]} 
                key={`favorite-${isFavorite}`}
              />
            </TouchableOpacity>
          </View>

          {/* Quote Content */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>{safeQuote.text}</Text>
          </View>

          {/* Bottom Tab Bar Placeholder */}
          <View style={styles.tabBarPlaceholder}>
            <TouchableOpacity style={styles.tabButton} onPress={handleNextQuote}>
              <Text style={styles.tabButtonText}>General</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default MainQuoteScreen;


