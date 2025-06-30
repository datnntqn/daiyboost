import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { categories } from '../data/quotes';
import { styles } from './styles/CategoryScreen.styles';

const CategoryScreen: React.FC = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => navigation.navigate('QuoteList', { category: item.name })}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search categories"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredCategories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default CategoryScreen;


