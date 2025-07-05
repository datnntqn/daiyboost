import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Animated, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { Quote } from '../types/Quote';
import { categoryAssets } from '../constants/categoryAssets';
import { useFocusEffect } from '@react-navigation/native';
import { createStyles } from './styles/FavoriteQuotesScreen.styles';
import { Swipeable, RectButton, GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

type RenderItemProps = {
  item: Quote;
  index: number;
};

const FavoriteQuotesScreen = () => {
  const [favoriteQuotes, setFavoriteQuotes] = useState<Quote[]>([]);
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);
  const rowRefs = useRef<Map<string, Swipeable>>(new Map());
  let prevOpenedRow: Swipeable | null = null;

  useFocusEffect(
    React.useCallback(() => {
      loadFavoriteQuotes();
    }, [])
  );

  const loadFavoriteQuotes = async () => {
    try {
      const savedQuotes = await AsyncStorage.getItem('favorite_quotes');
      if (savedQuotes) {
        const parsedQuotes = JSON.parse(savedQuotes);
        setFavoriteQuotes(parsedQuotes);
      }
    } catch (error) {
      console.error('Error loading favorite quotes:', error);
    }
  };

  const removeFavorite = async (quoteId: string) => {
    try {
      const savedQuotes = await AsyncStorage.getItem('favorite_quotes');
      if (savedQuotes) {
        const currentQuotes = JSON.parse(savedQuotes);
        const updatedQuotes = currentQuotes.filter((quote: Quote) => quote.id !== quoteId);
        
        await AsyncStorage.setItem('favorite_quotes', JSON.stringify(updatedQuotes));
        setFavoriteQuotes(updatedQuotes);
      }
    } catch (error) {
      console.error('Error removing favorite quote:', error);
    }
  };

  const closeRow = (id: string) => {
    const row = rowRefs.current.get(id);
    if (prevOpenedRow && prevOpenedRow !== row) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row || null;
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    quoteId: string
  ) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });

    return (
      <RectButton style={styles.rightAction} onPress={() => removeFavorite(quoteId)}>
        <Animated.View
          style={[
            styles.deleteAction,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <Text style={styles.actionText}>Delete</Text>
        </Animated.View>
      </RectButton>
    );
  };

  const renderQuoteItem = ({ item }: RenderItemProps) => {
    const categoryAsset = categoryAssets[item.category];
    
    return (
      <Swipeable
        ref={(ref: Swipeable | null) => {
          if (ref) {
            rowRefs.current.set(item.id, ref);
          } else {
            rowRefs.current.delete(item.id);
          }
        }}
        friction={2}
        leftThreshold={80}
        rightThreshold={40}
        renderRightActions={(progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) =>
          renderRightActions(progress, dragX, item.id)
        }
        onSwipeableOpen={() => closeRow(item.id)}
      >
        <View style={styles.quoteCard}>
          <View style={styles.quoteHeader}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryIcon}>{categoryAsset.emoji}</Text>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          </View>
          <Text style={styles.quoteText}>{item.text}</Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ImageBackground
        source={require('../../assets/backgrounds/mindfulness_bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={isDarkMode 
            ? ['rgba(26, 26, 26, 0.9)', 'rgba(26, 26, 26, 0.7)']
            : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
          style={styles.gradientOverlay}
        />
        <SafeAreaView style={styles.contentContainer}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={isDarkMode ? '#1a1a1a' : '#ffffff'}
          />
          <View style={styles.contentContainer}>
            {favoriteQuotes.length > 0 ? (
              <FlatList
                data={favoriteQuotes}
                renderItem={renderQuoteItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No favorite quotes yet</Text>
                <Text style={styles.emptySubText}>Tap the heart icon on any quote to add it to your favorites</Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default FavoriteQuotesScreen; 