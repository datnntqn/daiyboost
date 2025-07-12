import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { createStyles } from './styles/CategoriesScreen.styles';
import { categoryAssets } from '../constants/categoryAssets';
import { CategoryType } from '../types/categories';
import LinearGradient from 'react-native-linear-gradient';

type RootStackParamList = {
  Category: { category: CategoryType };
};

type CategoriesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CategoriesScreen = () => {
  const navigation = useNavigation<CategoriesScreenNavigationProp>();
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);

  const categories = Object.keys(categoryAssets) as CategoryType[];

  const handleCategoryPress = (category: CategoryType) => {
    navigation.navigate('Category', { category });
  };

  const renderCategoryItem = ({ item: category }: { item: CategoryType }) => {
    const asset = categoryAssets[category];
    return (
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() => handleCategoryPress(category)}
      >
        <ImageBackground
          source={asset.background}
          style={styles.categoryBackground}
          resizeMode="cover"
        >
          <LinearGradient
            colors={isDarkMode 
              ? ['rgba(26, 26, 26, 0.9)', 'rgba(26, 26, 26, 0.7)']
              : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
            style={styles.gradientOverlay}
          />
          <View style={styles.categoryContent}>
            <Text style={styles.categoryEmoji}>{asset.emoji}</Text>
            <Text style={styles.categoryTitle}>{category}</Text>
            <Text style={styles.categoryDescription}>{asset.description}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView style={styles.safeArea}>
        {/* <View style={styles.header}>
          <Text style={styles.headerTitle}>Categories</Text>
          <Text style={styles.headerSubtitle}>Choose your daily boost</Text>
        </View> */}
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default CategoriesScreen; 