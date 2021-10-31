import React from "react";
import { ScrollView } from "react-native";
import { View, FlatList, Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearProgress, Icon } from 'react-native-elements';
import { AuthContext } from '../../utils/context';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
	<TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
		<Text style={[styles.itemText, textColor]}>{item.title}</Text>
	</TouchableOpacity>
);

const formatData = (data) => {
	const numberOfFullRows = Math.floor(data.length / 3);

	let numberOfElementsLastRow = data.length - (numberOfFullRows * 3);
	while (numberOfElementsLastRow !== 3 && numberOfElementsLastRow !== 0) {
		data.push({ title: `blank-${numberOfElementsLastRow}`, empty: true });
		numberOfElementsLastRow++;
	}

	return data;
};

export default function Preferences({ navigation, route }) {
	const { signUp } = React.useContext(AuthContext);
	const socket = route.params.socket;
	const [selectedIds, setSelectedIds] = React.useState([]);
	const [tags, setTags] = React.useState([]);
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		socket.emit('getTags', {}, (err, res) => {
			if (err) {
				Alert.alert(
					"Host signup",
					"Server error occurred, try again later",
					[
						{
							text: "OK"
						}
					]
				);
				navigation.navigate('HomeScreen');
				return;
			}

			let tag = [];

			for (let i = 0; i < res.length; i++) {
				tag.push({ title: res[i].tagName, id: res[i]._id });
			}

			setTags(tag);
		})
	}, []);

	const renderItem = ({ item }) => {
		const backgroundColor = selectedIds.some(i => i.id === item.id) ? "#61aa7c" : "#51b375";
		const color = selectedIds.some(i => i.id === item.id) ? 'white' : 'black';

		if (item.empty === true) {
			return <View style={[styles.item, styles.itemInvisible]} />;
		}
		return (
			<Item
				item={item}
				onPress={() => {
					if (selectedIds.some(i => i.id === item.id)) {
						setProgress(progress - 0.2);
						setSelectedIds(selectedIds.filter(i => i.id !== item.id));
						return;
					}
					setProgress(progress + 0.2);
					setSelectedIds(oldArr => [...oldArr, item])
				}}
				backgroundColor={{ backgroundColor }}
				textColor={{ color }}
			/>
		);
	};

	const onContinue = () => {
		let tagsArr = [];
		for (let i = 0; i < selectedIds.length; i++) {
			tagsArr.push(selectedIds[i].id);
		}
		route.params.newStudent.tags = tagsArr;

		socket.emit('studentSignup', route.params.newStudent, (err, response) => {
			if (err) {
				Alert.alert(
					"Host sign up",
					"Error signing you up",
					[
						{
							text: "OK"
						}
					]
				);
				return;
			}

			signUp(response);
		});
	};

	return (
		<View style={styles.container}>
			<Icon
				type={"material"}
				name={"chevron-left"}
				size={45}
				containerStyle={{
					position: 'absolute',
					top: 50,
					left: 10,
					zIndex: 10000
				}}
				onPress={() => {
					navigation.goBack();
				}}
			/>
			<Text style={styles.text}>Please pick 5 or more interests</Text>
			<LinearProgress
				style={styles.progress}
				color='black'
				trackColor='white'
				variant='determinate'
				value={progress}
			/>

			{
				progress >= 1 &&
				<TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
					<Text style={styles.continueBtnText}>Finish sign up</Text>
				</TouchableOpacity>
			}

			<ScrollView style={styles.listView}>
				<View style={{ width: '100%', height: (50 + Dimensions.get('window').width - Dimensions.get('window').width * 0.1) / 3 }}></View>
				<FlatList
					numColumns={3}
					style={styles.list}
					data={formatData(tags)}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					extraData={selectedIds}
				/>
				<View style={{ width: '100%', height: (50 + Dimensions.get('window').width - Dimensions.get('window').width * 0.1) / 3 }}></View>

			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		backgroundColor: "#8acf82",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		position: 'absolute',
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'flex-start',
		top: 90,
		left: 30
	},
	progress: {
		position: 'absolute',
		top: 120,
		width: '88%',
		borderRadius: 5
	},
	listView: {
		width: '100%',
		height: '100%',
		zIndex: -1
	},
	list: {
		alignSelf: 'center',
		width: '90%',
		flexGrow: 0
	},
	continueBtn: {
		position: 'absolute',
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.4,
		shadowRadius: 5,
		opacity: 0.95,
		width: '75%',
		backgroundColor: '#51b375',
		padding: 15,
		borderRadius: 10,
		bottom: 60
	},
	continueBtnText: {
		alignSelf: 'center',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		fontSize: 14,
		color: "white"
	},
	item: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		margin: 1,
		height: (Dimensions.get('window').width - Dimensions.get('window').width * 0.1) / 3,
		borderRadius: 10,
		opacity: 0.8,
		padding: 20,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 2
	},
	itemInvisible: {
		backgroundColor: 'transparent',

	},
	itemText: {
		fontSize: 12,
		letterSpacing: 0.2,
		textAlign: 'center',
		fontWeight: '700'
	}
});