import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import MainQuoteScreen from './src/screens/MainQuoteScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import QuoteListScreen from './src/screens/QuoteListScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NotificationSettingsScreen from './src/screens/NotificationSettingsScreen';
import FavoriteQuotesScreen from './src/screens/FavoriteQuotesScreen';
import { ThemeProvider } from './src/context/ThemeContext';
import { useTheme } from './src/context/ThemeContext';
import { createTabBarStyles } from './src/screens/styles/TabBar.styles';
import { lightColors, darkColors } from './src/theme/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const CategoryStack = createNativeStackNavigator();

function CategoriesStackScreen() {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen name="Category" component={CategoryScreen} options={{ headerShown: false }} />
      <CategoryStack.Screen name="QuoteList" component={QuoteListScreen as React.ComponentType<any>} options={{ title: 'Quotes' }} />
    </CategoryStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const getTabBarIcon = (route: string, focused: boolean) => {
  let icon;
  if (route === 'MainQuote') {
    icon = focused 
      ? require('./assets/icons/quote-active.png')
      : require('./assets/icons/quote-inactive.png');
  } else if (route === 'CategoriesStack') {
    icon = focused 
      ? require('./assets/icons/category-active.png')
      : require('./assets/icons/category-inactive.png');
  } else if (route === 'Favorites') {
    icon = focused 
      ? require('./assets/icons/heart-active.png')
      : require('./assets/icons/heart-inactive.png');
  } else if (route === 'Settings') {
    icon = focused 
      ? require('./assets/icons/settings-active.png')
      : require('./assets/icons/settings-inactive.png');
  }

  return (
    <Image
      source={icon}
      style={{
        width: 24,
        height: 24,
        marginTop: 4,
        opacity: focused ? 1 : 0.8,
      }}
      resizeMode="contain"
    />
  );
};

const NavigationWrapper = () => {
  const { isDarkMode } = useTheme();
  const tabBarStyles = createTabBarStyles(isDarkMode);
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <Tab.Navigator
      initialRouteName="MainQuote"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: true,
        tabBarLabelStyle: tabBarStyles.tabBarLabel,
        tabBarStyle: tabBarStyles.tabBar,
      })}
    >
      <Tab.Screen 
        name="MainQuote" 
        component={MainQuoteScreen} 
        options={{ 
          title: 'Quote',
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="CategoriesStack" 
        component={CategoriesStackScreen} 
        options={{ 
          title: 'Categories',
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoriteQuotesScreen} 
        options={{ 
          title: 'Favorites',
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsStackScreen} 
        options={{ 
          headerShown: false,
        }} 
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <NavigationWrapper />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;


