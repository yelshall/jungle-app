import {
	View,
	LayoutAnimation,
	ImageBackground,
	StyleSheet,
	Alert,
	ScrollView,
	ActivityIndicator,
	Pressable,
	Dimensions,
	TouchableOpacity,
} from "react-native";

import React, { useEffect } from "react";
import Tags from "react-native-tags";
import Constants from "expo-constants";
import { Text } from "react-native-elements";

import { CardItem, CardRow } from "../../../components/Event";

var { height, width } = Dimensions.get("window");

const smallSize = width / 5;

export default function Host_info({ navigation, route }) {
	const hostId = route.params.host._id;
	const socket = route.params.socket;
	const loginState = route.params.loginState;
	const host = React.useRef(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
	const [tags, setTags] = React.useState([]);

	useEffect(() => {
		socket.emit("retreiveHostInfo", { hid: hostId }, (err, res) => {
			if (err) {
				Alert.alert("Error", "Could not get host info data.", [
					{
						text: "OK",
					},
				]);
				return;
			}

			if (res.followers.includes(loginState.id)) {
				setFollow(!Follow_Bool);
				setTextValue("Unfollow");
			}

			host.current = res;

			let tags = [];
			for (let i = 0; i < res.tags.length; i++) {
				tags.push(res.tags[i].tagName);
			}

			setTags(tags);

			forceUpdate();

			setIsLoading(false);
		});
		LayoutAnimation.spring();
	}, []);

	const onEventPress = (event) => {
		navigation.navigate("StudentMiscStack",
			{
				screen: 'EventInfo',
				params: {
					event: event
				}
			});
	};

	const [textValue, setTextValue] = React.useState("Follow");
	const [Follow_Bool, setFollow] = React.useState(false);

	let onPress = () => {
		if (!Follow_Bool) {
			host.current.followers.push("Follower");
			socket.emit("followHost", { uid: loginState.id, hid: hostId });
			setTextValue("Unfollow");
			setFollow(true);
		} else {
			host.current.followers.pop();
			socket.emit("unfollowHost", { uid: loginState.id, hid: hostId });
			setTextValue("Follow");
			setFollow(false);
		}
	};

	let onChat = () => {
		socket.emit('getMessages', {sid: loginState.id, hid: host.current._id}, (err, res) => {
			if(err) {
				return;
			}

			navigation.navigate('StudentMiscStack', 
			{
				screen: 'Message',
				params: {
					rid: host.current._id,
					createChat: (res.length == 0 ? true : false)
				}
			});

			return;
		});
	};

	return (
		<ScrollView
			contentContainerStyle={{
				alignItems: 'center'
			}}
			style={{
				width: '100%',
				height: '100%'
			}}
		>
			{isLoading ? (
				<ActivityIndicator size="large" />
			) : (
				<>
					<ImageBackground
						source={{ uri: host.current.imageURL }}
						resizeMode={'cover'}
						style={{
							width: 100,
							height: 100,
							borderRadius: 50,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: '#e3e3e3',
							marginTop: '10%'
						}}
						imageStyle={{
							width: 100,
							height: 100,
							borderRadius: 50
						}}
					>
						{host.current.imageURL.length == "" &&
							<>
								<Text style={{
									color: '#a8a8a8',
									fontSize: 60,
									fontWeight: '500'
								}}>{host.current.hostName.charAt(0).toUpperCase()}</Text>
							</>
						}
					</ImageBackground>
					<Text style={styles.name}>
						{host.current.hostName}
						{/** check-mark check and View */}
						{/**  
              {"verified" == ver_status ? (
                <Image
                  style={styles.ver_stat}
                  source={require("../../assets/check-mark.png")}
                />
              ) : null}
              */}
					</Text>

					<Text style={styles.description}>
						{host.current.followers.length + " Followers"}
					</Text>

					<Text style={styles.info}>{host.current.hostEmail}</Text>

					<Text style={styles.description}>
						{host.current.description}
					</Text>

					{host.current.website.length > 0 && (
						<Text style={styles.info}>{host.current.website}</Text>
					)}

					{host.current.phoneNumber.length > 0 && (
						<Text style={styles.info}>
							{"Phone: " + host.current.phoneNumber}
						</Text>
					)}

					{host.current.tags.length > 0 && (
						<Tags
							initialTags={tags}
							readonly={true}
							deleteTagOnPress={false}
						/>
					)}
					<View
						style={{
							width: '100%',
							flexDirection: 'row',
							justifyContent:'space-around'
						}}
					>
						<Pressable style={styles.buttonContainer} onPress={onPress}>
							<Text style={styles.textButton}>{textValue}</Text>
						</Pressable>

						<Pressable style={styles.buttonContainer} onPress={onChat}>
							<Text style={styles.textButton}>Chat</Text>
						</Pressable>
					</View>



					<Text style={{ fontWeight: '600', fontSize: 22, alignSelf: "flex-start", marginLeft: '5%' }}>Posted Events</Text>
					<View style={{
						width: '90%',
						height: 0,
						borderWidth: 0.5,
						borderColor: '#cccccc',
						alignSelf: 'center',
						margin: '2%'
					}}></View>
					{host.current.events.map((event, i) => {
						return (
							<CardItem key={i} event={event} onPress={() => onEventPress(event)} edit={false} />
						)
					})}
				</>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	textButton: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
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
		width: 150,
		borderRadius: 10,
		backgroundColor: "#85ba7f",
	}
});
