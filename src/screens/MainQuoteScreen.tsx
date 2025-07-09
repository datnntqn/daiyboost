import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { quotes, getBackgroundImage, CategoryKey, Quote } from '../data/quotes';
import { createStyles } from './styles/MainQuoteScreen.styles';
import { useTheme } from '../context/ThemeContext';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundPicker, { BackgroundOption, backgroundOptions } from '../components/BackgroundPicker';

// Bỏ qua cảnh báo
LogBox.ignoreLogs(['Require cycle:']);

type MainQuoteScreenProps = {};

const MainQuoteScreen: React.FC<MainQuoteScreenProps> = () => {
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteQuotes, setFavoriteQuotes] = useState<Quote[]>([]);
  const [startY, setStartY] = useState(0);
  const viewShotRef = useRef<ViewShot>(null);
  const [selectedBackgroundId, setSelectedBackgroundId] = useState('default');
  const [customBackground, setCustomBackground] = useState<any>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // Tải trước hình ảnh
  const heartActiveIcon = require('../../assets/icons/heart-active.png');
  const heartInactiveIcon = require('../../assets/icons/heart-inactive.png');

  const safeQuote = useMemo(() => {
    return quotes && quotes.length > 0 ? quotes[currentQuoteIndex % quotes.length] : {
      id: '0',
      text: 'Be kind to yourself every day.',
      category: 'Self-Love' as CategoryKey,
      author: 'Anonymous'
    };
  }, [currentQuoteIndex]);

  const backgroundImage = useMemo(() => {
    if (customBackground) {
      return customBackground;
    }
    return getBackgroundImage(safeQuote.category);
  }, [safeQuote.category, customBackground]);

  useEffect(() => {
    loadFavoriteQuotes();
    loadCustomBackground();
  }, []);

  useEffect(() => {
    // Cập nhật lại trạng thái isFavorite khi quote thay đổi
    const isFav = favoriteQuotes.some(quote => quote.id === safeQuote.id);
    console.log(`Quote ${safeQuote.id} isFavorite: ${isFav}`);
    setIsFavorite(isFav);
  }, [safeQuote.id, favoriteQuotes]);

  const loadFavoriteQuotes = async () => {
    try {
      console.log('Loading favorite quotes from AsyncStorage...');
      const savedQuotes = await AsyncStorage.getItem('favorite_quotes');
      
      if (savedQuotes) {
        try {
          const parsedQuotes = JSON.parse(savedQuotes);
          if (Array.isArray(parsedQuotes)) {
            setFavoriteQuotes(parsedQuotes);
            console.log('Loaded favorites successfully. Count:', parsedQuotes.length);
          } else {
            setFavoriteQuotes([]);
          }
        } catch (error) {
          console.error('Error parsing favorites:', error);
          setFavoriteQuotes([]);
        }
      } else {
        setFavoriteQuotes([]);
        console.log('No saved favorites found');
      }
    } catch (error) {
      console.error('Error loading favorite quotes:', error);
      setFavoriteQuotes([]);
    }
  };

  const loadCustomBackground = async () => {
    try {
      const savedBackgroundId = await AsyncStorage.getItem('selected_background_id');
      if (savedBackgroundId) {
        setSelectedBackgroundId(savedBackgroundId);
        if (savedBackgroundId !== 'default') {
          const backgroundOption = backgroundOptions.find((bg: BackgroundOption) => bg.id === savedBackgroundId);
          if (backgroundOption) {
            setCustomBackground(backgroundOption.source);
          }
        } else {
          setCustomBackground(null);
        }
      }
    } catch (error) {
      console.error('Error loading custom background:', error);
    }
  };

  const handleBackgroundSelect = async (background: BackgroundOption) => {
    try {
      await AsyncStorage.setItem('selected_background_id', background.id);
      setSelectedBackgroundId(background.id);
      if (background.id === 'default') {
        setCustomBackground(null);
      } else {
        setCustomBackground(background.source);
      }
    } catch (error) {
      console.error('Error saving custom background:', error);
      Alert.alert('Error', 'Failed to save background preference');
    }
  };

  const toggleFavorite = async () => {
    try {
      // Cập nhật UI ngay lập tức
      const newFavoriteState = !isFavorite;
      console.log(`Toggling favorite from ${isFavorite} to ${newFavoriteState}`);
      setIsFavorite(newFavoriteState);
      
      // Lấy danh sách hiện tại
      const savedQuotesStr = await AsyncStorage.getItem('favorite_quotes');
      let currentFavorites: Quote[] = [];
      
      if (savedQuotesStr) {
        try {
          const parsed = JSON.parse(savedQuotesStr);
          currentFavorites = Array.isArray(parsed) ? parsed : [];
        } catch {
          currentFavorites = [];
        }
      }
      
      let updatedFavorites: Quote[];
      
      if (newFavoriteState) {
        // Thêm vào danh sách yêu thích
        console.log('Adding to favorites:', safeQuote.id);
        const exists = currentFavorites.some(q => q.id === safeQuote.id);
        updatedFavorites = exists ? currentFavorites : [...currentFavorites, safeQuote];
      } else {
        // Xóa khỏi danh sách yêu thích
        console.log('Removing from favorites:', safeQuote.id);
        updatedFavorites = currentFavorites.filter(q => q.id !== safeQuote.id);
      }
      
      // Lưu vào AsyncStorage
      await AsyncStorage.setItem('favorite_quotes', JSON.stringify(updatedFavorites));
      
      // Cập nhật state
      setFavoriteQuotes(updatedFavorites);
      console.log('Favorites updated. Count:', updatedFavorites.length);
    } catch (error) {
      console.error('Error updating favorites:', error);
      setIsFavorite(!isFavorite); // Khôi phục UI nếu có lỗi
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const handleTouchStart = (event: GestureResponderEvent) => {
    setStartY(event.nativeEvent.pageY);
  };

  const handleTouchEnd = (event: GestureResponderEvent) => {
    const endY = event.nativeEvent.pageY;
    const deltaY = startY - endY;
    if (deltaY > 50) handleNextQuote();
  };

  const handleShare = async () => {
    try {
      if (viewShotRef.current?.capture) {
        setIsCapturing(true);
        
        setTimeout(async () => {
          try {
            const uri = await viewShotRef.current!.capture!();
            await Share.open({
              url: uri,
              title: 'Share Quote',
              message: 'Check out this inspiring quote!',
            });
          } catch (error) {
            console.log('Error capturing or sharing:', error);
          } finally {
            setIsCapturing(false);
          }
        }, 10); // Reduced from 100ms to 10ms
      }
    } catch (error) {
      setIsCapturing(false);
      console.log('Error sharing:', error);
    }
  };

  // Memoize heart icon để tránh render lại không cần thiết
  const heartIconMemo = useMemo(() => {
    console.log('Creating memoized heart icon with isFavorite =', isFavorite);
    return (
      <Image
        testID={`heart-icon-${isFavorite ? 'active' : 'inactive'}`}
        source={isFavorite ? heartActiveIcon : heartInactiveIcon}
        style={[styles.actionButtonIcon, isFavorite && styles.redHeartIcon]}
      />
    );
  }, [isFavorite, styles.actionButtonIcon, styles.redHeartIcon, heartActiveIcon, heartInactiveIcon]);

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
            {!isCapturing && (
              <View style={styles.topBar}>
                <View style={styles.leftActions}>
                  <BackgroundPicker
                    onSelectBackground={handleBackgroundSelect}
                    selectedBackgroundId={selectedBackgroundId}
                  />
                </View>

                <View style={styles.rightActions}>
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
                    {heartIconMemo}
                  </TouchableOpacity>
                </View>
              </View>
            )}

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
