import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { AuthContext } from "../../../utils/context";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import HostData from "../../../../assets/events-data/HostData";
import eventsData from "../../../../assets/events-data/eventsData";
import users from "../../../../assets/events-data/users";
import SettingsList from "react-native-settings-list";
import { Slider } from "react-native-elements";
import { Animated } from "react-native";
import { Switch } from "react-native-elements";

export default function Notifications({ navigation, route }) {
  const socket = route.params.socket;
  const loginState = route.params.loginState;
  const { signOut } = React.useContext(AuthContext);
  const [switchValue, setSwitchValue] = useState(false);
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

  let changeSwitch = (value) => {
    if ((value = false)) {
    }
  };

  return (
    <View style={{ backgroundColor: "#EFEFF4", flex: 1 }}>
      <View
        style={{
          borderBottomWidth: 1,
          backgroundColor: "#f7f7f8",
          borderColor: "#c8c7cc",
        }}
      ></View>
      <View style={{ backgroundColor: "white", flexDirection: "row" }}>
        <Text
          style={{
            alignSelf: "flex-start",
            //marginTop: 50,
            marginBottom: 20,
            fontWeight: "bold",
            marginTop: 10,
            fontSize: 20,
          }}
        >
          Events Updates
        </Text>
        <Switch
          style={{
            //alignSelf: "flex-end",
            marginLeft: 220,
            marginTop: 10,
          }}
          value={switchValue}
          onValueChange={(value) => setSwitchValue(true)}
        />
      </View>
      <View style={{ backgroundColor: "white", flexDirection: "row" }}>
        <Text
          style={{
            alignSelf: "flex-start",
            //marginTop: 50,
            marginBottom: 20,
            fontWeight: "bold",
            marginTop: 10,
            fontSize: 20,
          }}
        >
          Events Cancellations
        </Text>
        <Switch
          style={{
            //alignSelf: "flex-end",
            marginLeft: 172,
            marginTop: 10,
          }}
          value={false}
        />
      </View>
      <View style={{ backgroundColor: "white", flexDirection: "row" }}>
        <Text
          style={{
            alignSelf: "flex-start",
            //marginTop: 50,
            marginBottom: 20,
            fontWeight: "bold",
            marginTop: 10,
            fontSize: 20,
          }}
        >
          Events Updates
        </Text>
        <Switch
          style={{
            //alignSelf: "flex-end",
            marginLeft: 220,
            marginTop: 10,
          }}
          value={false}
        />
      </View>
      <View style={{ backgroundColor: "white", flexDirection: "row" }}>
        <Text
          style={{
            alignSelf: "flex-start",
            //marginTop: 50,
            marginBottom: 20,
            fontWeight: "bold",
            marginTop: 10,
            fontSize: 20,
          }}
        >
          Events Updates
        </Text>
        <Switch
          style={{
            //alignSelf: "flex-end",
            marginLeft: 220,
            marginTop: 10,
          }}
          value={false}
        />
      </View>
    </View>
  );
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
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
});
