import React, { Component } from 'react'
//import styles from '../../../styles'
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native'

class Login extends Component {
  userLogin = { email: 'email', password: 'pass' }
  constructor(props) {
    super(props)
    this.onLogin = this.onLogin.bind(this)
    this.onForgotPassword = this.onForgotPassword.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.onSignUp = this.onSignUp.bind(this)
  }

  onLogin() {
    //Here is where it will send the login info to the backend
    this.props.navigation.navigate('Home')
  }

  setEmail(Email) {
    this.userLogin.email = Email
  }
  setPassword(Password) {
    this.userLogin.password = Password
  }
  onForgotPassword() {
    Alert.alert('User Forgot Passwrod')
  }
  onSignUp() {
    this.props.navigation.navigate('Register')
  }
  render() {
    //const [email, setEmail] = useState(" ");
    //const [password, setPassword] = useState(" ");
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../../assets/placeholder.png')}
        />

        <Text style={styles.signInText}>Sign in </Text>

        <Text style={styles.secondaryText}> Email</Text>
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your email'
          placeholderTextColor='#3d3d3d'
          onChangeText={this.setEmail}
        />

        {/*Add show/hide password option using the eye*/}
        <Text style={styles.secondaryText}> Password</Text>
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your password'
          placeholderTextColor='#3d3d3d'
          secureTextEntry={true}
          onChangeText={this.setPassword}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={this.onLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.align}>
          <TouchableOpacity
            style={{
              height: 15
            }}
            onPress={this.onForgotPassword}
          >
            <Text style={{
              fontWeight: 'bold',
              color: 'white'
            }}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 15,
              fontWeight: 'bold'
            }}
            onPress={this.onSignUp}
          >
            <Text style={{
              fontWeight: 'bold',
              color: 'white'
            }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#96db8f",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: 'absolute',
    width: 150,
    height: 150,
    top: 100
  },
  signInText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    left: 50
  },
  secondaryText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#3d3d3d",
    alignSelf: 'flex-start',
    left: 50,
    top: 20
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
    top: 20
  },
  loginBtn: {
    top: 40,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    opacity: 0.8,
    width: '70%',
    backgroundColor: '#85ba7f',
    padding: 15,
    borderRadius: 10
  },
  signInButtonText: {
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 18,
    color: "#2f402d"
  },
  align: {
    width: '70%',
    justifyContent: 'space-between',
    top:70,
    flexDirection: 'row',
  }
})


export default Login
