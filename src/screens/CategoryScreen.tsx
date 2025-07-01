import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { categories } from '../data/quotes';
import { styles } from './styles/CategoryScreen.styles';
import { RootStackParamList, Category } from '../types/navigation';

type CategoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Category'>;

type CategoryScreenProps = {
  navigation: CategoryScreenNavigationProp;
};

const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => navigation.navigate('QuoteList', { category: item.name })}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>Daily Boost</Text>
          <Text style={styles.title}>Categories</Text>
        </View>
      </View>
      
      <TextInput
        style={styles.searchBar}
        placeholder="Search categories"
        placeholderTextColor="#BDC3C7"
        value={searchText}
        onChangeText={setSearchText}
      />
      
      <FlatList
        data={filteredCategories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.adBanner}>
        <Text style={styles.adText}>Ad</Text>
      </View>
    </View>
  );
};

export default CategoryScreen;


