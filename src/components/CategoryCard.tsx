import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  View,
  ImageBackground,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface CategoryCardProps {
  item: {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
  };
  onPress: (id: string) => void;
  index?: number;
}

const { width } = Dimensions.get('window');
// Tính toán chiều rộng card dựa trên chiều rộng màn hình và padding
const HORIZONTAL_PADDING = 16 * 2; // Tổng padding ngang của container
const CARD_GAP = 16; // Khoảng cách giữa 2 card
const CARD_WIDTH = (width - HORIZONTAL_PADDING - CARD_GAP) / 2; // 2 columns

const getBackgroundImage = (categoryName: string) => {
  switch (categoryName) {
    case 'Happiness':
      return require('../../assets/backgrounds_new/calm.jpg');
    case 'Productivity':
      return require('../../assets/backgrounds_new/productivity_tips.jpg');
    case 'Self-Love':
      return require('../../assets/backgrounds_new/forest.jpg');
    case 'Inspiration':
      return require('../../assets/backgrounds_new/wave.jpg');
    case 'Success':
      return require('../../assets/backgrounds/success.jpg');
    case 'Mindfulness':
      return require('../../assets/backgrounds_new/rain.jpg');
    default:
      return require('../../assets/backgrounds/Wave.jpg');
  }
};

const CategoryCard: React.FC<CategoryCardProps> = ({ item, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const backgroundImage = getBackgroundImage(item.title);

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.touchable}
        onPress={() => onPress(item.id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']}
            locations={[0.4, 0.75, 1.0]}
            style={styles.gradientOverlay}
          />
          <View style={styles.contentContainer}>
            <Text
              style={styles.title}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text
              style={styles.subtitle}
              numberOfLines={2}
            >
              {item.subtitle}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.3,
    marginBottom: 0, // Không cần margin dưới vì đã có marginBottom trong columnWrapper
    marginHorizontal: 0, // Không cần margin ngang vì đã tính trong CARD_WIDTH
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  touchable: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    borderRadius: 16,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : undefined,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#E0E0E0',
    fontFamily: Platform.OS === 'ios' ? 'System' : undefined,
  },
});

export default CategoryCard; 