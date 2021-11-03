import {
	StyleSheet,
	SafeAreaView,
	Text,
	Dimensions,
	Animated,
	PanResponder,
	ActivityIndicator,
	View,
} from "react-native";

import React, { useEffect } from "react";
import Card from "../EventCard/index";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useCallback } from "react";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function CardSwipe({ navigation, route }) {
	const [TagF, setTagF] = useState(false);
	const [LocF, setLocF] = useState(false);
	const [DateF, setDateF] = useState(false);

	const [val, setVal] = useState(null);
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

	const socket = route.params.socket;
	const loginState = route.params.loginState;
	const events = React.useRef([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" },
	]);

	const onDate = useCallback(() => {
		setTagF(false);
		setLocF(false);
	}, []);

	useEffect(() => {
		socket.emit("getEvents", { sid: loginState.id }, (err, res) => {
			if (err) {
				return;
			}

			events.current = [...res];
			setIsLoading(false);
		});
	}, []);

	const position = React.useRef(new Animated.ValueXY()).current;
	const [rotate, setRotate] = React.useState(
		position.x.interpolate({
			inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
			outputRange: ["-10deg", "0deg", "10deg"],
			extrapolate: "clamp",
		})
	);
	const [rotateAndTranslate, setRotateAndTranslate] = React.useState({
		transform: [
			{
				rotate: rotate,
			},
			...position.getTranslateTransform(),
		],
	});
	const [likeOpacity, setLikeOpacity] = React.useState(
		position.x.interpolate({
			inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
			outputRange: [0, 0, 1],
			extrapolate: "clamp",
		})
	);
	const [dislikeOpacity, setDislikeOpacity] = React.useState(
		position.x.interpolate({
			inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
			outputRange: [1, 0, 0],
			extrapolate: "clamp",
		})
	);
	const [nextCardOpacity, setNextCardOpacity] = React.useState(
		position.x.interpolate({
			inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
			outputRange: [1, 0, 1],
			extrapolate: "clamp",
		})
	);

	const [nextCardScale, setNextCardScale] = React.useState(
		position.x.interpolate({
			inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
			outputRange: [1, 0.8, 1],
			extrapolate: "clamp",
		})
	);
	const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

	const panResponder = React.useRef(
		PanResponder.create({
			useNativeDriver: true,

			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderMove: (evt, gestureState) => {
				position.setValue({ x: gestureState.dx, y: gestureState.dy });
			},
			onPanResponderRelease: (evt, gestureState) => {
				// LIKED EVENT
				if (gestureState.dx > 120) {
					socket.emit("addInterestedEvent", {
						uid: loginState.id,
						eid: events.current[0]._id,
					});

					Animated.spring(position, {
						toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
					}).start(() => {
						events.current.shift();
						position.setValue({ x: 0, y: 0 });
						if (events.length === 5) {
							socket.emit("getEvents", { sid: loginState.id }, (err, res) => {
								if (err) {
									return;
								}

								events.current = [...events, ...res];
							});
						}
						forceUpdate();
					});
				}
				// NOPED EVENT
				else if (gestureState.dx < -120) {
					socket.emit("addUnlikedStudent", {
						uid: loginState.id,
						eid: events.current[0]._id,
					});

					Animated.spring(position, {
						toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
					}).start(() => {
						events.current.shift();
						position.setValue({ x: 0, y: 0 });
						if (events.current.length === 5) {
							socket.emit("getEvents", { sid: loginState.id }, (err, res) => {
								if (err) {
									return;
								}

								events.current = [...events, ...res];
							});
						}
						forceUpdate();
					});
				} else {
					Animated.spring(position, {
						toValue: { x: 0, y: 0 },
						friction: 4,
					}).start();
				}
			},
		})
	).current;

	const renderUsers = () => {
		return events.current
			.map((item, i) => {
				if (i == 0) {
					return (
						<Animated.View
							{...panResponder.panHandlers}
							key={item._id}
							style={[
								rotateAndTranslate,
								{
									height: SCREEN_HEIGHT,
									width: SCREEN_WIDTH,
									padding: 10,
									position: "absolute",
									zIndex: 1
								},
							]}
						>
							<Animated.View
								style={{
									opacity: likeOpacity,
									transform: [{ rotate: "-30deg" }],
									position: "absolute",
									top: 50,
									left: 40,
									zIndex: 1000,
									useNativeDriver: true,
								}}
							>
								<Text
									style={{
										borderWidth: 1,
										borderColor: "green",
										color: "green",
										fontSize: 32,
										fontWeight: "800",
										padding: 10,
									}}
								>
									LIKE
								</Text>
							</Animated.View>

							<Animated.View
								style={{
									opacity: dislikeOpacity,
									transform: [{ rotate: "30deg" }],
									position: "absolute",
									top: 50,
									right: 40,
									zIndex: 1000,
									useNativeDriver: true,
								}}
							>
								<Text
									style={{
										borderWidth: 1,
										borderColor: "red",
										color: "red",
										fontSize: 32,
										fontWeight: "800",
										padding: 10,
									}}
								>
									NOPE
								</Text>
							</Animated.View>

							<SafeAreaView style={styles.container}>
								<Card eventData={item} />
							</SafeAreaView>
						</Animated.View>
					);
				} else {
					return (
						<Animated.View
							key={item._id}
							style={[
								{
									opacity: nextCardOpacity,
									transform: [{ scale: nextCardScale }],
									height: SCREEN_HEIGHT,
									width: SCREEN_WIDTH,
									padding: 10,
									position: "absolute",
									useNativeDriver: true,
									zIndex: -1
								},
							]}
						>
							<Animated.View
								style={{
									opacity: 0,
									transform: [{ rotate: "-30deg" }],
									position: "absolute",
									top: 50,
									left: 40,
									zIndex: 1000,
									useNativeDriver: true,
								}}
							>
								<Text
									style={{
										borderWidth: 1,
										borderColor: "green",
										color: "green",
										fontSize: 32,
										fontWeight: "800",
										padding: 10,
									}}
								>
									LIKE
								</Text>
							</Animated.View>

							<Animated.View
								style={{
									opacity: 0,
									transform: [{ rotate: "30deg" }],
									position: "absolute",
									top: 50,
									right: 40,
									zIndex: 1000,
									useNativeDriver: true,
								}}
							>
								<Text
									style={{
										borderWidth: 1,
										borderColor: "red",
										color: "red",
										fontSize: 32,
										fontWeight: "800",
										padding: 10,
									}}
								>
									NOPE
								</Text>
							</Animated.View>

							<SafeAreaView style={styles.container}>
								<Card eventData={item} />
							</SafeAreaView>
						</Animated.View>
					);
				}
			})
			.reverse();
	};

	return (
		<SafeAreaView style={styles.container}>
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
					value={val}
					items={Tagitems}
					setOpen={setTagF}
					setValue={setVal}
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
					value={val}
					items={Locitems}
					setOpen={setLocF}
					setValue={setVal}
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
					value={val}
					items={Dateitems}
					setOpen={setDateF}
					setValue={setVal}
					setItems={setDateItems}
					onOpen={onDate}
				/>
			</View>
			<View style={{
				width: '100%',
				height: '100%'
			}}>
			{isLoading ? <ActivityIndicator size="large" /> : renderUsers()}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center"
	},
	row: {
		flexDirection: "row"
	},
});
