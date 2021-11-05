import { Text, View, StyleSheet, Image } from "react-native";

import React from "react";

import SettingsList from "react-native-settings-list";
import users from "../../../assets/events-data/users";

export default function HostInfo() {
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
        <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
          <SettingsList.Header
            headerStyle={{ marginTop: 35, fontSize: 20, fontWeight: "bold" }}
            headerText="Info"
            position="relative"
          />
          <SettingsList.Item
            title="Host name"
            titleInfo="Purdue"
            hasNavArrow={false}
          />
          <SettingsList.Item
            title="Email"
            titleInfo="purdue@purdue.edu"
            hasNavArrow={false}
          />
          <SettingsList.Item
            title="Phone number"
            titleInfo="+447628390"
            hasNavArrow={false}
          />
          <SettingsList.Item
            title="Website"
            titleInfo="www.savethekids.org.canada.uk"
            hasNavArrow={false}
          />
        </SettingsList>
      </View>
    </View>
  );
}
