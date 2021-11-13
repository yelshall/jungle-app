import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { height } from "styled-system";
import { Row, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { render } from "react-dom";
import { VictoryPie, VictoryBar } from "victory";

export default function Stats({ navigation, route }) {
  const [showModal, setShowModal] = useState(false);

  const creatChart = () => {
    setShowModal(!showModal);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 30,
          marginStart: 30,
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        Analytics
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignContent: "flex-start",
          padding: 10,
        }}
      >
        <View
          style={{
            height: 40,
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: "grey",
            borderRadius: 15,
            marginLeft: 15,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>Events</Text>
        </View>
        <View
          style={{
            height: 40,
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: "grey",
            borderRadius: 15,
            marginLeft: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>This Month</Text>
        </View>
      </View>
      <ScrollView>

      <TouchableOpacity onPress={creatChart}>
        <View
          style={{
            height: 150,
            backgroundColor: "white",
            margin: 25,
            borderRadius: 30,
            padding: 15,
            justifyContent: "space-around",
          }}
        >

            <Text
              style={{ fontsize: 30, fontWeight: "bold", alignSelf: "center" }}
            >
              Average Attendees per event
            </Text>
            <Text
              style={{ fontsize: 60, fontWeight: "bold", alignSelf: "center" }}
            >
              57
            </Text>
         
        </View>
        </TouchableOpacity>
        <View
          style={{
            height: 150,
            backgroundColor: "white",
            margin: 25,
            borderRadius: 30,
            padding: 15,
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{ fontsize: 30, fontWeight: "bold", alignSelf: "center" }}
          >
            Views on the events page
          </Text>
          <Text
            style={{ fontsize: 60, fontWeight: "bold", alignSelf: "center" }}
          >
            560
          </Text>
        </View>
        <View
          style={{
            height: 150,
            backgroundColor: "white",
            margin: 25,
            borderRadius: 30,
            padding: 15,
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{ fontsize: 30, fontWeight: "bold", alignSelf: "center" }}
          >
            Ratings
          </Text>
          <Text
            style={{ fontsize: 60, fontWeight: "bold", alignSelf: "center" }}
          >
            560
          </Text>
        </View>
        <View
          style={{
            height: 150,
            backgroundColor: "white",
            margin: 25,
            borderRadius: 30,
            padding: 15,
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{ fontsize: 30, fontWeight: "bold", alignSelf: "center" }}
          >
            Followers
          </Text>
          <Text
            style={{ fontsize: 60, fontWeight: "bold", alignSelf: "center" }}
          >
            50
          </Text>
        </View>
        <View style={{ alignContent: "center", justifyContent: "center" }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={showModal}
            style={{ alignSelf: "center", margin: 200 }}
          >
            <Image
              style={{height:"35%",width:"80%",alignSelf:"center",marginBottom:50,marginTop:100}}
              source={{
                uri: "https://reactnative.dev/img/tiny_logo.png",
              }}
            ></Image>

            <TouchableOpacity
              style={{
                borderRadius: 15,
                height: 50,
                backgroundColor: "green",
                padding: 10,
              }}
              onPress={() => setShowModal(!showModal)}
            >
              <Text
                style={{
                  alignSelf: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Close Chart
              </Text>
            </TouchableOpacity>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
