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
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

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

  const renderBackgroundItem = ({ item }: { item: BackgroundOption }) => (
    <TouchableOpacity
      style={[
        styles.backgroundItem,
        selectedBackgroundId === item.id && styles.selectedItem,
      ]}
      onPress={() => {
        onSelectBackground(item);
        setModalVisible(false);
      }}
    >
      <Image source={item.source} style={styles.backgroundImage} />
      <View style={[
        styles.backgroundNameContainer,
        { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }
      ]}>
        <Text style={[
          styles.backgroundName,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }
        ]}>
          {item.name}
        </Text>
      </View>
      {selectedBackgroundId === item.id && (
        <View style={styles.selectedOverlay}>
          <Text style={styles.checkIcon}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

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
        <View style={[
          styles.modalContainer,
          { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)' }
        ]}>
          <View style={styles.modalHeader}>
            <Text style={[
              styles.modalTitle,
              { color: isDarkMode ? '#FFFFFF' : '#000000' }
            ]}>
              Choose Background
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[
                styles.closeButtonText,
                { color: isDarkMode ? '#FFFFFF' : '#000000' }
              ]}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
            {backgroundOptions.map((item) => renderBackgroundItem({ item }))}
          </ScrollView>
        </View>
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
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 32,
    fontWeight: '300',
  },
  gridContainer: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  backgroundItem: {
    width: (width - 40) / 2,
    height: (width - 40) / 2,
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backgroundNameContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  backgroundName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedItem: {
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default BackgroundPicker; 