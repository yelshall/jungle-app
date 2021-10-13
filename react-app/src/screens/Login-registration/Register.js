import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default function Register({ navigation, route }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.signUpText}>Sign up</Text>

      <Text style={styles.secondaryText}>Email</Text>
      <TextInput
        style={styles.TextInput}
        placeholder='Enter your email'
        placeholderTextColor='#3d3d3d'
        onChangeText={(email) => setEmail(email)}
      />

      {/*Add show/hide password option using the eye*/}
      <Text style={styles.secondaryText}>Password</Text>
      <TextInput
        style={styles.TextInput}
        placeholder='Enter your password'
        placeholderTextColor='#3d3d3d'
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate("PersonalInfo")}>
        <Text style={styles.continueBtnText}>Continue</Text>
      </TouchableOpacity>

      {/* Add terms and conditions checkbox thingy */}

      <Text style={styles.signInText}>
        Have an account?
        <Text onPress={() => navigation.navigate("Login")}>
          <Text style={{
            fontWeight: 'bold',
            color: 'white'
          }}> Sign in</Text>
        </Text>
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#96db8f",
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
    backgroundColor: '#85ba7f',
    padding: 15,
    borderRadius: 10,
    bottom: 160
  },
  continueBtnText: {
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 14,
    color: "#2f402d"
  }
})