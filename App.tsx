import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, Image } from 'react-native';
import MainQuoteScreen from './src/screens/MainQuoteScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import QuoteListScreen from './src/screens/QuoteListScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NotificationSettingsScreen from './src/screens/NotificationSettingsScreen';
import { ThemeProvider } from './src/context/ThemeContext';

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

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="MainQuote"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
            tabBarActiveTintColor: '#5DADE2',
            tabBarInactiveTintColor: '#95A5A6',
            tabBarShowLabel: true,
            tabBarLabelStyle: { 
              fontSize: 12,
              fontWeight: '500',
              marginBottom: Platform.OS === 'ios' ? 0 : 4,
            },
            tabBarStyle: {
              position: 'absolute',
              left: 20,
              right: 20,
              bottom: Platform.OS === 'ios' ? 24 : 16,
              height: Platform.OS === 'ios' ? 80 : 70,
              paddingTop: Platform.OS === 'ios' ? 12 : 8,
              paddingBottom: Platform.OS === 'ios' ? 24 : 8,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              shadowColor: '#000000',
              shadowOffset: { 
                width: 0, 
                height: 4 
              },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 8,
              borderTopWidth: 0,
            },
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
            name="Settings" 
            component={SettingsStackScreen} 
            options={{ 
              headerShown: false,
            }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;


