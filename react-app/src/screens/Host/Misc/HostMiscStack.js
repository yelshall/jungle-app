import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultOptions } from "../../../components/Header";

import HostProfileInfo from './HostProfileInfo';

export default function HostMiscStack({ navigation, route }) {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name={'HostProfileInfo'}
				component={HostProfileInfo}
				options={defaultOptions("Organization Info", "white", "#cccccc")}
			/>
		</Stack.Navigator>
	);
}
