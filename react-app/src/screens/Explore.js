import {
	LayoutAnimation,
	Animated,
	Dimensions,
	Text,
	View,
	StyleSheet,
	ScrollView,
	ImageBackground
} from "react-native";
import React, { useEffect } from "react";
import Constants from "expo-constants";
import { SearchBar } from "react-native-elements";
import { DefaultTheme } from "@react-navigation/native";

var { height, width } = Dimensions.get("window");

const smallSize = width / 5;
const itemWidth = width * 0.67;
const itemHeight = height / 2 - Constants.statusBarHeight * 2;
const fontSize = 300;

const COLORS = [
	"coral",
	"mediumturquoise",
	"palevioletred",
	"papayawhip",
	"tomato",
];

const SMALL_ITEMS = [
	"https://s-media-cache-ak0.pinimg.com/564x/e3/44/6f/e3446f61632a9381c96362b45749c5f6.jpg",
	"https://s-media-cache-ak0.pinimg.com/236x/8e/e3/ef/8ee3efa5a843f2c79258e3f0684d306e.jpg",
	"https://s-media-cache-ak0.pinimg.com/236x/f1/1c/26/f11c26247021daeac5ec8c3aba1792d1.jpg",
	"https://s-media-cache-ak0.pinimg.com/236x/fa/5c/a9/fa5ca9074f962ef824e513aac4d59f1f.jpg",
	"https://s-media-cache-ak0.pinimg.com/236x/95/bb/e4/95bbe482ca9744ea71f68321ec4260a2.jpg",
	"https://s-media-cache-ak0.pinimg.com/564x/54/7d/13/547d1303000793176aca26505312089c.jpg",
];

export default function Explore() {
	const [scrollX, setScrollX] = React.useState(new Animated.Value(0));
	const [search, setSearch] = React.useState("");

	useEffect(() => {
		LayoutAnimation.spring();
	}, []);

	const renderScroll = (scrollX, data) => {
		return (
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
				{data.map((image, i) => {
					return renderRow(image, i, scrollX);
				})}
			</Animated.ScrollView>
		);
	}

	const renderNormal = (image, index) => {
		if (image === "") {
			return null;
		}

		return (
			<View
				key={index}
				style={{
					flexDirection: "row",
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					marginBottom: 20,
				}}
			>
				<ImageBackground
					source={{ uri: image }}
					style={[
						{
							height: smallSize,
							width: smallSize,
							opacity: 1,
							resizeMode: "cover",
						},
					]}
				/>
				<View style={{ marginLeft: 20 }}>
					<Text style={{ fontWeight: "600", fontSize: 16 }}>
						Words of wisdom
					</Text>
					<Text style={{ fontWeight: "300", fontSize: 12 }}>
						We live in a world of deadlines
					</Text>
				</View>
			</View>
		);
	};

	const renderRow = (image, i, scrollX) => {
		let inputRange = [
			(i - 1) * itemWidth,
			i * itemWidth,
			(i + 1) * itemWidth,
			(i + 2) * itemWidth,
		];
		let secondRange = [(i - 1) * itemWidth, i * itemWidth, (i + 1) * itemWidth];

		// Ensure that we're leaving space for latest item.
		if (image === "") {
			return (
				<View
					key={i}
					style={[styles.emptyItem, { width: width * 0.33 }]}
				></View>
			);
		}

		return (
			<Animated.View
				key={i}
				style={[
					styles.emptyItem,
					{
						opacity: scrollX.interpolate({
							inputRange: secondRange,
							outputRange: [0.3, 1, 1],
						}),
						height: scrollX.interpolate({
							inputRange: secondRange,
							outputRange: [itemHeight * 0.8, itemHeight, itemHeight],
						}),
					},
				]}
			>
				<ImageBackground
					key={i}
					source={{ uri: image }}
					style={[
						StyleSheet.AbsoluteFill,
						{
							height: itemHeight,
							width: itemWidth,
							opacity: 1,
							resizeMode: "cover",
						},
					]}
				>
					<View
						style={[
							StyleSheet.AbsoluteFill,
							{
								opacity: 0.4,
								backgroundColor: COLORS[i],
								width: itemWidth,
								height: itemHeight,
							},
						]}
					></View>
					<Animated.View
						style={[
							{
								width: itemWidth,
								alignItems: "flex-end",
								justifyContent: "flex-end",
								flex: 1,
								position: "relative",
								height: itemHeight,
								opacity: scrollX.interpolate({
									inputRange,
									outputRange: [0.4, 1, 1, 1],
								}),
								transform: [
									{
										scale: scrollX.interpolate({
											inputRange,
											outputRange: [0.5, 1, 1.4, 1],
										}),
									},
								],
							},
						]}
					>
						<View
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
								width: itemWidth,
								height: itemHeight,
								position: "absolute",
								bottom: -itemHeight / 4,
								right: -itemWidth / 4,
							}}
						>
							<Text style={{ fontSize: fontSize, color: "rgba(0,0,0,0.4)" }}>
								{i + 1}
							</Text>
						</View>
					</Animated.View>
				</ImageBackground>
			</Animated.View>
		);
	}


	return (
		<View style={styles.container}>
			<View style={{ height: 20 + height / 2 }}>
				<SearchBar
					placeholder="Search..."
					onChangeText={(search) => setSearch(search)}
					value={search}
					round={DefaultTheme}
					platform={"ios"}
					containerStyle={styles.SearchStyle}
				/>
				<Text style={[styles.heading, { fontSize: 28 }]}>Reserved</Text>
				{renderScroll(scrollX, SMALL_ITEMS)}
			</View>
			<View style={{ flex: 1 }}>
				<Text style={styles.heading}>Liked</Text>
				<ScrollView
					contentContainerStyle={{ alignItems: "flex-start" }}
					style={{ paddingHorizontal: 10, flex: 1, width: width }}
				>
					{SMALL_ITEMS.map((image, i) => {
						return renderNormal(image, i);
					})}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
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
	heading: {
		fontSize: 22,
		fontWeight: "300",
		alignSelf: "flex-start",
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	SearchStyle: {
		backgroundColor: "#F3F3F3",
	}
});
