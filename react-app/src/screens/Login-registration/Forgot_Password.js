import { Text, View } from "react-native";

import React from "react";

import LottieView from "lottie-react-native";

function Forgot_Password() {
  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <Text style={{ margin: 90, fontSize: 28 }}>Profile</Text>
      <LottieView
        source={require("../../../assets/Lottie/Profile.json")}
        autoPlay
      />
    </View>
  );
}

export default Forgot_Password;
