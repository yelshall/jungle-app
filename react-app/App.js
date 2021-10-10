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

// const dataSource = [
//   {
//     url: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'Football',
//   },
//   {
//     url: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Tennis',
//   },
//   {
//     url: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Hockey',
//   },
// ];

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

//    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
