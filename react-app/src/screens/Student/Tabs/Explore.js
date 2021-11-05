import {
	LayoutAnimation,
	Animated,
	Dimensions,
	Text,
	View,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import Constants from "expo-constants";
import { SearchBar } from "react-native-elements";
import { Flex } from 'native-base';
import { DefaultTheme } from "@react-navigation/native";

import { CardItem, CardRow } from "../../../components/Event";
var { height, width } = Dimensions.get("window");

const itemWidth = width * 0.67;
const itemHeight = height / 2 - Constants.statusBarHeight * 2;

export default function Explore({ navigation, route }) {
	const socket = route.params.socket;
	const loginState = route.params.loginState;
	const interestedEvents = React.useRef([]);
	const confirmedEvents = React.useRef([]);
	const pastEvents = React.useRef([]);
	const cancelledEvents = React.useRef([]);

	const [isLoading, setIsLoading] = React.useState(true);

	useEffect(() => {
		socket.emit("getStudentEvents", { sid: loginState.id }, (err, res) => {
			if (err) {
				return;
			}

			for(let i = 0; i < res.confirmedEvents.length; i++) {
				if(res.confirmedEvents[i].active) {
					confirmedEvents.current.push(res.confirmedEvents[i]);
				} else if(res.confirmedEvents[i].cancelled) {
					cancelledEvents.current.push(res.confirmedEvents[i]);
				} else {
					pastEvents.current.push(res.confirmedEvents[i]);
				}
			}

			for(let i = 0; i < res.interestedEvents.length; i++) {
				if(res.interestedEvents[i].active) {
					interestedEvents.current.push(res.interestedEvents[i]);
				} else if(res.interestedEvents[i].cancelled) {
					cancelledEvents.current.push(res.interestedEvents[i]);
				} else {
					pastEvents.current.push(res.interestedEvents[i]);
				}
			}

			setIsLoading(false);
		});
		LayoutAnimation.spring();

	}, []);

	const [scrollX, setScrollX] = React.useState(new Animated.Value(0));
	const [search, setSearch] = React.useState("");

	const onPress = (event, type) => {
		event.type = type;
		navigation.navigate("StudentMiscStack",
			{
				screen: 'EventInfo',
				params: {
					event: event
				}
			});
	};

	const renderRow = (event, i, scrollX) => {
		let secondRange = [(i - 1) * itemWidth, i * itemWidth, (i + 1) * itemWidth];

		return (
			<Animated.View
				key={i}
				style={{
					overflow: "hidden",
					height: itemHeight,
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					width: itemWidth,
					backgroundColor: "transparent",
					opacity: scrollX.interpolate({
						inputRange: secondRange,
						outputRange: [0.3, 1, 1],
					}),
					height: scrollX.interpolate({
						inputRange: secondRange,
						outputRange: [itemHeight * 0.8, itemHeight, itemHeight],
					})
				}
				}
			>
				<CardRow event={event} onPress={() => onPress(event, "CONFIRMED")} />
			</Animated.View>

		);
	};

	return (
		<View style={styles.container}>
			{isLoading ? (
				<ActivityIndicator size="large" />
			) : (
				<ScrollView
					contentContainerStyle={{
						alignItems: "center"
					}}
					style={{
						width: "100%",
						height: "100%"
					}}
					keyboardShouldPersistTaps={'always'}
				>
					<SearchBar
						placeholder="Search..."
						onChangeText={(search) => setSearch(search)}
						value={search}
						round={DefaultTheme}
						platform={"ios"}
						containerStyle={{
							backgroundColor: '#F3F3F3',
							width: '95%',
							height: '1.5%'
						}}
						inputContainerStyle={{
							height: '1%'
						}}
					/>
					<View style={{ height: 20 + height / 2 }}>
						<Text style={[styles.heading, { fontSize: 28 }]}>Reserved</Text>
						<Animated.ScrollView
							horizontal={true}
							style={{ flex: 1 }}
							contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
							decelerationRate={0}
							snapToInterval={itemWidth}
							scrollEventThrottle={16}
							snapToAlignment="start"
							showsHorizontalScrollIndicator={false}
							onScroll={Animated.event([
								{ nativeEvent: { contentOffset: { x: scrollX } } },
							])}
						>
							{confirmedEvents.current.map((event, i) => {
								{
									let search_confirmed = search.toLowerCase();
									if (event.eventName.toLowerCase().includes(search_confirmed)) {
										return renderRow(event, i, scrollX);
									}
								}
							})}
						</Animated.ScrollView>
					</View>

					<Flex
						alignItems={"center"}
						w={'full'}
					>
						<Text style={styles.heading}>Liked</Text>
						{
							interestedEvents.current.map((event, i) => {
								let search_text = search.toLowerCase();
								if (event.eventName.toLowerCase().includes(search_text)) {
									return (
										<CardItem key={i} event={event} onPress={() => onPress(event, "INTERESTED")} edit={false} />
									);
								}
							})
						}
					</Flex>

					{cancelledEvents.current.length > 0 &&
						<Flex
							alignItems={"center"}
							w={'full'}
						>
							<Text style={styles.heading}>Cancelled events</Text>
							{
								cancelledEvents.current.map((event, i) => {
									let search_text = search.toLowerCase();
									if (event.eventName.toLowerCase().includes(search_text)) {
										return (
											<CardItem key={i} event={event} onPress={() => onPress(event, "INTERESTED")} edit={false} />
										);
									}
								})
							}
						</Flex>
					}

					{pastEvents.current.length > 0 &&
						<Flex
							alignItems={"center"}
							w={'full'}
						>
							<Text style={styles.heading}>Past events</Text>
							{
								pastEvents.current.map((event, i) => {
									let search_text = search.toLowerCase();
									if (event.eventName.toLowerCase().includes(search_text)) {
										return (
											<CardItem key={i} event={event} onPress={() => onPress(event, "INTERESTED")} edit={false} />
										);
									}
								})
							}
						</Flex>
					}
				</ScrollView>
			)
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: Constants.statusBarHeight,
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: 'center'
	},
	heading: {
		fontSize: 22,
		fontWeight: "300",
		alignSelf: "flex-start",
		paddingHorizontal: 10,
		paddingVertical: 10,
	}
});
