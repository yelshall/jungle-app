import React from "react";
import { View, FlatList, Dimensions, StyleSheet, Text, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native";
import { LinearProgress, Icon } from 'react-native-elements';
import { AuthContext } from '../../utils/context';

const Item = ({ item, onPress, selected }) => (
	<TouchableOpacity onPress={onPress} style={[styles.item]}>
		<ImageBackground
			source={{
				uri: item.imageURL,
			}}
			style={{
				overflow: "hidden",
				width: '100%',
				height: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '10'
			}}
			blurRadius={10}
		>
			{selected &&
				<Icon
					name={"check-square"}
					type={"font-awesome"}
					size={20}
					containerStyle={{
						position: 'absolute',
						top: 5,
						right: 5
					}}
				/>
			}
			<Text style={styles.itemText}>{item.title}</Text>
		</ImageBackground>
	</TouchableOpacity>
);

const formatData = (data) => {
	const numberOfFullRows = Math.floor(data.length / 3);

	let numberOfElementsLastRow = data.length - (numberOfFullRows * 3);
	while (numberOfElementsLastRow !== 3 && numberOfElementsLastRow !== 0) {
		data.push({ title: `blank-${numberOfElementsLastRow}`, empty: true });
		numberOfElementsLastRow++;
	}

	data.push({ title: `blank-${numberOfElementsLastRow + 1}`, empty: true });
	data.push({ title: `blank-${numberOfElementsLastRow + 2}`, empty: true });
	data.push({ title: `blank-${numberOfElementsLastRow + 3}`, empty: true });


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
				tag.push({ title: res[i].tagName, imageURL: res[i].imageURL, id: res[i]._id });
			}

			setTags(tag);
		})
	}, []);

	const renderItem = ({ item }) => {
		const selected = selectedIds.some(i => i.id === item.id) ? true : false;

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
				selected={selected}
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

		<SafeAreaView style={styles.container}>
			<View style={{
				width: '88%',
				alignItems: 'center',
				marginTop: '5%',
				marginBottom: '5%'
			}}>
				<Text style={styles.text}>Please pick 5 or more interests</Text>
				<LinearProgress
					style={{
						borderRadius: 5
					}}
					color='#51b375'
					trackColor='white'
					variant='determinate'
					value={progress}
				/>
			</View>

			{
				progress >= 1 &&
				<TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
					<Text style={styles.continueBtnText}>Finish sign up</Text>
				</TouchableOpacity>
			}

			<FlatList
				numColumns={3}
				style={styles.list}
				data={formatData(tags)}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				extraData={selectedIds}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		backgroundColor: "#96db8f",
		alignItems: "center",
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: '2.5%',
		alignSelf: 'flex-start'
	},
	list: {
		alignSelf: 'center',
		width: '90%',
		zIndex: -1
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
		padding: 0,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 2
	},
	itemInvisible: {
		backgroundColor: 'transparent',

	},
	itemText: {
		fontSize: 14,
		textAlign: 'center',
		fontWeight: 'bold',
		color: 'white'
	}
});