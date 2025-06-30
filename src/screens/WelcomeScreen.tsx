import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './styles/WelcomeScreen.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <TouchableOpacity 
      style={{ flex: 1 }}
      onPress={() => navigation.navigate('MainQuote')}
    >
      <ImageBackground 
        source={require("../../assets/welcome_background.png")} 
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Daily Boost!</Text>
          <Text style={styles.subtitle}>Your daily dose of inspiration starts here.</Text>
          <Text style={styles.tapText}>Tap anywhere to continue</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default WelcomeScreen;


