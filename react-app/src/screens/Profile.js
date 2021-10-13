import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../utils/context";
import React from "react";

import LottieView from "lottie-react-native";

export default function Profile () {
	const { signOut } = React.useContext(AuthContext);
	const onSignout = () => {
		signOut();
	};

	return (
		<View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
			<TouchableOpacity style={styles.signOutBtn} onPress={onSignout}>
				<Text style={styles.signOutBtnText}>Sign Out</Text>
			</TouchableOpacity>
			{/*<Text style={{ margin: 90, fontSize: 28 }}>Profile</Text>
			<LottieView
				source={require("../../assets/Lottie/Profile.json")}
				autoPlay
			/>*/}
		</View>
	);
}

const styles = StyleSheet.create({
	signOutBtn: {
		//top: 300,
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
	signOutBtnText: {
		alignSelf: 'center',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		fontSize: 18,
		color: "#2f402d"
	}
});