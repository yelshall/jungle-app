import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventInfo from "./EventInfo";
import HostInfo from "./HostInfo";
import FollowedHosts from "./FollowedHosts";
import ChangePref from "./ChangePref";
import UpdatePreferences from "./UpdatePreferences";
import users from "../../../../assets/events-data/users";
import { defaultOptions } from "../../../components/Header";
import Message from "../../Message";
import Preferences from "../../Login-registration/Preferences";
import AccountInfo from "./AccountInfo";
import Profile from "../Tabs/Profile";
import Notifications from "./Notifications";
import About from "./About";
import Help from "./Help";

export default function StudentMiscStack({ navigation, route }) {
  const Stack = createStackNavigator();
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='EventInfo'
        component={EventInfo}
        options={defaultOptions("Event information", "white", "#cccccc")}
      />
      <Stack.Screen
        name='HostInfo'
        component={HostInfo}
        options={defaultOptions("Host information", "white", "#cccccc")}
      />
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={defaultOptions("Event information", "white", "#cccccc")}
      />

      <Stack.Screen
        name='FollowedHosts'
        component={FollowedHosts}
        options={defaultOptions("Following", "white", "#cccccc")}
      />
      <Stack.Screen
        name='AccountInfo'
        component={AccountInfo}
        options={defaultOptions("Settings", "white", "#cccccc")}
      />
      <Stack.Screen
        name='ChangePref'
        component={ChangePref}
        options={defaultOptions("Settings", "white", "#cccccc")}
      />
      <Stack.Screen
        name='Preferences'
        component={Preferences}
        options={defaultOptions("Settings", "white", "#cccccc")}
      />
      <Stack.Screen
        name='UpdatePreferences'
        component={UpdatePreferences}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Message'
        component={Message}
        options={defaultOptions("Message", "white", "#cccccc")}
      />
      <Stack.Screen
        name='Notifications'
        component={Notifications}
        options={defaultOptions("Settings", "white", "#cccccc")}
      />
      <Stack.Screen
        name='About'
        component={About}
        options={defaultOptions("Settings", "white", "#cccccc")}
      />
      <Stack.Screen
        name='Help'
        component={Help}
        options={defaultOptions("Settings", "white", "#cccccc")}
      />
    </Stack.Navigator>
  );
}
