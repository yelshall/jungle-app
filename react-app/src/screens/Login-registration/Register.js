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

export default function Register({ navigation, route }) {
	const socket = route.params.socket;
	const Stack = createStackNavigator();

	const BackButton = ({ }) => (
		<Icon
			type={"material"}
			name={"chevron-left"}
			size={40}
			style={{ margin: 0, padding: 0 }}
			onPress={() => {
				navigation.goBack();
			}}
		/>
	);

	const headerBackground = ({ }) => (
		<View
			style={{
				backgroundColor: '#96db8f',
				height: '100%',
				width: '100%',
				borderBottomWidth: 0.5,
				borderColor: '#84cf7c'
			}}
		></View>
	)

	const defaultOptions = (title) => {
		return {
			title: title,
			headerLeft: BackButton,
			headerTitleStyle: {
				fontSize: 20,
				fontWeight: 'bold'
			},
			headerBackground: headerBackground
		}
	}

	return (
		<Stack.Navigator>
			<Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Login" component={Login} initialParams={{ socket: socket }} options={defaultOptions('Login')} />
			<Stack.Screen name="EmailAndPassword" component={EmailAndPassword} initialParams={{ socket: socket }} options={defaultOptions('Email')} />
			<Stack.Screen name="PersonalInfo" component={PersonalInfo} options={defaultOptions('Personal information')} />
			<Stack.Screen name="Preferences" component={Preferences} initialParams={{ socket: socket }} options={defaultOptions('Preferences')} />
			<Stack.Screen name="HostSignup" component={HostSignup} initialParams={{ socket: socket }} options={defaultOptions('Host information')} />
			<Stack.Screen name="ProfilePic" component={ProfilePic} initialParams={{socket: socket}} options={defaultOptions('Profile picture')} />
		</Stack.Navigator>
	);
};