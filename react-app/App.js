import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login-registration/Login";
import Home from "./src/screens/Home";
import HostHome from "./src/screens/HostHome";
import Register from "./src/screens/Login-registration/Register";
import Preferences from "./src/screens/Login-registration/Preferences";
import HomeScreen from "./src/screens/Login-registration/HomeScreen";
import PersonalInfo from "./src/screens/Login-registration/PersonalInfo";
import HostSignup from "./src/screens/Login-registration/HostSignup";
import { io } from "socket.io-client";
import { getData, storeData, removeData } from "./src/utils/asyncStorage";
import { ActivityIndicator, View, Text, Alert } from "react-native";
import { AuthContext } from "./src/utils/context";
import event_info from "./src/screens/event_info";
import eventsData from "./assets/events-data/eventsData";
import editEvents from "./src/screens/editEvents";
const Stack = createStackNavigator();

export default function App() {
  const socket = io("http://localhost:3000");

  const initialLoginState = {
    isLoading: true,
    token: null,
    signInType: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETREIVE_TOKEN":
        return {
          ...prevState,
          token: action.token,
          signInType: action.signInType,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          token: action.token,
          signInType: action.signInType,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          token: null,
          signInType: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          token: action.token,
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
          dispatch({ type: "RETREIVE_TOKEN", token: null, signInType: null });
          return;
        }
        dispatch({
          type: "RETREIVE_TOKEN",
          token: token,
          signInType: response.signInType,
        });
      });
    }, 500);
  }, []);

  /*if (loginState.isLoading) {
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
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              initialParams={{ socket: socket }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              initialParams={{ socket: socket }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              initialParams={{ socket: socket }}
            />
            <Stack.Screen
              name="PersonalInfo"
              component={PersonalInfo}
              initialParams={{ socket: socket }}
            />
            <Stack.Screen
              name="HostSignup"
              component={HostSignup}
              initialParams={{ socket: socket }}
            />
            <Stack.Screen
              name="Preferences"
              component={Preferences}
              initialParams={{ socket: socket }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
  } else {
    if (loginState.signInType === "HOST") {
      return (
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="HostHome" component={HostHome} />
              <Stack.Screen
                name="editEvents"
                component={editEvents}
                initialParams={{ event: eventsData[0] }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      );
    } else {
      return (
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="event_info" component={event_info} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      );
    }
  }*/
  return (
	<AuthContext.Provider value={authContext}>
	  <NavigationContainer>
		<Stack.Navigator
		  screenOptions={{
			headerShown: false,
		  }}
		>
		  <Stack.Screen name="Home" component={Home} />
		  <Stack.Screen name="event_info" component={event_info} />
		</Stack.Navigator>
	  </NavigationContainer>
	</AuthContext.Provider>
  );

}
