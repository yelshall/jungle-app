import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
	Modal,
	ActivityIndicator,
	ScrollView
} from "react-native";
import React, { useState, useContext, useEffect } from "react";

import { Divider, Icon } from "react-native-elements";

import { AuthContext, GeneralContext } from "../../../utils/context";

import { Avatar } from "native-base";

export default function Profile({ navigation, route }) {
	const [modalVisible, setModalVisible] = useState(false);
	const { socket, loginState } = useContext(GeneralContext);
	const { signOut } = React.useContext(AuthContext);

	const [host, setHost] = useState(null);

	const [loading, setLoading] = useState(true);

	const onSignout = () => {
		signOut();
	};

	const ColmWidget = ({ topText, bottomText }) => (
		<View style={{ alignItems: "center", width: "25%" }}>
			<Text style={{ fontWeight: "bold" }}> {topText} </Text>
			<Text style={{ fontSize: 10 }}> {bottomText} </Text>
		</View>
	);

	useEffect(() => {
		socket.emit('getHost', { hid: loginState.id }, (err, res) => {
			if (err) {
				return;
			}

			setHost(res);
			setLoading(false);
		})
	}, []);

	if (loading) {
		return (
			<View style={{
				width: '100%',
				height: '100%',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<ActivityIndicator size="large" />
			</View>
		)
	}

	return (
		<SafeAreaView
			style={{
				width: "100%",
				height: "100%",
				alignItems: "center",
			}}
		>
			<ScrollView>
				<View
					style={{
						backgroundColor: "white",
						width: "100%",
						alignItems: "center",
						padding: 20,
					}}
				>
					<Avatar
						bg={'#e3e3e3'}
						source={{
							uri: host.imageURL
						}}
						size={'2xl'}
					>
						<Text
							style={{
								color: 'gray',
								fontSize: 40,
								fontWeight: '600'
							}}
						>
							{host.hostName.toUpperCase().charAt(0) + host.hostName.toUpperCase().charAt(1)}
						</Text>
					</Avatar>

					<Text style={{ fontWeight: "bold", fontSize: 25 }}>{host.hostName}</Text>

					<View style={{ flexDirection: "row", backgroundColor: "white", margin: 15 }}>
						<ColmWidget topText={host.followers.length} bottomText="Followers" />
						<View
							style={{ height: 50, backgroundColor: "#cccccc", width: 1 }}
						></View>
						<ColmWidget topText="90" bottomText="Event Views" />
						<View
							style={{ height: 50, backgroundColor: "#cccccc", width: 1 }}
						></View>
						<ColmWidget
							topText="90"
							bottomText="Average Attendees"
						/>
					</View>
				</View>

				<View style={{ backgroundColor: "white", marginTop: 5 }}>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "bold",
							marginBottom: 20,
							marginLeft: 10,
							marginTop: 10,
						}}
					>
						Account settings
					</Text>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("HostMiscStack", {
								screen: 'HostProfileInfo'
							})
						}}
					>
						<View style={{ flexDirection: "row" }}>
							<View style={{ width: "20%", padding: 5 }}>
								<Icon
									name="user-o"
									type="font-awesome"
									size={20}
									color="black"
								/>
							</View>
							<View
								style={{ flexDirection: "column", width: "60%", padding: 5 }}
							>
								<Text> Account Information</Text>
								<Text style={{ fontSize: 12, color: "grey", marginBottom: 10, marginLeft: 3.5 }}>
									Change you account information
								</Text>
							</View>
							<View style={{ width: "20%" }}>
								<Icon
									name="chevron-small-right"
									type="entypo"
									size={20}
									color="black"
								/>
							</View>
						</View>
					</TouchableOpacity>
					<Divider orientation="horizontal" />

					<TouchableOpacity>
						<View style={{ flexDirection: "row", marginTop: 15 }}>
							<View style={{ width: "20%", padding: 5 }}>
								<Icon name="bell" type="font-awesome" size={20} color="black" />
							</View>
							<View
								style={{ flexDirection: "column", width: "60%", padding: 5 }}
							>
								<Text>Notifications</Text>
								<Text style={{ fontSize: 12, color: "grey", marginBottom: 10, marginLeft: 3.5 }}>
									Manage push notifications
								</Text>
							</View>
							<View style={{ width: "20%" }}>
								<Icon
									name="chevron-small-right"
									type="entypo"
									size={20}
									color="black"
								/>
							</View>
						</View>
					</TouchableOpacity>
					<Divider orientation="horizontal" />
					<TouchableOpacity>
						<View style={{ flexDirection: "row", marginTop: 15 }}>
							<View style={{ width: "20%", padding: 5 }}>
								<Icon name="finger-print-outline" type="ionicon" size={20} color="black" />
							</View>
							<View
								style={{ flexDirection: "column", width: "60%", padding: 5 }}
							>
								<Text>Privacy</Text>
								<Text style={{ fontSize: 12, color: "grey", marginBottom: 10 }}>
									Manage privacy settings
								</Text>
							</View>
							<View style={{ width: "20%" }}>
								<Icon
									name="chevron-small-right"
									type="entypo"
									size={20}
									color="black"
								/>
							</View>
						</View>
					</TouchableOpacity>
				</View>

				<View style={{ backgroundColor: "white", marginTop: 5 }}>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "bold",
							marginBottom: 20,
							marginLeft: 10,
							marginTop: 10,
						}}
					>
						More
					</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate("Help")}
					>
						<View style={{ flexDirection: "row" }}>
							<View style={{ width: "20%", padding: 5 }}>
								<Icon
									name="question"
									type="font-awesome"
									size={20}
									color="black"
								/>
							</View>
							<View
								style={{ flexDirection: "column", width: "60%", padding: 5 }}
							>
								<Text> Help</Text>
								<Text style={{ fontSize: 12, color: "grey", marginBottom: 10 }}>
									For more info and support{" "}
								</Text>
							</View>
							<View style={{ width: "20%" }}>
								<Icon
									name="chevron-small-right"
									type="entypo"
									size={20}
									color="black"
								/>
							</View>
						</View>
					</TouchableOpacity>
					<Divider orientation="horizontal" />

					<TouchableOpacity
						onPress={() => navigation.navigate("About")}
					>
						<View style={{ flexDirection: "row", marginTop: 15 }}>
							<View style={{ width: "20%", padding: 5 }}>
								<Icon name="cloud" type="entypo" size={20} color="black" />
							</View>
							<View
								style={{ flexDirection: "column", width: "60%", padding: 5 }}
							>
								<Text> About</Text>
								<Text style={{ fontSize: 12, color: "grey", marginBottom: 10 }}>
									Developer Contact, enquires and other information{" "}
								</Text>
							</View>
							<View style={{ width: "20%" }}>
								<Icon
									name="chevron-small-right"
									type="entypo"
									size={20}
									color="black"
								/>
							</View>
						</View>
					</TouchableOpacity>
					<Divider orientation="horizontal" />
					<TouchableOpacity
						onPress={() => { setModalVisible(true) }}
					>
						<View style={{ flexDirection: "row", marginTop: 15 }}>
							<View style={{ width: "20%", padding: 5 }}>
								<Icon
									name="exchange"
									type="font-awesome"
									size={20}
									color="black"
								/>
							</View>
							<View
								style={{ flexDirection: "column", width: "60%", padding: 5 }}
							>
								<Text> Logout</Text>
								<Text style={{ fontSize: 12, color: "grey", marginBottom: 10 }}>
									To logout or change account{" "}
								</Text>
							</View>
							<View style={{ width: "20%" }}>
								<Icon
									name="chevron-small-right"
									type="entypo"
									size={20}
									color="black"
								/>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
			<Modal animationType="slide" visible={modalVisible} transparent={true}>
				<View style={{ marginTop: "150%", alignItems: "center" }}>
					<View style={{ height: 120, alignItems: "center", borderColor: "black", borderRadius: 10, borderWidth: 1, width: "80%", backgroundColor: "white" }}>
						<Text style={{ fontSize: 15, padding: 20 }}>Are you sure you want to log out?</Text>

						<View style={{ height: 1, width: "100%", backgroundColor: "#cccccc" }}></View>
						<TouchableOpacity style={{ padding: 20 }}
							onPress={onSignout}>
							<Text style={{ fontSize: 20, fontWeight: "bold" }}>Logout</Text>
						</TouchableOpacity>
					</View>
					<View>
						<View style={{ marginTop: 20, padding: 20, borderWidth: 1, borderRadius: 5, width: 300, backgroundColor: "white" }}>
							<TouchableOpacity
								onPress={() => { setModalVisible(false) }}
							>
								<Text style={{ alignSelf: "center" }}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>


				</View>
			</Modal>
		</SafeAreaView>
	);
}

//        <TouchableOpacity style={styles.signOutBtn} onPress={onSignout}>
//<Text style={styles.signOutBtnText}>Sign Out</Text>
//</TouchableOpacity>
const styles = StyleSheet.create({
	signOutBtn: {
		top: 560,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.4,
		shadowRadius: 5,
		opacity: 0.8,
		width: "50%",
		backgroundColor: "#85ba7f",
		padding: 15,
		borderRadius: 10,
		position: "absolute",
	},
	signOutBtnText: {
		alignSelf: "center",
		textTransform: "uppercase",
		fontWeight: "bold",
		fontSize: 12,
		color: "#2f402d",
	},
});
