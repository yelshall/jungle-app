import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultOptions } from "../../../components/Header";

import HostProfileInfo from './HostProfileInfo';
import HostChangePassword from "./HostChangePassword";
import HostNotifications from "./HostNotifications";
import HostPrivacy from "./HostPrivacy";

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
		</Stack.Navigator>
	);
}
