import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainQuoteScreen from './src/screens/MainQuoteScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import QuoteListScreen from './src/screens/QuoteListScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { ThemeProvider } from './src/context/ThemeContext';

const Tab = createBottomTabNavigator();
const CategoryStack = createNativeStackNavigator();

function CategoriesStackScreen() {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen name="Category" component={CategoryScreen} options={{ headerShown: false }} />
      <CategoryStack.Screen name="QuoteList" component={QuoteListScreen as React.ComponentType<any>} options={{ title: 'Quotes' }} />
    </CategoryStack.Navigator>
  );
}

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="MainQuote"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = '';
              if (route.name === 'MainQuote') {
                iconName = focused ? 'document-text' : 'document-text-outline';
              } else if (route.name === 'CategoriesStack') {
                iconName = focused ? 'grid' : 'grid-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#3478f6',
            tabBarInactiveTintColor: '#888',
            tabBarShowLabel: true,
            tabBarLabelStyle: { fontSize: 13, fontWeight: '500', marginBottom: 4 },
            tabBarStyle: {
              position: 'absolute',
              left: 20,
              right: 20,
              bottom: 24,
              borderRadius: 24,
              height: 70,
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 16,
              elevation: 10,
              borderTopWidth: 0,
            },
          })}
        >
          <Tab.Screen name="MainQuote" component={MainQuoteScreen} options={{ title: 'Quote' }} />
          <Tab.Screen name="CategoriesStack" component={CategoriesStackScreen} options={{ title: 'Categories', headerShown: false }} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;


