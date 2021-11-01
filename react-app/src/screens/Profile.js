import { Text, View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { AuthContext } from "../utils/context";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import HostData from "../../assets/events-data/HostData";
import eventsData from "../../assets/events-data/eventsData";
import LottieView from "lottie-react-native";
import users from "../../assets/events-data/users";
import SettingsList from "react-native-settings-list";
import { Slider } from "react-native-elements";
import { Animated } from "react-native";

export default function Profile({ navigation, route }) {
  const socket = route.params.socket;
  const loginState = route.params.loginState;
  const { signOut } = React.useContext(AuthContext);
  const [switchValue, setSwitchValue] = useState("");
  const onSignout = () => {
    signOut();
  };

  const onPref = () => {
    navigation.navigate("ChangePref", {
      users: users[0],
    });
  };

  const onFollowing = () => {
    navigation.navigate("FollowedHosts", {
      HostData: HostData[0],
      eventsData: eventsData,
      socket: socket,
      loginState: loginState,
    });
  };

  var bgColor = "#DCE3F4";

  const onValueChange = (value) => {
    setSwitchValue = value;
  };
  return (
    <View style={{ backgroundColor: "#EFEFF4", flex: 1 }}>
      <View
        style={{
          borderBottomWidth: 1,
          backgroundColor: "#f7f7f8",
          borderColor: "#c8c7cc",
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            marginTop: 50,
            marginBottom: 10,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Settings
        </Text>
      </View>
      <View style={{ backgroundColor: "#EFEFF4", flex: 1 }}>
        <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
          <View>
            <Text>Preferences</Text>

            <Text>Tags</Text>
          </View>

          <View
            style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}
          >
            <Text>Set event max Distance </Text>
            <Slider value={switchValue} onValueChange={onValueChange} />
            <Text>Distance: {switchValue} miles </Text>
          </View>

          <SettingsList.Header
            headerStyle={{ marginTop: 35, fontSize: 20, fontWeight: "bold" }}
            headerText="Info"
          />
          <SettingsList.Item
            title="Email"
            titleInfo="Johnwick@gmail.com"
            hasNavArrow={false}
          />
          <SettingsList.Item
            title="Name"
            titleInfo="John Wick"
            hasNavArrow={false}
          />
          <SettingsList.Item
            title="gender"
            titleInfo="Female"
            hasNavArrow={false}
          />
          <SettingsList.Item title="Age" titleInfo="35" hasNavArrow={false} />
          <SettingsList.Header
            headerStyle={{ marginTop: 35, fontSize: 20, fontWeight: "bold" }}
            headerText="More"
          />
          <SettingsList.Item
            icon={
              <View style={{ height: 30, marginLeft: 10, alignSelf: "center" }}>
                <Icon name="notifications" />
              </View>
            }
            itemWidth={50}
            title="Notifications"
            titleInfoStyle={styles.titleInfoStyle}
            onPress={() => Alert.alert("Route to Notifiations Page")}
          />
          <SettingsList.Item
            icon={
              <View style={{ height: 30, marginLeft: 10, alignSelf: "center" }}>
                <Icon name="person" />
              </View>
            }
            title="About"
            titleInfoStyle={styles.titleInfoStyle}
            onPress={() => Alert.alert("Route to About Page")}
          />
          <SettingsList.Item
            icon={
              <View style={{ height: 30, marginLeft: 10, alignSelf: "center" }}>
                <Icon name="help" />
              </View>
            }
            title="Help"
            titleInfoStyle={styles.titleInfoStyle}
            onPress={() => Alert.alert("Route to Help Page")}
          />
        </SettingsList>
      </View>
    </View>
  );

  //   <View
  //     style={{
  //       flex: 1,
  //       backgroundColor: "white",
  //       alignItems: "center",
  //       justifyContent: "center",
  //     }}
  //   >
  //     <TouchableOpacity style={styles.signOutBtn} onPress={onPref}>
  //       <Text style={styles.signOutBtnText}>Preferences</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={styles.signOutBtn} onPress={onFollowing}>
  //       <Text style={styles.signOutBtnText}>Following</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={styles.signOutBtn} onPress={onSignout}>
  //       <Text style={styles.signOutBtnText}>Sign Out</Text>
  //     </TouchableOpacity>

  //     {/*<Text style={{ margin: 90, fontSize: 28 }}>Profile</Text>
  // 		<LottieView
  // 			source={require("../../assets/Lottie/Profile.json")}
  // 			autoPlay
  // 		/>*/}
  //   </View>
  // );
}

const styles = StyleSheet.create({
  signOutBtn: {
    //top: 300,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    opacity: 0.8,
    width: "70%",
    backgroundColor: "#85ba7f",
    padding: 15,
    borderRadius: 10,
  },
  signOutBtnText: {
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    color: "#2f402d",
  },
});
