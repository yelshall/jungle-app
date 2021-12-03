import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	ScrollView,
	View
} from 'react-native';
import { CardItem } from "../../components/Event";

import { GeneralContext } from "../../utils/context";

export default function HostManage({ navigation, route }) {
	const { socket, loginState, tags } = React.useContext(GeneralContext);

	const [loading, setLoading] = useState(true);
	const [host, setHost] = useState(null);

	useEffect(() => {
		socket.emit('getHost', { hid: loginState.id }, (err, res) => {
			if (err) {
				console.log(err);
				return;
			}
			setHost(res);
			setLoading(false);
		});
	}, []);

	const onPress = () => {
		navigation.navigate("EditEvents");
	};

	if (loading) {
		return (
			<View style={{
				width: '100%',
				height: '100%',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<ActivityIndicator size='large' />
			</View>
		)
	}

	return (
		<ScrollView
			style={{
				width: '100%',
				height: '100%'
			}}
		>
			{!loading && host.events.map((event, index) => {
				return (
					<CardItem
						event={event}
						onPress={() => onPress(event)}
					/>
				);
			})}
		</ScrollView>
	)
};