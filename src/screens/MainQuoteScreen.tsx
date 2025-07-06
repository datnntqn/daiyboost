import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
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
import { quotes, getBackgroundImage, CategoryKey, Quote } from '../data/quotes';
import { createStyles } from './styles/MainQuoteScreen.styles';
import { useTheme } from '../context/ThemeContext';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

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
  const [_forceUpdate, _setForceUpdate] = useState(0);
  const viewShotRef = useRef<ViewShot>(null);

  // Đảm bảo có dữ liệu hợp lệ với useMemo
  const safeQuote = useMemo(() => {
    return quotes && quotes.length > 0 ? quotes[currentQuoteIndex % quotes.length] : {
      id: '0',
      text: 'Be kind to yourself every day.',
      category: 'Self-Love' as CategoryKey
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

  // Lấy background image dựa trên category
  const backgroundImage = useMemo(() => {
    return getBackgroundImage(safeQuote.category);
  }, [safeQuote.category]);

// const backgroundImage = require('../../assets/backgrounds/success.jpg');

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const toggleFavorite = async () => {
    try {
      console.log('Before toggle - isFavorite:', isFavorite);
      
      // Cập nhật state ngay lập tức để UI thay đổi
      setIsFavorite(!isFavorite);
      
      let updatedFavorites: Quote[];
      if (isFavorite) {
        updatedFavorites = favoriteQuotes.filter(quote => quote.id !== safeQuote.id);
      } else {
        updatedFavorites = [...favoriteQuotes, safeQuote];
      }
      
      // Lưu vào AsyncStorage
      await AsyncStorage.setItem('favorite_quotes', JSON.stringify(updatedFavorites));
      setFavoriteQuotes(updatedFavorites);
      setTotalFavorites(updatedFavorites.length);
      
      console.log('After toggle - isFavorite set to:', !isFavorite);
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

  const handleShare = async () => {
    try {
      if (viewShotRef.current?.capture) {
        const uri = await viewShotRef.current.capture();
        await Share.open({
          url: uri,
          title: 'Share Quote',
          message: 'Check out this inspiring quote!',
        });
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

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
      <ViewShot ref={viewShotRef} style={styles.container}>
        <ImageBackground 
          source={backgroundImage}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <SafeAreaView style={styles.safeAreaContainer}>
            <TouchableOpacity
              style={styles.shareButtonContainer}
              onPress={handleShare}
              activeOpacity={0.6}
            >
              <View style={styles.actionButton}>
                <Image
                  source={require('../../assets/icons/share.png')}
                  style={styles.actionButtonIcon}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favoriteButtonContainer}
              onPress={toggleFavorite}
              activeOpacity={0.6}
            >
              <View style={[styles.actionButton]}>
                {(() => {
                  const iconSource = isFavorite 
                    ? require('../../assets/icons/heart-active.png') 
                    : require('../../assets/icons/heart-inactive.png');
                  
                  return (
                    <Image
                      source={iconSource}
                      style={[
                        styles.actionButtonIcon,
                        isFavorite ? { tintColor: '#ff4c4c' } : { tintColor: '#fff' }
                      ]}
                      key={`favorite-${isFavorite}`}
                    />
                  );
                })()}
              </View>
            </TouchableOpacity>

            {/* Quote Content */}
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteText}>{safeQuote.text}</Text>
            </View>

          </SafeAreaView>
        </ImageBackground>
      </ViewShot>
    </View>
  );
};

export default MainQuoteScreen;


