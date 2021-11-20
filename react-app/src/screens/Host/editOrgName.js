import { Image, View, Text, Alert } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { height, justifySelf, width } from "styled-system";

export default function editOrgName() {
  const [text, onChangeText] = React.useState("Useless Text");
  return (
    <View style={{ backgroundColor: "white", flex: 1, padding: 10 }}>
      <Image
        style={{
          marginBottom: 5,
          height: "30%",
          width: "60%",
          alignSelf: "center",
        }}
        source={require("../../../assets/orgNameIcon.png")}
      ></Image>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        {" "}
        Your Organiation Name
      </Text>
      <Text style={{ color: "grey", marginBottom: 10 }}>
        {" "}
        Please enter your new organisation Name bellow. Any changes to the
        orgnaisation name will show up on the student and host side{" "}
      </Text>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "grey",
          marginBottom: 20,
          paddingLeft:10,
          paddingTop:5,
          paddingBottom:5,
          width:"95%",
          alignSelf:"center"
        }}
      >
        <Text style={{ fontWeight: "500", color: "grey" }}>Name</Text>
        <TextInput
          style={{ height: 30}}
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
          marginTop:150,
        }}
        onPress={()=>Alert.alert("Name Changed")}
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
