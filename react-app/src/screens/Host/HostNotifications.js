import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Switch } from "react-native-elements";


export default function HostNotifications(){

    return(
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
            Notifications
          </Text>
        </View>
        <View style={{ backgroundColor: "grey", flexDirection: "row" }}>
          <Text
            style={{
              alignSelf: "flex-start",
              //marginTop: 50,
              marginBottom: 20,
              fontWeight: "bold",
              marginTop: 10,
              fontSize: 20,
            }}
          >
            Student Messages
          </Text>
          <Switch
            style={{
              //alignSelf: "flex-end",
              marginLeft: 220,
              marginTop: 10,
            }}
            value={true}
          />
        </View>
        <View style={{ backgroundColor: "grey", flexDirection: "row" }}>
          <Text
            style={{
              alignSelf: "flex-start",
              //marginTop: 50,
              marginBottom: 20,
              fontWeight: "bold",
              marginTop: 10,
              fontSize: 20,
            }}
          >
            Events Limit reached
          </Text>
          <Switch
            style={{
              //alignSelf: "flex-end",
              marginLeft: 172,
              marginTop: 10,
            }}
            value={true}
          />
        </View>
        <View style={{ backgroundColor: "grey", flexDirection: "row" }}>
          <Text
            style={{
              alignSelf: "flex-start",
              //marginTop: 50,
              marginBottom: 20,
              fontWeight: "bold",
              marginTop: 10,
              fontSize: 20,
            }}
          >
            
            Updates
          </Text>
          <Switch
            style={{
              //alignSelf: "flex-end",
              marginLeft: 220,
              marginTop: 10,
            }}
            value={true}
          />
        </View>
        <View style={{ backgroundColor: "grey", flexDirection: "row" }}>
          <Text
            style={{
              alignSelf: "flex-start",
              //marginTop: 50,
              marginBottom: 20,
              fontWeight: "bold",
              marginTop: 10,
              fontSize: 20,
            }}
          >
            Events Removed
          </Text>
          <Switch
            style={{
              //alignSelf: "flex-end",
              marginLeft: 220,
              marginTop: 10,
            }}
            value={true}
          />
        </View>
      </View>
    )
}