import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { quotes } from '../data/quotes';

const QuoteListScreen: React.FC = ({ route }) => {
  const { category } = route.params;
  const [favoriteQuotes, setFavoriteQuotes] = useState<string[]>([]);

  const filteredQuotes = quotes.filter(quote => quote.category === category);

  const toggleFavorite = (quoteText: string) => {
    if (favoriteQuotes.includes(quoteText)) {
      setFavoriteQuotes(favoriteQuotes.filter(fav => fav !== quoteText));
    } else {
      setFavoriteQuotes([...favoriteQuotes, quoteText]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.quoteItem}>
      <Text style={styles.quoteText}>{item.text}</Text>
      <TouchableOpacity onPress={() => toggleFavorite(item.text)}>
        <Text style={styles.favoriteIcon}>{favoriteQuotes.includes(item.text) ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Quotes</Text>
      <FlatList
        data={filteredQuotes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  quoteItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FF7F50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 16,
    color: '#333333',
    flexShrink: 1,
    marginRight: 10,
  },
  favoriteIcon: {
    fontSize: 24,
  },
});

export default QuoteListScreen;


