import {
	View,
	ActivityIndicator
} from "react-native";
import React, { useEffect } from "react";
import Constants from "expo-constants";
import { SearchBar, ButtonGroup } from "react-native-elements";

import { GeneralContext } from "../../../utils/context";

import MyEvents from "../../../components/Explore/ MyEvents";

export default function Explore({ navigation, route }) {
	const { socket, loginState } = React.useContext(GeneralContext);

	const interestedEvents = React.useRef([]);
	const confirmedEvents = React.useRef([]);
	const pastEvents = React.useRef([]);
	const cancelledEvents = React.useRef([]);

	const [isLoading, setIsLoading] = React.useState(true);

	const [pageIndex, setPageIndex] = React.useState(0);

	useEffect(() => {
		if (isLoading) {
			socket.emit("getStudent", { sid: loginState.id }, (err, res) => {
				if (err) {
					return;
				}

				for (let i = 0; i < res.confirmedEvents.length; i++) {
					if (res.confirmedEvents[i].active) {
						confirmedEvents.current.push(res.confirmedEvents[i]);
					} else if (res.confirmedEvents[i].cancelled) {
						cancelledEvents.current.push(res.confirmedEvents[i]);
					} else {
						pastEvents.current.push(res.confirmedEvents[i]);
					}
				}

				for (let i = 0; i < res.interestedEvents.length; i++) {
					if (res.interestedEvents[i].active) {
						interestedEvents.current.push(res.interestedEvents[i]);
					} else if (res.interestedEvents[i].cancelled) {
						cancelledEvents.current.push(res.interestedEvents[i]);
					} else {
						pastEvents.current.push(res.interestedEvents[i]);
					}
				}

				setIsLoading(false);
			});
		}
	}, []);

	const [search, setSearch] = React.useState("");

	if (isLoading) {
		return (
			<View
				style={{
					width: '100%',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<View
			style={{
				width: '100%',
				height: '100%',
				alignItems: 'center'
			}}
		>
			<View
				style={{
					width: '100%',
					backgroundColor: 'white',
					alignItems: 'center',
					paddingTop: Constants.statusBarHeight,
					borderBottomWidth: 0.5,
					borderColor: '#e3e3e3'
				}}
			>
				<SearchBar
					placeholder="Search..."
					onChangeText={(search) => setSearch(search)}
					value={search}
					platform={"ios"}
					containerStyle={{
						width: '95%',
						height: 35,
						borderRadius: 5,
						marginBottom: 10
					}}
					inputContainerStyle={{
						height: '1%'
					}}
				/>
				<ButtonGroup
					onPress={setPageIndex}
					selectedIndex={pageIndex}
					buttons={['My events', 'Trending events']}
					containerStyle={{
						borderWidth: 0,
						width: '100%'
					}}
					buttonStyle={{
						borderRadius: 0
					}}
					selectedButtonStyle={{
						backgroundColor: 'transparent',
						borderBottomWidth: 2,
						borderColor: '#6e6e6e'
					}}
					textStyle={{
						fontSize: 14,
						fontWeight: '600',
						color: '#6e6e6e'
					}}
					selectedTextStyle={{
						fontSize: 14,
						fontWeight: '600',
						color: '#6e6e6e'
					}}
				/>
			</View>
			{
				pageIndex == 0 ?
					<MyEvents
						interestedEvents={interestedEvents}
						confirmedEvents={confirmedEvents}
						pastEvents={pastEvents}
						cancelledEvents={cancelledEvents}
						navigation={navigation}
					/>
					:
					null
			}
		</View>
	);
};