import React, { useState, useEffect } from 'react';

import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ImageBackground
} from 'react-native';

import DateTimePickerModal from "react-native-modal-datetime-picker";

import {
	Input
} from 'native-base';

export default function HostCreate({ navigation, route }) {
	const [eventName, setEventName] = useState('');
	const [description, setDescription] = useState('');
	const [website, setWebsite] = useState('');

	const [startDate, setStartDate] = useState('Start date');
	const [endDate, setEndDate] = useState('End date');

	const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
	const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);

	const onContinue = () => {
		navigation.navigate('HostMiscStack', {
			screen: 'HostCreateTags',
			params: {
				eventName: eventName,
				description: description,
				website: website,
				startDate: startDate,
				endDate: endDate
			}
		})
	};

	return (
		<View style={{
			width: '100%',
			height: '100%'
		}}>
			<View
				style={{
					padding: 10,
					marginBottom: 30
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
				<Text
					style={{
						fontWeight: '600',
						fontSize: 18,
						marginVertical: 5
					}}
				>Description</Text>
				<TextInput
					multiline
					numberOfLines={4}
					style={{
						backgroundColor: '#e3e3e3',
						borderRadius: 5,
						borderBottomColor: "#d8ffd4",
						borderBottomWidth: 2,
						height: 100,
						fontSize: 16,
						fontWeight: '500',
						padding: 5
					}}
					placeholder='Write a description'
					placeholderTextColor='#3d3d3d'
					onChangeText={(description) => setDescription(description)}
				/>
				<Text
					style={{
						fontWeight: '600',
						fontSize: 18,
						marginVertical: 5
					}}
				>Start Date</Text>
				<TouchableOpacity
					style={{
						width: '100%',
						height: 39
					}}
					onPress={() => {
						setIsStartDatePickerVisible(visible => !visible);
					}}
					activeOpacity={1}
				>
					<View
						style={{
							height: 39,
							width: '100%',
							paddingLeft: 5,
							justifyContent: 'center',
							backgroundColor: '#e4e4e4',
							borderRadius: 4
						}}
					>
						<Text
							variant={'filled'}
							width={'100%'}
							height={39}
							style={{
								fontSize: 15,
								fontWeight: '500'
							}}
						>
							{startDate}
						</Text>
					</View>
				</TouchableOpacity>
				<DateTimePickerModal
					isVisible={isStartDatePickerVisible}
					mode="date"
					onConfirm={(date) => {
						setIsStartDatePickerVisible(false);
						setStartDate((date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear());
					}}
					onCancel={() => setIsStartDatePickerVisible(false)}
				/>
				<Text
					style={{
						fontWeight: '600',
						fontSize: 18,
						marginVertical: 5
					}}
				>End Date</Text>
				<TouchableOpacity
					style={{
						width: '100%',
						height: 39
					}}
					onPress={() => {
						setIsEndDatePickerVisible(visible => !visible);
					}}
					activeOpacity={1}
				>
					<View
						style={{
							height: 39,
							width: '100%',
							paddingLeft: 5,
							justifyContent: 'center',
							backgroundColor: '#e4e4e4',
							borderRadius: 4
						}}
					>
						<Text
							variant={'filled'}
							width={'100%'}
							height={39}
							style={{
								fontSize: 15,
								fontWeight: '500'
							}}
						>
							{endDate}
						</Text>
					</View>
				</TouchableOpacity>
				<DateTimePickerModal
					isVisible={isEndDatePickerVisible}
					mode="date"
					onConfirm={(date) => {
						setIsEndDatePickerVisible(false);
						setEndDate((date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear());
					}}
					onCancel={() => setIsEndDatePickerVisible(false)}
				/>
				<Text
					style={{
						fontWeight: '600',
						fontSize: 18,
						marginVertical: 5
					}}
				>Website</Text>
				<Input
					value={website}
					autoComplete={false}
					autoCapitalize={false}
					onChangeText={(text) => setWebsite(text)}
					variant={'filled'}
					width={'100%'}
					height={39}
					placeholder={'Optional'}
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
			<TouchableOpacity
				style={{
					width: '90%',
					shadowColor: "black",
					shadowOffset: { width: 0, height: 3 },
					shadowOpacity: 0.4,
					shadowRadius: 5,
					opacity: 0.8,
					backgroundColor: "#51b375",
					marginBottom: 5,
					padding: 15,
					borderRadius: 10,
					alignSelf: 'center'
				}}
				onPress={onContinue}
			>
				<Text style={{
					alignSelf: "center",
					textTransform: "uppercase",
					fontWeight: "bold",
					fontSize: 14,
					color: "white",
				}}>Continue</Text>
			</TouchableOpacity>
		</View>
	);
};