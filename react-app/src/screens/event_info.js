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
  Image,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { Component } from "react";

import eventsData from "../../assets/events-data/eventsData";
import { Text } from "react-native-elements";

import { ListItem, Avatar } from "react-native-elements";
import { Header } from "react-native/Libraries/NewAppScreen";
import { block } from "react-native-reanimated";

const KHeight = Dimensions.get("window").height;
const KWidth = Dimensions.get("window").width;
const hostData = [
  {
    name: "by John Purdue",
    avatar_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/JohnPurdue.jpg/300px-JohnPurdue.jpg",
    subtitle: "Status: Verified",
  },
];

export default function event_info(props) {
  const InfoSection = ({ header, body, onPress }) => (
    <View
      style={{
        width: "95%",
        borderWidth: 2,
        borderColor: "#85ba7f",
        borderRadius: 15,
        alignSelf: "center",
        backgroundColor: "#85ba7f",
        shadowOpacity: 0.4,
        shadowRadius: 10,
        opacity: 0.8,
        alignContent: "center",
        marginBottom: 25,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          padding: 20,
          color: "white",
        }}
      >
        {header}
      </Text>
      <Text style={{ flexWrap: "wrap", padding: 20, alignSelf: "center" }}>
        {body}
      </Text>
    </View>
  );

  const HostInfoSection = ({ host, url }) => (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        height: KHeight * 0.12,
      }}
    >
      <View>
        <Image
          style={{ height: 50, width: 50 }}
          source={{
            uri: url,
          }}
        ></Image>
      </View>
      <View>
        <Text>john</Text>
        <Text>purder </Text>
      </View>
    </View>
  );

  const {
    event_name,
    image,
    event_host,
    event_location,
    event_date_time,
    event_description,
    tag,
  } = props.route.params.event;

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
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{ uri: image }} />

      <View style={{ height: KHeight * 0.14 }}></View>
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
            adjustFonScaling:true,
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
        <Text style={{ alignSelf: "center", marginVertical: 20,width:"50%" }}>
          {event_location}
        </Text>
      </View>
      <ScrollView>
      <Text style={{ alignSelf: "center", marginVertical: 50,width:"80%",flexWrap:"wrap" }}>
        {event_description}
      </Text>
      </ScrollView>

      <Text
        style={{ alignSelf: "center", marginVertical: 30, fontWeight: "bold" }}
      >
        {event_date_time}
      </Text>

      <TouchableOpacity style={styles.signOutBtn} onPress={onPress}>
        <Text style={styles.signOutBtnText}>RSVP</Text>
      </TouchableOpacity>
    </View>
  );
}

// prettier-ignore
const styles = StyleSheet.create({

  header:{
    backgroundColor: "#96db8f",
    height:KHeight*0.28,
  },
  avatar: {
    width: KHeight*.4,
    height: KWidth*.5 ,
    borderRadius: KHeight*.25,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  signOutBtnText: {
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    color: "#2f402d",
  
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
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
    color: "#00BFFF",
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
    backgroundColor: "#00BFFF",
  },
    container: {
        flex:1,

    },
  
    image: {
      borderRadius: KHeight*0.175,
      overflow: "hidden",
      width:KWidth,
      height:KHeight*0.35,
 

    },
  
    loginBtn: {
      width: "50%",
      borderRadius: 2,
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
     signOutBtn: {
      //top: 300,
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
    },
  });

// <View style = {styles.container}>
//     <ImageBackground
//       source={{ uri: image }}
//       resizeMode="cover"
//       style={styles.image}
//     ></ImageBackground>
//     <View
//       style={{
//         flexDirection: "row",
//         width: "100%",
//         height: KHeight * 0.12,
//       }}
//     >
//       <View>
//         <Image
//           style={{ height: 50, width: 50 }}
//           source={{
//             uri: hostData[0].avatar_url,
//           }}
//         ></Image>
//       </View>
//       <View>
//         <Text>{hostData[0].name}</Text>
//         <Text>{hostData[0].subtitle}</Text>
//       </View>
//     </View>

//     <View>
//       <ScrollView style={{ width: "100%"}}>
//         <InfoSection
//           body={event_date_time}
//           header="Date and Time"
//           onPress={() => Alert.alert("pressed")}
//         ></InfoSection>
//         <InfoSection
//           body={event_location}
//           header="Location"
//           onPress={() => Alert.alert("pressed")}
//         ></InfoSection>

//         <InfoSection
//           body={event_description}
//           header="Description"
//           onPress={() => Alert.alert("pressed")}
//         ></InfoSection>
//       </ScrollView>

//     </View>
//   </View>
// );
