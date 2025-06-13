import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import * as Font from 'expo-font';

export default function SplashScreen({ onFinish }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  const textReveal = useRef(new Animated.Value(0)).current;
  const circleScale = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0)).current;

  // Load custom font
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        GreatVibes: require('../assets/fonts/GreatVibes-Regular.ttf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  // Start animations after font is ready
  useEffect(() => {
    if (!fontLoaded) return;

    Animated.timing(textReveal, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(circleScale, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1500);

    // Optional: Finish splash after delay
    setTimeout(() => {
      onFinish && onFinish();
    }, 5000);
  }, [fontLoaded]);

  const textWidth = textReveal.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  if (!fontLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1E4D2B" barStyle="light-content" />

      {/* Animated Welcome Text */}
      <Animated.View style={[styles.welcomeTextContainer, { width: textWidth }]}>
        <Text style={styles.welcomeText}>Welcome To</Text>
      </Animated.View>

      {/* Animated Circle with Logo */}
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: circleScale }],
          },
        ]}
      >
        <Animated.Image
          source={require('../assets/logo.jpg')}
          style={[
            styles.logo,
            {
              transform: [{ scale: logoScale }],
            },
          ]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E4D2B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontFamily: 'GreatVibes',
    fontSize: 42,
    color: '#ffffff',
    textAlign: 'center',
  },
  circle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700', // Golden yellow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: Platform.OS === 'android' ? 20 : 0,
  },
  logo: {
    width: 130,
    height: 130,
  },
});
