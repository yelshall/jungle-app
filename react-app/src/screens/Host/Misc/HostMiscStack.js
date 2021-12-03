import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultOptions } from "../../../components/Header";

import HostProfileInfo from './HostProfileInfo';
import HostChangePassword from "./HostChangePassword";
import HostNotifications from "./HostNotifications";
import HostPrivacy from "./HostPrivacy";
import HostUpdateTags from "./HostUpdateTags";
import HostHelp from "./HostHelp";
import HostAbout from "./HostAbout";

export default function HostMiscStack({ navigation, route }) {
  const Stack = createStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name={'HostProfileInfo'}
				component={HostProfileInfo}
				options={defaultOptions("Organization Info", "white", "#cccccc")}
			/>
			<Stack.Screen
				name={'HostChangePassword'}
				component={HostChangePassword}
				options={defaultOptions("Change Password", "white", "#cccccc")}
			/>
			<Stack.Screen
				name={'HostNotifications'}
				component={HostNotifications}
				options={defaultOptions("Notifications", "white", "#cccccc")}
			/>
			<Stack.Screen
				name={'HostPrivacy'}
				component={HostPrivacy}
				options={defaultOptions("Privacy", "white", "#cccccc")}
			/>
			<Stack.Screen
				name={'HostUpdateTags'}
				component={HostUpdateTags}
				options={defaultOptions("Update tags", "white", "#cccccc")}
			<Stack.Screen 
				name={'HostHelp'}
				component={HostHelp}
				options={defaultOptions("Host Help", "white", "#cccccc")}
			/>
			<Stack.Screen
				name={'HostAbout'}
				component={HostAbout}
				options={defaultOptions("About", "white", "#cccccc")}
			/>
		</Stack.Navigator>
	);
}
