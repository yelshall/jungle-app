import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login-registration/Login";
import Home from "./src/screens/Home";
import Register from "./src/screens/Login-registration/Register";
import Preferences from "./src/screens/Login-registration/Preferences";
import HomeScreen from "./src/screens/Login-registration/HomeScreen";
import PersonalInfo from "./src/screens/Login-registration/PersonalInfo";
import HostSignup from "./src/screens/Login-registration/HostSignup";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
        <Stack.Screen name="Preference" component={Preferences} />
        <Stack.Screen name="HostSignup" component={HostSignup} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}