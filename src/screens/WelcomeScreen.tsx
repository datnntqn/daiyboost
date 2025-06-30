import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Subtle overlay for text readability
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#828282',
    textAlign: 'center',
  },
});

export default WelcomeScreen;


