import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
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

const CategoryGrid: React.FC<CategoryGridProps> = ({ data, onPressCategory }) => {
  const renderItem = ({ item, index }: { item: CategoryItem; index: number }) => (
    <CategoryCard
      item={item}
      onPress={onPressCategory}
      index={index}
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
    padding: 8,
    paddingBottom: 100, // Thêm padding bottom để tránh bị che bởi bottom tab
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },
});

export default CategoryGrid; 