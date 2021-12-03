import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Student/Tabs/Home";
import HostHome from "./src/screens/Host/Tabs/HostHome";
import Register from "./src/screens/Login-registration/Register";
import { getData, storeData, removeData } from "./src/utils/asyncStorage";
import { View, Platform, Image, LogBox } from "react-native";
import { AuthContext, GeneralContext, socket } from "./src/utils/context";
import EditEvents from "./src/screens/Host/EditEvents";
import Message from "./src/screens/Message";
import StudentMiscStack from "./src/screens/Student/Misc/StudentMiscStack";
import HostMiscStack from "./src/screens/Host/Misc/HostMiscStack";
import { NativeBaseProvider } from "native-base";
import { defaultOptions } from "./src/components/Header";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const loginReducer = (prevState, action) => {
  switch (action.type) {
    case "RETREIVE_TOKEN":
      return {
        ...prevState,
        token: action.token,
        id: action.id,
        signInType: action.signInType,
      };
    case "LOGIN":
      return {
        ...prevState,
        token: action.token,
        id: action.id,
        signInType: action.signInType,
      };
    case "LOGOUT":
      return {
        ...prevState,
        token: null,
        id: null,
        signInType: null,
      };
    case "REGISTER":
      return {
        ...prevState,
        token: action.token,
        id: action.id,
        signInType: action.signInType,
      };
    case "PUSHTOKEN":
      return {
        ...prevState,
        expoPushToken: action.expoPushToken,
      };
  }
};

export default function App() {
  LogBox.ignoreAllLogs(true);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const tags = useRef([]);
  const [isLoading, setIsLoading] = useState(true);

  const [loginState, dispatch] = React.useReducer(loginReducer, {
    token: null,
    signInType: null,
    id: null,
    expoPushToken: null,
  });

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
          socket.emit("getTags", {}, (err, res) => {
            if (err) {
              console.log(err);
              return;
            }

            tags.current = res;
            setIsLoading(false);
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

        socket.emit("getTags", {}, (err, res) => {
          if (err) {
            return;
          }

          tags.current = res;
          setIsLoading(false);
        });
      });
    }, 500);

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NativeBaseProvider>
      <AuthContext.Provider value={authContext}>
        <GeneralContext.Provider
          value={{ socket: socket, loginState: loginState, tags: tags.current }}
        >
          <NavigationContainer>
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: 150, width: 150 }}
                  source={require("./assets/logo/Logo-dark.png")}
                />
              </View>
            ) : loginState.token == null ? (
              <Stack.Navigator>
                <Stack.Screen
                  name='Register'
                  options={{ headerShown: false }}
                  component={Register}
                />
              </Stack.Navigator>
            ) : loginState.token != null && loginState.signInType == "HOST" ? (
              <Stack.Navigator>
                <Stack.Screen
                  name='HostHome'
                  component={HostHome}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='EditEvents'
                  component={EditEvents}
                  options={defaultOptions(
                    "Event information",
                    "white",
                    "#cccccc"
                  )}
                />
                <Stack.Screen
                  name='Message'
                  component={Message}
                  options={defaultOptions("Message", "white", "#cccccc")}
                />
                <Stack.Screen
                  name='HostMiscStack'
                  component={HostMiscStack}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator>
                <Stack.Screen
                  name='Home'
                  component={Home}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='StudentMiscStack'
                  component={StudentMiscStack}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </GeneralContext.Provider>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
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
      return;
    }
    // get the device push notification token (store this in the database, with the user id)
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
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
