import React from "react";
import { View, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from 'react-native-elements';
import EmailAndPassword from "./EmailAndPassword";
import PersonalInfo from "./PersonalInfo";
import Preferences from "./Preferences";
import HostSignup from './HostSignup';
import HomeScreen from "./HomeScreen";
import Login from "./Login";
import ProfilePic from "./ProfilePic";
import RegistrationType from "./RegistrationType";

import { defaultOptions } from "../../components/Header";

export default function Register({ navigation, route }) {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Login" component={Login} options={defaultOptions('Login', '#96db8f', '#6ec28c')} />
			<Stack.Screen name="EmailAndPassword" component={EmailAndPassword} options={defaultOptions('Email', '#96db8f', '#6ec28c')} />
			<Stack.Screen name="PersonalInfo" component={PersonalInfo} options={defaultOptions('Personal information', '#96db8f', '#6ec28c')} />
			<Stack.Screen name="Preferences" component={Preferences} options={defaultOptions('Preferences', '#96db8f', '#6ec28c')} />
			<Stack.Screen name="HostSignup" component={HostSignup} options={defaultOptions('Host information', '#96db8f', '#6ec28c')} />
			<Stack.Screen name="ProfilePic" component={ProfilePic} options={defaultOptions('Profile picture', '#96db8f', '#6ec28c')} />
			<Stack.Screen name="RegistrationType" component={RegistrationType} options={defaultOptions('Registration Type', '#96db8f', '#6ec28c')} />
		</Stack.Navigator>
	);
};