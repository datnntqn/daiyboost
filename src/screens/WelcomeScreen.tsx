import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
      <LinearGradient
        colors={['#E8F4FD', '#FFE5D9']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to{'\n'}Daily Boost!</Text>
          <Text style={styles.subtitle}>Your daily dose of{'\n'}inspiration starts here.</Text>
          
          <View style={styles.sunContainer}>
            {/* Sun rays */}
            <View style={[styles.sunRay, styles.sunRay1]} />
            <View style={[styles.sunRay, styles.sunRay2]} />
            <View style={[styles.sunRay, styles.sunRay3]} />
            <View style={[styles.sunRay, styles.sunRay4]} />
            <View style={[styles.sunRay, styles.sunRay5]} />
            
            {/* Sun base */}
            <View style={styles.sunBase} />
            
            {/* Bottom ray */}
            <View style={styles.sunRayBottom} />
          </View>
          
          <Text style={styles.tapText}>Tap anywhere to continue</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default WelcomeScreen;


