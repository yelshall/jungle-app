import {
	Text,
	View,
	Image,
	StyleSheet,
	Alert,
	Modal,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import { Flex } from 'native-base';
import { AntDesign } from "@expo/vector-icons";
import { Header } from "react-native-elements";
import React, { useEffect } from "react";
import { TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { CardItem } from "../../components/Event";

export default function HostManage({ navigation, route }) {
	const socket = route.params.socket;
	const loginState = route.params.loginState;

	const [model1Open, setModal1Open] = React.useState(false);

	const [eventName, setEventName] = React.useState("");
	const [startDate, setStartDate] = React.useState("");
	const [endDate, setEndDate] = React.useState("");
	const [location, setLocation] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [maxStudents, setMaxStudents] = React.useState(-1);

	const [openTags, setOpenTags] = React.useState(false);
	const [tagTypes, setTagTypes] = React.useState([]);

	const [tags, setTags] = React.useState([]);
	const events = React.useRef([]);
	const [isLoading, setIsLoading] = React.useState(true);

	useEffect(() => {
		socket.emit("getTags", {}, (err, res) => {
			if (err) {
				Alert.alert("Host signup", "Error occurred.", [
					{
						text: "OK",
					},
				]);
				navigation.navigate("HomeScreen");
				return;
			}

			for (let i = 0; i < res.length; i++) {
				setTagTypes([...tags, { label: res[i].tagName, value: res[i]._id }]);
			}
		});

		socket.emit("getHostData", { hid: loginState.id }, (err, res) => {
			if (err) {
				Alert.alert("Host signup", "Error occurred.", [
					{
						text: "OK",
					},
				]);
				return;
			}

			events.current = [...res.events];

			setIsLoading(false);
		});
	}, []);
	const onCreateEvent = () => {
		if (eventName === "") {
			return;
		}
		if (location === "") {
			return;
		}
		if (description === "") {
			return;
		}
		if (startDate === "") {
			return;
		}
		if (endDate === "") {
			return;
		}

		let newEvent = {
			eventName: eventName,
			dateTime: startDate,
			endDateTime: endDate,
			location: location,
			tags: tags,
			maxStudents: maxStudents,
			eventHost: loginState.id,
			description: description,
		};

		socket.emit(
			"createEventHost",
			{ hid: loginState.id, newEvent: newEvent },
			(err, res) => {
				console.log(err, res);
				if (err) {
					Alert.alert("Error", "Could not create new event.", [
						{
							text: "OK",
						},
					]);
					return;
				}
				setModal1Open(!model1Open);
			}
		);
	};

	return (
		<View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
			{isLoading ? (
				<ActivityIndicator size="large" />
			) : (
				<ScrollView
					style={{ width: '100%', height: '100%' }}
					contentContainerStyle={{alignItems: "center"}}
				>
					<Flex
						alignItems={"center"}
						w={'full'}
					>
						{
							events.current.map((event, i) => {
								return (
									<CardItem event={event} onPress={() => navigation.navigate("EditEvents", {event: event})} edit={true} />
								);
							})
						}
					</Flex>
					<Modal
						avoidKeyboard
						presentationStyle="fullScreen"
						visible={model1Open}
						animationType="slide"
					>
						<Header
							centerComponent={{
								text: "Create An Event",
								style: { color: "#fff" },
							}}
						></Header>

						<ScrollView
							style={{
								width: "100%",
							}}
						>
							<View style={styles.infoView}>
								<Text style={styles.secondaryText}>Event Name</Text>
								<TextInput
									autoCorrect={false}
									style={styles.TextInput}
									placeholder="Enter Event name"
									placeholderTextColor="#3d3d3d"
									onChangeText={(eventName) => setEventName(eventName)}
								/>
							</View>

							<View style={styles.infoView}>
								<Text style={styles.secondaryText}>Event Start Date</Text>
								<TextInput
									autoCorrect={false}
									style={styles.TextInput}
									placeholder="mm/dd/yyyy"
									placeholderTextColor="#3d3d3d"
									onChangeText={(startDate) => setStartDate(startDate)}
								/>
							</View>

							<View style={styles.infoView}>
								<Text style={styles.secondaryText}>Event End Date</Text>
								<TextInput
									autoCorrect={false}
									style={styles.TextInput}
									placeholder="mm/dd/yyyy"
									placeholderTextColor="#3d3d3d"
									onChangeText={(endDate) => setEndDate(endDate)}
								/>
							</View>

							<View style={styles.infoView}>
								<Text style={styles.secondaryText}>Location</Text>
								<TextInput
									autoCorrect={false}
									style={styles.TextInput}
									placeholder="Enter Event Location"
									placeholderTextColor="#3d3d3d"
									onChangeText={(location) => setLocation(location)}
								/>
							</View>

							<View style={styles.infoView}>
								<Text style={styles.secondaryText}>
									Max Number of Attendees
								</Text>
								<TextInput
									autoCorrect={false}
									style={styles.TextInput}
									placeholder="Enter Max Attendees"
									placeholderTextColor="#3d3d3d"
									onChangeText={(maxStudents) => setMaxStudents(maxStudents)}
									onEndEditing={() => {
										if (maxStudents <= 0) {
											setMaxStudents(-1);
										}
									}}
								/>
							</View>

							<View style={styles.infoView}>
								<Text style={styles.secondaryText}>Event Description</Text>
								<TextInput
									autoCorrect={false}
									style={styles.TextInput}
									placeholder="Enter Event name"
									placeholderTextColor="#3d3d3d"
									onChangeText={(description) => setDescription(description)}
								/>
							</View>
							<Text style={styles.secondaryText}>Tags</Text>
							<DropDownPicker
								style={{
									backgroundColor: "#85ba7f",
									borderWidth: 0,
									alignSelf: "center",
								}}
								containerStyle={{
									width: "77%",
									paddingBottom: 20,
									alignSelf: "center",
								}}
								dropDownContainerStyle={{
									backgroundColor: "#85ba7f",
									borderWidth: 0,
									alignSelf: "center",
								}}
								multiple={true}
								min={0}
								max={3}
								placeholder="Choose an option"
								open={openTags}
								value={tags}
								items={tagTypes}
								setOpen={setOpenTags}
								setValue={setTags}
								setItems={setTagTypes}
								bottomOffset={100}
							/>
						</ScrollView>

						<TouchableOpacity
							style={styles.signOutBtn}
							onPress={() => {
								onCreateEvent();
							}}
						>
							<Text style={styles.signOutBtnText}>Create Event</Text>
						</TouchableOpacity>
					</Modal>

					<TouchableOpacity onPress={() => setModal1Open(true)}>
						<AntDesign name="pluscircleo" size={50} color="green" />
					</TouchableOpacity>
				</ScrollView>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 100,
		width: "100%",
	},
	itemView: {
		//flexWrap: "wrap",
		//flexDirection: "row",
		width: "100%",

		//flex: 1,
		padding: 0,
		marginBottom: 0,
		color: "green",
		//alignItems: "center",
		//justifyContent: "space-evenly",
	},

	signOutBtn: {
		//top: 300,
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
	signOutBtnText: {
		alignSelf: "center",
		textTransform: "uppercase",
		fontWeight: "bold",
		fontSize: 18,
		color: "#2f402d",
	},
	secondaryText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "#3d3d3d",
		alignSelf: "flex-start",
		left: 50,
	},
	TextInput: {
		color: "black",
		padding: 10,
		marginBottom: 10,
		borderBottomColor: "#d8ffd4",
		borderBottomWidth: 2,
		width: "77%",
		alignSelf: "flex-start",
		left: 52,
	},
	infoView: {
		padding: 20,
		paddingBottom: 20,
	},
});
