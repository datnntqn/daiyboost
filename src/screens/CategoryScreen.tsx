import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { createStyles } from './styles/CategoryScreen.styles';
import { quotes } from '../data/quotes';
import { Quote, CategoryType } from '../types/Quote';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { categoryAssets } from '../constants/categoryAssets';

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
  const categoryQuotes = quotes.filter(quote => quote.category === category);

  const toggleFavorite = async (quote: Quote) => {
    try {
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

  const renderQuoteItem = ({ item }: { item: Quote }) => {
    const isFavorite = favoriteQuotes.some(quote => quote.id === item.id);
    
    return (
      <View style={styles.quoteCard}>
        <Text style={styles.quoteText}>{item.text}</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item)}
        >
          <Text style={styles.favoriteIcon}>
            {isFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>
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
            ? ['rgba(26, 26, 26, 0.9)', 'rgba(26, 26, 26, 0.7)']
            : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
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
            >
              <Text style={styles.backButtonText}>←</Text>
              <Text style={styles.backText}>Back</Text>
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


