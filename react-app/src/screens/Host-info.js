import {
  View,
  SafeAreaView,
  LayoutAnimation,
  ImageBackground,
  StyleSheet,
  Alert,
  ScrollView,
  Button,
  Pressable,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";

import React, { Component, useEffect } from "react";
import HostData from "../../assets/events-data/HostData";

import eventsData from "../../assets/events-data/eventsData";
import { Text } from "react-native-elements";
import Constants from "expo-constants";

import { ListItem, Avatar, Divider } from "react-native-elements";
import HostManage from "./HostManage";

const list = [
  {
    name: "by John Purdue",
    avatar_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/JohnPurdue.jpg/300px-JohnPurdue.jpg",
    subtitle: "Status: Verified",
  },
];

var { height, width } = Dimensions.get("window");

const smallSize = width / 5;
const itemWidth = width * 0.67;
const itemHeight = height / 2 - Constants.statusBarHeight * 2;
const fontSize = 300;

export default function Host_info({ navigation, route }) {
  console.log(route.params);
  const eventsData = route.params.eventsData;
  const hostData = route.params.HostData;

  const {
    id,
    hostEmail,
    hostName,
    description,
    phoneNumber,
    website,
    imageURL,
    tags,
    followers,
    events,
  } = route.params.HostData;

  const {
    event_name,
    image,
    event_host,
    event_location,
    event_date_time,
    event_description,
    tag,
  } = route.params.eventsData;

  const [scrollX, setScrollX] = React.useState(new Animated.Value(0));
  const [search, setSearch] = React.useState("");

  const onLongPress = (event) => {
    navigation.navigate("event_info", { event: event });
  };
  useEffect(() => {
    LayoutAnimation.spring();
  }, []);
  //console.log(image);
  const [textValue, setTextValue] = React.useState("Follow");
  const [Follow_Bool, setFollow] = React.useState(false);

  let onPress = () => {
    if (Follow_Bool) {
      Alert.alert("Unfollowed: " + hostName);
      setTextValue("Follow");
      setFollow(false);
    } else if (textValue == "Follow") {
      Alert.alert("Followed " + hostName);
      setTextValue("Unfollow");
      setFollow(true);
    }
  };

  const renderNormal = (event, index) => {
    if (event === null) {
      return null;
    }

    return (
      <View
        key={index}
        style={{
          flexWrap: "nowrap",
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onLongPress={() => onLongPress(event)}>
          <ImageBackground
            source={{ uri: event.image }}
            style={[
              {
                height: smallSize,
                width: smallSize,
                opacity: 1,
                resizeMode: "cover",
              },
            ]}
          />
        </TouchableOpacity>

        <View style={{ marginLeft: 20, flex: 1 }}>
          <TouchableOpacity onLongPress={() => onLongPress(event)}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 16,
                position: "absolute",
                bottom: 5,
              }}
            >
              {eventsData[index].event_name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}></View>

        {imageURL.length > 0 && (
          <Image style={styles.avatar} source={{ uri: imageURL }} />
        )}
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{hostName}</Text>

            <Text style={styles.description}>
              {followers.length + " Followers"}
            </Text>

            <Text style={styles.info}>{hostEmail}</Text>

            <Text style={styles.description}>{description}</Text>

            {tags.length > 0 && (
              <Text style={styles.info}>{"Tags: " + tags}</Text>
            )}
            {phoneNumber.length > 0 && (
              <Text style={styles.info}>{"Phone: " + phoneNumber}</Text>
            )}

            <Pressable style={styles.buttonContainer} onPress={onPress}>
              <Text style={styles.textButton}> {textValue}</Text>
            </Pressable>

            <Divider orientation="vertical" width={5} />
          </View>
        </View>
      </View>

      <View style={styles.containerExplore}>
        <Text style={styles.headingExplore}>Posted Events</Text>
        <ScrollView
          contentContainerStyle={{ alignItems: "flex-start" }}
          style={{ paddingHorizontal: 10, flex: 1, width: width }}
        >
          {eventsData.map((event, i) => {
            return renderNormal(event, i);
          })}
        </ScrollView>
      </View>
    </>
  );
  {
  }
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
          //bottom: 100 
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
     
       header:{
        backgroundColor: "#85ba7f",
        height:200,
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
      },
      
      body:{
        marginTop:40,
      },
  
      bodyContent: {
        //flex: 1,
        alignItems: 'center',
        padding:30,
      },
      name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
      },
  
      info:{
        fontSize:16,
        color: "#85ba7f",
        marginTop:10
      },
  
      description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
      },
  
      buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#85ba7f",
      },
  
      containerExplore: {
        top:210,
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        marginTop: Constants.statusBarHeight,
      },
      emptyItem: {
        overflow: "hidden",
        height: itemHeight,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderLeftWidth: 20,
        borderColor: "white",
        width: itemWidth,
        backgroundColor: "transparent",
      },
      headingExplore: {
        fontSize: 22,
        fontWeight: "300",
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
    
    
  });
