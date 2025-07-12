import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import MainQuoteScreen from './src/screens/MainQuoteScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import QuoteListScreen from './src/screens/QuoteListScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NotificationSettingsScreen from './src/screens/NotificationSettingsScreen';
import FavoriteQuotesScreen from './src/screens/FavoriteQuotesScreen';
import { ThemeProvider } from './src/context/ThemeContext';
import { VisibilityProvider } from './src/context/VisibilityContext';
import { useTheme } from './src/context/ThemeContext';
import CustomTabBar from './src/components/CustomTabBar';
import { lightColors, darkColors } from './src/theme/colors';
import { RootStackParamList } from './src/types/navigation';
import notifee, { EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AdMobService from './src/services/AdMobService';

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const CategoryStack = createNativeStackNavigator<RootStackParamList>();

function CategoriesStackScreen() {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{ headerShown: false }} 
      />
      <CategoryStack.Screen 
        name="Category" 
        component={CategoryScreen} 
        options={{ headerShown: false }} 
      />
      <CategoryStack.Screen 
        name="QuoteList" 
        component={QuoteListScreen} 
        options={{ title: 'Quotes' }} 
      />
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

const NavigationWrapper = () => {
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

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
          tintColor: focused ? colors.primary : colors.textSecondary,
        }}
        resizeMode="contain"
      />
    );
  };

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: true,
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
  useEffect(() => {
    // Initialize AdMob
    const initAds = async () => {
      const adMobService = AdMobService.getInstance();
      await adMobService.initialize();
    };
    initAds();

    // Handle notifications
    const setupNotificationHandler = async () => {
      // Đăng ký foreground handler
      const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
        switch (type) {
          case EventType.PRESS:
            if (detail.notification && detail.notification.data) {
              const { quoteId } = detail.notification.data;
              if (quoteId) {
                // Lưu quoteId để MainQuoteScreen có thể hiển thị
                AsyncStorage.setItem('display_quote_id', String(quoteId));
              }
            }
            break;
        }
      });

      // Kiểm tra xem ứng dụng có được mở từ thông báo không
      const initialNotification = await notifee.getInitialNotification();
      if (initialNotification && initialNotification.notification.data) {
        const { quoteId } = initialNotification.notification.data;
        if (quoteId) {
          // Lưu quoteId để MainQuoteScreen có thể hiển thị
          await AsyncStorage.setItem('display_quote_id', String(quoteId));
        }
      }

      return unsubscribe;
    };

    const unsubscribe = setupNotificationHandler();
    
    return () => {
      // Hủy đăng ký khi component unmount
      unsubscribe.then(fn => fn());
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <VisibilityProvider>
          <NavigationContainer>
            <NavigationWrapper />
          </NavigationContainer>
        </VisibilityProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;


