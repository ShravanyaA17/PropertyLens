import { NavigationContainer } from "@react-navigation/native";
import { View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import SplashScreen from "./screens/SplashScreen";
import SplashScreen2 from "./screens/SplashScreen2";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import FilterScreen from "./screens/FilterScreen";

//  ADDED: Import Login and Signup screens
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/*CHANGED: Set initial screen to Login */}

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // hide header for login page
        />
        {/* ADDED: Signup screen route */}
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }} // hide header for signup page
        />
        <Stack.Screen
          name="Home"
          children={(props) => (
            <HomeScreen
              {...props}
              savedProperties={savedProperties}
              setSavedProperties={setSavedProperties}
            />
          )}
          options={({ navigation }) => ({
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row",
                  paddingRight: 8,
                  gap: 12,
                }}
              >
                <TouchableOpacity
                  onPress={() => console.log("Saved pressed")}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 40,
                    width: 40,
                  }}
                >
                  <MaterialIcons
                    name="bookmark-border"
                    size={26}
                    color="#555"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => console.log("Account pressed")}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 40,
                    width: 40,
                  }}
                >
                  <Ionicons
                    name="person-circle-outline"
                    size={28}
                    color="#555"
                  />
                </TouchableOpacity>
              </View>
            ),
            headerStyle: {
              height: 70,
            },
          })}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
