# DailyBoost - Daily Inspirational Quotes App

## Overview
DailyBoost is a mobile application built with React Native that provides users with daily inspirational quotes across various categories. The app offers a clean, modern interface with both light and dark mode support, allowing users to discover, save, and share motivational content.

## Technical Stack
- **Framework**: React Native (v0.80.0)
- **Language**: TypeScript
- **Navigation**: React Navigation v7 (Bottom Tabs & Native Stack)
- **State Management**: React Context API
- **Storage**: AsyncStorage
- **UI Components**: Custom components with React Native core components
- **Notifications**: Notifee (@notifee/react-native)
- **Visual Effects**: Linear Gradients, Blur Effects (@react-native-community/blur)
- **Sharing**: react-native-share, react-native-view-shot

## Features

### 1. Quote Management
- **Daily Quotes**: Display inspirational quotes with author attribution
- **Quote Categories**: Organize quotes into multiple categories
  - Happiness
  - Mindfulness
  - Self-Love
  - Success
  - Inspiration
  - Productivity
  - General
- **Swipe Navigation**: Swipe up to see the next quote
- **Favorite System**: Save quotes to favorites for later viewing
- **Share Functionality**: Share quotes as images on social media

### 2. Theme System
- **Light/Dark Mode**: Complete theme support with custom colors for each mode
- **Persistent Theme**: User's theme preference is saved between sessions
- **Dynamic UI Elements**: All UI components adapt to the selected theme

### 3. Categories
- **Category Browsing**: Browse quotes by different categories
- **Visual Distinction**: Each category has unique background images and emoji indicators
- **Category-specific Quotes**: Filter quotes based on selected category

### 4. Customization
- **Background Selection**: Choose from multiple background images for the main quote screen
- **Custom Backgrounds**: Default and category-specific backgrounds available

### 5. Notification System
- **Daily Reminders**: Receive daily quote notifications
- **Time Preferences**: Set preferred time to receive notifications
- **Sound & Vibration**: Toggle notification sound and vibration
- **Random Quote Selection**: Notifications feature random quotes from the collection

### 6. Favorites Management
- **Favorites Collection**: Save and organize favorite quotes
- **Swipe to Delete**: Remove quotes from favorites with swipe gesture
- **Category Indicators**: Visual indicators for quote categories in favorites list

### 7. Settings
- **Theme Toggle**: Switch between light and dark modes
- **Notification Settings**: Configure notification preferences
- **Premium Features**: Placeholder for premium features (Ad-free, additional features)

## User Interface

### Main Screens
1. **Main Quote Screen**: Displays a single quote with background image and actions
2. **Categories Screen**: Grid view of available quote categories
3. **Category Screen**: List of quotes filtered by selected category
4. **Favorites Screen**: Collection of user's saved quotes
5. **Settings Screen**: App configuration options

### UI Components
- **Custom Tab Bar**: Stylized bottom navigation with blur effect
- **Background Picker**: Modal interface for selecting background images
- **Linear Gradients**: Used for visual overlays and improved text readability
- **Custom Cards**: Styled cards for displaying quotes and categories

### Navigation
- **Bottom Tab Navigation**: Main navigation between primary app sections
- **Stack Navigation**: Used for screen hierarchies within sections

## Data Management
- **Local Storage**: Quotes and user preferences stored using AsyncStorage
- **Quote Structure**: Each quote contains ID, text, author, and category
- **Settings Persistence**: Theme and notification preferences saved between sessions

## Accessibility
- **Readable Text**: Appropriate contrast and font sizes
- **Status Bar Adaptation**: Status bar adapts to current theme
- **Safe Area Support**: Proper layout on devices with notches and rounded corners

## Future Premium Features (Placeholders)
- Ad-free experience
- Additional quote categories
- Custom background uploads
- Advanced sharing options

## Conclusion
DailyBoost is a feature-rich application designed to provide users with daily motivation and inspiration through carefully curated quotes. With its thoughtful design, theme support, and customization options, it offers a personalized experience for users seeking daily encouragement. 