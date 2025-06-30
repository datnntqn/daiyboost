import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { quotes } from '../data/quotes';
import { styles } from './styles/QuoteListScreen.styles';

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

export default QuoteListScreen;


