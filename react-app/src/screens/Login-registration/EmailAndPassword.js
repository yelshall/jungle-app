import React from "react";
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { Input, LinearProgress } from 'react-native-elements';
import { passwordStrength } from 'check-password-strength';
import { GeneralContext } from "../../utils/context";
import { SocialIcon } from "react-native-elements";

import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

function randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}

export default function EmailAndPassword({ navigation, route }) {
	const { socket, loginState } = React.useContext(GeneralContext);

	const [email, setEmail] = React.useState("");
	const [errorEmail, setErrorEmail] = React.useState("");
	const [password1, setPassword1] = React.useState("");
	const [password2, setPassword2] = React.useState("");
	const [icon1, setIcon1] = React.useState("eye-off-outline");
	const [icon2, setIcon2] = React.useState("eye-off-outline");
	const [errorPassword1, setErrorPassword1] = React.useState("");
	const [errorPassword2, setErrorPassword2] = React.useState("");
	const [hidePassword1, setHidePassword1] = React.useState(true);
	const [hidePassword2, setHidePassword2] = React.useState(true);
	const [progress, setProgress] = React.useState(0);
	const [color, setColor] = React.useState('red');

	const verifyValidEmail = () => {
		let re =
			/^(([^<>()[\]\ \.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(String(email).toLowerCase())) {
			setErrorEmail("Please enter a valid email");
			return false;
		}
		setErrorEmail("");
		return true;
	};

	const onContinue = () => {
		let err = false;

		if (!verifyValidEmail()) {
			err = true;
		}

		if (progress < 0.5) {
			setErrorPassword1("Your password is too weak");
			err = true;
		}

		if (password1 !== password2) {
			setErrorPassword2("The passwords are not the same");
			err = true;
		}

		if (err) {
			return;
		}

		socket.emit("verifyEmail", { email: email }, (err, res) => {
			if (err) {
				setErrorEmail("A user with this email already exists");
				return;
			}

			navigation.navigate("RegistrationType", { email: email, password: password1 });
		});
	};

	const onLoginGoogle = () => {
		const config = {
			iosClientId:
				"656324476633-teao9cp5k5q7lhs1m7hq6fe1k8s2evu4.apps.googleusercontent.com",
			androidClientId:
				"656324476633-bk7aektgqqksbu0q1nnasir3jq09545k.apps.googleusercontent.com",
			scopes: ["profile", "email"],
		};
		Google.logInAsync(config)
			.then((result) => {
				const { type, user } = result;
				if (type == "success") {
					const { email, name, photoUrl } = user;
					console.log(email);
					navigation.navigate("RegistrationType", { email: email, password: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const onLoginFacebook = async () => {
		try {
			await Facebook.initializeAsync({
				appId: "197006039272073",
			});
			const { type, token, expirationDate, permissions, declinedPermissions } =
				await Facebook.logInWithReadPermissionsAsync();

			if (type === "success") {
				// Get the user's name using Facebook's Graph API
				const response = await fetch(
					`https://graph.facebook.com/me?access_token=${token}&fields=email`
				);

				const email = await response.json();

				navigation.navigate("RegistrationType", { email: email.email, password: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') });

			} else {
				// type === 'cancel'
			}
		} catch ({ message }) {
			alert(`Facebook Login Error: ${message}`);
		}
	};

	return (
		<View style={styles.container}>
			<Input
				autoCorrect={false}
				autoCapitalize='none'
				placeholder='Email'
				placeholderTextColor='#3d3d3d'
				leftIcon={{ type: 'font-awesome', name: 'envelope-o', size: 20 }}
				containerStyle={{
					width: '77%',
					marginTop: '5%'
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
				secureTextEntry={hidePassword1}
				leftIcon={{ type: 'font-awesome', name: 'lock', size: 20 }}
				containerStyle={{
					width: '77%',
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
				onChangeText={(password) => {
					if (password.length === 0) {
						setErrorPassword1("Your password is too weak");
						setProgress(0);
					} else if (passwordStrength(password).id === 0) {
						setErrorPassword1("Your password is too weak");
						setColor('red');
						setProgress(0.25);
					} else if (passwordStrength(password).id === 1) {
						setErrorPassword1("");
						setColor('orange');
						setProgress(0.50);
					} else if (passwordStrength(password).id === 2) {
						setErrorPassword1("");
						setColor('mediumseagreen');
						setProgress(0.75);
					} else if (passwordStrength(password).id === 3) {
						setErrorPassword1("");
						setColor('green');
						setProgress(1);
					}
					setPassword1(password);
				}}
				onEndEditing={() => {
					if (progress < 0.5) {
						setErrorPassword1("Your password is too weak");
					}
				}}
				rightIcon={{
					type: "ionicon",
					name: icon1,
					size: 20,
					onPress: () => {
						setHidePassword1(x => !x);
						setIcon1(icon => icon === "eye-off-outline" ? "eye-outline" : "eye-off-outline")
					}
				}}
				errorMessage={errorPassword1}
				errorStyle={{
					fontSize: 13,
					fontWeight: '500'
				}}
			/>

			<LinearProgress
				style={{
					width: '73%',
					borderRadius: 5
				}}
				color='black'
				trackColor='white'
				color={color}
				variant='determinate'
				value={progress}
			/>

			<Input
				placeholder='Re-enter password'
				autoCorrect={false}
				autoCapitalize='none'
				placeholderTextColor='#3d3d3d'
				secureTextEntry={hidePassword2}
				leftIcon={{ type: 'font-awesome', name: 'lock', size: 20 }}
				containerStyle={{
					width: '77%',
					marginTop: '5%'
				}}
				inputStyle={{
					fontSize: 14
				}}
				inputContainerStyle={{
					borderColor: 'white',
					borderBottomWidth: 1.5
				}}
				label={"Re-enter password"}
				labelStyle={{
					fontSize: 16,
					lineHeight: 21,
					fontWeight: "bold",
					letterSpacing: 0.25,
					color: "#3d3d3d",
				}}
				onChangeText={(password) => {
					if (password2 === password1) {
						setErrorPassword2("");
					}
					setPassword2(password)
				}}
				onEndEditing={() => {
					if (password2 !== password1) {
						setErrorPassword2("The passwords are not the same");
						return;
					}
					setErrorPassword2("");
				}}
				errorMessage={errorPassword2}
				errorStyle={{
					fontSize: 13,
					fontWeight: '500'
				}}
				rightIcon={{
					type: "ionicon",
					name: icon2,
					size: 20,
					onPress: () => {
						setHidePassword2(x => !x);
						setIcon2(icon => icon === "eye-off-outline" ? "eye-outline" : "eye-off-outline")
					}
				}}
			/>

			<TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
				<Text style={styles.continueBtnText}>Continue</Text>
			</TouchableOpacity>

			<Text style={{ fontWeight: "bold", color: "white" }}>
				OR
			</Text>

			<View style={{ flexDirection: "row", margin: 10 }}>
				<TouchableOpacity>
					<SocialIcon
						style={styles.socialButton}
						title='GOOGLE'
						button
						onPress={onLoginGoogle}
						type='google'
					/>
				</TouchableOpacity>

				<TouchableOpacity>
					<SocialIcon
						style={styles.socialButton}
						title='FACEBOOK'
						button
						onPress={onLoginFacebook}
						type='facebook'
					/>
				</TouchableOpacity>
			</View>

			<Text style={{
				fontWeight: 'bold'
			}}>
				Have an account?

				<Text
					style={{
						fontWeight: "bold",
						color: "white",
					}}
					onPress={() => {
						navigation.navigate("Login");
					}}
				>
					{" "}
					Sign in
				</Text>
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		backgroundColor: "#96db8f",
		alignItems: "center",
	},
	continueBtn: {
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.4,
		shadowRadius: 5,
		opacity: 0.8,
		width: '75%',
		backgroundColor: '#71bd69',
		padding: 15,
		borderRadius: 10,
		margin: 20
	},
	continueBtnText: {
		alignSelf: 'center',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		fontSize: 14,
		color: "white"
	},
	socialButton: {
		width: 150,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.4,
		shadowRadius: 5,
		opacity: 0.8,
		padding: 15,
		borderRadius: 10,
	},
})