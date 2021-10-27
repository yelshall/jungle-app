import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Socket } from "socket.io-client";

export default function Register({ navigation, route }) {
  const socket = route.params.socket;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  let verifyValidEmail = () => {
    let re =
      /^(([^<>()[\]\ \.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      Alert.alert("Login", "Please enter a valid email.", [
        {
          text: "OK",
        },
      ]);
      return false;
    }
    return true;
  };

  let onContinue = () => {
    if (!verifyValidEmail()) {
      return;
    }

    if (password.length === 0) {
      Alert.alert("Login", "Please enter a password.", [
        {
          text: "OK",
        },
      ]);
      return;
    }

    socket.emit("verifyEmail", { email: email }, (err, res) => {
      if (err) {
        Alert.alert("Login", "A user already exists with this email.", [
          {
            text: "OK",
          },
        ]);
        return;
      }

      navigation.navigate("PersonalInfo", { email: email, password: password });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signUpText}>Sign up</Text>

      <Text style={styles.secondaryText}>Email</Text>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.TextInput}
        placeholder="Enter your email"
        placeholderTextColor="#3d3d3d"
        onChangeText={(email) => setEmail(email)}
      />

      {/*Add show/hide password option using the eye*/}
      <Text style={styles.secondaryText}>Password</Text>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.TextInput}
        placeholder="Enter your password"
        placeholderTextColor="#3d3d3d"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
        <Text style={styles.continueBtnText}>Continue</Text>
      </TouchableOpacity>

      {/* Add terms and conditions checkbox thingy */}

      <Text style={styles.signInText}>
        Have an account?
        <Text
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            {" "}
            Sign in
          </Text>
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		backgroundColor: "#8acf82",
		justifyContent: "center",
		alignItems: "center",
	},
	signUpText: {
		fontSize: 30,
		fontWeight: 'bold',
		alignSelf: 'flex-start',
		left: 50,
		bottom: 200
	},
	signInText: {
		fontWeight: 'bold',
		bottom: 120
	},
	secondaryText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "#3d3d3d",
		alignSelf: 'flex-start',
		left: 50,
		bottom: 180
	},
	TextInput: {
		color: "black",
		padding: 10,
		marginBottom: 10,
		borderBottomColor: "#d8ffd4",
		borderBottomWidth: 2,
		width: '77%',
		alignSelf: 'flex-start',
		left: 52,
		bottom: 180
	},
	continueBtn: {
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.4,
		shadowRadius: 5,
		opacity: 0.8,
		width: '70%',
		backgroundColor: '#51b375',
		padding: 15,
		borderRadius: 10,
		bottom: 160
	},
	continueBtnText: {
		alignSelf: 'center',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		fontSize: 14,
		color: "white"
	}
})