import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  Modal,
  Icon,
} from "react-native";
import React, { useState } from "react";


export default function ListLine () {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("About")}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <View style={{ width: "20%", padding: 5 }}>
            <Icon name="cloud" type="entypo" size={20} color="black" />
          </View>
          <View style={{ flexDirection: "column", width: "60%", padding: 5 }}>
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
    </View>
  );
};


