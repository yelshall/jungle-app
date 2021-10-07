
      import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Dimensions, Image, Animated, PanResponder } from 'react-native';

      import { StatusBar } from "expo-status-bar";
      import React, {useState} from "react";
      import Ionicons from "@expo/vector-icons/Ionicons";
      
      import { NavigationContainer } from "@react-navigation/native";
      import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
      //import eventsData from './assets/events-data/eventsData';
      //import Card from './src/components/EventCard';
      //import CardSwipe from './src/components/CardSwipe';
      
      
      const Tabs = createBottomTabNavigator();
      
      import LottieView from "lottie-react-native";
      import { color } from "react-native-reanimated";
      
      
      const SCREEN_HEIGHT = Dimensions.get('window').height
      const SCREEN_WIDTH = Dimensions.get('window').width
      
    
      function Swipe() {
        return (
          <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <Text style={{ margin: 90, fontSize: 28 }}>Swipe</Text>
            <LottieView source={require("./assets/Lottie/Swipe.json")} autoPlay />
          </View>
        );
      }
      
      function Explore() {
        return (
          <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <Text style={{ margin: 90, fontSize: 28 }}>Explore</Text>
            <LottieView source={require("./assets/Lottie/Apps.json")} autoPlay />
          </View>
        );
      }
      
      function Chat() {
        return (
          <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <Text style={{ margin: 90, fontSize: 28 }}>Chat</Text>
            <LottieView source={require("./assets/Lottie/Chat.json")} autoPlay />
          </View>
        );
      }
      
      function Profile() {
        return (
          <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <Text style={{ margin: 90, fontSize: 28, color: "black" }}>
              Profile
            </Text>
            <LottieView source={require("./assets/Lottie/Profile.json")} autoPlay/>
          </View>
        );
      }
    
export default function App() {
        return (
      
      
      <NavigationContainer>
       <Tabs.Navigator
         tabBarOptions={{showLabel: true,
         style: {
           position: 'absolute',
           bottom: 25,
           left: 20,
           right: 20,
           elevation: 0,
           backgroundColor: '#ffffff',
           borderRadius: 15,
           height: 90,
           ...styles.shadow
         }}}
         screenOptions={({ route }) => ({
           tabBarIcon: ({ focused }) => {
             let filePath;
             switch (route.name) {
               case "Swipe":
                 filePath = require("./assets/up-arrow.png");
                 
                 break;
               case "Explore":
                 filePath = require("./assets/menu.png");
                 break;
               case "Chat":
                 filePath = require("./assets/chat.png");
                 break;
               case "Profile":
                 filePath = require("./assets/user.png");
                 break;
               default:
                 iconName = focused
                   ? "ios-information-circle"
                   : "ios-information-circle-outline";
             }
             return <><View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }} /><Image
               source={filePath}
               resizeMode="contain"
               style={{
                 width: 25,
                 height: 25,
                 tintColor: focused ? '#e32f45' : '748c94',
               }} /></>;
 
           },
         })}
     

       >

         <Tabs.Screen name="Swipe" component={Swipe} />
         <Tabs.Screen name="Explore" component={Explore} />
         <Tabs.Screen name="Chat" component={Chat} />
         <Tabs.Screen name="Profile" component={Profile} />
       </Tabs.Navigator>
     </NavigationContainer>
   );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity :0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});