import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';
import PreferenceScreen from './Screens/Preferences';
import {styles} from './Components/styles';


import { StyleSheet, 
  Text, 
  View,Image, 
  TextInput, 
  Button,
  TouchableOpacity, 
  Alert,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  SafeAreaView,

} from 'react-native';
import { set } from 'react-native-reanimated';


export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component = {HomeScreen}/>
        <Stack.Screen name = "Login" component = {LoginScreen}/>
        <Stack.Screen name = "Register" component = {RegisterScreen}/>
        <Stack.Screen name = "Preference" component = {PreferenceScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

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




const HomeScreen = ({navigation}) =>{
  return (
    <View style={styles.container}>
      <Text> Home Screen</Text>
      <Button
        title="Go to login screen"
        onPress={() => navigation.navigate('Login')}  
      />
     <Button
        title="Go to Register screen"
        onPress={() => navigation.navigate('Register')}  
      />
      <Button
        title="Go to Preference screen"
        onPress={() => navigation.navigate('Preference')}  
      />
    </View>
  );
};


//    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>




