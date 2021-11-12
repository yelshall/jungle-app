import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Student/Tabs/Home";
import HostHome from "./src/screens/Host/HostHome";
import Register from "./src/screens/Login-registration/Register";
import { io } from "socket.io-client";
import { getData, storeData, removeData } from "./src/utils/asyncStorage";
import { ActivityIndicator, View, Platform } from "react-native";
import { AuthContext } from "./src/utils/context";
import eventsData from "./assets/events-data/eventsData";
import EditEvents from "./src/screens/Host/EditEvents";
import Message from "./src/screens/Message";
import HostProfileInfo from "./src/screens/Host/HostProfileInfo";

import StudentMiscStack from "./src/screens/Student/Misc/StudentMiscStack";
import { NativeBaseProvider } from "native-base";
import { defaultOptions } from "./src/components/Header";
const Stack = createStackNavigator();

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import HostInfo from "./src/screens/Host/HostProfileInfo";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const socket = useRef(
    io("https://mighty-plateau-63166.herokuapp.com/")
  ).current;

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const initialLoginState = {
    isLoading: true,
    token: null,
    signInType: null,
    id: null,
    expoPushToken: null,
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
          id: action.id,
          signInType: action.signInType,
          isLoading: false,
        };
      case "PUSHTOKEN":
        return {
          ...prevState,
          expoPushToken: action.expoPushToken,
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
          socket.emit("setId", { id: response.id });
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
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      dispatch({ type: "PUSHTOKEN", expoPushToken: token });
      console.log(loginState);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

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
        socket.emit("setId", { id: response.id });
      });
    }, 500);

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
        <ActivityIndicator size='large' />
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
                name='Register'
                options={{ headerShown: false }}
                component={Register}
                initialParams={{ socket: socket, loginState: loginState }}
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
                  name='HostHome'
                  component={HostHome}
                  options={{ headerShown: false }}
                  initialParams={{ socket: socket, loginState: loginState }}
                />
                <Stack.Screen
                  name='EditEvents'
                  component={EditEvents}
                  initialParams={{
                    event: eventsData[0],
                    socket: socket,
                    loginState: loginState,
                  }}
                  options={defaultOptions(
                    "Event information",
                    "white",
                    "#cccccc"
                  )}
                />
                <Stack.Screen
                  name='Message'
                  component={Message}
                  initialParams={{ socket: socket, loginState: loginState }}
                  options={defaultOptions("Message", "white", "#cccccc")}
                />
                <Stack.Screen
                  name='HostProfileInfo'
                  component={HostProfileInfo}
                  initialParams={{ socket: socket, loginState: loginState }}
                  options={defaultOptions("Host Info", "white", "#cccccc")}
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
                  name='Home'
                  component={Home}
                  options={{ headerShown: false }}
                  initialParams={{
                    socket: socket,
                    loginState: loginState,
                  }}
                />
                <Stack.Screen
                  name='StudentMiscStack'
                  component={StudentMiscStack}
                  options={{ headerShown: false }}
                  initialParams={{
                    socket: socket,
                    loginState: loginState,
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

async function registerForPushNotificationsAsync() {
  let token;
  // checks for permissions and device type (basically the code is always the same for all expo notifications so no change here from the documentation)
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // get the device push notification token (store this in the database, with the user id)
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
