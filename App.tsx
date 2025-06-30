import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MainQuoteScreen from './src/screens/MainQuoteScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import QuoteListScreen from './src/screens/QuoteListScreen';
import NotificationSettingsScreen from './src/screens/NotificationSettingsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { ThemeProvider } from './src/context/ThemeContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainQuote" component={MainQuoteScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Category" component={CategoryScreen} options={{ title: 'Categories' }} />
          <Stack.Screen name="QuoteList" component={QuoteListScreen} options={({ route }) => ({ title: route.params.category + ' Quotes' })} />
          <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} options={{ title: 'Notification Settings' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;


