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
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import React, { Component } from "react";

import eventsData from "../../assets/events-data/eventsData";
import { Text } from "react-native-elements";

import { ListItem, Avatar } from "react-native-elements";

const list = [
  {
    name: "by John Purdue",
    avatar_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/JohnPurdue.jpg/300px-JohnPurdue.jpg",
    subtitle: "Status: Verified",
  },
];

export default function event_info({ navigation, route }) {
  const {
    event_name,
    image,
    event_host,
    event_location,
    event_date_time,
    event_description,
    tag,
  } = route.params.event;

  //console.log(image);
  const [textValue, setTextValue] = React.useState("RESERVE");
  const [RSVP, setRSVP] = React.useState(false);

  let onPress = () => {
    if (RSVP) {
      Alert.alert("Canceled RSVP");
      setTextValue("RESERVE");
      setRSVP(false);
    } else if (textValue == "RESERVE") {
      Alert.alert("reserved");
      setTextValue("CANCEL");
      setRSVP(true);
    }
  };

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <Pressable onPress={() => {}}>
          <ImageBackground
            style={styles.image}
            source={{ uri: image }}
          ></ImageBackground>
        </Pressable>
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => {
            Alert.alert("Host");
          }}
        >
          <View style={{ height: 50 }}>
            {list.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <Avatar source={{ uri: l.avatar_url }} />
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.TextContainer}>
        <Text h4 style={styles.textInner}>
          {"\n"}DESCRIPTION:
        </Text>
        <SafeAreaView style={{ height: 60, position: "relative" }}>
          <ScrollView style={styles.scrollView}>
            <Text h4 style={styles.text}>
              {event_description}
            </Text>
          </ScrollView>
        </SafeAreaView>
        <Text h4 style={styles.textInner}>
          LOCATION:
        </Text>
        <SafeAreaView style={{ height: 35, position: "relative" }}>
          <ScrollView style={styles.scrollView}>
            <Text h4 style={styles.text}>
              {event_location}
              {"\n"}
            </Text>
          </ScrollView>
        </SafeAreaView>
        <Text h4 style={styles.text}>
          TIMES:
        </Text>
        <SafeAreaView style={{ height: 35, position: "relative" }}>
          <ScrollView style={styles.scrollView}>
            <Text h4 style={styles.text}>
              {event_date_time}
            </Text>
          </ScrollView>
        </SafeAreaView>
        <Text h4 style={styles.text}>
          TAGS:
        </Text>
        <SafeAreaView style={{ height: 35, position: "relative" }}>
          <ScrollView style={styles.scrollView}>
            <Text h4 style={styles.text}>
              {tag}
            </Text>
          </ScrollView>
        </SafeAreaView>
        <Text h4 style={styles.text}>
          ATTENDEES:
        </Text>
        <SafeAreaView style={{ height: 35, position: "relative" }}>
          <ScrollView style={styles.scrollView}>
            <Text h4 style={styles.text}>
              50
            </Text>
          </ScrollView>
        </SafeAreaView>
        <Text h4 style={styles.text}>
          MAX:
        </Text>
        <SafeAreaView style={{ height: 35, position: "relative" }}>
          <ScrollView style={styles.scrollView}>
            <Text h4 style={styles.text}>
              100
            </Text>
          </ScrollView>
        </SafeAreaView>
        <Pressable style={styles.loginBtn} onPress={onPress}>
          <Text style={styles.textButton}> {textValue}</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

// prettier-ignore
const styles = StyleSheet.create({
    container: {
        height:300,
        //width:410,
        resizeMode:'contain',
    },
  
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 20,
      overflow: "hidden",
      justifyContent: "flex-end",
    },
  
    loginBtn: {
      width: "50%",
      borderRadius: 10,
      height: 50,
      bottom:0,
      position: 'relative',
      top: 80,
      alignItems: "center",
      justifyContent: "center",
      marginLeft:Dimensions.get('window').width /4,
      backgroundColor: "grey",
    },
  
    textButton: {
     fontSize: 16,
     lineHeight: 21,
     fontWeight: 'bold',
     letterSpacing: 0.25,
     color: 'white',
    },
  
    TextContainer: {
        position:'relative',
        height:80,
        resizeMode:'contain',
        justifyContent: "flex-end",
        top: 400,
        //bottom: 100,
  
  
    },
    scrollView: {
      backgroundColor: 'white',
      resizeMode:"contain",
      marginVertical:3,
      //marginHorizontal: 5,
      paddingTop:5,
      paddingBottom:0,
    },
    text: {
      //paddingTop:3,
      position:"relative",
      fontSize: 21,
      lineHeight: 21,
      //fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
     },
     textInner: {
      //paddingTop:3,
      position:"relative",
      fontSize: 21,
      lineHeight: 21,
      //fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
     },
   
  });
