import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { BlurView } from '@react-native-community/blur';

const { width } = Dimensions.get('window');
const ITEM_SPACING = 12;
const ITEM_WIDTH = (width - 40 - ITEM_SPACING) / 2;

export type BackgroundOption = {
  id: string;
  source: any;
  name: string;
};

export const backgroundOptions: BackgroundOption[] = [
  { id: 'default', source: require('../../assets/main_quote_background.png'), name: 'Default' },
  { id: 'beach', source: require('../../assets/beach.jpg'), name: 'Beach' },
  { id: 'happiness', source: require('../../assets/backgrounds/happiness.jpg'), name: 'Happiness' },
  { id: 'inspiration', source: require('../../assets/backgrounds/inspiration.jpg'), name: 'Inspiration' },
  { id: 'mindfulness', source: require('../../assets/backgrounds/mindfulness.jpg'), name: 'Mindfulness' },
  { id: 'productivity', source: require('../../assets/backgrounds/productivity.jpg'), name: 'Productivity' },
  { id: 'self_love', source: require('../../assets/backgrounds/self_love.jpg'), name: 'Self Love' },
  { id: 'success', source: require('../../assets/backgrounds/success.jpg'), name: 'Success' },
  { id: 'aesthetic', source: require('../../assets/backgrounds_new/aesthetic.jpg'), name: 'Aesthetic' },
  { id: 'solitude', source: require('../../assets/backgrounds_new/solitude.jpg'), name: 'Solitude' },
  { id: 'wave', source: require('../../assets/backgrounds_new/wave.jpg'), name: 'Wave' },
  { id: 'office', source: require('../../assets/backgrounds_new/office.jpg'), name: 'Office' },
  { id: 'personal_development', source: require('../../assets/backgrounds_new/personal_development.jpg'), name: 'Personal Development' },
  { id: 'productivity_tips', source: require('../../assets/backgrounds_new/productivity_tips.jpg'), name: 'Productivity Tips' },
  { id: 'do_it', source: require('../../assets/backgrounds_new/do_it.jpg'), name: 'Do It' },
  { id: 'rain', source: require('../../assets/backgrounds_new/rain.jpg'), name: 'Rain' },
  { id: 'minimal', source: require('../../assets/backgrounds_new/minimal.jpg'), name: 'Minimal' },
  { id: 'nature', source: require('../../assets/backgrounds_new/nature.jpg'), name: 'Nature' },
  { id: 'calm', source: require('../../assets/backgrounds_new/calm.jpg'), name: 'Calm' },
  { id: 'forest', source: require('../../assets/backgrounds_new/forest.jpg'), name: 'Forest' },
];

type BackgroundPickerProps = {
  onSelectBackground: (background: BackgroundOption) => void;
  selectedBackgroundId: string;
};

const BackgroundPicker: React.FC<BackgroundPickerProps> = ({
  onSelectBackground,
  selectedBackgroundId,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isDarkMode } = useTheme();

  const renderBackgroundItem = (item: BackgroundOption) => {
    const isSelected = selectedBackgroundId === item.id;
    
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.backgroundItem,
          isSelected && styles.selectedItem,
        ]}
        onPress={() => {
          onSelectBackground(item);
          setModalVisible(false);
        }}
        activeOpacity={0.7}
      >
        <Image source={item.source} style={styles.backgroundImage} />
        <View style={styles.overlay} />
        <View style={styles.backgroundNameWrapper}>
          <Text style={styles.backgroundName}>
            {item.name}
          </Text>
        </View>
        {isSelected && (
          <View style={styles.selectedOverlay}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const modalContainerStyle = {
    ...styles.modalContainer,
    backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
  };

  const textStyle = {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  };

  return (
    <>
      <TouchableOpacity
        style={styles.brushButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.6}
      >
        <Image
          source={require('../../assets/icons/brush.png')}
          style={styles.brushIcon}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView
          style={modalContainerStyle}
          blurType={isDarkMode ? 'dark' : 'light'}
          blurAmount={25}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={[styles.closeButtonText, textStyle]}>×</Text>
              </TouchableOpacity>
              <Text style={[styles.modalTitle, textStyle]}>
                Choose Background
              </Text>
              <View style={styles.headerRight} />
            </View>

            <ScrollView 
              contentContainerStyle={styles.gridContainer}
              showsVerticalScrollIndicator={false}
              bounces={true}
            >
              {backgroundOptions.map(item => renderBackgroundItem(item))}
            </ScrollView>
          </View>
        </BlurView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  brushButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brushIcon: {
    width: 24,
    height: 24,
  },
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 50 : 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerRight: {
    width: 50,  // Match close button width for center alignment
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  closeButton: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 28,
  },
  gridContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ITEM_SPACING,
  },
  backgroundItem: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.3, // Make items slightly taller
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  backgroundNameWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  selectedItem: {
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  selectedOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -20 },
      { translateY: -20 }
    ],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
});

export default BackgroundPicker; 