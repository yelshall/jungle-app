import {
	StyleSheet,
	SafeAreaView,
	Text,
	Dimensions,
	Animated,
	PanResponder,
	ActivityIndicator
} from "react-native";

import React, { useEffect } from "react";
import Card from "../EventCard/index";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function CardSwipe({ navigation, route }) {
	const socket = route.params.socket;
	const loginState = route.params.loginState;
	const events = React.useRef([]).current;
	const [isLoading, setIsLoading] = React.useState(true);

	useEffect(() => {
		socket.emit('getEvents', {}, (err, res) => {
			if (err) {
				return;
			}
			for(let i = 0; i < res.length; i++) {
				events.push(res[i]);
			}
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		});
	}, []);

	const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
	const position = React.useRef(new Animated.ValueXY()).current;
	const currentIndex = React.useRef({index: 0}).current;
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
				socket.emit('addInterestedEvent', {uid: loginState.id, eid: events[currentIndex.index]._id});
				Animated.spring(position, {
					toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
				}).start(() => {
					currentIndex.index += 1;
					position.setValue({ x: 0, y: 0 });
					forceUpdate();
				});
			}
			// NOPED EVENT
			else if (gestureState.dx < -120) {
				socket.emit('removeInterestedEvent', {uid: loginState.id, eid: events[currentIndex.index]._id});

				Animated.spring(position, {
					toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
				}).start(() => {
					currentIndex.index += 1;
					position.setValue({ x: 0, y: 0 });
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
		return events
			.map((item, i) => {
				if (i < currentIndex.index) {
					return null;
				} else if (i == currentIndex.index) {
					return (
						<Animated.View
							{...panResponder.panHandlers}
							key={item._id}
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
			{
				isLoading ?
					<ActivityIndicator size="large" />
					:
					renderUsers()
			}
		</SafeAreaView>
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
