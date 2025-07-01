import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles/WelcomeScreen.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

type WelcomeScreenProps = {
  navigation: WelcomeScreenNavigationProp;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('MainQuote')}
    >
      <View style={styles.background}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to{'\n'}Daily Boost!</Text>
          <Text style={styles.subtitle}>Your daily dose of{'\n'}inspiration starts here.</Text>
          
          <View style={styles.sunContainer}>
            <Text style={styles.sunEmoji}>☀️</Text>
          </View>
          
          <Text style={styles.tapText}>Tap anywhere to continue</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WelcomeScreen;


