import React, { Component } from "react";
import styles from "../../styles";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

class Login extends Component {
  userLogin = { email: "email", password: "pass" };
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onForgotPassword = this.onForgotPassword.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  onLogin() {
    //Add navigation
    //Add remove keyboard and rerender
    //Add verification
    Alert.alert("User logged in ");
    console.log(this.userLogin.email);
    console.log(this.userLogin.password);
    this.props.navigation.navigate("Home");
  }

  setEmail(Email) {
    this.userLogin.email = Email;
  }
  setPassword(Password) {
    this.userLogin.password = Password;
  }
  onForgotPassword() {
    //Add navigation
    // Add remove keyboard and rerender
    Alert.alert("User Forgot Passwrod");
  }
  onSignUp() {
    //Add naviageion
    Alert.alert("User wants to sign up");
    this.props.navigation.navigate("Register");
  }
  render() {
    //const [email, setEmail] = useState(" ");
    //const [password, setPassword] = useState(" ");
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/Tucan.png")}
        />

        <View style={styles.topTextView}>
          <Text style={styles.topText}>Sign in </Text>
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

        <TouchableOpacity style={styles.loginBtn} onPress={this.onLogin}>
          <Text style={styles.text}>Sign In</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }}></View>

        <View style={styles.forgotPassword_signUp_view}>
          <TouchableOpacity
            style={{
              height: 15,
              marginTop: 10,
              borderColor: "black",
              borderBottomWidth: 1,
            }}
            onPress={this.onForgotPassword}
          >
            <Text>Forgot Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 15,
              marginTop: 10,
              borderColor: "black",
              borderBottomWidth: 1,
            }}
            onPress={this.onSignUp}
          >
            <Text>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;
