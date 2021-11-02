import React from 'react'
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	StyleSheet
} from 'react-native'
import { Input } from 'react-native-elements';
import { AuthContext } from '../../utils/context';

export default function Login({ navigation, route }) {
	const socket = route.params.socket;
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [hidePassword, setHidePassword] = React.useState(true);
	const [icon, setIcon] = React.useState("eye-outline");
	const [errorEmail, setErrorEmail] = React.useState("");
	const [errorPassword, setErrorPassword] = React.useState("");

	const { signIn } = React.useContext(AuthContext);

	const verifyValidEmail = () => {
		let re = /^(([^<>()[\]\ \.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(String(email).toLowerCase())) {
			setErrorEmail("Please enter a valid email");
			return;
		}
		setErrorEmail("");
	}

	const onLogin = () => {
		//Add loading animation while verifying login info with server
		//Use the lottie library
		socket.emit("login", { email: email, password: password }, (err, response) => {
			if (err) {
				if (err.err === 'INCORRECT_EMAIL' || err.err === 'INCORRECT_PASSWORD') {
					setErrorPassword("Your email or password was incorrect");
				} else {
					setErrorPassword("Error logging you in");
				}
				return;
			}

			setErrorPassword("");
			signIn(response);
		});
	}

	const onForgotPassword = () => {
		return;
	}

	const onSignUp = () => {
		navigation.navigate('Register')
	}

	return (
		<View style={styles.container}>
			<View style={styles.inputs}>
				<Image
					style={styles.image}
					source={require("../../../assets/logo/Logo-dark.png")}
				/>

				<Text style={styles.signInText}>Sign in</Text>

				<Input
					autoCorrect={false}
					autoCapitalize='none'
					placeholder='Email'
					placeholderTextColor='#3d3d3d'
					leftIcon={{ type: 'font-awesome', name: 'envelope-o', size: 20 }}
					containerStyle={{
						margin: 5
					}}
					inputStyle={{
						fontSize: 14
					}}
					inputContainerStyle={{
						borderColor: 'white',
						borderBottomWidth: 1.5
					}}
					label={"Email"}
					labelStyle={{
						fontSize: 16,
						lineHeight: 21,
						fontWeight: "bold",
						letterSpacing: 0.25,
						color: "#3d3d3d",
					}}
					onChangeText={(email) => setEmail(email.toLowerCase())}
					onEndEditing={verifyValidEmail}
					errorMessage={errorEmail}
					errorStyle={{
						fontSize: 13,
						fontWeight: '500'
					}}
				/>

				<Input
					placeholder='Password'
					autoCorrect={false}
					autoCapitalize='none'
					placeholderTextColor='#3d3d3d'
					secureTextEntry={hidePassword}
					leftIcon={{ type: 'font-awesome', name: 'lock', size: 20 }}
					containerStyle={{
						margin: 5
					}}
					inputStyle={{
						fontSize: 14
					}}
					inputContainerStyle={{
						borderColor: 'white',
						borderBottomWidth: 1.5
					}}
					label={"Password"}
					labelStyle={{
						fontSize: 16,
						lineHeight: 21,
						fontWeight: "bold",
						letterSpacing: 0.25,
						color: "#3d3d3d",
					}}
					onChangeText={(password) => setPassword(password)}
					onEndEditing={() => {
						if (password.length == 0) {
							setErrorPassword("Please enter a password");
							return;
						}
						setErrorPassword("");
					}}
					rightIcon={{
						type: "ionicon",
						name: icon,
						size: 20,
						onPress: () => {
							setHidePassword(x => !x);
							setIcon(icon => icon === "eye-outline" ? "eye-off-outline" : "eye-outline")
						}
					}}
					errorMessage={errorPassword}
					errorStyle={{
						fontSize: 13,
						fontWeight: '500'
					}}
				/>
			</View>

			<View style={styles.buttons}>
				<TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
					<Text style={styles.signInButtonText}>Sign In</Text>
				</TouchableOpacity>

				<View style={styles.align}>
					<TouchableOpacity
						style={{
							height: 20
						}}
						onPress={onForgotPassword}
					>
						<Text style={{
							fontWeight: 'bold',
							color: 'black'
						}}>Forgot Password?</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
							height: 20,
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
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		backgroundColor: "#96db8f",
		alignItems: "center",
	},
	inputs: {
		width: '77%',
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 125,
		height: 125,
		margin: 20
	},
	signInText: {
		fontSize: 30,
		fontWeight: 'bold',
		alignSelf: 'flex-start',
		marginBottom: 15
	},
	buttons: {
		width: '75%',
		justifyContent: "center",
		alignItems: "center",
	},
	loginBtn: {
		width: '100%',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        opacity: 0.8,
        backgroundColor: '#51b375',
        padding: 15,
        borderRadius: 10,
	},
	signInButtonText: {
		alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
        color: "black"
	},
	align: {
		width: '100%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginTop: 10
	}
})