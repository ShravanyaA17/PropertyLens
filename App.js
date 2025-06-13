import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import SplashScreen2 from './screens/SplashScreen2'; 
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import FilterScreen from './screens/FilterScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000); 

    return () => clearTimeout(timer); 
  }, []);

  if (isLoading) {
    return (
      <SplashScreen 
        onFinish={() => setIsLoading(false)}  
      />
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
