import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
	Modal,
} from "react-native";
import React, { useState, useContext } from "react";

import { Avatar, Divider, Icon } from "react-native-elements";

import { AuthContext, GeneralContext } from "../../../utils/context";

import { ScrollView } from "native-base";

export default function Profile({ navigation, route }) {
	const [modalVisible, setModalVisible] = useState(false);
	const { socket, loginState } = useContext(GeneralContext);
	const { signOut } = React.useContext(AuthContext);
	const onSignout = () => {
		signOut();
	};

	const ColmWidget = ({ topText, bottomText }) => (
		<View style={{ alignItems: "center", width: "25%" }}>
			<Text style={{ fontWeight: "bold" }}> {topText} </Text>
			<Text style={{ fontSize: 10 }}> {bottomText} </Text>
		</View>
	);

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
						rounded
						size="large"
						containerStyle={{ marginTop: "3%" }}
						source={{
							uri: "https://i.insider.com/5dcc135ce94e86714253af21?width=1000&format=jpeg&auto=webp",
						}}
					/>
					<Text style={{ fontWeight: "bold", fontSize: 25 }}>John Doe</Text>
					<TouchableOpacity>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 10,
								color: "purple",
								marginTop: 8,
								marginBottom: 8,
							}}
						>
							View as Student
						</Text>
					</TouchableOpacity>
					<View
						style={{
							height: 1,
							backgroundColor: "#cccccc",
							width: "85%",
							marginBottom: 20,
						}}
					></View>
					<View style={{ flexDirection: "row", backgroundColor: "white" }}>
						<ColmWidget topText="90" bottomText="Folowers"></ColmWidget>
						<View
							style={{ height: 50, backgroundColor: "#cccccc", width: 1 }}
						></View>
						<ColmWidget topText="90" bottomText="Event Views"></ColmWidget>
						<View
							style={{ height: 50, backgroundColor: "#cccccc", width: 1 }}
						></View>
						<ColmWidget
							topText="90"
							bottomText="Average Attendees"
						></ColmWidget>
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
								<Text> Your Info</Text>
								<Text style={{ fontSize: 12, color: "grey", marginBottom: 10 }}>
									Update your Host Account,email, name and description{" "}
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
								<Text> Notifications</Text>
								<Text style={{ fontSize: 12, color: "grey", marginBottom: 10 }}>
									Update your messaging,event and host Notifications{" "}
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
								<Icon name="tags" type="font-awesome" size={20} color="black" />
							</View>
							<View
								style={{ flexDirection: "column", width: "60%", padding: 5 }}
							>
								<Text> Organiation Tags</Text>
								<Text style={{ fontSize: 12, color: "grey", marginBottom: 10 }}>
									Change the tags associated with your organisation{" "}
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
