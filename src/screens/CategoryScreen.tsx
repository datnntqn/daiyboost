import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { categories } from '../data/quotes';
import { createStyles } from './styles/CategoryScreen.styles';
import { RootStackParamList, Category } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';
import { lightColors, darkColors } from '../theme/colors';

type CategoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Category'>;

type CategoryScreenProps = {
  navigation: CategoryScreenNavigationProp;
};

const categoryIcons: Record<string, string> = {
  'Happiness': '😊',
  'Productivity': '✅',
  'Self-Love': '💙',
  'Inspiration': '💡',
  'Success': '⭐',
  'Mindfulness': '🧘',
};

const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);
  const [searchText, setSearchText] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => navigation.navigate('QuoteList', { category: item.name })}
    >
      <Text style={styles.categoryIcon}>
        {categoryIcons[item.name] || '📝'}
      </Text>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search categories"
          placeholderTextColor={isDarkMode ? darkColors.textSecondary : lightColors.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
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


