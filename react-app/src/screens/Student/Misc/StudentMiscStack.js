import React from "react";
import { View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from 'react-native-elements';
import EventInfo from "./EventInfo";
import HostInfo from './HostInfo';
import FollowedHosts from "./FollowedHosts";
import ChangePref from "./ChangePref";
import UpdatePreferences from "./UpdatePreferences";
import users from "../../../../assets/events-data/users";
import {defaultOptions} from '../../../components/Header';

export default function StudentMiscStack({ navigation, route }) {
    const Stack = createStackNavigator();
    const socket = route.params.socket;
    const loginState = route.params.loginState;
  
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="EventInfo"
                component={EventInfo}
                initialParams={{ socket: socket, loginState: loginState }}
                options={defaultOptions('Event information', 'white', '#cccccc')}
            />
            <Stack.Screen
                name="HostInfo"
                component={HostInfo}
                initialParams={{ socket: socket, loginState: loginState }}
                options={defaultOptions('Host information', 'white', '#cccccc')}
            />
            <Stack.Screen
                name="FollowedHosts"
                component={FollowedHosts}
                initialParams={{
                    loginState: loginState,
                    socket: socket,
                }}
                options={defaultOptions('Following', 'white', '#cccccc')}
            />
            <Stack.Screen
                name="ChangePref"
                component={ChangePref}
                initialParams={{
                    users: users[0],
                }}
                options={defaultOptions('Settings', 'white', '#cccccc')}
            />
            <Stack.Screen
                name="UpdatePreferences"
                component={UpdatePreferences}
                initialParams={{ socket: socket, loginState: loginState }}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};