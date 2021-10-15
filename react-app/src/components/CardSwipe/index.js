import {
	StyleSheet,
	SafeAreaView,
	Text,
	Dimensions,
	Animated,
	PanResponder,
	Alert,
} from "react-native";

import React, { Component, useEffect } from "react";
import eventsData from "../../../assets/events-data/eventsData";
import Card from "../EventCard/index";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function CardSwipe({ navigation, route }) {
	const [position, setPosition] = React.useState(new Animated.ValueXY());
	const [currentIndex, setCurrentIndex] = React.useState(0);
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



	const panResponder = React.useRef(PanResponder.create({
		useNativeDriver: true,

		onStartShouldSetPanResponder: (evt, gestureState) => true,
		onPanResponderMove: (evt, gestureState) => {
			position.setValue({ x: gestureState.dx, y: gestureState.dy });
		},
		onPanResponderRelease: (evt, gestureState) => {
			// LIKED EVENT
			if (gestureState.dx > 120) {
				Alert.alert(
					"liked " + eventsData[currentIndex].event_name
				);
				Animated.spring(position, {
					toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
				}).start(() => {
					setCurrentIndex((oldIndex) => oldIndex + 1);
					position.setValue({ x: 0, y: 0 });
				});
			}
			// NOPED EVENT
			else if (gestureState.dx < -120) {
				Alert.alert(
					"disliked " + eventsData[currentIndex].event_name
				);
				Animated.spring(position, {
					toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
				}).start(() => {
					setCurrentIndex((oldIndex) => oldIndex + 1);
					position.setValue({ x: 0, y: 0 });
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
		return eventsData
			.map((item, i) => {
				if (i < currentIndex) {
					return null;
				} else if (i == currentIndex) {
					return (
						<Animated.View
							{...panResponder.panHandlers}
							key={item.id}
							style={[
								rotateAndTranslate,
								{
									height: SCREEN_HEIGHT - 120,
									width: SCREEN_WIDTH,
									padding: 10,
									position: "absolute",
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
								<Card eventData={eventsData[i]} />
							</SafeAreaView>
						</Animated.View>
					);
				} else {
					return (
						<Animated.View
							key={item.id}
							style={[
								{
									opacity: nextCardOpacity,
									transform: [{ scale: nextCardScale }],
									height: SCREEN_HEIGHT - 120,
									width: SCREEN_WIDTH,
									padding: 10,
									position: "absolute",
									useNativeDriver: true,
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
								<Card eventData={eventsData[i]} />
							</SafeAreaView>
						</Animated.View>
					);
				}
			})
			.reverse();
	};

	return (
		<SafeAreaView style={styles.container}>{renderUsers()}</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	shadow: {
		shadowColor: "#7F5DF0",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
