import {
  Image,
  View,
  Text,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { height, justifySelf, width } from "styled-system";
import { KeyboardAvoidingView } from "native-base";

export default function editOrgDescription() {
  const [text, onChangeText] = React.useState(
    " anisation Descriptionthe organisation Description   the organisation Descriptionthe organisation Description   the organisation Description the organisation Description   the organisation Descriptionthe organisation Description   the organisation Descriptionthe organisation Description   the organisation Descriptionthe organisation Description   the organisation Description the organisation Description"
  );

  return (
    <View style={{ backgroundColor: "white", flex: 1, padding: 10 }}>
      <Image
        style={{
          marginBottom: 20,
          height: "30%",
          width: "60%",
          alignSelf: "center",
        }}
        source={require("../../../assets/descriptionIcon.png")}
      ></Image>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        {" "}
        Your Organiation Description
      </Text>
      <Text style={{ color: "grey", marginBottom: 10 }}>
        {" "}
        Please enter your new organisation Description bellow. Any changes to
        the orgnaisation Description will show up on the student and host side{" "}
      </Text>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "grey",
          marginBottom: 20,
          paddingLeft: 10,
          paddingTop: 5,
          paddingBottom: 5,
          width: "95%",
          alignSelf: "center",
        }}
      >
        <Text style={{ fontWeight: "500", color: "grey" }}>Description</Text>
        <TextInput
          style={{ padding: 5 }}
          multiline
          onChangeText={onChangeText}
          value={text}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "green",
          width: "80%",
          height: 50,
          alignSelf: "center",
          borderRadius: 25,
          padding: 5,
          justifyContent: "center",
          marginTop: 50,
        }}
        onPress={() => Alert.alert("Name Changed")}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "white",
            alignSelf: "center",
          }}
        >
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
}
