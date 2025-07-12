import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useVisibilityControl = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => {
      const newValue = !prev;
      
      // Toggle navigation bar
      if (navigation.getParent()) {
        if (newValue) {
          // Show the tab bar with default style
          navigation.getParent()?.setOptions({
            tabBarStyle: {
              height: 60,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              borderTopWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            }
          });
        } else {
          // Hide the tab bar
          navigation.getParent()?.setOptions({
            tabBarStyle: {
              display: 'none',
              height: 0,
            }
          });
        }
      }
      
      return newValue;
    });
  }, [navigation]);

  return {
    isVisible,
    toggleVisibility
  };
}; 