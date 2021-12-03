import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import { Actionsheet, useDisclose } from "native-base";

export default function RegistrationType({ navigation, route }) {
	const [type, setType] = useState('Register as...');
	const { isOpen, onOpen, onClose } = useDisclose();

	const onContinue = () => {
		if (type == 'Student') {
			navigation.navigate("PersonalInfo", {
				email: route.params.email,
				password: route.params.password
			});

		} else {
			navigation.navigate('HostSignup', {
				newHost: {
					email: route.params.email,
					password: route.params.password
				},
				signupType: 'Host'
			});
		}
	};

	return (
		<View style={{
			width: "100%",
			height: "100%",
			backgroundColor: "#96db8f",
			alignItems: "center"
		}}>
			<Text style={{
				fontSize: 30,
				fontWeight: 'bold',
				marginTop: 30,
				width: '80%',
				textAlign: 'left'
			}}>Register as...</Text>

			<TouchableOpacity
				style={{
					width: '100%',
					height: 39,
					alignItems: 'center',
					margin: 20
				}}
				onPress={onOpen}

				activeOpacity={1}
			>
				<View
					style={{
						height: 39,
						width: '80%',
						paddingLeft: 5,
						justifyContent: 'center',
						backgroundColor: '#b9dbb8',
						borderRadius: 4
					}}
				>
					<Text
						variant={'filled'}
						width={'100%'}
						height={39}
						style={{
							fontSize: 15,
							fontWeight: '500',
							color: type == 'Register as...' ? '#525252' : 'black'
						}}
					>
						{type}
					</Text>
				</View>
			</TouchableOpacity>

			<Actionsheet isOpen={isOpen} onClose={onClose}>
				<Actionsheet.Content>
					<Actionsheet.Item>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 22
							}}
						>
							Register as...
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
								backgroundColor: '#e6e6e6',
								paddingHorizontal: 8,
								paddingVertical: 10,
								borderRadius: 30,
								alignItems: 'center'
							}}
							onPress={() => {
								setType('Student');
								onClose();
							}}
						>
							<Text style={{ fontWeight: 'bold', fontSize: 20 }}>Student</Text>
						</TouchableOpacity>
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
								backgroundColor: '#e6e6e6',
								paddingHorizontal: 8,
								paddingVertical: 10,
								borderRadius: 30,
								alignItems: 'center'
							}}
							onPress={() => {
								setType('Host');
								onClose();
							}}
						>
							<Text style={{ fontWeight: 'bold', fontSize: 20 }}>Host</Text>
						</TouchableOpacity>
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
							}}
						>
							<Text style={{ fontWeight: 'bold', fontSize: 20, color: '#474747' }}>Cancel</Text>
						</TouchableOpacity>
					</Actionsheet.Item>
				</Actionsheet.Content>
			</Actionsheet>

			{
				type != 'Register as...' &&
				(
					<TouchableOpacity style={{
						shadowColor: 'black',
						shadowOffset: { width: 0, height: 3 },
						shadowOpacity: 0.4,
						shadowRadius: 5,
						opacity: 0.8,
						width: '75%',
						backgroundColor: '#71bd69',
						padding: 15,
						borderRadius: 10,
						marginTop: '10%'
					}} onPress={onContinue}>
						<Text style={{
							alignSelf: 'center',
							textTransform: 'uppercase',
							fontWeight: 'bold',
							fontSize: 14,
							color: "black"
						}}>Continue</Text>
					</TouchableOpacity>
				)
			}
		</View>
	);
};