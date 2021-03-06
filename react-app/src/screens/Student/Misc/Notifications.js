import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../../../utils/context";
import React, { useState } from "react";
import HostData from "../../../../assets/events-data/HostData";
import eventsData from "../../../../assets/events-data/eventsData";
import users from "../../../../assets/events-data/users";
import { Switch } from "react-native-elements";

export default function Notifications({ navigation, route }) {
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
      eventsData: eventsData
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
            marginLeft: 5
          }}
        >
          Events Updates
        </Text>
        <Switch
          style={{
            //alignSelf: "flex-end",
            marginLeft: 195,
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
            marginLeft: 5
          }}
        >
          Events Cancellations
        </Text>
        <Switch
          style={{
            //alignSelf: "flex-end",
            marginLeft: 147,
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
            marginLeft: 5
          }}
        >
          Events Updates
        </Text>
        <Switch
          style={{
            //alignSelf: "flex-end",
            marginLeft: 195,
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
            marginLeft: 5
          }}
        >
          Events Updates
        </Text>
        <Switch
          style={{
            //alignSelf: "flex-end",
            marginLeft: 195,
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
