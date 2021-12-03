import { StyleSheet, Image } from "react-native";

import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HostManage from "./HostManage";
import Chat from "../Chat";
import HostProfile from "./HostProfile";
import HostCreate from './HostCreate';
import { defaultOptions } from "../../components/Header";
import { GeneralContext } from "../../utils/context";

export default function HostHome({ navigation, route }) {
	const { socket, loginState } = React.useContext(GeneralContext);

	const Tabs = createBottomTabNavigator();

	return (
		<Tabs.Navigator
			tabBarOptions={{
				showLabel: false,
				style: {
					position: "absolute",
					bottom: 25,
					left: 20,
					right: 20,
					elevation: 0,
					backgroundColor: "#ffffff",
					borderRadius: 15,
					height: 90,
					...styles.shadow,
				},
			}}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused }) => {
					let filePath;
					switch (route.name) {
						case "HostManage":
							filePath = require("../../../assets/menu.png");
							break;
						case "Chat":
							filePath = require("../../../assets/chat.png");
							break;
						case "HostProfile":
							filePath = require("../../../assets/user.png");
							break;
						case "HostCreate":
							filePath = require("../../../assets/add.png");
							break;
						default:
							iconName = focused
								? "ios-information-circle"
								: "ios-information-circle-outline";
					}
					return (
						<Image
							source={filePath}
							resizeMode="contain"
							style={{
								width: 25,
								height: 25,
								tintColor: focused ? "#51b375" : "#748c94",
							}}
						/>
					);
				},
			})}
		>
			<Tabs.Screen
				name="HostManage"
				component={HostManage}
				options={{...defaultOptions('Manage', 'white', '#cccccc'), unmountOnBlur: true }}
			/>
			<Tabs.Screen
				name="HostCreate"
				component={HostCreate}
				options={{...defaultOptions('Create event', 'white', '#cccccc'), unmountOnBlur: true }}
			/>
			<Tabs.Screen
				name="Chat"
				component={Chat}
				options={{...defaultOptions('Chat', 'white', '#cccccc'), unmountOnBlur: true }}
			/>
			<Tabs.Screen
				name="HostProfile"
				component={HostProfile}
				options={{...defaultOptions('Profile', 'white', '#cccccc'), unmountOnBlur: true }}
			/>
		</Tabs.Navigator>
	);
}

const styles = StyleSheet.create({
	shadow: {
		shadowColor: "#7F5DF0",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	}
});
