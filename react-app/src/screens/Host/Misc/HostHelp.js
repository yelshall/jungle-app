import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { ListItem } from 'react-native-elements';

export default function HostHelp({ navigation, route }) {

    return (
		<View style={styles.container}>
			<View style={styles.titleView}>
				<Text style={styles.titleText}>
					Have any questions? Contact us for help
				</Text>
			</View>

			<View style={styles.titleView}>
				<Text style={{fontSize: 18, fontWeight: 'bold'}}>
					Email Address
				</Text>
			</View>

			<ListItem bottomDivider>
				<View>
					<Text style={{fontSize: 15, }}>
						Reach out to us through our email listed below
					</Text>
				</View>
			</ListItem>
			<TouchableOpacity>
				<ListItem bottomDivider>
					<ListItem.Content style={{flexDirection: 'row', alignItems: 'center'}}>
						<View style={{ left: '-315%'}}>
							<Text style={{fontSize: 15, fontWeight: '600'}}>team17-cs307@purdue.edu</Text>
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