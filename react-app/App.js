import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./styles";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Register from "./src/screens/Register";
import Preferences from "./src/screens/Preferences";

import { Text, View, Button } from "react-native";

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
        <Stack.Screen name="Preference" component={Preferences} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text> Home Screen</Text>
      <Button
        title="Go to login screen"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Go to Register screen"
        onPress={() => navigation.navigate("Register")}
      />
      <Button
        title="Go to Preference screen"
        onPress={() => navigation.navigate("Preference")}
      />
    </View>
  );
};
