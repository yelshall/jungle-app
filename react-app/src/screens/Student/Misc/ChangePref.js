import {
  View,
  LayoutAnimation,
  StyleSheet,
  Alert,
  Pressable,
  Dimensions,
} from "react-native";

import React, { useEffect } from "react";

import { Text } from "react-native-elements";
import Constants from "expo-constants";

import { Divider } from "react-native-elements";

var { height, width } = Dimensions.get("window");

const itemWidth = width * 0.67;
const itemHeight = height / 2 - Constants.statusBarHeight * 2;

export default function ChangePref({ route, navigation }) {
  const { tags } = route.params.users;

  useEffect(() => {
    LayoutAnimation.spring();
  }, []);
  //console.log(image);
  const [textValue, setTextValue] = React.useState("Update");

  let onPress = () => {
    navigation.navigate("StudentMiscStack", {
      screen: "UpdatePreferences",
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}> {"Current Preferences"} </Text>
            <Divider orientation='vertical' width={10} />
          </View>
        </View>
        <View style={styles.body}></View>
      </View>
      <View
        style={{ marginTop: 150, position: "relative", flexDirection: "row" }}
      >
        {tags.map((tags, i) => {
          return (
            <View style={styles.TextViewStyle}>
              <Text style={styles.item}>{tags}</Text>
            </View>
          );
        })}
      </View>
      <Pressable style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.textButton}> {textValue}</Text>
      </Pressable>
    </>
  );
}

// prettier-ignore
const styles = StyleSheet.create({
            container: {
                height:20,
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
             alignContent:"center",  
             alignSelf:"center",     
            },

            TextViewStyle:{
            borderWidth: 1, 
            borderRadius: 20,
            borderColor:"white",
            //borderColor: '#E91E63',
            //width: '80%',
            //padding: 5,
            marginTop: 12,
      
            fontSize: 24,
            fontWeight: "bold",
         
            height:80,
            color:"white",
            marginLeft:1,
            borderRadius:30,
            backgroundColor: "#85ba7f",
       
            width: Dimensions.get('window').width /4+30,
            alignContent:"center",  
            alignSelf:"center",              
            },
            item: {
                
                marginTop: 19,
                //padding: 10,
                fontSize: 24,
                fontWeight: "bold",
                paddingLeft: 22,
                paddingTop: 5,
                //position: "relative",
                height:40,
                color:"white",
                //marginLeft: (width /2) - 45,
                borderRadius:30,
                backgroundColor: "#85ba7f",
                //flexDirection: 'row',
                //justifyContent: "flex-start",
                //alignItems: 'flex-start',
                //height: '40%',
                width: Dimensions.get('window').width /4,
                //borderWidth: 5,
                //borderColor:""
                alignContent:"center",  
                alignSelf:"center",               
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
              height:160,
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
              marginTop:10,
            },
        
            bodyContent: {
              //flex: 1,
              alignItems: 'center',
              padding:50,
              height:50,
              marginTop:100,
            },
            name:{
              fontSize:28,
              color: "white",
              fontWeight: "600",
              position:"absolute",
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
              marginTop:700,
              marginLeft: 140,
              height:45,
              //flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              position:"absolute",
              marginBottom:20,
              width:150
              ,
              borderRadius:30,
              backgroundColor: "#85ba7f",
              alignContent:"center",  
              alignSelf:"center",     
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
            ver_stat: {
              width: 20,
              height: 20,
              //borderRadius: 0,
              //borderWidth: 4,
              //borderColor: "white",
              //marginBottom:10,
              //alignSelf:'center',
              position: 'relative',
              marginTop:0,
            },
            MainContainer: {
                flex: 1,
                margin: 10
                
              },
              
              TextStyle:{
                fontSize : 25,
                 textAlign: 'center'
              }
          
          
        });
