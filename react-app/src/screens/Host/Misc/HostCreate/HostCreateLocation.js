import React, { useContext, useState } from "react";
import {
	View,
	Dimensions,
	TouchableOpacity,
	Text
} from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { GeneralContext } from "../../../../utils/context";

export default function HostCreateLocation({ navigation, route }) {
	const { socket, loginState } = useContext(GeneralContext);

	const { width, height } = Dimensions.get("window");
	const LATITUDE_DELTA = 0.1;
	const LONGITUDE_DELTA = 0.1;


	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [name, setName] = useState(null);

	const onCreate = () => {
		socket.emit('createEvent', {
			hid: loginState.id,
			newEvent: {
				eventName: route.params.eventName,
				description: route.params.description,
				url: route.params.website,
				dateTime: route.params.startDate,
				endDateTime: route.params.endDate,
				tags: route.params.tags,
				imageURL: route.params.imageURL,
				media: [route.params.imageURL],
				latitude: latitude,
				longitude: longitude,
				location: name,
				eventHost: loginState.id
			}
		});
		navigation.navigate('HostManage');
	};

	return (
		<View
			style={{
				width: '100%',
				height: '100%',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<MapView
				provider={PROVIDER_GOOGLE}
				mapType='standard'
				showsIndoorLevelPicker={true}
				showsIndoors={true}
				style={{
					width: '100%',
					height: '100%',
					borderRadius: 5,
					marginVertical: 10,
					borderWidth: 1,
					borderColor: '#e8e8e8'
				}}
				region={{
					latitude: latitude == undefined ? 40.425869 : latitude,
					longitude: longitude == undefined ? -86.908066 : longitude,
					longitudeDelta: LONGITUDE_DELTA,
					latitudeDelta: LATITUDE_DELTA,
				}}
				onPress={(event) => {
					setLatitude(event.nativeEvent.coordinate.latitude);
					setLongitude(event.nativeEvent.coordinate.longitude);
				}}
				onPoiClick={(event) => {
					setLatitude(event.nativeEvent.coordinate.latitude);
					setLongitude(event.nativeEvent.coordinate.longitude);
					setName(event.nativeEvent.name);
				}}
			>
				{latitude != null && longitude != null &&
					<Marker
						coordinate={{
							latitude: latitude,
							longitude: longitude,
							longitudeDelta: LONGITUDE_DELTA,
							latitudeDelta: LATITUDE_DELTA,
						}}
					/>
				}
			</MapView>

			<GooglePlacesAutocomplete
				placeholder='Search'
				fetchDetails={true}
				onPress={(data, details = null) => {
					setLatitude(details.geometry.location.lat);
					setLongitude(details.geometry.location.lng);
					setName(details.name);
				}}
				query={{
					key: 'AIzaSyCmmmpnkRPELTCJwkXFSyHesTv-YpzTTTg',
					language: 'en',
					components: 'country:us'
				}}
				styles={{
					container: {
						position: 'absolute',
						top: 10,
						width: '95%'
					}
				}}
			/>

			{name != null &&
				<TouchableOpacity
					style={{
						position: 'absolute',
						bottom: 80,
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
					onPress={onCreate}
				>
					<Text style={{
						alignSelf: "center",
						textTransform: "uppercase",
						fontWeight: "bold",
						fontSize: 14,
						color: "white",
					}}>Create Event</Text>
				</TouchableOpacity>
			}
		</View>
	);
};