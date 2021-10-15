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
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Header } from "react-native-elements";
import eventsData from "../../assets/events-data/eventsData";
import React, { useEffect } from "react";
import { TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";

const isValidDate = (dateString) => {
	if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

	var parts = dateString.split("/");
	var day = parseInt(parts[1], 10);
	var month = parseInt(parts[0], 10);
	var year = parseInt(parts[2], 10);

	if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

	var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
		monthLength[1] = 29;

	return day > 0 && day <= monthLength[month - 1];
};

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

	useEffect(() => {
		socket.emit('getTags', {}, (err, res) => {
			if (err) {
				Alert.alert(
					"Host signup",
					"Error occurred.",
					[
						{
							text: "OK"
						}
					]
				);
				navigation.navigate('HomeScreen');
				return;
			}

			let tags = [];

			for (let i = 0; i < res.length; i++) {
				tags.push({ label: res[i].tagName, value: res[i]._id });
			}

			setTagTypes(tags);
		})
	}, []);
	const onCreateEvent = () => {
		if (eventName === "") {
			Alert.alert("Event creation", "Please choose a name for your event.", [
				{
					text: "OK",
				},
			]);
			return;
		}
		if (location === "") {
			Alert.alert(
				"Event creation",
				"Please choose a location for your event.",
				[
					{
						text: "OK",
					},
				]
			);
			return;
		}
		if (description === "") {
			Alert.alert(
				"Event creation",
				"Please choose a description for your event.",
				[
					{
						text: "OK",
					},
				]
			);
			return;
		}
		if (startDate === "") {
			Alert.alert(
				"Event creation",
				"Please choose a start date for your event.",
				[
					{
						text: "OK",
					},
				]
			);
			return;
		}
		if (endDate === "") {
			Alert.alert(
				"Event creation",
				"Please choose an end date for your event.",
				[
					{
						text: "OK",
					},
				]
			);
			return;
		}

		if (!isValidDate(endDate)) {
			Alert.alert("Event creation", "Please enter a valid end date.", [
				{
					text: "OK",
				},
			]);
			return;
		}

		if (!isValidDate(startDate)) {
			Alert.alert("Event creation", "Please enter a valid start date.", [
				{
					text: "OK",
				},
			]);
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
			description: description
		};

		socket.emit('createEventHost', { hid: loginState.id, newEvent: newEvent }, (err, res) => {
			if (err) {
				Alert.alert("Error", "Could not create new event.",
					[
						{
							text: "OK",
						},
					]
				)
				return;
			}
			setModal1Open(!model1Open);
		})
	};

	const Item = ({ item, onPress }) => (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("editEvents", { event: item });
			}}
		>
			<View style={styles.container}>
				<SafeAreaView style={styles.itemView}>
					<Image
						style={{ height: 100, width: 100 }}
						source={{ uri: item.image }}
					/>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "bold",
							paddingLeft: 0,
							//flexWrap: "wrap",
						}}
					></Text>
					<Text
						style={{ fontSize: 15, position: "absolute", paddingLeft: 100 }}
					>
						<Text style={{ fontWeight: "bold" }}>
							{" "}
							{item.event_name + "\n"}
						</Text>
						{item.event_date_time}
					</Text>
					{/** 
			<MaterialIcons
			  name="keyboard-arrow-right"
			  size={20}
			  color="black"
			  //alignSelf="stretch"
			  styles={styles.arrow}
			/>
			*/}
				</SafeAreaView>
			</View>
			<View
				style={{
					borderColor: "grey",
					borderWidth: 1,
					height: 1,
					width: "100%",
					alignSelf: "center",
				}}
			></View>
		</TouchableOpacity>
	);

	const renderItem = ({ item }) => {
		return <Item item={item} onPress={() => { }} />;
	};

	return (
		<View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
			<Text style={{ margin: 60, fontSize: 28, fontWeight: "bold" }}>
				Manage
			</Text>

			<FlatList
				data={eventsData}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				style={styles.container}
			/>

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
				>
				</Header>

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
						<Text style={styles.secondaryText}>Max Number of Attendees</Text>
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
