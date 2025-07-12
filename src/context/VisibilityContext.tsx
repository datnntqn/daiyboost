import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface VisibilityContextType {
  isUIVisible: boolean;
  toggleUIVisibility: () => void;
}

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

interface VisibilityProviderProps {
  children: ReactNode;
}

export const VisibilityProvider: React.FC<VisibilityProviderProps> = ({ children }) => {
  const [isUIVisible, setIsUIVisible] = useState(true);

  // Load saved visibility state on mount
  useEffect(() => {
    const loadVisibilityState = async () => {
      try {
        const savedState = await AsyncStorage.getItem('ui_visibility_state');
        if (savedState !== null) {
          setIsUIVisible(savedState === 'true');
        }
      } catch (error) {
        console.error('Error loading UI visibility state:', error);
      }
    };
    
    loadVisibilityState();
  }, []);

  const toggleUIVisibility = async () => {
    const newState = !isUIVisible;
    setIsUIVisible(newState);
    
    // Save to AsyncStorage
    try {
      await AsyncStorage.setItem('ui_visibility_state', newState.toString());
    } catch (error) {
      console.error('Error saving UI visibility state:', error);
    }
  };

  return (
    <VisibilityContext.Provider value={{ isUIVisible, toggleUIVisibility }}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const useVisibility = (): VisibilityContextType => {
  const context = useContext(VisibilityContext);
  if (context === undefined) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }
  return context;
};