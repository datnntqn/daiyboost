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
  GestureResponderEvent,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { quotes, getBackgroundImage, CategoryKey, Quote } from '../data/quotes';
import { createStyles } from './styles/MainQuoteScreen.styles';
import { useTheme } from '../context/ThemeContext';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';

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
      category: 'Self-Love' as CategoryKey,
      author: 'Anonymous'
    };
  }, [currentQuoteIndex]);

  const checkIfFavorite = useCallback(() => {
    const isFav = favoriteQuotes.some(quote => quote.id === safeQuote.id);
    setIsFavorite(isFav);
  }, [favoriteQuotes, safeQuote.id]);

  useEffect(() => {
    loadFavoriteQuotes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // Chỉ chạy một lần khi component mount

  useEffect(() => {
    checkIfFavorite();
  }, [checkIfFavorite, safeQuote.id]);

  // Cập nhật trạng thái yêu thích khi quote thay đổi
  useEffect(() => {
    if (favoriteQuotes.length > 0) {
      const isCurrentQuoteFavorite = favoriteQuotes.some(quote => quote.id === safeQuote.id);
      if (isCurrentQuoteFavorite !== isFavorite) {
        setIsFavorite(isCurrentQuoteFavorite);
        console.log('Updating favorite status for new quote:', isCurrentQuoteFavorite);
      }
    }
  }, [safeQuote.id, favoriteQuotes, isFavorite]);

  const loadFavoriteQuotes = async () => {
    try {
      console.log('Loading favorite quotes from AsyncStorage...');
      const savedQuotes = await AsyncStorage.getItem('favorite_quotes');
      
      if (savedQuotes) {
        try {
          const parsedQuotes = JSON.parse(savedQuotes);
          
          // Đảm bảo dữ liệu đọc được là một mảng
          if (Array.isArray(parsedQuotes)) {
            console.log('Loaded favorites successfully. Count:', parsedQuotes.length);
            setFavoriteQuotes(parsedQuotes);
            setTotalFavorites(parsedQuotes.length);
            
            // Kiểm tra xem quote hiện tại có trong danh sách yêu thích không
            const isCurrentQuoteFavorite = parsedQuotes.some(quote => quote.id === safeQuote.id);
            setIsFavorite(isCurrentQuoteFavorite);
            console.log('Current quote favorite status:', isCurrentQuoteFavorite);
          } else {
            console.warn('Saved favorites is not an array, resetting to empty array');
            setFavoriteQuotes([]);
            setTotalFavorites(0);
            setIsFavorite(false);
          }
        } catch (parseError) {
          console.error('Error parsing favorite quotes:', parseError);
          setFavoriteQuotes([]);
          setTotalFavorites(0);
          setIsFavorite(false);
        }
      } else {
        console.log('No saved favorites found');
        setFavoriteQuotes([]);
        setTotalFavorites(0);
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Error loading favorite quotes:', error);
      setFavoriteQuotes([]);
      setTotalFavorites(0);
      setIsFavorite(false);
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
      
      // Lấy danh sách favorites hiện tại từ AsyncStorage
      const savedQuotesStr = await AsyncStorage.getItem('favorite_quotes');
      let currentFavorites: Quote[] = [];
      
      if (savedQuotesStr) {
        try {
          currentFavorites = JSON.parse(savedQuotesStr);
          // Đảm bảo dữ liệu đọc được là một mảng
          if (!Array.isArray(currentFavorites)) {
            currentFavorites = [];
          }
        } catch (parseError) {
          console.error('Error parsing favorites:', parseError);
          currentFavorites = [];
        }
      }
      
      let updatedFavorites: Quote[];
      
      if (isFavorite) {
        // Xóa khỏi danh sách yêu thích
        console.log('Removing from favorites:', safeQuote.id);
        updatedFavorites = currentFavorites.filter(quote => quote.id !== safeQuote.id);
      } else {
        // Thêm vào danh sách yêu thích
        console.log('Adding to favorites:', safeQuote.id);
        // Kiểm tra xem quote đã tồn tại trong danh sách chưa
        const quoteExists = currentFavorites.some(quote => quote.id === safeQuote.id);
        if (!quoteExists) {
          updatedFavorites = [...currentFavorites, safeQuote];
        } else {
          updatedFavorites = currentFavorites;
        }
      }
      
      // Lưu vào AsyncStorage
      await AsyncStorage.setItem('favorite_quotes', JSON.stringify(updatedFavorites));
      console.log('Saved to AsyncStorage. Total favorites:', updatedFavorites.length);
      
      // Cập nhật state
      setFavoriteQuotes(updatedFavorites);
      setTotalFavorites(updatedFavorites.length);
      
      console.log('After toggle - isFavorite set to:', !isFavorite);
    } catch (error) {
      console.error('Error updating favorite quotes:', error);
      // Revert UI state if there was an error
      setIsFavorite(isFavorite);
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
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)']}
            style={styles.gradientOverlay}
          />
          
          <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.topBar}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleShare}
                activeOpacity={0.6}
              >
                <Image
                  source={require('../../assets/icons/share.png')}
                  style={styles.actionButtonIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={toggleFavorite}
                activeOpacity={0.6}
              >
                <Image
                  source={isFavorite ? require('../../assets/icons/heart-active.png') : require('../../assets/icons/heart-inactive.png')}
                  style={styles.actionButtonIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.quoteContainer}>
              <Text style={styles.quoteText}>
                "{safeQuote.text}"
              </Text>
              <Text style={styles.authorText}>
                - {safeQuote.author}
              </Text>
            </View>

            <View style={styles.bottomBar}>
              <Text style={styles.categoryText}>
                MotiveMe.app
              </Text>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </ViewShot>
    </View>
  );
};

export default MainQuoteScreen;


