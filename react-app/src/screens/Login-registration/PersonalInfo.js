import React from "react";
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet
} from "react-native";
import { Input } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDisclose, Actionsheet } from "native-base";
export default function PersonalInfo({ navigation, route }) {
	const [name, setName] = React.useState("");
	const [dateOfBirth, setDateOfBirth] = React.useState("Date of birth");

	const [gender, setGender] = React.useState("Gender");

	const [errorName, setErrorName] = React.useState("");
	const [errorDate, setErrorDate] = React.useState("");
	const [errorGender, setErrorGender] = React.useState("");
	const [errorType, setErrorType] = React.useState("");

	const { isOpen, onOpen, onClose } = useDisclose();


	const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

	//Verify all fields are properly filled in before continuing
	var onContinue = () => {
		let err = false;
		let fullName = name.trim().split(" ");
		if (fullName.length !== 2) {
			setErrorName("Please enter a first and last name")
			err = true;
		} else {
			setErrorName("");
		}

		if (dateOfBirth === "Date of birth") {
			setErrorDate("Please choose a date of birth");
			err = true;
		} else {
			setErrorDate("");
		}

		if (gender === "Gender") {
			setErrorGender("Please choose one of the gender options");
			err = true;
		} else {
			setErrorGender("");
		}

		if (err) {
			return;
		}

		navigation.navigate('ProfilePic', {
			newStudent: {
				email: route.params.email,
				password: route.params.password,
				fullName: {
					firstName: fullName[0],
					lastName: fullName[1]
				},
				birthDate: new Date(dateOfBirth),
				gender: gender
			},
			signupType: 'Student'
		});
	};

	return (
		<View style={styles.container}>
			<Input
				autoCorrect={false}
				placeholder='Full name'
				placeholderTextColor='#3d3d3d'
				containerStyle={{
					width: '80%',
					margin: '1.5%'
				}}
				inputStyle={{
					fontSize: 14
				}}
				inputContainerStyle={{
					borderColor: 'white',
					borderBottomWidth: 1.5
				}}
				label={"Full Name"}
				labelStyle={{
					fontSize: 16,
					lineHeight: 21,
					fontWeight: "bold",
					letterSpacing: 0.25,
					color: "#3d3d3d",
				}}
				onChangeText={(name) => setName(name)}
				onEndEditing={() => {
					if (name.split(" ").length !== 2) {
						setErrorName("Please enter a first and last name")
						return;
					}
					setErrorName("");
				}}
				errorMessage={errorName}
				errorStyle={{
					fontSize: 13,
					fontWeight: '500'
				}}
			/>

			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={(date) => {
					setDatePickerVisibility(false);
					setDateOfBirth((date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear());
				}}
				onCancel={() => setDatePickerVisibility(false)}
			/>

			<Input
				containerStyle={{
					width: '80%',
					margin: '1.5%'
				}}
				inputStyle={{
					fontSize: 14
				}}
				inputContainerStyle={{
					borderColor: 'white',
					borderBottomWidth: 1.5
				}}
				InputComponent={({ }) => (
					<TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
						<Text style={{ padding: 10, color: "#404040" }}>{dateOfBirth}</Text>
					</TouchableOpacity>
				)
				}
				label={"Date of birth"}
				labelStyle={{
					fontSize: 16,
					lineHeight: 21,
					fontWeight: "bold",
					letterSpacing: 0.25,
					color: "#3d3d3d",
				}}
				errorMessage={errorDate}
				errorStyle={{
					fontSize: 13,
					fontWeight: '500'
				}}
				disabled={true}
			/>

			<Input
				containerStyle={{
					width: '80%',
					margin: '1.5%'
				}}
				inputStyle={{
					fontSize: 14
				}}
				inputContainerStyle={{
					borderColor: 'white',
					borderBottomWidth: 1.5
				}}
				InputComponent={({ }) => (
					<TouchableOpacity onPress={onOpen}>
						<Text style={{ padding: 10, color: "#404040" }}>{gender}</Text>
					</TouchableOpacity>
				)
				}
				label={"Gender"}
				labelStyle={{
					fontSize: 16,
					lineHeight: 21,
					fontWeight: "bold",
					letterSpacing: 0.25,
					color: "#3d3d3d",
				}}
				errorMessage={errorGender}
				errorStyle={{
					fontSize: 13,
					fontWeight: '500'
				}}
				disabled={true}
			/>

			<Actionsheet isOpen={isOpen} onClose={onClose}>
				<Actionsheet.Content>
					<Actionsheet.Item>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 22
							}}
						>
							Gender
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
								setGender('Male');
								onClose();
							}}
						>
							<Text style={{ fontWeight: 'bold', fontSize: 20 }}>Male</Text>
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
								setGender('Female');
								onClose();
							}}
						>
							<Text style={{ fontWeight: 'bold', fontSize: 20 }}>Female</Text>
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
								setGender('Prefer not to say');
								onClose();
							}}
						>
							<Text style={{ fontWeight: 'bold', fontSize: 20 }}>Prefer not say</Text>
						</TouchableOpacity>
					</Actionsheet.Item>
				</Actionsheet.Content>
			</Actionsheet>

			<TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
				<Text style={styles.continueBtnText}>Continue</Text>
			</TouchableOpacity>
		</View >
	);
}


const styles = StyleSheet.create({
	personal: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 15
	},
	container: {
		width: "100%",
		height: "100%",
		backgroundColor: "#96db8f",
		alignItems: "center"
	},
	continueBtn: {
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
	},
	continueBtnText: {
		alignSelf: 'center',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		fontSize: 14,
		color: "black"
	},
	secondaryText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "#3d3d3d",
		marginLeft: '1.5%'
	},
})