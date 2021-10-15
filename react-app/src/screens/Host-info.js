import {
	View,
	SafeAreaView,
	LayoutAnimation,
	ImageBackground,
	StyleSheet,
	Alert,
	ScrollView,
	ActivityIndicator,
	Pressable,
	Dimensions,
	Image,
	TouchableOpacity,
	Animated,
} from "react-native";

import React, { useEffect } from "react";

import { Text } from "react-native-elements";
import Constants from "expo-constants";

import { Divider } from "react-native-elements";;

const list = [
	{
		name: "by John Purdue",
		avatar_url:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/JohnPurdue.jpg/300px-JohnPurdue.jpg",
		subtitle: "Status: Verified",
	},
];

var { height, width } = Dimensions.get("window");

const smallSize = width / 5;
const itemWidth = width * 0.67;
const itemHeight = height / 2 - Constants.statusBarHeight * 2;

export default function Host_info({ navigation, route }) {
	const hostId = route.params.host._id;
	const socket = route.params.socket;
	const loginState = route.params.loginState;
	const hostValue = React.useRef([]).current;
	const [isLoading, setIsLoading] = React.useState(true);
	const [, forceUpdate] = React.useReducer((x) => x + 1, 0)

	useEffect(() => {
		socket.emit('getHostData', { hid: hostId }, (err, res) => {
			if (err) {
				Alert.alert("Error", "Could not get host info data.", [
					{
						text: "OK"
					}
				])
				return;
			}

			hostValue.push(res);

			forceUpdate();

			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		})
	}, []);

	const onLongPress = (event) => {
		navigation.navigate("event_info", { event: event, loginState: loginState, socket: socket });
	};
	useEffect(() => {
		LayoutAnimation.spring();
	}, []);

	const [textValue, setTextValue] = React.useState("Follow");
	const [Follow_Bool, setFollow] = React.useState(false);

	let onPress = () => {
		if (!Follow_Bool) {
			hostValue[0].followers.push('Follower');
			socket.emit('followHost', {uid: loginState.id, hid: hostId});
			setTextValue("Unfollow");
			setFollow(true);
		} else {
			hostValue[0].followers.pop();
			socket.emit('unfollowHost', {uid: loginState.id, hid: hostId});
			setTextValue("Follow");
			setFollow(false);
		}
	};

	const renderNormal = (event, index) => {
		if (event === null) {
			return null;
		}

		return (
			<View
				key={index}
				style={{
					flexWrap: "nowrap",
					flexDirection: "row",
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					marginBottom: 20,
				}}
			>
				<TouchableOpacity onLongPress={() => onLongPress(event)}>
					<ImageBackground
						source={{ uri: event.imageURL }}
						style={[
							{
								height: smallSize,
								width: smallSize,
								opacity: 1,
								resizeMode: "cover",
							},
						]}
					/>
				</TouchableOpacity>

				<View style={{ marginLeft: 20, flex: 1 }}>
					<TouchableOpacity onLongPress={() => onLongPress(event)}>
						<Text
							style={{
								fontWeight: "600",
								fontSize: 16,
								position: "absolute",
								bottom: 5,
							}}
						>
							{event.eventName}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	return (
		<>

			{
				isLoading ?
					<ActivityIndicator size="large" />
					:
					<>
						<View style={styles.container}>
							<View style={styles.header}></View>

							{hostValue[0].imageURL.length > 0 && (
								<Image style={styles.avatar} source={{ uri: hostValue[0].imageURL }} />
							)}
							<View style={styles.body}>
								<View style={styles.bodyContent}>
									<Text style={styles.name}>{hostValue[0].hostName}</Text>

									<Text style={styles.description}>
										{hostValue[0].followers.length + " Followers"}
									</Text>

									<Text style={styles.info}>{hostValue[0].hostEmail}</Text>

									<Text style={styles.description}>{hostValue[0].description}</Text>

									{hostValue[0].website.length > 0 && 
										<Text style={styles.info}>{hostValue[0].website}</Text>		
									}
									
									{hostValue[0].tags.length > 0 && (
										<Text style={styles.info}>{"Tags: " + hostValue[0].tags}</Text>
									)}
									{hostValue[0].phoneNumber.length > 0 && (
										<Text style={styles.info}>{"Phone: " + hostValue[0].phoneNumber}</Text>
									)}

									<Pressable style={styles.buttonContainer} onPress={onPress}>
										<Text style={styles.textButton}> {textValue}</Text>
									</Pressable>

									<Divider orientation="vertical" width={5} />
								</View>
							</View>
						</View>

						<View style={styles.containerExplore}>
							<Text style={styles.headingExplore}>Posted Events</Text>
							<ScrollView
								contentContainerStyle={{ alignItems: "flex-start" }}
								style={{ paddingHorizontal: 10, flex: 1, width: width }}
							>
								{hostValue[0].events.map((event, i) => {
									return renderNormal(event, i);
								})}
							</ScrollView>
						</View>
					</>
			}
		</>
	);
}

// prettier-ignore
const styles = StyleSheet.create({
	container: {
		height: 300,
		//width:410,
		resizeMode: 'contain',
	},

	image: {
		width: "100%",
		height: "100%",
		borderRadius: 20,
		overflow: "hidden",
		justifyContent: "flex-end",
	},

	loginBtn: {
		width: "50%",
		borderRadius: 10,
		height: 50,
		bottom: 0,
		position: 'relative',
		top: 80,
		alignItems: "center",
		justifyContent: "center",
		marginLeft: Dimensions.get('window').width / 4,
		backgroundColor: "grey",
	},

	textButton: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
	},

	TextContainer: {
		position: 'relative',
		height: 80,
		resizeMode: 'contain',
		justifyContent: "flex-end",
		top: 400,
		//bottom: 100 
	},

	scrollView: {
		backgroundColor: 'white',
		resizeMode: "contain",
		marginVertical: 3,
		//marginHorizontal: 5,
		paddingTop: 5,
		paddingBottom: 0,
	},

	text: {
		//paddingTop:3,
		position: "relative",
		fontSize: 21,
		lineHeight: 21,
		//fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},

	textInner: {
		//paddingTop:3,
		position: "relative",
		fontSize: 21,
		lineHeight: 21,
		//fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},

	header: {
		backgroundColor: "#85ba7f",
		height: 200,
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "white",
		marginBottom: 10,
		alignSelf: 'center',
		position: 'absolute',
		marginTop: 130
	},

	body: {
		marginTop: 40,
	},

	bodyContent: {
		//flex: 1,
		alignItems: 'center',
		padding: 30,
	},
	name: {
		fontSize: 28,
		color: "#696969",
		fontWeight: "600"
	},

	info: {
		fontSize: 16,
		color: "#85ba7f",
		marginTop: 10
	},

	description: {
		fontSize: 16,
		color: "#696969",
		marginTop: 10,
		textAlign: 'center'
	},

	buttonContainer: {
		marginTop: 10,
		height: 45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
		width: 250,
		borderRadius: 30,
		backgroundColor: "#85ba7f",
	},

	containerExplore: {
		top: 210,
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "center",
		marginTop: Constants.statusBarHeight,
	},
	emptyItem: {
		overflow: "hidden",
		height: itemHeight,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		borderLeftWidth: 20,
		borderColor: "white",
		width: itemWidth,
		backgroundColor: "transparent",
	},
	headingExplore: {
		fontSize: 22,
		fontWeight: "300",
		alignSelf: "flex-start",
		paddingHorizontal: 10,
		paddingVertical: 10,
	},


});
