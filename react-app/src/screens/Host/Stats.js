import { View, Text, Modal,StyleSheet,Pressable } from "react-native";
import React, { useState } from "react";

export default function Stats({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <View>
            <Text style={{fontsize:30}}>
                Events
            </Text>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{height:"100%",width:"95%",alignSelf:"center",backgroundColor:"red"}}>

            <Text style={styles.modalText}>Average Attendees per Event</Text>
            <View style={{height:100, backgroundColor:"green"}}>
             </View>
            <Text style={styles.modalText}> views on the events page</Text>   
            <View style={{height:100, backgroundColor:"yellow"}}>
            </View>    
            <Text style={styles.modalText}>views on the host’s page</Text>
            <View style={{height:100, backgroundColor:"green"}}>
            </View>
            <Text style={styles.modalText}>Follower</Text>
            <Text style={styles.modalText}>Rating</Text>
            <View style={{height:100, backgroundColor:"blue"}}>
             </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close stats</Text>
            </Pressable>
          </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Stats</Text>
      </Pressable>
    </View>
   
    );
    
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
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
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
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
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });