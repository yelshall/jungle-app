import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Student/Tabs/Home";
import HostHome from "./src/screens/Host/HostHome";
import Register from "./src/screens/Login-registration/Register";
import { io } from "socket.io-client";
import { getData, storeData, removeData } from "./src/utils/asyncStorage";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "./src/utils/context";
import eventsData from "./assets/events-data/eventsData";
import EditEvents from "./src/screens/Host/EditEvents";

import StudentMiscStack from "./src/screens/Student/Misc/StudentMiscStack";
import { NativeBaseProvider } from "native-base";
import { defaultOptions } from "./src/components/Header";
const Stack = createStackNavigator();

export default function App() {
	const socket = io("https://mighty-plateau-63166.herokuapp.com/");

	const initialLoginState = {
		isLoading: true,
		token: null,
		signInType: null,
		id: null,
	};

	const loginReducer = (prevState, action) => {
		switch (action.type) {
			case "RETREIVE_TOKEN":
				return {
					...prevState,
					token: action.token,
					id: action.id,
					signInType: action.signInType,
					isLoading: false,
				};
			case "LOGIN":
				return {
					...prevState,
					token: action.token,
					id: action.id,
					signInType: action.signInType,
					isLoading: false,
				};
			case "LOGOUT":
				return {
					...prevState,
					token: null,
					id: null,
					signInType: null,
					isLoading: false,
				};
			case "REGISTER":
				return {
					...prevState,
					token: action.token,
					id: null,
					signInType: action.signInType,
					isLoading: false,
				};
		}
	};

	const [loginState, dispatch] = React.useReducer(
		loginReducer,
		initialLoginState
	);

	const authContext = React.useMemo(
		() => ({
			signIn: async (response) => {
				try {
					let token = response.token;
					await storeData("token", response);
					dispatch({
						type: "LOGIN",
						token: token,
						signInType: response.signInType,
						id: response.id,
					});
				} catch (err) {
					console.log(err);
				}
			},
			signUp: async (response) => {
				try {
					let token = response.token;
					await storeData("token", response);
					dispatch({
						type: "REGISTER",
						token: token,
						signInType: response.signInType,
						id: response.id,
					});
				} catch (err) {
					console.log(err);
				}
			},
			signOut: async () => {
				try {
					await removeData("token");
				} catch (err) {
					console.log(err);
				}
				dispatch({ type: "LOGOUT" });
			},
		}),
		[]
	);

	useEffect(() => {
		setTimeout(async () => {
			let token = null;
			try {
				token = await getData("token");
			} catch (err) {
				console.log(err);
			}
			socket.emit("verifyToken", token, async (err, response) => {
				if (err) {
					try {
						await removeData("token");
					} catch (err) {
						console.log(err);
					}
					dispatch({
						type: "RETREIVE_TOKEN",
						id: null,
						token: null,
						signInType: null,
					});
					return;
				}
				dispatch({
					type: "RETREIVE_TOKEN",
					token: token,
					signInType: response.signInType,
					id: response.id,
				});
			});
		}, 500);
	}, []);

	if (loginState.isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (loginState.token === null) {
		return (
			<NativeBaseProvider>
				<AuthContext.Provider value={authContext}>
					<NavigationContainer>
						<Stack.Navigator>
							<Stack.Screen
								name="Register"
								options={{headerShown: false}}
								component={Register}
								initialParams={{ socket: socket }}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</AuthContext.Provider>
			</NativeBaseProvider>
		);
	} else {
		if (loginState.signInType === "HOST") {
			return (
				<NativeBaseProvider>
					<AuthContext.Provider value={authContext}>
						<NavigationContainer>
							<Stack.Navigator>
								<Stack.Screen
									name="HostHome"
									component={HostHome}
									options={{headerShown: false}}
									initialParams={{ socket: socket, loginState: loginState }}
								/>
								<Stack.Screen
									name="EditEvents"
									component={EditEvents}
									initialParams={{
										event: eventsData[0],
										socket: socket,
										loginState: loginState,
									}}
									options={defaultOptions('Event information', 'white', '#cccccc')}
								/>
							</Stack.Navigator>
						</NavigationContainer>
					</AuthContext.Provider>
				</NativeBaseProvider>
			);
		} else {
			return (
				<NativeBaseProvider>
					<AuthContext.Provider value={authContext}>
						<NavigationContainer>
							<Stack.Navigator>
								<Stack.Screen
									name="Home"
									component={Home}
									options={{headerShown: false}}
									initialParams={{
										socket: socket,
										loginState: loginState,
									}}
								/>
								<Stack.Screen
									name="StudentMiscStack"
									component={StudentMiscStack}
									options={{headerShown: false}}
									initialParams={{
										socket: socket,
										loginState: loginState
									}}
								/>
							</Stack.Navigator>
						</NavigationContainer>
					</AuthContext.Provider>
				</NativeBaseProvider>
			);
		}
	}
}