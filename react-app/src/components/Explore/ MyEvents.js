import React from 'react';
import {
	Text,
	ScrollView,
	TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";
import { CardItem, EventsRow } from "../../components/Event";


export default function MyEvents({ confirmedEvents, interestedEvents, pastEvents, cancelledEvents, navigation }) {
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

	const onMore = (list, type) => {
		console.log(list.length);
		navigation.navigate("StudentMiscStack",
		{
			screen: 'EventsList',
			params: {
				list: list,
				type: type
			}
		});
	};

	return (
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
			<EventsRow
				data={confirmedEvents.current.slice(0, 6)}
				title={'Your reserved events'}
				renderItem={({ item, index }) => {
					if (index < 5) {
						return (
							<CardItem key={index} event={item} onPress={() => onPress(item, "CONFIRMED")} edit={false} />
						);
					} else if (index == 5) {
						return (
							<TouchableOpacity
								style={{
									height: 152,
									width: 152,
									backgroundColor: '#f0f0f0',
									padding: '2%',
									borderRadius: 5,
									marginVertical: '3%',
									justifyContent: 'center',
									alignItems: 'center'
								}}
								onPress={() => onMore(confirmedEvents.current, "CONFIRMED")}
								activeOpacity={0.8}
							>
								<Text
									style={{
										fontWeight: 16,
										fontWeight: '600',
										color: '#5e5e5e'
									}}
								>
									More Events
								</Text>
								<Icon
									name={'arrow-forward-outline'}
									type={'ionicon'}
									color={'#5e5e5e'}
								/>
							</TouchableOpacity>
						);
					}
				}}
				onMore={() => onMore(confirmedEvents.current, "CONFIRMED")}
			/>

			<EventsRow
				data={interestedEvents.current.slice(0, 6)}
				title={'Your liked events'}
				renderItem={({ item, index }) => {
					if (index < 5) {
						return (
							<CardItem key={index} event={item} onPress={() => onPress(item, "INTERESTED")} edit={false} />
						);
					} else if (index == 5) {
						return (
							<TouchableOpacity
								style={{
									height: 152,
									width: 152,
									backgroundColor: '#f0f0f0',
									padding: '2%',
									borderRadius: 5,
									marginVertical: '3%',
									justifyContent: 'center',
									alignItems: 'center'
								}}
								onPress={() => onMore(interestedEvents.current, "INTERESTED")}
								activeOpacity={0.8}
							>
								<Text
									style={{
										fontWeight: 16,
										fontWeight: '600',
										color: '#5e5e5e'
									}}
								>
									More Events
								</Text>
								<Icon
									name={'arrow-forward-outline'}
									type={'ionicon'}
									color={'#5e5e5e'}
								/>
							</TouchableOpacity>
						);
					}
				}}
				onMore={() => onMore(interestedEvents.current, "INTERESTED")}
			/>

			{cancelledEvents.current.length > 0 &&
				<EventsRow
					data={cancelledEvents.current.slice(0, 6)}
					title={'Cancelled events'}
					renderItem={({ item, index }) => {
						if (index < 5) {
							return (
								<CardItem key={index} event={item} onPress={() => onPress(item, "CANCELLED")} edit={false} />
							);
						} else if (index == 5) {
							return (
								<TouchableOpacity
									style={{
										height: 152,
										width: 152,
										backgroundColor: '#f0f0f0',
										padding: '2%',
										borderRadius: 5,
										marginVertical: '3%',
										justifyContent: 'center',
										alignItems: 'center'
									}}
									onPress={() => onMore(cancelledEvents.current, "CANCELLED")}
									activeOpacity={0.8}
								>
									<Text
										style={{
											fontWeight: 16,
											fontWeight: '600',
											color: '#5e5e5e'
										}}
									>
										More Events
									</Text>
									<Icon
										name={'arrow-forward-outline'}
										type={'ionicon'}
										color={'#5e5e5e'}
									/>
								</TouchableOpacity>
							);
						}
					}}
					onMore={() => onMore(cancelledEvents.current, "CANCELLED")}
				/>
			}

			{pastEvents.current.length > 0 &&
				<EventsRow
					data={pastEvents.current.slice(0, 6)}
					title={'Past events'}
					renderItem={({ item, index }) => {
						if (index < 5) {
							return (
								<CardItem key={index} event={item} onPress={() => onPress(item, "PAST")} edit={false} />
							);
						} else if (index == 5) {
							return (
								<TouchableOpacity
									style={{
										height: 152,
										width: 152,
										backgroundColor: '#f0f0f0',
										padding: '2%',
										borderRadius: 5,
										marginVertical: '3%',
										justifyContent: 'center',
										alignItems: 'center'
									}}
									onPress={() => onMore(pastEvents.current, "PAST")}
									activeOpacity={0.8}
								>
									<Text
										style={{
											fontWeight: 16,
											fontWeight: '600',
											color: '#5e5e5e'
										}}
									>
										More Events
									</Text>
									<Icon
										name={'arrow-forward-outline'}
										type={'ionicon'}
										color={'#5e5e5e'}
									/>
								</TouchableOpacity>
							);
						}
					}}
					onMore={() => onMore(pastEvents.current, "PAST")}
				/>
			}
		</ScrollView>
	);
};