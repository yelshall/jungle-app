import React, { Component } from 'react'
import {
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	Alert,
	StyleSheet
} from 'react-native'
import {storeData, getData} from '../../utils/asyncStorage';
import { AuthContext, Authcontext } from '../../utils/context';

export default function Login({ navigation, route }) {
	const socket = route.params.socket;
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const { signIn } = React.useContext(AuthContext);

	let verifyValidEmail = () => {
		let re = /^(([^<>()[\]\ \.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(String(email).toLowerCase())) {
			Alert.alert(
				"Login",
				"Please enter a valid email.",
				[
					{
						text: "OK"
					}
				]
			);
			return false;
		}
		return true;
	}

	let onLogin = () => {
		if (!verifyValidEmail()) {
			return;
		}

		if (password.length === 0) {
			Alert.alert(
				"Login",
				"Please enter a password.",
				[
					{
						text: "OK"
					}
				]
			);
			return;
		}

		socket.emit("login", { email: email, password: password }, (err, response) => {
			if (err) {
				if (err.err === 'INCORRECT_EMAIL') {
					Alert.alert(
						"Login",
						"The email you entered was incorrect.",
						[
							{
								text: "OK"
							}
						]
					);
				} else if (err.err === 'INCORRECT_PASSWORD') {
					Alert.alert(
						"Login",
						"The password you entered was incorrect.",
						[
							{
								text: "OK"
							}
						]
					);
				} else {
					Alert.alert(
						"Login",
						"Error logging you in.",
						[
							{
								text: "OK"
							}
						]
					);
				}
				return;
			}
			signIn(response);
		});
	}

	let onForgotPassword = () => {

	}

	let onSignUp = () => {
		navigation.navigate('Register')
	}

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require('../../../assets/placeholder.png')}
			/>

			<Text style={styles.signInText}>Sign in </Text>

			<Text style={styles.secondaryText}> Email</Text>
			<TextInput
				autoCapitalize='none'
				onEndEditing={verifyValidEmail}
				style={styles.TextInput}
				placeholder='Enter your email'
				placeholderTextColor='#3d3d3d'
				onChangeText={(email) => setEmail(email.toLowerCase())}
			/>

			{/*Add show/hide password option using the eye*/}
			<Text style={styles.secondaryText}> Password</Text>
			<TextInput
				autoCapitalize='none'
				style={styles.TextInput}
				placeholder='Enter your password'
				placeholderTextColor='#3d3d3d'
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/>

			<TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
				<Text style={styles.signInButtonText}>Sign In</Text>
			</TouchableOpacity>

			<View style={styles.align}>
				<TouchableOpacity
					style={{
						height: 15
					}}
					onPress={onForgotPassword}
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
					onPress={onSignUp}
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
		top: 70,
		flexDirection: 'row',
	}
})