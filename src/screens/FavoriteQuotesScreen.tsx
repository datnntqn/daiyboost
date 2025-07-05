import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { Quote } from '../types/Quote';
import { categoryAssets } from '../constants/categoryAssets';
import { useFocusEffect } from '@react-navigation/native';

const FavoriteQuotesScreen = () => {
  const [favoriteQuotes, setFavoriteQuotes] = useState<Quote[]>([]);
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);

  useFocusEffect(
    React.useCallback(() => {
      loadFavoriteQuotes();
    }, [])
  );

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

  const removeFavorite = async (quoteId: string) => {
    try {
      const updatedQuotes = favoriteQuotes.filter(quote => quote.id !== quoteId);
      await AsyncStorage.setItem('favorite_quotes', JSON.stringify(updatedQuotes));
      setFavoriteQuotes(updatedQuotes);
    } catch (error) {
      console.error('Error removing favorite quote:', error);
    }
  };

  const renderQuoteItem = ({ item }: { item: Quote }) => {
    const categoryAsset = categoryAssets[item.category];
    
    return (
      <View style={styles.quoteCard}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryIcon}>{categoryAsset.emoji}</Text>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.quoteText}>{item.text}</Text>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => removeFavorite(item.id)}
        >
          <Text style={styles.removeButtonText}>Remove from Favorites</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#ffffff'}
      />
      <View style={styles.container}>
        {favoriteQuotes.length > 0 ? (
          <FlatList
            data={favoriteQuotes}
            renderItem={renderQuoteItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No favorite quotes yet</Text>
            <Text style={styles.emptySubText}>Tap the heart icon on any quote to add it to your favorites</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const createStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  quoteCard: {
    backgroundColor: isDarkMode ? '#2A2A2A' : '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: isDarkMode ? '#000000' : '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: isDarkMode ? 0.5 : 0.1,
    shadowRadius: 4,
    elevation: isDarkMode ? 8 : 4,
    borderWidth: 1,
    borderColor: isDarkMode ? '#3A3A3A' : '#E5E5E5',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#3A3A3A' : '#F5F5F5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    color: isDarkMode ? '#FFFFFF' : '#333333',
    fontWeight: '500',
  },
  quoteText: {
    fontSize: 16,
    color: isDarkMode ? '#FFFFFF' : '#333333',
    lineHeight: 24,
    marginBottom: 16,
    fontWeight: '400',
  },
  removeButton: {
    backgroundColor: isDarkMode ? '#3A3A3A' : '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  removeButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 20,
    color: isDarkMode ? '#FFFFFF' : '#333333',
    fontWeight: '600',
    marginBottom: 12,
  },
  emptySubText: {
    fontSize: 16,
    color: isDarkMode ? '#AAAAAA' : '#666666',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '80%',
  },
});

export default FavoriteQuotesScreen; 