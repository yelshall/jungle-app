import React from "react";
import {
	Text,
	ImageBackground,
	SafeAreaView,
	View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";

export default function EventCard({ event }) {
	return (
		<SafeAreaView style={{
			borderRadius: 20,
			width: '100%',
			height: '100%',
			backgroundColor: 'white'
		}}>
			<ImageBackground
				source={{
					uri: event.imageURL,
				}}
				style={{
					width: "100%",
					height: "100%",
					borderRadius: 10,
					overflow: "hidden",
					justifyContent: "flex-end",
				}}
			>
				<LinearGradient
					colors={["#000000", "transparent", "transparent"]}
					start={{ x: 0, y: 0.9 }}
					end={{ x: 0, y: 0 }}
					style={{
						height: "100%",
						width: "100%",
						justifyContent: "flex-end",
					}}
				>
					<SafeAreaView style={{
						margin: 10
					}}>
						<Text style={{
							fontSize: 26,
							color: "white",
							fontWeight: "bold",
							margin: 5
						}}>{event.eventName} </Text>

						{event.evenHost && (
							<Text style={{
								fontSize: 20,
								color: "white",
								fontWeight: 'bold'
							}}>Host: {event.eventHost}</Text>
						)}

						<View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
							<Icon
								type={"material-icons"}
								name={"place"}
								size={20}
								color='white'
								containerStyle={{
									marginRight: 8,
								}}
							/>
							<Text style={{
								fontSize: 18,
								color: "white",
								fontWeight: '600'
							}}>{event.location.length > 35 ? event.location.slice(0, 35) + '...' : event.location}</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
							<Icon
								type={"material-icons"}
								name={"alarm"}
								size={20}
								color='white'
								containerStyle={{
									marginRight: 3,
								}}
							/>
							<Text style={{
								fontSize: 18,
								color: "white",
								fontWeight: '600'
							}}> {(new Date(event.dateTime)).toDateString()}</Text>
						</View>

						{typeof event.tags !== "undefined" && (
							<View style={{
								flexDirection: 'row'
							}}>
								{
									event.tags.map((tag, i) => {
										return (
											<View
												style={{
													backgroundColor: '#d1e6de',
													paddingVertical: 3,
													paddingHorizontal: 9,
													borderWidth: 0,
													borderRadius: 15,
													margin: 10
												}}
												key={tag._id}
											>
												<Text
													style={{
														fontSize: 14,
														color: '#161c1a',
														fontWeight: '600',
													}}
												>
													{tag.tagName}
												</Text>
											</View>
										)
									})
								}
							</View>
						)}
					</SafeAreaView>
				</LinearGradient>
			</ImageBackground>
		</SafeAreaView>
	);
};