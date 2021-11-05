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
import { defaultOptions } from "../../components/Header";

export default function Register({ navigation, route }) {
	const socket = route.params.socket;
	const loginState = route.params.loginState;
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Login" component={Login} initialParams={{ socket: socket }} options={defaultOptions('Login', '#96db8f', '#6ec28c')} />
			<Stack.Screen name="EmailAndPassword" component={EmailAndPassword} initialParams={{ socket: socket }} options={defaultOptions('Email', '#96db8f', '#6ec28c')} />
			<Stack.Screen name="PersonalInfo" component={PersonalInfo} options={defaultOptions('Personal information', '#96db8f', '#6ec28c')} />
			<Stack.Screen name="Preferences" component={Preferences} initialParams={{ socket: socket, loginState: loginState }} options={defaultOptions('Preferences', '#96db8f', '#6ec28c')} />
			<Stack.Screen name="HostSignup" component={HostSignup} initialParams={{ socket: socket, loginState: loginState }} options={defaultOptions('Host information', '#96db8f', '#6ec28c')} />
			<Stack.Screen name="ProfilePic" component={ProfilePic} initialParams={{ socket: socket, loginState: loginState }} options={defaultOptions('Profile picture', '#96db8f', '#6ec28c')} />
		</Stack.Navigator>
	);
};