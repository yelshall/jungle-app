import { View, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";

import { Text } from "react-native-elements";

const KHeight = Dimensions.get("window").height;
const KWidth = Dimensions.get("window").width;

export default function event_info({ navigation, route }) {
	const socket = route.params.socket;
	const loginState = route.params.loginState;
	const event = route.params.event;

	const [RSVP, setRSVP] = React.useState(event.type === "INTERESTED");

	let onPress = () => {
		setRSVP(false);
		socket.emit("removeInterestedEvent", {
			uid: loginState.id,
			eid: event._id,
		});
		socket.emit("addConfirmedEvent", { uid: loginState.id, eid: event._id });
	};

	let onCancel = () => {
		socket.emit("removeConfirmedEvent", { uid: loginState.id, eid: event._id });
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}></View>
			<Image style={styles.avatar} source={{ uri: event.imageURL }} />

			<View style={{ height: KHeight * 0.14 }}></View>
			<Text
				style={{
					fontSize: 25,
					position: "absolute",
					alignSelf: "center",
					marginTop: 50,
					color: "white",
					fontWeight: "bold",
				}}
			>
				{event.eventName}
			</Text>
			{event.eventHost && (
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("StudentMiscStack", {
							screen: 'HostInfo',
							params: {
								loginState: loginState,
								socket: socket,
								host: event.eventHost
							}
						})
					}
					style={{
						borderWidth: 1,
						borderColor: "black",
						borderRadius: 5,
						width: "60%",
						alignSelf: "center",
					}}
				>
					<Text
						style={{
							fontSize: 15,
							alignSelf: "center",
							marginVertical: 10,
							color: "green",
							fontWeight: "bold",
							adjustFonScaling: true,
						}}
					>
						{event.eventHost.hostName}
					</Text>
				</TouchableOpacity>
			)}

			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<EvilIcons name="location" size={24} color="black" />
				<Text style={{ alignSelf: "center", marginVertical: 20, width: "50%" }}>
					{event.location}
				</Text>
			</View>
			<ScrollView>
				<Text
					style={{
						alignSelf: "center",
						marginVertical: 50,
						width: "80%",
						flexWrap: "wrap",
					}}
				>
					{event.description}
				</Text>
			</ScrollView>

			<Text
				style={{ alignSelf: "center", marginVertical: 30, fontWeight: "bold" }}
			>
				{event.dateTime}
			</Text>

			{RSVP && (
				<TouchableOpacity style={styles.signOutBtn} onPress={onPress}>
					<Text style={styles.signOutBtnText}>RSVP</Text>
				</TouchableOpacity>
			)}

			{!RSVP && (
				<TouchableOpacity style={styles.signOutBtn} onPress={onCancel}>
					<Text style={styles.signOutBtnText}>CANCEL</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#96db8f",
		height: KHeight * 0.28,
	},
	avatar: {
		width: KHeight * 0.4,
		height: KWidth * 0.5,
		borderRadius: KHeight * 0.25,
		borderWidth: 4,
		borderColor: "white",
		marginBottom: 10,
		alignSelf: "center",
		position: "absolute",
		marginTop: 130,
	},
	signOutBtnText: {
		alignSelf: "center",
		textTransform: "uppercase",
		fontWeight: "bold",
		fontSize: 18,
		color: "#2f402d",
	},
	container: {
		flex: 1,
	},
	signOutBtn: {
		shadowColor: "black",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.4,
		shadowRadius: 5,
		opacity: 0.8,
		width: "70%",
		backgroundColor: "#85ba7f",
		padding: 15,
		borderRadius: 10,
		alignSelf: "center",
		marginBottom: 50,
	},
});
