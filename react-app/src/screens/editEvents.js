import {
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Alert,
  ScrollView,
  Button,
  Pressable,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { TouchableOpacity } from "react-native-gesture-handler";
import React, { Component } from "react";

import eventsData from "../../assets/events-data/eventsData";
import { Text } from "react-native-elements";
import { EvilIcons } from "@expo/vector-icons";

import { ListItem, Avatar } from "react-native-elements";

const KHeight = Dimensions.get("window").height;
const KWidth = Dimensions.get("window").width;

const list = [
  {
    name: "by John Purdue",
    avatar_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/JohnPurdue.jpg/300px-JohnPurdue.jpg",
    subtitle: "Status: Verified",
  },
];

export default function editEvents({ navigation, route }) {
  const {
    event_name,
    image,
    event_host,
    event_location,
    event_date_time,
    event_description,
    tag,
    MAX_STUDENTS,
  } = route.params.event;

  const [textValue, setTextValue] = React.useState("EDIT");
  const [RSVP, setRSVP] = React.useState(false);
  const [isEditing, setEdit] = React.useState(false);
  const [event_des, setEventDes] = React.useState(event_description);
  const [event_loc, setEventLoc] = React.useState(event_loc);
  const [event_time, setEventTime] = React.useState(event_date_time);
  const [event_tag, setEventTags] = React.useState(tag);
  const [event_max, setEventMax] = React.useState(MAX_STUDENTS);
  const [event_NME, setEventName] = React.useState(event_name);

  let onPress = () => {
    if (isEditing) {
      Alert.alert("Submitted");
      setTextValue("EDIT");
      setEdit(false);
    } else if (textValue == "EDIT") {
      setTextValue("Submit");
      setEdit(true);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{ uri: image }} />

      <View style={{ height: KHeight * 0.14 }}></View>
      {isEditing ? (
        <TextInput
          style={{
            fontSize: 25,
            position: "absolute",
            alignSelf: "center",
            marginTop: 50,
            color: "white",
            fontWeight: "bold",
          }}
          value={event_NME}
          onChangeText={(value) => setEventName(value)}
          autoFocus
        />
      ) : (
        <Text
          style={{
            fontSize: 25,
            position: "absolute",
            alignSelf: "center",
            marginTop: 50,
            color: "white",
            fontWeight: "bold",
          }}
        >
          {event_name}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => Alert.alert("host was tapped")}
        style={{
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 5,
          width: "60%",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            alignSelf: "center",
            marginVertical: 10,
            color: "green",
            fontWeight: "bold",
            adjustFonScaling: true,
          }}
        >
          {event_host}
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EvilIcons name="location" size={24} color="black" />
        {isEditing ? (
          <TextInput
            style={{ alignSelf: "center", marginVertical: 20, width: "50%" }}
            value={event_loc}
            onChangeText={(value) => setEventLoc(value)}
            autoFocus
          />
        ) : (
          <Text
            style={{ alignSelf: "center", marginVertical: 20, width: "50%" }}
          >
            {event_location}
          </Text>
        )}
      </View>
      {isEditing ? (
        <TextInput
          style={{
            alignSelf: "center",
            marginVertical: 50,
            width: "80%",
            flexWrap: "wrap",
          }}
          value={event_des}
          onChangeText={(value) => setEventDes(value)}
          autoFocus
        />
      ) : (
        <Text
          style={{
            alignSelf: "center",
            marginVertical: 50,
            width: "80%",
            flexWrap: "wrap",
          }}
        >
          {event_description}
        </Text>
      )}

      {isEditing ? (
        <TextInput
          style={{
            alignSelf: "center",
            marginVertical: 30,
            fontWeight: "bold",
          }}
          value={event_time}
          onChangeText={(value) => setEventTime(value)}
          autoFocus
        />
      ) : (
        <Text
          style={{
            alignSelf: "center",
            marginVertical: 30,
            fontWeight: "bold",
          }}
        >
          {event_date_time}
        </Text>
      )}
      <Pressable style={styles.signOutBtn} onPress={onPress}>
        <Text style={styles.signOutBtnText}> {textValue}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#96db8f",
    height: KHeight * 0.28,
  },
  avatar: {
    width: KHeight * 0.4,
    height: KWidth * 0.5,
    borderRadius: KHeight * 0.25,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  signOutBtnText: {
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    color: "#2f402d",
  },
  container: {
    flex: 1,
    resizeMode: "contain",
  },
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
    alignSelf: "center",
    marginBottom: 50,
    //position: "absolute",
    //top: 800,
  },
});
