import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { LinearGradient } from "expo-linear-gradient";
import { Overlay, Text, Icon, Input } from "react-native-elements";
import { Flex } from "native-base";
import { GeneralContext } from "../../utils/context";
const KHeight = Dimensions.get("window").height;
const KWidth = Dimensions.get("window").width;

export default function editEvents({ navigation, route }) {
  const { socket, loginState } = React.useContext(GeneralContext);
  const event = route.params.event;

  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const UpdateItem = ({ update }) => (
    <Flex
      style={{
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        marginVertical: "1%",
        padding: "2%",
        borderRadius: 1,
        backgroundColor: "white",
        borderColor: "#cccccc",
        borderWidth: 0.5,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {update.title}
      </Text>
      <Text
        style={{
          fontSize: 12,
        }}
      >
        {new Date(update.dateTime).toDateString()}
      </Text>
      <View
        style={{
          width: "100%",
          height: 0,
          borderWidth: 0.5,
          borderColor: "#cccccc",
          alignSelf: "center",
          alignItems: "center",
          margin: "2%",
        }}
      ></View>
      <Text>{update.message}</Text>
    </Flex>
  );

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        style={{
          width: KWidth,
          height: KHeight / 5,
          resizeMode: "cover",
          justifyContent: "flex-end",
        }}
        source={{ uri: event.imageURL }}
      >
        <LinearGradient
          colors={["#000000", "transparent", "transparent"]}
          start={{ x: 0, y: 0.9 }}
          end={{ x: 0, y: 0 }}
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              alignSelf: "flex-start",
              marginTop: 50,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {event.eventName}
          </Text>
        </LinearGradient>
      </ImageBackground>

      <View
        style={{
          width: "90%",
          margin: "5%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Description
        </Text>
        <View
          style={{
            width: "100%",
            height: 0,
            borderWidth: 0.5,
            borderColor: "#cccccc",
            alignSelf: "center",
            margin: "2%",
          }}
        ></View>
        <Text>{event.description}</Text>
      </View>

      <View
        style={{
          width: "90%",
          margin: "5%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Event information
        </Text>
        <View
          style={{
            width: "100%",
            height: 0,
            borderWidth: 0.5,
            borderColor: "#cccccc",
            alignSelf: "center",
            margin: "2%",
          }}
        ></View>
        <Flex
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Location: </Text>
          <Icon
            type={"ionicon"}
            name={"location-outline"}
            size={14}
            containerStyle={{
              marginRight: "1%",
            }}
          />
          <Text>
            {event.location.length > 30
              ? event.location.substring(0, 30) + "..."
              : event.location}
          </Text>
        </Flex>
        <Flex
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Start date: </Text>
          <Icon
            type={"ionicon"}
            name={"calendar-outline"}
            size={14}
            containerStyle={{
              marginRight: "1%",
            }}
          />
          <Text>{new Date(event.dateTime).toDateString()}</Text>
        </Flex>
        <Flex
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>End date: </Text>
          <Icon
            type={"ionicon"}
            name={"calendar-outline"}
            size={14}
            containerStyle={{
              marginRight: "1%",
            }}
          />
          <Text>{new Date(event.endDateTime).toDateString()}</Text>
        </Flex>
        <Flex
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Interested people: </Text>
          <Text>{event.interestedStudents.length}</Text>
        </Flex>
        <Flex
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Confirmed people: </Text>
          <Text>{event.confirmedStudents.length}</Text>
        </Flex>

        {/* Add google maps functionality on here */}
      </View>

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          width: "80%",
          height: "50%",
          alignItems: "center",
        }}
      >
        <Input
          autoCorrect={false}
          placeholder='Title'
          placeholderTextColor='#3d3d3d'
          containerStyle={{
            width: "80%",
            margin: "1.5%",
          }}
          inputStyle={{
            fontSize: 14,
          }}
          inputContainerStyle={{
            borderColor: "#cccccc",
            borderBottomWidth: 1.5,
          }}
          label={"Title"}
          labelStyle={{
            fontSize: 16,
            lineHeight: 21,
            fontWeight: "bold",
            letterSpacing: 0.25,
            color: "#3d3d3d",
          }}
          onChangeText={(title) => setTitle(title)}
        />

        <View style={{ width: "80%", margin: "2.5%" }}>
          <Text style={styles.secondaryText}>Description</Text>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.TextBox}
            placeholder='Write a description'
            placeholderTextColor='#3d3d3d'
            onChangeText={(message) => setMessage(message)}
          />
        </View>

        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={() => {
            socket.emit(
              "pushUpdate",
              {
                hid: loginState.id,
                eid: event._id,
                title: title,
                message: message,
                notifyAll: false,
              },
              (err, res) => {
                if (err) {
                  return;
                }
              }
            );
          }}
        >
          <Text style={styles.signOutBtnText}>Push update</Text>
        </TouchableOpacity>
      </Overlay>

      {event.active && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <TouchableOpacity style={styles.signOutBtn}>
            <Text style={styles.signOutBtnText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signOutBtn} onPress={toggleOverlay}>
            <Text style={styles.signOutBtnText}>Push Updates</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signOutBtn}
            onPress={() => {
              socket.emit(
                "cancelEvent",
                { hid: loginState.id, eid: event._id },
                (err, res) => {
                  if (err) {
                    return;
                  }
                }
              );
            }}
          >
            <Text style={styles.signOutBtnText}>Cancel Event</Text>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          width: "90%",
          margin: "5%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Updates
        </Text>
        <View
          style={{
            width: "100%",
            height: 0,
            borderWidth: 0.5,
            borderColor: "#cccccc",
            alignSelf: "center",
            alignItems: "center",
            margin: "2%",
          }}
        ></View>
        {event.updates.map((update, index) => {
          return <UpdateItem update={update} />;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  signOutBtnText: {
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 12,
    color: "#2f402d",
    marginTop: 5,
  },
  signOutBtn: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    opacity: 0.8,
    width: KWidth * 0.25,
    backgroundColor: "#85ba7f",
    padding: 15,
    borderRadius: 10,
  },
  secondaryText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#3d3d3d",
    alignSelf: "flex-start",
  },
  TextInput: {
    color: "black",
    padding: 10,
    marginBottom: 10,
    width: "77%",
    alignSelf: "flex-start",
  },
});
