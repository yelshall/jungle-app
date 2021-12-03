import React, { useEffect } from 'react';
import {
	View,
	FlatList,
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	ImageBackground,
	SafeAreaView
} from "react-native";
import { GeneralContext } from '../../../utils/context';
import { LinearProgress, Icon } from 'react-native-elements';

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
				borderRadius: 10
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
		data.push({ title: `blank-${numberOfElementsLastRow}`, empty: true, id: numberOfElementsLastRow});
		numberOfElementsLastRow++;
	}

	data.push({ title: `blank-${numberOfElementsLastRow + 1}`, empty: true, id: 987 });
	data.push({ title: `blank-${numberOfElementsLastRow + 2}`, empty: true, id: 988 });
	data.push({ title: `blank-${numberOfElementsLastRow + 3}`, empty: true, id: 989 });

	return data;
};

export default function HostUpdateTags({ navigation, route }) {
	const { socket, loginState, tags } = React.useContext(GeneralContext);
	const [tagsArr, setTagsArr] = React.useState([]);
	const [selectedIds, setSelectedIds] = React.useState([]);
	const [progress, setProgress] = React.useState(0);

	useEffect(() => {
		let arr = [];
		for (let i = 0; i < tags.length; i++) {
			arr.push({ title: tags[i].tagName, imageURL: tags[i].imageURL, id: tags[i]._id });
		}

		let arr2 = [];
		for (let i = 0; i < route.params.tags.length; i++) {
			arr2.push({
				title: route.params.tags[i].tagName,
				imageURL: route.params.tags[i].imageURL,
				id: route.params.tags[i]._id
			});
		}
		setTagsArr(arr);
		setSelectedIds(arr2);
		setProgress(route.params.tags.length * 1/3)
	}, [])

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
						setProgress(progress - 1/3);
						setSelectedIds(selectedIds.filter(i => i.id !== item.id));
						return;
					}
					setProgress(progress + 1/3);
					setSelectedIds(oldArr => [...oldArr, item])
				}}
				selected={selected}
			/>
		);
	};

	const onContinue = () => {
		for(let i = 0; i < selectedIds.length; i++) {
			socket.emit('updateHost', {
				hid: loginState.id,
				update: {
					type: 'ADD',
					field: 'TAG',
					tid: selectedIds[i].id
				}
			})
		}
		navigation.goBack();
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={{
				width: '88%',
				alignItems: 'center',
				marginTop: '5%',
				marginBottom: '5%'
			}}>
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
					<Text style={styles.continueBtnText}>Submit</Text>
				</TouchableOpacity>
			}

			<FlatList
				numColumns={3}
				style={styles.list}
				data={formatData(tagsArr)}
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