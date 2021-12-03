import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Image,
  } from "react-native";
  import { Icon } from "react-native-elements";

  import { AuthContext } from "../../utils/context";
  import React, { useState } from "react";
  import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
  import HostData from "../../../assets/events-data/HostData";
  import eventsData from "../../../assets/events-data/eventsData";
  import users from "../../../assets/events-data/users";

  import { Slider } from "react-native-elements";
  import { Animated } from "react-native";
  import { Switch } from "react-native-elements";


export default function HostNotifications({ navigation, route }) {
    const [switchValue, setSwitchValue] = useState(false);
    return(
        <View style={{ backgroundColor: "#EFEFF4", flex: 1 }}>
      <View
        style={{
          borderBottomWidth: 1,
          backgroundColor: "#f7f7f8",
          borderColor: "#c8c7cc",
        }}
      ></View>
      <View style={{ backgroundColor: "white", flexDirection: "row",justifyContent:"space-between" }}>
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
            Message Notifications
        </Text>
        <Switch
          style={{
            //alignSelf: "flex-end",
            alignSelf:"center"
           
          }}
          value={switchValue}
          onValueChange={(value) => setSwitchValue(!switchValue)}
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
