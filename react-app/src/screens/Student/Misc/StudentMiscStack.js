import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventInfo from "./EventInfo";
import HostInfo from "./HostInfo";
import { defaultOptions } from "../../../components/Header";
import Message from "../../Message";
import PersonalInformation from "./Profile/PersonalInformation";
import Following from "./Profile/Following";
import ChangePassword from "./Profile/ChangePassword";
import UpdateTags from "./Profile/UpdateTags";
import EventsList from "../../../components/Explore/EventsList";
import Privacy from "./Profile/Privacy";
import Notifications from "./Profile/Notifications";

export default function StudentMiscStack({ navigation, route }) {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name='EventInfo'
				component={EventInfo}
				options={defaultOptions("Event information", "white", "#cccccc")}
			/>
			<Stack.Screen
				name='HostInfo'
				component={HostInfo}
				options={defaultOptions("Host information", "white", "#cccccc")}
			/>
			<Stack.Screen
				name='Message'
				component={Message}
				options={defaultOptions("Message", "white", "#cccccc")}
			/>
			<Stack.Screen
				name='PersonalInformation'
				component={PersonalInformation}
				options={defaultOptions("Personal Information", "white", "#cccccc")}
			/>
			<Stack.Screen
				name='Following'
				component={Following}
				options={defaultOptions("Following", "white", "#cccccc")}
			/>
			<Stack.Screen
				name='ChangePassword'
				component={ChangePassword}
				options={defaultOptions("Change Password", "white", "#cccccc")}
			/>
			<Stack.Screen
				name={'UpdateTags'}
				component={UpdateTags}
				options={defaultOptions("Update Tags", "white", "#cccccc")}
			/>
			<Stack.Screen
				name={'EventsList'}
				component={EventsList}
				options={defaultOptions("Events", "white", "#cccccc")}
			/>
			<Stack.Screen
				name={'Privacy'}
				component={Privacy}
				options={defaultOptions("Privacy", "white", "#cccccc")}
			/>
			<Stack.Screen
				name={'Notifications'}
				component={Notifications}
				options={defaultOptions("Notifications", "white", "#cccccc")}
			/>
		</Stack.Navigator>
	);
};
