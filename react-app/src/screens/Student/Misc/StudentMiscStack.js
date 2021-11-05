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
  const socket = route.params.socket;
  const loginState = route.params.loginState;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='EventInfo'
        component={EventInfo}
        initialParams={{ socket: socket, loginState: loginState }}
        options={defaultOptions("Event information", "white", "#cccccc")}
      />
      <Stack.Screen
        name='HostInfo'
        component={HostInfo}
        initialParams={{ socket: socket, loginState: loginState }}
        options={defaultOptions("Host information", "white", "#cccccc")}
      />
      <Stack.Screen
        name='Profile'
        component={Profile}
        initialParams={{ socket: socket, loginState: loginState }}
        options={defaultOptions("Event information", "white", "#cccccc")}
      />

      <Stack.Screen
        name='FollowedHosts'
        component={FollowedHosts}
        initialParams={{
          loginState: loginState,
          socket: socket,
        }}
        options={defaultOptions("Following", "white", "#cccccc")}
      />
      <Stack.Screen
        name='AccountInfo'
        component={AccountInfo}
        initialParams={{
          loginState: loginState,
          socket: socket,
        }}
        options={defaultOptions("Settings", "white", "#cccccc")}
      />
      <Stack.Screen
        name='ChangePref'
        component={ChangePref}
        initialParams={{
          loginState: loginState,
          socket: socket,
        }}
        options={defaultOptions("Settings", "white", "#cccccc")}
      />
      <Stack.Screen
        name='Preferences'
        component={Preferences}
        initialParams={{
          socket: socket,
        }}
        options={defaultOptions("Settings", "white", "#cccccc")}
      />
      <Stack.Screen
        name='UpdatePreferences'
        component={UpdatePreferences}
        initialParams={{ socket: socket, loginState: loginState }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Message'
        component={Message}
        initialParams={{ socket: socket, loginState: loginState }}
        options={defaultOptions("Message", "white", "#cccccc")}
      />
      <Stack.Screen
        name='Notifications'
        component={Notifications}
        initialParams={{ socket: socket, loginState: loginState }}
        options={defaultOptions("Settings", "white", "#cccccc")}
      />
      <Stack.Screen
        name='About'
        component={About}
        initialParams={{ socket: socket, loginState: loginState }}
        options={defaultOptions("Settings", "white", "#cccccc")}
      />
      <Stack.Screen
        name='Help'
        component={Help}
        initialParams={{ socket: socket, loginState: loginState }}
        options={defaultOptions("Settings", "white", "#cccccc")}
      />
    </Stack.Navigator>
  );
}
