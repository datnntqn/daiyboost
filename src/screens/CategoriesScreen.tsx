import React, { useMemo } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { categoryAssets } from '../constants/categoryAssets';
import { CategoryType } from '../types/categories';
import LinearGradient from 'react-native-linear-gradient';
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

  const renderHeader = () => {
    if (Platform.OS === 'ios') {
      return (
        <BlurView
          style={styles.headerBlur}
          blurType={isDarkMode ? 'dark' : 'light'}
          blurAmount={10}
          reducedTransparencyFallbackColor={isDarkMode ? 'rgba(26, 26, 26, 0.85)' : 'rgba(255, 255, 255, 0.85)'}
        >
          <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
            Categories
          </Text>
          <Text style={[styles.headerSubtitle, { color: isDarkMode ? '#CCCCCC' : '#666666' }]}>
            Choose your daily boost
          </Text>
        </BlurView>
      );
    } else {
      return (
        <View style={[styles.headerBlur, { 
          backgroundColor: isDarkMode ? 'rgba(26, 26, 26, 0.85)' : 'rgba(255, 255, 255, 0.85)'
        }]}>
          <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
            Categories
          </Text>
          <Text style={[styles.headerSubtitle, { color: isDarkMode ? '#CCCCCC' : '#666666' }]}>
            Choose your daily boost
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground
        source={require('../../assets/backgrounds/Wave.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={isDarkMode 
            ? ['rgba(26, 26, 26, 0.3)', 'rgba(26, 26, 26, 0.6)']
            : ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.6)']}
          style={styles.gradientOverlay}
          pointerEvents="none"
        />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            {renderHeader()}
          </View>

          <View style={styles.gridContainer}>
            <CategoryGrid 
              data={categoryData}
              onPressCategory={handleCategoryPress}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  safeArea: {
    flex: 1,
    zIndex: 2,
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 12,
    zIndex: 3,
  },
  headerBlur: {
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  gridContainer: {
    flex: 1,
    paddingTop: 4,
  },
});

export default CategoriesScreen; 