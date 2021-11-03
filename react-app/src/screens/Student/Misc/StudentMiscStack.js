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

export default function StudentMiscStack({ navigation, route }) {
    const Stack = createStackNavigator();
    const socket = route.params.socket;
    const loginState = route.params.loginState;
  
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
                backgroundColor: 'white',
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
            <Stack.Screen
                name="EventInfo"
                component={EventInfo}
                initialParams={{ socket: socket, loginState: loginState }}
                options={defaultOptions('Event information')}
            />
            <Stack.Screen
                name="HostInfo"
                component={HostInfo}
                initialParams={{ socket: socket, loginState: loginState }}
                options={defaultOptions('Host information')}
            />
            <Stack.Screen
                name="FollowedHosts"
                component={FollowedHosts}
                initialParams={{
                    loginState: loginState,
                    socket: socket,
                }}
                options={defaultOptions('Following')}
            />
            <Stack.Screen
                name="ChangePref"
                component={ChangePref}
                initialParams={{
                    users: users[0],
                }}
                options={defaultOptions('Settings')}
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