import React, { useMemo } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { categoryAssets } from '../constants/categoryAssets';
import { CategoryType } from '../types/categories';
import CategoryGrid from '../components/CategoryGrid';
import { BlurView } from '@react-native-community/blur';

type RootStackParamList = {
  Category: { category: CategoryType };
};

type CategoriesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

const CategoriesScreen = () => {
  const navigation = useNavigation<CategoriesScreenNavigationProp>();
  const { isDarkMode } = useTheme();

  const categoryData = useMemo(() => {
    return Object.entries(categoryAssets).map(([key, value]) => ({
      id: key,
      title: key,
      subtitle: value.description,
      icon: value.emoji,
    })) as CategoryItem[];
  }, []);

  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('Category', { category: categoryId as CategoryType });
  };

  // Chọn background phù hợp cho màn hình
  const backgroundImage = isDarkMode 
    ? require('../../assets/backgrounds_new/minimal.jpg') 
    : require('../../assets/backgrounds_new/calm.jpg');

  return (
    <ImageBackground 
      source={backgroundImage}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      
      {/* Overlay mờ cho toàn màn hình */}
      <BlurView
        style={styles.blurContainer}
        blurType={isDarkMode ? 'dark' : 'light'}
        blurAmount={25}
        reducedTransparencyFallbackColor={isDarkMode ? 'rgba(20, 20, 20, 0.8)' : 'rgba(255, 255, 255, 0.8)'}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={[
              styles.headerTitle,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}>
              Categories
            </Text>
          </View>

          <View style={styles.gridContainer}>
            <CategoryGrid 
              data={categoryData}
              onPressCategory={handleCategoryPress}
            />
          </View>
        </SafeAreaView>
      </BlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  blurContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 12 : 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    fontFamily: Platform.OS === 'ios' ? 'System' : undefined,
  },
  gridContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
});

export default CategoriesScreen; 