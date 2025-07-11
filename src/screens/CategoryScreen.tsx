import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Animated,
  Share,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { createStyles } from './styles/CategoryScreen.styles';
import { quotes } from '../data/quotes';
import { Quote } from '../data/quotes';
import { CategoryType } from '../types/categories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { categoryAssets } from '../constants/categoryAssets';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

type RootStackParamList = {
  Category: { category: CategoryType };
};

type CategoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

type CategoryScreenStyles = ReturnType<typeof StyleSheet.create>;

const CategoryScreen = () => {
  const navigation = useNavigation<CategoryScreenNavigationProp>();
  const route = useRoute<CategoryScreenRouteProp>();
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode) as CategoryScreenStyles;
  const [favoriteQuotes, setFavoriteQuotes] = useState<Quote[]>([]);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [heartAnimQuote, setHeartAnimQuote] = useState<string | null>(null);
  const heartScale = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    loadFavoriteQuotes();
  }, []);

  // Add safety check for route.params
  if (!route.params?.category) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Category not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const { category } = route.params;
  const categoryAsset = categoryAssets[category] || categoryAssets.default;
  // Convert category name to match the CategoryType format
  const normalizedCategory = category.toLowerCase().replace(/-/g, '_') as CategoryType;
  const categoryQuotes = quotes.filter(quote => quote.category.toLowerCase().replace(/-/g, '_') === normalizedCategory);

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleFavorite = async (quote: Quote) => {
    try {
      animatePress();
      const isFavorite = favoriteQuotes.some(q => q.id === quote.id);
      let updatedFavorites: Quote[];

      if (isFavorite) {
        updatedFavorites = favoriteQuotes.filter(q => q.id !== quote.id);
      } else {
        updatedFavorites = [...favoriteQuotes, quote];
      }

      await AsyncStorage.setItem('favorite_quotes', JSON.stringify(updatedFavorites));
      setFavoriteQuotes(updatedFavorites);
    } catch (error) {
      console.error('Error updating favorite quotes:', error);
    }
  };

  const handleDoubleTap = (quote: Quote) => (event: { nativeEvent: { state: number } }) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      toggleFavorite(quote);
      animateHeartForQuote(quote.id);
    }
  };

  const animateHeartForQuote = (quoteId: string) => {
    setHeartAnimQuote(quoteId);
    heartScale.setValue(0);
    
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        setHeartAnimQuote(null);
        heartScale.setValue(0);
      }, 500);
    });
  };

  const handleShare = async (quote: Quote) => {
    try {
      await Share.share({
        message: `"${quote.text}" - ${quote.author}`,
      });
    } catch (error) {
      console.error('Error sharing quote:', error);
    }
  };

  const renderQuoteItem = ({ item }: { item: Quote }) => {
    const isFavorite = favoriteQuotes.some(quote => quote.id === item.id);
    const isAnimatingHeart = heartAnimQuote === item.id;
    
    return (
      <TapGestureHandler
        onHandlerStateChange={handleDoubleTap(item)}
        numberOfTaps={2}
      >
        <Animated.View 
          style={[
            styles.quoteCard,
          ]}
        >
          <Text style={styles.quoteText}>{item.text}</Text>
          {isAnimatingHeart && (
            <Animated.View style={[styles.heartAnimationContainer, {
              transform: [{ scale: heartScale }]
            }]}>
              <Text style={styles.heartAnimationIcon}>
                {isFavorite ? '🤍' : '❤️'}
              </Text>
            </Animated.View>
          )}
          <View style={styles.actionBar}>
            <View style={styles.leftActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => toggleFavorite(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.actionIcon}>
                  {isFavorite ? '❤️' : '🤍'}
                </Text>
                <Text style={styles.actionButtonText}>
                  {isFavorite ? 'Liked' : 'Like'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rightActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleShare(item)}
                activeOpacity={0.7}
              >
                <Image
                  source={require('../../assets/icons/share.png')}
                  // @ts-ignore
                  style={styles.actionButtonIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </TapGestureHandler>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={categoryAsset.background}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={isDarkMode 
            ? ['rgba(26, 26, 26, 0.92)', 'rgba(26, 26, 26, 0.85)']
            : ['rgba(255, 255, 255, 0.92)', 'rgba(255, 255, 255, 0.85)']}
          style={styles.gradientOverlay}
        />
        <SafeAreaView style={styles.contentContainer}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor="transparent"
            translucent
          />
          
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>
              {categoryAsset.emoji} {category} Quotes
            </Text>
            <Text style={styles.headerSubtitle}>
              Motive Me - Find your inspiration
            </Text>
          </View>

          <FlatList
            data={categoryQuotes}
            renderItem={renderQuoteItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default CategoryScreen;


