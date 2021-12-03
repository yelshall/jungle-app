import React, { useContext, useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import {
	Avatar,
	Actionsheet,
	useDisclose
} from 'native-base';
import {
	ListItem
} from 'react-native-elements';
import { GeneralContext, AuthContext } from '../../../utils/context';

function getAge(dateString) {
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

export default function Profile({ navigation, route }) {
	const { socket, loginState } = useContext(GeneralContext);
	const { signOut } = React.useContext(AuthContext);

	const [student, setStudent] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const { isOpen, onOpen, onClose } = useDisclose();

	useEffect(() => {
		socket.emit('getStudent', { sid: loginState.id }, (err, res) => {
			if (err) {
				console.log('ERROR');
				return;
			}

			setStudent(res);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return (
			<View
				style={{
					width: '100%',
					height: '100%',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<ActivityIndicator size='large' />
			</View>
		)
	}

	return (
		<ScrollView
			contentContainerStyle={{
				alignItems: "center",
				justifyContent: 'center'
			}}
			style={{
				width: "100%",
				height: "100%"
			}}
			keyboardShouldPersistTaps={'always'}
		>
			<View
				style={{
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
					backgroundColor: 'white',
					paddingVertical: 20,
					marginBottom: 10,
					borderBottomWidth: 0.5,
					borderColor: '#e3e3e3'
				}}
			>
				<Avatar
					bg={'#e3e3e3'}
					source={{
						uri: student.imageURL
					}}
					size={'2xl'}
				>
					<Text
						style={{
							color: 'gray',
							fontSize: 40,
							fontWeight: '600'
						}}
					>
						{student.fullName.firstName.charAt(0) + student.fullName.lastName.charAt(0)}
					</Text>
				</Avatar>
				<View
					style={{
						flexDirection: 'column'
					}}
				>
					<Text
						style={{
							marginLeft: 20,
							fontSize: 22,
							fontWeight: '600',
							marginVertical: 10
						}}
					>
						{student.fullName.firstName + " " + student.fullName.lastName}, {getAge(student.birthDate)}
					</Text>
					<TouchableOpacity
						style={{
							flexDirection: 'column',
							alignItems: 'center'
						}}
						activeOpacity={1}
						onPress={() => {
							navigation.navigate('StudentMiscStack', {
								screen: 'Following',
								params: {
									following: student.following
								}
							})
						}}
					>
						<Text style={{ fontWeight: '400' }}>{student.following.length}</Text>
						<Text style={{ fontWeight: 'bold' }}>Following</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View
				style={{
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					backgroundColor: 'white',
					paddingTop: 20,
					paddingBottom: 10,
					marginBottom: 10,
					borderBottomWidth: 0.5,
					borderTopWidth: 0.5,
					borderColor: '#e3e3e3'
				}}
			>
				<Text style={{
					fontWeight: 'bold',
					fontSize: 20,
					textAlign: 'left',
					width: '100%',
					marginLeft: 60,
					marginBottom: 15
				}}>Account Settings</Text>

				<ListItem
					bottomDivider
					style={{
						width: '90%'
					}}
					onPress={() => {
						navigation.navigate("StudentMiscStack",
							{
								screen: 'PersonalInformation',
								params: {
									fullName: student.fullName,
									dateOfBirth: student.birthDate,
									email: student.email,
									tags: student.tags
								}
							});
					}}
					activeOpacity={1}
				>
					<ListItem.Content>
						<ListItem.Title style={{
							fontSize: 16,
							fontWeight: '500'
						}}>Personal Information</ListItem.Title>
						<Text style={{
							color: 'gray',
							fontSize: 12
						}}>Change your account information</Text>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>
				<ListItem
					bottomDivider
					style={{
						width: '90%'
					}}
					onPress={() => {
						navigation.navigate("StudentMiscStack",
						{
							screen: 'Privacy'
						});
					}}
					activeOpacity={1}
				>
					<ListItem.Content>
						<ListItem.Title style={{
							fontSize: 16,
							fontWeight: '500'
						}}>Privacy</ListItem.Title>
						<Text style={{
							color: 'gray',
							fontSize: 12
						}}>Manage your privacy settings</Text>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>
				<ListItem
					bottomDivider
					style={{
						width: '90%'
					}}
					onPress={() => {
						navigation.navigate("StudentMiscStack",
						{
							screen: 'Notifications'
						});
					}}
					activeOpacity={1}
				>
					<ListItem.Content>
						<ListItem.Title style={{
							fontSize: 16,
							fontWeight: '500'
						}}>Notifications</ListItem.Title>
						<Text style={{
							color: 'gray',
							fontSize: 12
						}}>Manage push notifications</Text>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>
				<ListItem
					style={{
						width: '90%',
						height: 60
					}}
					onPress={onOpen}
					activeOpacity={1}
				>
					<ListItem.Content
						style={{
							height: 32,
							justifyContent: 'center'
						}}
					>
						<ListItem.Title style={{
							fontSize: 16,
							fontWeight: '500'
						}}>Log out</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>
			</View>
			<Actionsheet isOpen={isOpen} onClose={onClose}>
				<Actionsheet.Content>
					<Actionsheet.Item>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 22
							}}
						>
							Are you sure?
						</Text>
					</Actionsheet.Item>
					<Actionsheet.Item
						style={{
							height: 78
						}}
					>
						<TouchableOpacity
							activeOpacity={1}
							style={{
								width: 343,
								backgroundColor: '#d1d1d1',
								paddingHorizontal: 8,
								paddingVertical: 10,
								borderRadius: 30,
								alignItems: 'center'
							}}
							onPress={() => {
								onClose();
								signOut();
							}}
						>
							<Text style={{ fontWeight: 'bold', fontSize: 20, color: '#474747' }}>Log out</Text>
						</TouchableOpacity>
					</Actionsheet.Item>
					<Actionsheet.Item
						style={{
							height: 60
						}}
					>
						<TouchableOpacity
							activeOpacity={1}
							style={{
								width: 343,
								borderRadius: 30,
								alignItems: 'center'
							}}
							onPress={onClose}
						>
							<Text style={{ fontWeight: 'bold', fontSize: 20 }}>Cancel</Text>
						</TouchableOpacity>
					</Actionsheet.Item>
				</Actionsheet.Content>
			</Actionsheet>
		</ScrollView>
	);
};