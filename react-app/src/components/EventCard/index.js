import React from "react";
import {
	Text,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	View,
} from "react-native";
import Tags from "react-native-tags";
import { LinearGradient } from "expo-linear-gradient";

const Tag = ({ tag }) => {
	return (
		<View style={styles.tagView}>
			<Text style={styles.tagText}>{tag.tagName}</Text>
		</View>
	);
};

export default function Card(props) {
	const event = props.eventData;
	const date = new Date(event.dateTime);
	let tags = [];

	for (let i = 0; i < event.tags.length; i++) {
		tags.push(event.tags[i].tagName);
	}

	return (
		<SafeAreaView style={styles.card}>
			<ImageBackground
				source={{
					uri: event.imageURL,
				}}
				style={styles.image}
			>
				<LinearGradient
					colors={['#000000', 'transparent', 'transparent']}
					start={{ x: 0, y: 0.9 }}
					end={{ x: 0, y: 0 }}
					style={{
						height: '100%',
						width: '100%',
						justifyContent: 'flex-end'
					}}
				>
					<SafeAreaView style={styles.cardInner}>
						<Text style={styles.event_name}>{event.eventName} </Text>
						{event.evenHost && (
							<Text style={styles.event_host}>Host: {event.eventHost}</Text>
						)}
						<Text style={styles.event_loc}>Loc: {event.location}</Text>
						<Text style={styles.event_loc}>Date: {date.toDateString()}</Text>
						{typeof event.tags !== "undefined" && (
							<View style={styles.row}>
								<Tags
									initialTags={tags}
									readonly={true}
									deleteTagOnPress={false}
								/>
							</View>
						)}
					</SafeAreaView>
				</LinearGradient>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	tagView: {
		backgroundColor: "#fefefe",
		borderRadius: 10,
	},

	row: {
		flexDirection: "row",
	},

	card: {
		width: "92%",
		height: "85%",
		borderRadius: 20,
		backgroundColor: "white",
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
