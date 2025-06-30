import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styles } from './styles/WelcomeScreen.styles';

const WelcomeScreen: React.FC = () => {
  return (
    <ImageBackground 
      source={require("../../assets/welcome_background.png")} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Daily Boost!</Text>
        <Text style={styles.subtitle}>Your daily dose of inspiration starts here.</Text>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;


