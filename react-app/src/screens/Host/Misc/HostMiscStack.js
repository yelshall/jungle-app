import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultOptions } from "../../../components/Header";

import HostProfileInfo from "./HostProfileInfo";
import editOrgDescription from "../editOrgDescription"
import editOrgEmail from "../editOrgEmail"
import editOrgName from "../editOrgName"

export default function HostMiscStack({ navigation, route }) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"HostProfileInfo"}
        component={HostProfileInfo}
        options={defaultOptions("Organization Info", "white", "#cccccc")}
      />
      <Stack.Screen
        name="ChangePref"
        component={ChangePref}
        initialParams={{ socket: socket, loginState: loginState }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        initialParams={{ socket: socket, loginState: loginState }}
      />
      <Stack.Screen
        name="About"
        component={About}
        initialParams={{ socket: socket, loginState: loginState }}
      />
      <Stack.Screen
        name="editOrgName"
        component={editOrgName}
        initialParams={{ socket: socket, loginState: loginState }}
      />
      <Stack.Screen
        name="editOrgEmail"
        component={editOrgEmail}
        initialParams={{ socket: socket, loginState: loginState }}
      />
      <Stack.Screen
        name="editOrgDescription"
        component={editOrgDescription}
        initialParams={{ socket: socket, loginState: loginState }}
      />
    </Stack.Navigator>
  );
}
