import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, StatusBar, Dimensions } from 'react-native';
import * as Font from 'expo-font';

const WELCOME_TEXT = "Welcome to";

export default function SplashScreen2({ onFinish }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current; 
  const logoAnim = useRef(new Animated.Value(-100)).current; 
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        GreatVibes: require('../assets/fonts/GreatVibes-Regular.ttf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  
  useEffect(() => {
    if (!fontLoaded) return;

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      animateLogo();
    });
  }, [fontLoaded]);


  const animateLogo = () => {
    Animated.parallel([
      Animated.timing(logoAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      
      setTimeout(() => {
        onFinish();
      }, 200000);
    });
  };

  if (!fontLoaded) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1E4D2B" barStyle="light-content" />
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>{WELCOME_TEXT}</Text>
      </View>

      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ translateY: logoAnim }],
            opacity: logoOpacity,
          },
        ]}
      >
        <Image
          source={require('../assets/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    position: 'absolute',
    top: '35%',
  },
  welcomeText: {
    fontFamily: 'GreatVibes',
    fontSize: 48,
    color: '#1E4D2B', 
    paddingRight: 8,
  },
  logoContainer: {
    position: 'absolute',
    top: '40%', 
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
});
