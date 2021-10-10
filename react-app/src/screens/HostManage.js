import { Text, View, Image } from "react-native";

import styles from "../../styles";

import React from "react";

function HostManage() {
  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <Text style={{ margin: 90, fontSize: 28 }}>Manage</Text>
      <Image style={styles.image} source={require("../../assets/Tucan.png")} />
    </View>
  );
}

export default HostManage;
