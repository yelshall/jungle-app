import React, { useState, useContext } from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import {
	Input,
	FormControl
} from 'native-base';
import {
	Icon
} from 'react-native-elements';
import { GeneralContext } from '../../../utils/context';

export default function HostChangePassword({ navigation, route }) {
	const { socket, loginState } = useContext(GeneralContext);

	const [newPassword, setNewpassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const [show, setShow] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const [error, setError] = useState(false);

	const onSubmit = () => {
		// if (newPassword != confirmNewPassword) {
		// 	setError(true);
		// }
		// setError(false);
		// socket.emit('updateHost', {
		// 	sid: loginState.id,
		// 	update: {
		// 		type: 'CHANGE_FIELD',
		// 		field: 'PASSWORD',
		// 		password: newPassword
		// 	}
		// });
		navigation.goBack();
	};

	return (
		<View
			style={{
				width: '100%',
				height: '100%'
			}}
		>
			<FormControl
				style={{
					padding: 10
				}}
				isInvalid={error}
			>
				<FormControl.Label>
					<Text
						style={{
							fontWeight: '600',
							fontSize: 18,
							marginVertical: 5
						}}
					>
						New password
					</Text>
				</FormControl.Label>
				<Input
					type={show ? 'text' : 'password'}
					value={newPassword}
					onChangeText={(text) => setNewpassword(text)}
					variant={'filled'}
					width={'100%'}
					height={39}
					placeholder={'New password'}
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
					InputRightElement={
						<Icon
							name={show ? "eye-outline" : "eye-off-outline"}
							type={'ionicon'}
							onPress={() => setShow(!show)}
						/>
					}
				/>
				<FormControl.ErrorMessage>Passwords don't match</FormControl.ErrorMessage>
			</FormControl>

			<FormControl
				style={{
					padding: 10
				}}
				isInvalid={error}
			>
				<FormControl.Label>
					<Text
						style={{
							fontWeight: '600',
							fontSize: 18,
							marginVertical: 5
						}}
					>
						Confirm new password
					</Text>
				</FormControl.Label>
				<Input
					type={showConfirm ? 'text' : 'password'}
					value={confirmNewPassword}
					onChangeText={(text) => setConfirmNewPassword(text)}
					variant={'filled'}
					width={'100%'}
					height={39}
					placeholder={'Confirm new password'}
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
					InputRightElement={
						<Icon
							name={showConfirm ? "eye-outline" : "eye-off-outline"}
							type={'ionicon'}
							onPress={() => setShowConfirm(!showConfirm)}
						/>
					}
				/>
				<FormControl.ErrorMessage>Passwords don't match</FormControl.ErrorMessage>
			</FormControl>
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
					alignSelf: 'center',
					marginTop: 40
				}}
				onPress={onSubmit}
			>
				<Text style={{
					alignSelf: "center",
					textTransform: "uppercase",
					fontWeight: "bold",
					fontSize: 14,
					color: "white",
				}}>Submit</Text>
			</TouchableOpacity>
		</View>
	)
};