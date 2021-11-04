import { Text, View, StyleSheet, Image } from "react-native";

import React from "react";

import SettingsList from "react-native-settings-list";
import users from "../../../../assets/events-data/users";

export default function AccountInfo({ navigation, route }) {
  const user = route.params.user;

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
          Account information
        </Text>
      </View>

      <View style={{ backgroundColor: "#EFEFF4", flex: 1 }}>
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
          <SettingsList.Header
            headerStyle={{ marginTop: 35, fontSize: 20, fontWeight: "bold" }}
            headerText='Info'
            position='relative'
          />
          <SettingsList.Item
            title='Email'
            titleInfo='purdue@purdue.edu'
            hasNavArrow={false}
          />
          <SettingsList.Item
            title='Name'
            titleInfo='John Wick'
            hasNavArrow={false}
          />
          <SettingsList.Item
            title='Gender'
            titleInfo='Female'
            hasNavArrow={false}
          />
          <SettingsList.Item title='Age' titleInfo='35' hasNavArrow={false} />
        </SettingsList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signOutBtn: {
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
