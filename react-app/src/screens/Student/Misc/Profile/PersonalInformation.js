import React, { useState, useContext } from 'react';

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

import Carousel from 'react-native-snap-carousel';

import { GeneralContext } from '../../../../utils/context';

var { width } = Dimensions.get("window");

export default function PersonalInformation({ navigation, route }) {
	const { socket, loginState } = useContext(GeneralContext);

	let date = new Date(route.params.dateOfBirth);

	const [firstName, setFirstName] = useState(route.params.fullName.firstName);
	const [lastName, setLastName] = useState(route.params.fullName.lastName);
	const [email, setEmail] = useState(route.params.email);
	const [dateOfBirth, setDateOfBirth] = React.useState((date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear());
	const [tags, setTags] = React.useState(route.params.tags);

	const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

	const onSave = () => {
		if (route.params.fullName.firstName != firstName || route.params.fullName.lastName != lastName) {
			socket.emit('updateStudent', {
				sid: loginState.id,
				update: {
					type: 'CHANGE_FIELD',
					field: 'NAME',
					firstName: firstName,
					lastName: lastName
				}
			});
		}
		if (route.params.email != email) {
			socket.emit('updateStudent', {
				sid: loginState.id,
				update: {
					type: 'CHANGE_FIELD',
					field: 'EMAIL',
					email: email
				}
			});
		}
		if (date != dateOfBirth) {
			socket.emit('updateStudent', {
				sid: loginState.id,
				update: {
					type: 'CHANGE_FIELD',
					field: 'BIRTHDATE',
					birthDate: (new Date(dateOfBirth))
				}
			});
		}
	};

	return (
		<View
			style={{
				width: '100%',
				height: '100%'
			}}
		>
			<View
				style={{
					flexDirection: 'row'
				}}
			>
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
					>First Name</Text>
					<Input
						value={firstName}
						onChangeText={(text) => setFirstName(text)}
						variant={'filled'}
						width={200}
						height={39}
						placeholder={'First Name'}
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
					>Last Name</Text>
					<Input
						value={lastName}
						onChangeText={(text) => setLastName(text)}
						variant={'filled'}
						width={150}
						height={39}
						placeholder={'Last Name'}
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
				>Email</Text>
				<Input
					value={email}
					onChangeText={(text) => setEmail(text.toLowerCase())}
					variant={'filled'}
					width={'100%'}
					height={39}
					placeholder={'Email'}
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
				<TouchableOpacity
					style={{
						backgroundColor: '#d1d1d1',
						marginTop: 15,
						paddingHorizontal: 8,
						paddingVertical: 8,
						width: 175,
						borderRadius: 30,
						alignItems: 'center'
					}}
					activeOpacity={1}
					onPress={() => {
						navigation.navigate('StudentMiscStack', {
							screen: 'ChangePassword'
						})
					}}
				>
					<Text
						style={{
							fontSize: 12,
							fontWeight: '700'
						}}
					>
						Change your password
					</Text>
				</TouchableOpacity>
			</View>
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
				>Date of Birth</Text>
				<TouchableOpacity
					style={{
						width: '100%',
						height: 39
					}}
					onPress={() => {
						setIsDatePickerVisible(visible => !visible);
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
							{dateOfBirth}
						</Text>
					</View>
				</TouchableOpacity>
				<DateTimePickerModal
					isVisible={isDatePickerVisible}
					mode="date"
					onConfirm={(date) => {
						setIsDatePickerVisible(false);
						setDateOfBirth((date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear());
					}}
					onCancel={() => setIsDatePickerVisible(false)}
				/>
			</View>

			<View
				style={{
					marginBottom: 30
				}}
			>
				<Text
					style={{
						fontWeight: '600',
						fontSize: 18,
						marginVertical: 5,
						paddingLeft: 10
					}}
				>You like these tags</Text>
				<Carousel
					layout={"default"}
					data={tags}
					sliderWidth={width}
					itemWidth={250}
					renderItem={({ item, index }) => {
						return (
							<ImageBackground
								source={{
									uri: item.imageURL
								}}
								style={{
									overflow: "hidden",
									width: 250,
									height: 150,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 10
								}}
							>
								<View
									style={{
										backgroundColor: '#e3e3e3',
										opacity: 0.8,
										padding: 5,
										borderRadius: 10
									}}
								>
									<Text
										style={{
											fontSize: 14,
											textAlign: 'center',
											fontWeight: 'bold',
											color: '#3d3d3d',
										}}
									>
										{item.tagName}
									</Text>
								</View>
							</ImageBackground>
						);
					}}
				/>
				<TouchableOpacity
					style={{
						backgroundColor: '#d1d1d1',
						marginTop: 15,
						paddingHorizontal: 8,
						paddingVertical: 8,
						width: 175,
						borderRadius: 30,
						alignItems: 'center',
						marginLeft: 10,
					}}
					activeOpacity={1}
					onPress={() => {
						navigation.navigate('StudentMiscStack', {
							screen: 'UpdateTags',
							params: {
								tags: tags
							}
						});
					}}
				>
					<Text
						style={{
							fontSize: 12,
							fontWeight: '700'
						}}
					>
						Change your tags
					</Text>
				</TouchableOpacity>
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
				onPress={onSave}
			>
				<Text style={{
					alignSelf: "center",
					textTransform: "uppercase",
					fontWeight: "bold",
					fontSize: 14,
					color: "white",
				}}>Save</Text>
			</TouchableOpacity>
		</View>
	);
};