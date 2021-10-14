import React from "react";
import { Text, ImageBackground, SafeAreaView, StyleSheet } from "react-native";

export default function Card(props) {
	const { event_name, image, event_host, event_location, event_date_time } =
		props.eventData;
	return (
		<SafeAreaView style={styles.card}>
			<ImageBackground
				source={{
					uri: image,
				}}
				style={styles.image}
			>
				<SafeAreaView style={styles.cardInner}>
					<Text style={styles.event_name}>{event_name} </Text>
					<Text style={styles.event_host}>Host: {event_host}</Text>
					<Text style={styles.event_loc}>Loc: {event_location}</Text>
					<Text style={styles.event_loc}>Date: {event_date_time}</Text>
				</SafeAreaView>
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	card: {
		width: "90%",
		height: "80%",
		borderRadius: 20,
		backgroundColor: "#fefefe",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.36,
		shadowRadius: 6.68,

		elevation: 11,
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
		overflow: "hidden",

		justifyContent: "flex-end",
	},
	cardInner: {
		padding: 10,
	},

	event_name: {
		fontSize: 30,
		color: "white",
		fontWeight: "bold",
		marginBottom: 20,
	},

	event_desc: {
		fontSize: 24,
		color: "white",
		marginBottom: 5,
	},

	event_host: {
		fontSize: 20,
		color: "white",
		marginBottom: 5,
	},
	event_loc: {
		fontSize: 18,
		color: "white",
		marginBottom: 5,
	},
});
