import React from 'react';
import {
	ScrollView
} from 'react-native';
import { CardItem } from '../Event';

export default function EventsList({ route, navigation }) {
	const onPress = (event) => {
		event.type = route.params.type;
		navigation.navigate("StudentMiscStack",
			{
				screen: 'EventInfo',
				params: {
					event: event
				}
			});
	};

	return (
		<ScrollView
			style={{
				width: '100%',
				height: '100%'
			}}
		>
			{route.params.list.map((event, index) => {
				return (
					<CardItem
						event={event}
						onPress={() => onPress(event)}
					/>
				);
			})}
		</ScrollView>
	);
};