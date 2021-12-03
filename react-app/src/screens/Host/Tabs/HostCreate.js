import React, { useState, useEffect } from 'react';

import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	ImageBackground
} from 'react-native';

import {
	Input
} from 'native-base';

import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function HostCreate({ }) {
	const [eventName, setEventName] = useState('');

	return (
		<View style={{
			width: '100%',
			height: '100%'
		}}>
			<View
				style={{
					padding: 10
				}}
			>
				<Text
					style={{
						fontWeight: '600',
						fontSize: 18,
						marginVertical: 5
					}}
				>Event Name</Text>
				<Input
					value={eventName}
					onChangeText={(text) => setEventName(text)}
					variant={'filled'}
					width={'100%'}
					height={39}
					placeholder={'Event Name'}
					_focus={{
						style: {
							borderColor: 'transparent',
							fontSize: 16,
							fontWeight: '500'
						}
					}}
					style={{
						fontSize: 16,
						fontWeight: '500'
					}}
				/>
			</View>
		</View>
	);
};