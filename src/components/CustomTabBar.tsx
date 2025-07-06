import React from 'react';
import { View, TouchableOpacity, Platform, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import { useTheme } from '../context/ThemeContext';
import { createTabBarStyles } from '../screens/styles/TabBar.styles';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ 
  state, 
  descriptors, 
  navigation 
}) => {
  const { isDarkMode } = useTheme();
  const styles = createTabBarStyles(isDarkMode);

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <BlurView
          style={styles.blurView}
          blurType={isDarkMode ? 'dark' : 'light'}
          blurAmount={20}
          reducedTransparencyFallbackColor={isDarkMode ? 'rgba(26, 26, 26, 0.85)' : 'rgba(255, 255, 255, 0.85)'}
        />
      ) : null}
      <View style={styles.content}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={styles.tabButton}
            >
              {options.tabBarIcon?.({
                focused: isFocused,
                color: '',
                size: 24,
              })}
              {typeof label === 'string' && (
                <Text style={[
                  styles.tabBarLabel,
                  isFocused && styles.activeTabBarLabel
                ]}>
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar; 