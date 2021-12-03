import React, { useState, useContext } from 'react';

import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	ImageBackground,
	ScrollView
} from 'react-native';

import {
	Input
} from 'native-base';

import Carousel from 'react-native-snap-carousel';

import { GeneralContext } from '../../../utils/context';

var { width } = Dimensions.get("window");

export default function HostProfileInfo({ navigation, route }) {
	const { socket, loginState } = useContext(GeneralContext);

	const [organization, setOrganizationName] = useState(route.params.organization);
	const [organizationEmail, setOrganizationEmail] = useState(route.params.hostEmail);
	const [number, setNumber] = useState(route.params.number);
	const [website, setWebsite] = useState(route.params.website);
	const [email, setEmail] = useState(route.params.email);
	const [description, setDescription] = useState(route.params.description)
	const [tags, setTags] = React.useState(route.params.tags);

	const onSave = () => {
		/*if (route.params.fullName.firstName != firstName || route.params.fullName.lastName != lastName) {
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
		} */
	};

	return (
		<ScrollView
			style={{
				width: '100%',
				height: '100%'
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
					activeOpacsity={1}
					onPress={() => {
						navigation.navigate('HostMiscStack', {
							screen: 'HostChangePassword'
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
			<Text style={{
				fontWeight: 'bold',
				fontSize: 20,
				marginLeft: 10,
				marginVertical: 10
			}}>Your organization</Text>
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
				>Organization name</Text>
				<Input
					value={organization}
					onChangeText={(text) => setOrganizationName(text)}
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
				>Organization name</Text>
				<Input
					value={organization}
					onChangeText={(text) => setOrganizationName(text)}
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
				>Organization email</Text>
				<Input
					value={organizationEmail}
					onChangeText={(text) => setOrganizationEmail(text)}
					variant={'filled'}
					width={'100%'}
					height={39}
					placeholder={'Organization name'}
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
				>Website</Text>
				<Input
					value={website}
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
				>Phone number</Text>
				<Input
					value={number}
					onChangeText={(text) => setNumber(text)}
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
				>Description</Text>
				<Input
					multiline={true}
					numberOfLines={4}
					value={description}
					onChangeText={(text) => setDescription(text)}
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
				>Your tags</Text>
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
		</ScrollView>
	);
};