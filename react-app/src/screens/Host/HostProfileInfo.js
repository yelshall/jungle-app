import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  Modal,
} from "react-native";
import React,{useState} from "react";

import { ListItem, Avatar, Divider, Icon } from "react-native-elements";

import { AuthContext } from "../../utils/context";

import HostData from "../../../assets/events-data/HostData";
import eventsData from "../../../assets/events-data/eventsData";
import users from "../../../assets/events-data/users";
import { Center, Column, List, ScrollView } from "native-base";
import { flexDirection } from "styled-system";
import ListLine from "../../components/UIElements/ListComponent";

export default function HostProfileInfo({ navigation, route }) {
  //const socket = route.params.socket;
  //const loginState = route.params.loginState;

  return (
    <View style={{ backgroundColor: "white", marginTop: 5 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 20,
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        Account
      </Text>
      <View>
      <TouchableOpacity onPress={() => navigation.navigate("About")}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <View style={{ width: "20%", padding: 5 }}>
            <Icon name="home" type="entypo" size={20} color="black" />
          </View>
          <View style={{ flexDirection: "column", width: "60%", padding: 5 }}>
            <Text> Organiation Name</Text>
            <Text style={{ fontSize: 12, color: "grey", marginBottom: 10 }}>
              the organisation name{" "}
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

      <TouchableOpacity onPress={() => navigation.navigate("About")}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <View style={{ width: "20%", padding: 5 }}>
            <Icon name="mail" type="entypo" size={20} color="black" />
          </View>
          <View style={{ flexDirection: "column", width: "60%", padding: 5 }}>
            <Text> Email</Text>
            <Text style={{ fontSize: 12, color: "grey", marginBottom: 10 }}>
              the Org email{" "}
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

      <TouchableOpacity onPress={() => navigation.navigate("About")}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <View style={{ width: "20%", padding: 5 }}>
            <Icon name="news" type="entypo" size={20} color="black" />
          </View>
          <View style={{ flexDirection: "column", width: "60%", padding: 5 }}>
            <Text> Organiation Description</Text>
            <Text style={{ fontSize: 12, color: "grey", marginBottom: 10,margin:10 }}>
              the organisation Descriptionthe organisation Description
              the organisation Descriptionthe organisation Description
              the organisation Descriptionthe organisation Description
              the organisation Description the organisation Description
              the organisation Descriptionthe organisation Description
              the organisation Descriptionthe organisation Description
              the organisation Descriptionthe organisation Description
              the organisation Description the organisation Description
              
              
              {" "}
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

// const [activeSections, setActiveSections] = useState([0]);

//   const renderSectionTitle = (section) => {
//     return (
//       <View style={styles.SectionTitle}>
//         <Text>{section.title}</Text>
//       </View>
//     );
//   };

//   const renderContent = (section) => {
//     return (
//       <View
//         style={{
//           backgroundColor: "white",
//           width: "90%",
//           alignSelf: "center",
//           borderRadius: 30,
//           padding: 5,
//         }}
//       >
//         <Text>{section.content}</Text>
//       </View>
//     );
//   };

//   const renderHeader = (section) => {
//     return (
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           borderWidth: 1,
//           backgroundColor: "white",
//           height: 50,
//           padding: 10,
//           borderColor: "#D3D3D3",
//         }}
//       >
//         <Text>{section.title}</Text>
//         <AntDesign name="down" size={24} color="black" />
//       </View>
//     );
//   };
//   const updateSections = (activeSections) => {
//     setActiveSections(activeSections);
//   };

//   const [email, setEmail] = useState("John@purdue.edu");
//   const [OrgName, setOrgName] = useState("John");
//   const [Description, setDesciption] = useState(
//     "A fun club full of good people"
//   );
//   const SECTIONS = [
//     {
//       title: "Organisation name",
//       content: OrgName,
//     },
//     {
//       title: "Email",
//       content: email,
//     },
//     {
//       title: "Club Description",
//       content: Description,
//     },
//   ];
//   const [editing, setEditing] = useState(false);

//   let changeInfoEmail = () => {
//     setEditing(true);
//     let newEmail = Alert.prompt("Enter new email", "", [
//       {
//         text: "Cancel",
//         onPress: () => console.log("Cancel Pressed"),
//         style: "cancel",
//       },
//       {
//         text: "OK",
//         onPress: (newEmail) => setEmail(newEmail),
//       },
//     ]);
//   };

//   let changeInfoName = () => {
//     setEditing(true);
//     let newName = Alert.prompt("Enter new Name", "", [
//       {
//         text: "Cancel",
//         onPress: () => console.log("Cancel Pressed"),
//         style: "cancel",
//       },
//       {
//         text: "OK",
//         onPress: (newEmail) => setOrgName(newEmail),
//       },
//     ]);
//   };

//   let changeInfoDesciption = () => {
//     setEditing(true);
//     let newEmail = Alert.prompt("Enter new Description", "", [
//       {
//         text: "Cancel",
//         onPress: () => console.log("Cancel Pressed"),
//         style: "cancel",
//       },
//       {
//         text: "OK",
//         onPress: (newEmail) => setDesciption(newEmail),
//       },
//     ]);
//   };
