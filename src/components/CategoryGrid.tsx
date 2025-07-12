import React from 'react';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
import CategoryCard from './CategoryCard';

interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

interface CategoryGridProps {
  data: CategoryItem[];
  onPressCategory: (id: string) => void;
}

const { width } = Dimensions.get('window');
const ITEM_SPACING = 12;
const ITEM_WIDTH = (width - 48 - ITEM_SPACING) / 2; // Tương tự như BackgroundPicker

const CategoryGrid: React.FC<CategoryGridProps> = ({ data, onPressCategory }) => {
  const renderItem = ({ item, index }: { item: CategoryItem; index: number }) => (
    <CategoryCard
      item={item}
      onPress={onPressCategory}
      index={index}
      width={ITEM_WIDTH}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100, // Thêm padding bottom để tránh bị che bởi bottom tab
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: ITEM_SPACING,
  },
});

export default CategoryGrid; 