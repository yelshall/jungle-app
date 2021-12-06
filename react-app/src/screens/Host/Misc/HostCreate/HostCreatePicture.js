import React, { useContext, useState, useEffect } from "react";
import {
	View,
	ImageBackground,
	Dimensions,
	TouchableOpacity,
	Alert,
	Text
} from "react-native";

import { Icon } from "react-native-elements";

import { GeneralContext } from "../../../../utils/context";
import * as ImagePicker from 'expo-image-picker';

export default function HostCreatePicture({ navigation, route }) {
	const { socket, loginState } = useContext(GeneralContext);
	const [image, setImage] = useState(null);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	const fetchImageFromUri = async (uri) => {
		const response = await fetch(uri);
		const blob = await response.blob();
		return blob;
	};

	const onContinue = () => {
		socket.emit('uploadImage', {}, async (err, res) => {
			if (err) {
				return;
			}

			try {
				const img = await fetchImageFromUri(image);
				await fetch(res, {
					method: "PUT",
					headers: {
						"Content-Type": "multipart/form-data"
					},
					body: img
				});

				navigation.navigate('HostMiscStack', {
					screen: 'HostCreateLocation',
					params: {
						eventName: route.params.eventName,
						description: route.params.description,
						website: route.params.website,
						startDate: route.params.startDate,
						endDate: route.params.endDate,
						tags: route.params.tags,
						imageURL: res.split('?')[0]
					}
				});
			} catch (e) {
				console.log(e);
			}
		});
	};


	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					Alert.alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
	}, []);

	return (
		<View
			style={{
				height: '100%',
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<TouchableOpacity
				activeOpacity={1}
				onPress={pickImage}
				style={{ marginBottom: 30 }}
			>
				<ImageBackground
					style={{
						width: Dimensions.get('window').width * 0.9,
						height: 300,
						borderRadius: 5,
						backgroundColor: '#e3e3e3',
						justifyContent: 'center',
						alignItems: 'center'
					}}
					imageStyle={{
						width: Dimensions.get('window').width * 0.9,
						height: 300,
						borderRadius: 5
					}}
					source={{ uri: image }}
					resizeMode={'cover'}
				>
					{image == undefined &&
						<Icon
							type="ionicon"
							name="add-circle-outline"
							size={100}
							color="#a8a8a8"
						/>
					}
				</ImageBackground>
			</TouchableOpacity>

			{image != undefined &&
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
			}
		</View>
	)
};