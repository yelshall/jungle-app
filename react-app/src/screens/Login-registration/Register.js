import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EmailAndPassword from "./EmailAndPassword";
import PersonalInfo from "./PersonalInfo";
import Preferences from "./Preferences";
import HostSignup from './HostSignup';

export default function Register({ route }) {
	const socket = route.params.socket;
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name="EmailAndPassword" component={EmailAndPassword} initialParams={{socket: socket}} />
			<Stack.Screen name="PersonalInfo" component={PersonalInfo} />
			<Stack.Screen name="Preferences" component={Preferences} initialParams={{socket: socket}} />
			<Stack.Screen name="HostSignup" component={HostSignup} initialParams={{socket: socket}} />
		</Stack.Navigator>
	);
};