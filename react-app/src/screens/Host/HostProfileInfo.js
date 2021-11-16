import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";

import Accordion from "react-native-collapsible/Accordion";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";

import SettingsList from "react-native-settings-list";

export default function HostProfileInfo({ navigation, route }) {
  const socket = route.params.socket;
  const loginState = route.params.loginState;


  const [activeSections, setActiveSections] = useState([0]);

  const renderSectionTitle = (section) => {
    return (
      <View style={styles.SectionTitle}>
        <Text>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          width: "90%",
          alignSelf: "center",
          borderRadius: 30,
          padding: 5,
        }}
      >
        <Text>{section.content}</Text>
      </View>
    );
  };

  const renderHeader = (section) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderWidth: 1,
          backgroundColor: "white",
          height: 50,
          padding: 10,
          borderColor: "#D3D3D3",
        }}
      >
        <Text>Description</Text>
        <Text style={{ fontSize: 10 }}> Begin Description for </Text>
        <AntDesign name="down" size={24} color="black" />
      </View>
    );
  };
  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  const [email, setEmail] = useState("John@purdue.edu");
  const [OrgName, setOrgName] = useState("John");
  const [Description, setDesciption] = useState(
    "A fun club full of good people"
  );
  const SECTIONS = [
    {
      title: "Club Description",
      content: Description
    },
  ];
  const [editing, setEditing] = useState(false);

  let changeInfoEmail = () => {
    setEditing(true);
    let newEmail = Alert.prompt("Enter new email", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: (newEmail) => setEmail(newEmail),
      },
    ]);
  };

  let changeInfoName = () => {
    setEditing(true);
    let newName = Alert.prompt("Enter new Name", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: (newEmail) => setOrgName(newEmail),
      },
    ]);
  };

  let changeInfoDesciption = () => {
    setEditing(true);
    let newEmail = Alert.prompt("Enter new Description", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: (newEmail) => setDesciption(newEmail),
      },
    ]);
  };
  return (
    <View style={{ backgroundColor: "#EFEFF4", flex: 1, marginBottom: 200 }}>
      <View
        style={{
          borderBottomWidth: 1,
          backgroundColor: "#f7f7f8",
          borderColor: "#c8c7cc",
        }}
      ></View>

      <View style={{ backgroundColor: "#EFEFF4", flex: 1 }}>
        <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
          <SettingsList.Header
            headerStyle={{ marginTop: 20, fontSize: 20, fontWeight: "bold" }}
            headerText="Info"
            position="relative"
          />
          <SettingsList.Item
            title="Email"
            titleInfo={email}
            hasNavArrow={false}
          />
          <SettingsList.Item
            title="Organisation Name"
            titleInfo={OrgName}
            hasNavArrow={false}
          />
        </SettingsList>

        <View style={{marginBottom:70}}>
        <Accordion
          sections={SECTIONS}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={updateSections}
        />


        </View>

        <TouchableOpacity style={styles.signOutBtn} onPress={changeInfoEmail}>
          <Text style={styles.signOutBtnText}>Edit Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signOutBtn1} onPress={changeInfoName}>
          <Text style={styles.signOutBtnText}>Edit Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signOutBtn2}
          onPress={changeInfoDesciption}
        >
          <Text style={styles.signOutBtnText}>Edit Description</Text>
        </TouchableOpacity>
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
    marginLeft: 50,
    borderRadius: 10,
  },
  signOutBtn1: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    opacity: 0.8,
    width: "70%",
    backgroundColor: "#85ba7f",
    padding: 15,
    marginLeft: 50,
    borderRadius: 10,
  },
  signOutBtn2: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    opacity: 0.8,
    width: "70%",
    backgroundColor: "#85ba7f",
    padding: 15,
    marginLeft: 50,
    borderRadius: 10,
    marginBottom: 100,
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
  header: {},
  headerText: {
    fontSize: 20,
  },
  SectionTitle: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
});
