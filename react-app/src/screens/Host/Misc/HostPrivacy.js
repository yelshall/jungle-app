import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import * as Linking from 'expo-linking';

export default function HostPrivacy({ navigation, route }) {

	const locationPress = () => {Linking.openSettings()}
	const calendarPress = () => {Linking.openSettings()}

	return (
		<View style={styles.container}>
			<View style={styles.titleView}>
				<Text style={styles.titleText}>
					Jungle values your privacy and protects your personal information
				</Text>
			</View>

			<View style={styles.titleView}>
				<Text style={{fontSize: 18, fontWeight: 'bold'}}>
					Location Access
				</Text>
			</View>

			<ListItem bottomDivider>
				<View>
					<Text style={{fontSize: 15, }}>
						Your location information allows to show you how close you are to events you're interested in
					</Text>
				</View>
			</ListItem>
			<TouchableOpacity activeOpacity={1} onPress = {locationPress}>
				<ListItem bottomDivider>
					<ListItem.Content style={{flexDirection: 'row', alignItems: 'center'}}>
						<View style={{ left: '-375%'}}>
							<Text style={{fontSize: 15, fontWeight: '600'}}>Location Access</Text>
						</View>
						<View style = {{ left: '400%'}}>
							<Text>Allowed</Text>
						</View>
					</ListItem.Content>
					<ListItem.Chevron color='black'></ListItem.Chevron>
				</ListItem>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
	},
	titleView: {
		backgroundColor: 'white',
		paddingTop: 10,
		paddingBottom: 0,
		paddingLeft: 15
	},
	titleText: {
		fontWeight: '600',
		fontSize: 16,
		marginVertical: 5
	}
})