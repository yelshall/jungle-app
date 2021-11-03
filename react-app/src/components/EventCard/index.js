import React from "react";
import {
	Text,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	View,
} from "react-native";
import Tags from "react-native-tags";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";

const Tag = ({ tag }) => {
	return (
		<View style={styles.tagView}>
			<Text style={styles.tagText}>{tag.tagName}</Text>
		</View>
	);
};

export default function Card(props) {
	const [TagF, setTagF] = useState(false);
	const [LocF, setLocF] = useState(false);
	const [DateF, setDateF] = useState(false);

	const [value, setValue] = useState(null);
	const [Tagitems, setTagItems] = useState([
		{ label: "Sport", value: "Sport" },
		{ label: "Yoga", value: "Yoga" },
		{ label: "track", value: "track" },
	]);
	const [Locitems, setLocItems] = useState([
		{ label: "On-Campus", value: "On-Campus" },
		{ label: "Off-Campus", value: "Off-Campus" },
	]);
	const [Dateitems, setDateItems] = useState([
		{ label: "Today", value: "Today" },
		{ label: "This Week", value: "This Week" },
		{ label: "This Month", value: "This Month" },
	]);
	const event = props.eventData;
	const date = new Date(event.dateTime);
	let tags = [];

	const onDate = useCallback(() => {
		setTagF(false);
		setLocF(false);
	}, []);

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
					colors={['#000000', 'transparent']}
					start={{ x: 0.1, y: 1 }}
					end={{x: 0, y: 0}}
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
			<View style={styles.row}>
				<DropDownPicker
					style={{
						backgroundColor: "white",
						borderWidth: 0,
					}}
					containerStyle={{
						width: "25%",
						margin: 10,
						zIndex: 1,
					}}
					dropDownContainerStyle={{
						backgroundColor: "white",
						borderWidth: 0,
					}}
					dropDownDirection="TOP"
					multiple={true}
					min={0}
					max={3}
					placeholder="Tags"
					showArrowIcon={1}
					listMode="MODAL"
					bottomOffset={100}
					open={TagF}
					disabledItemLabelStyle={1}
					disabledItemContainerStyle={1}
					value={value}
					items={Tagitems}
					setOpen={setTagF}
					setValue={setValue}
					setItems={setTagItems}
				/>
				<DropDownPicker
					style={{
						backgroundColor: "white",
						borderWidth: 0,
					}}
					containerStyle={{
						width: "30%",
						margin: 10,
						zIndex: 2,
					}}
					dropDownContainerStyle={{
						backgroundColor: "white",
						borderWidth: 0,
					}}
					dropDownDirection="TOP"
					multiple={true}
					min={0}
					max={3}
					placeholder="Location"
					showArrowIcon={1}
					bottomOffset={100}
					open={LocF}
					disabledItemLabelStyle={1}
					disabledItemContainerStyle={1}
					value={value}
					items={Locitems}
					setOpen={setLocF}
					setValue={setValue}
					setItems={setLocItems}
				/>
				<DropDownPicker
					style={{
						backgroundColor: "white",
						borderWidth: 0,
					}}
					containerStyle={{
						width: "30%",
						margin: 10,
						zIndex: 3,
					}}
					dropDownContainerStyle={{
						backgroundColor: "white",
						borderWidth: 0,
					}}
					dropDownDirection="TOP"
					multiple={true}
					min={0}
					max={3}
					placeholder="Date"
					showArrowIcon={1}
					bottomOffset={100}
					open={DateF}
					close={null}
					disabledItemLabelStyle={1}
					disabledItemContainerStyle={1}
					value={value}
					items={Dateitems}
					setOpen={setDateF}
					setValue={setValue}
					setItems={setDateItems}
					onOpen={onDate}
				/>
			</View>
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
