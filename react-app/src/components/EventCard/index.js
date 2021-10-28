import React from "react";
import {
	Text,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	View
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tag = ({ tag }) => {
	return (<View style={styles.tagView}>
		<Text style={styles.tagText}>{tag.tagName}</Text>
	</View>)
};

export default function Card(props) {
  const event = props.eventData;

	return (
		<SafeAreaView style={styles.card}>
			<TouchableOpacity
				activeOpacity={1}
			>
				<ImageBackground
					source={{
						uri: event.imageURL,
					}}
					style={styles.image}
				>
					<SafeAreaView style={styles.cardInner}>
						<Text style={styles.event_name}>{event.eventName} </Text>
						{
							event.evenHost &&
							<Text style={styles.event_host}>Host: {event.eventHost}</Text>
						}
						<Text style={styles.event_loc}>Loc: {event.location}</Text>
						<Text style={styles.event_loc}>Date: {event.dateTime}</Text>
						{
							typeof event.tags !== "undefined" &&
							<View>
								<Text style={styles.event_loc}>Tags:</Text>
								{
									event.tags.map(tag => {
										return <Tag tag={tag} />
									})
								}
							</View>
						}
					</SafeAreaView>
				</ImageBackground>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	tagView: {
		backgroundColor: '#fefefe',
		borderRadius: 10
	},
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
  image_button: {
    //marginBottom: 280,
    //marginLeft: 280,
    //width: "90%",
    borderRadius: 5,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 40,
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
