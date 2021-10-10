import React, { Component } from "react";
import styles from "../../styles";
//import { NavigationContainer } from '@react-navigation/native';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

class Register extends Component {
  constructor(props) {
    super(props);
    this.onRegister = this.onRegister.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onContinue = this.onContinue.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  userReg = { email: "email", password: "pass" };
  onRegister() {
    // Fill with validation
    Alert.alert("User registered");
  }
  onSignIn() {
    //Fill with validation
    Alert.alert("User wants to sign in");
    this.props.navigation.navigate("Login");
  }

  onContinue() {
    //Fill with navigation and validation
    Alert.alert("User wants to sign up");
    console.log(this.userReg);
    this.props.navigation.navigate("Preference");
  }

  setEmail(Email) {
    this.userReg.email = Email;
  }
  setPassword(Password) {
    this.userReg.password = Password;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topTextView}>
          <Text style={styles.topText}>Sign Up </Text>
        </View>

        <View style={styles.texterView}>
          <Text style={styles.text}> Email</Text>
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={this.setEmail}
          />
        </View>

        <View style={styles.texterView}>
          <Text style={styles.text}> Password</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={this.setPassword}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={this.onContinue}>
          <Text style={styles.text}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.forgotPassword_signUp_view_Reg}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              paddingEnd: 5,
              marginTop: 10,
            }}
          >
            Already have an account?
          </Text>

          <TouchableOpacity
            style={{
              height: 15,
              marginTop: 10,
              borderColor: "black",
              borderBottomWidth: 1,
            }}
            onPress={this.onSignIn}
          >
            <Text>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Register;
