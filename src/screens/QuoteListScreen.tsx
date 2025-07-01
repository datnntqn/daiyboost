import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { quotes, Quote } from '../data/quotes';
import { styles } from './styles/QuoteListScreen.styles';
import { RootStackParamList } from '../types/navigation';

type QuoteListScreenProps = NativeStackScreenProps<RootStackParamList, 'QuoteList'>;

const QuoteListScreen: React.FC<QuoteListScreenProps> = ({ route }) => {
  const { category } = route.params;
  const [favoriteQuotes, setFavoriteQuotes] = useState<string[]>([]);

  const filteredQuotes = quotes.filter(quote => quote.category === category);

  const toggleFavorite = (quoteId: string) => {
    if (favoriteQuotes.includes(quoteId)) {
      setFavoriteQuotes(favoriteQuotes.filter(fav => fav !== quoteId));
    } else {
      setFavoriteQuotes([...favoriteQuotes, quoteId]);
    }
  };

  const renderItem = ({ item }: { item: Quote }) => (
    <View style={styles.quoteItem}>
      <Text style={styles.quoteText}>{item.text}</Text>
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Text style={[
          styles.favoriteIcon, 
          favoriteQuotes.includes(item.id) && styles.favoriteIconActive
        ]}>
          {favoriteQuotes.includes(item.id) ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>Daily Boost</Text>
        <Text style={styles.title}>{category} Quotes</Text>
      </View>
      
      <FlatList
        data={filteredQuotes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default QuoteListScreen;


