import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { Switch } from 'native-base';
import { ListItem } from 'react-native-elements';

export default function Notifications({ navigation, route }) {
	const [event, setEvent] = useState(false);
	const [messages, setMessages] = useState(false);
	const [algo, setAlgo] = useState(false);

	return (
		<View style={styles.container}>
			<ListItem bottomDivider>
				<ListItem.Content style={{ width: '100%' }}>
					<View style={styles.listInfo}>
						<View style={{ flexDirection: 'column' }}>
							<ListItem.Title style={styles.title}>Event Notifications</ListItem.Title>
							<Text style={styles.subtitle}>All event notifications are sent to this device</Text>
						</View>
						<Switch style={styles.switchStyle} value={event} onValueChange={() => setEvent(!event)} size="md" />
					</View>
				</ListItem.Content>
			</ListItem>
			<ListItem bottomDivider>
				<ListItem.Content style={{ width: '100%' }}>
					<View style={styles.listInfo}>
						<View style={{ flexDirection: 'column' }}>
							<ListItem.Title style={styles.title}>Message Notifications</ListItem.Title>
							<Text style={styles.subtitle}>All message notifications are sent to this device</Text>
						</View>
						<Switch style={styles.switchStyle} value={messages} onValueChange={() => setMessages(!messages)} size="md" />
					</View>
				</ListItem.Content>
			</ListItem>
			<ListItem>
				<ListItem.Content style={{ width: '100%' }}>
					<View style={styles.listInfo}>
						<View style={{ flexDirection: 'column' }}>
							<ListItem.Title style={styles.title}>Recommendation Notifications</ListItem.Title>
							<Text style={styles.subtitle}>All recommendation notifications are sent to this device</Text>
						</View>
						<Switch style={styles.switchStyle} size="md" value={algo} onValueChange={() => setAlgo(!algo)} />
					</View>
				</ListItem.Content>
			</ListItem>
		</View>

	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
	},
	switchStyle: {
		position: 'absolute',
		right: 0
	},
	listInfo: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center'
	},
	title: {
		fontSize: 16,
		fontWeight: '500'
	},
	subtitle: {
		color: 'gray',
		fontSize: 12
	}
})