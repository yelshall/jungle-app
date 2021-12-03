import {
	SafeAreaView,
	Dimensions,
	Animated,
	PanResponder,
	Image,
	View,
} from "react-native";

import React, { useEffect, useRef, useReducer } from "react";
import EventCard from "../../../components/swipe/EventCard";
import { GeneralContext } from "../../../utils/context";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Swipe({ route }) {
	const { socket, loginState } = React.useContext(GeneralContext);
	const recommendedEvents = useRef([]);
	const eventErr = useRef('');
	const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

	useEffect(() => {
		socket.emit("getRecommendedEvents", { sid: loginState.id, filter: { type: 'noFilter' } }, (err, res) => {
			if (err) {
				eventErr.current = err.err;
				return;
			}
			recommendedEvents.current = [...recommendedEvents.current, ...res];
			forceUpdate();
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

	const [nextCardScale, setNextCardScale] = React.useState(
		position.x.interpolate({
			inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
			outputRange: [1, 0.8, 1],
			extrapolate: "clamp",
		})
	);

	const panResponder = React.useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (evt, gestureState) => {
				position.setValue({ x: gestureState.dx, y: gestureState.dy });
			},
			onPanResponderRelease: (evt, gestureState) => {
				// LIKED EVENT
				if (gestureState.dx > 120) {
					Animated.spring(position, {
						toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
						useNativeDriver: true
					}).start(() => {
						socket.emit('updateStudent', {
							sid: loginState.id,
							update: {
								type: "ADD",
								field: "INTERESTED_EVENT",
								eid: recommendedEvents.current[0]._id
							}
						});
						recommendedEvents.current.shift();
						forceUpdate();
						position.setValue({ x: 0, y: 0 });
						if (recommendedEvents.current.length == 5) {
							socket.emit("getRecommendedEvents", { sid: loginState.id, filter: { type: 'noFilter' } }, (err, res) => {
								if (err) {
									eventErr.current = err.err;
									return;
								}

								recommendedEvents.current = [...recommendedEvents.current, ...res];
							});
						}
					});
				}
				// NOPED EVENT
				else if (gestureState.dx < -120) {
					Animated.spring(position, {
						toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
						useNativeDriver: true
					}).start(() => {
						socket.emit('updateStudent', {
							sid: loginState.id,
							update: {
								type: "ADD",
								field: "UNLIKED_EVENT",
								eid: recommendedEvents.current[0]._id
							}
						});
						recommendedEvents.current.shift();
						forceUpdate();
						position.setValue({ x: 0, y: 0 });
						if (recommendedEvents.current.length == 5) {
							socket.emit("getRecommendedEvents", { sid: loginState.id, filter: { type: 'noFilter' } }, (err, res) => {
								if (err) {
									eventErr.current = err.err;
									return;
								}

								recommendedEvents.current = [...recommendedEvents.current, ...res];
							});
						}
						forceUpdate();
					});
				} else {
					Animated.spring(position, {
						toValue: { x: 0, y: 0 },
						friction: 4,
						useNativeDriver: true
					}).start();
				}
			},
		})
	).current;

	if (recommendedEvents.current.length == 0) {
		//Show that there are no more events
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Image
					style={{ height: 150, width: 150 }}
					source={require('../../../../assets/logo/Logo-dark.png')}
				/>
			</View>
		);
	}

	return (
		<SafeAreaView style={{
			alignItems: 'center',
			justifyContent: 'center',
			width: "100%",
			height: "100%"
		}}>
			{
				recommendedEvents.current
					.map((item, i) => {
						if (i < 2 && i != 0) {
							return (
								<Animated.View
									key={item._id}
									style={{
										transform: [{ scale: nextCardScale }],
										height: SCREEN_HEIGHT * 0.8,
										width: SCREEN_WIDTH * 0.9,
										position: 'absolute',
										zIndex: (i + 1) * -1,
										alignItems: 'center'
									}}
								>
									<EventCard event={item} />
								</Animated.View>
							);
						}
					}).reverse()
			}
			<Animated.View
				{...panResponder.panHandlers}
				style={[
					rotateAndTranslate,
					{
						height: SCREEN_HEIGHT * 0.8,
						width: SCREEN_WIDTH * 0.9,
						position: 'absolute',
						zIndex: 1,
						alignItems: 'center'
					}
				]}
			>
				<EventCard event={recommendedEvents.current[0]} />
			</Animated.View>
		</SafeAreaView>
	);
}