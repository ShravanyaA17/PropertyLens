import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image, StatusBar } from 'react-native';
import * as Font from 'expo-font';

export default function SplashScreen({ onFinish }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  const circleScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const welcomeOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Font.loadAsync({
      GreatVibes: require('../assets/fonts/GreatVibes-Regular.ttf'),
    }).then(() => setFontLoaded(true));
  }, []);

  useEffect(() => {
    if (!fontLoaded) return;
    Animated.timing(welcomeOpacity, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();

    Animated.timing(circleScale, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => { 
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    });

    const timer = setTimeout(() => {
      onFinish();
    }, 7000);

    return () => clearTimeout(timer);
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <Animated.Text style={[styles.welcomeText, { opacity: welcomeOpacity }]}>
        Welcome To
      </Animated.Text>

      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: circleScale }],
            shadowColor: '#FFD700',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 15,
            elevation: 10,
          },
        ]}
      >
        <Animated.Image
          source={require('../assets/logo.jpg')}
          style={[styles.logo, { opacity: logoOpacity }]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C6F4A', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'GreatVibes',
    marginBottom: 30,
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
