import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useEffect } from "react";
import * as Calendar from "expo-calendar";
import { LinearGradient } from "expo-linear-gradient";
import { ListItem, Avatar, Text, Icon } from "react-native-elements";
import { Flex } from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { borderRadius } from "styled-system";

const KHeight = Dimensions.get("window").height;
const KWidth = Dimensions.get("window").width;

export default function event_info({ navigation, route }) {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log("Here are all your calendars:");
        console.log({ calendars });
      }
    })();
  }, []);

  const socket = route.params.socket;
  const loginState = route.params.loginState;
  const event = route.params.event;

  const addEventToCalendar = async () => {
    const eventIdInCalendar = await Calendar.createEventAsync(
      (
        await getDefaultCalendarSource()
      ).id,
      {
        title: event.eventName,
        startDate: new Date(event.dateTime),
        endDate: new Date(event.endDateTime),
        location: event.location,
        notes: event.description,
      }
    );
  };

  const [RSVP, setRSVP] = React.useState(event.type === "INTERESTED");

  let onPress = () => {
    setRSVP(false);
    socket.emit("removeInterestedEvent", {
      uid: loginState.id,
      eid: event._id,
    });
    socket.emit("addConfirmedEvent", { uid: loginState.id, eid: event._id });
  };

  let onCancel = () => {
    socket.emit("removeConfirmedEvent", { uid: loginState.id, eid: event._id });
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
        {new Date(update.metadata.dateCreated).toDateString()}
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
  let { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0005; //Very high zoom level
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
              marginLeft: 5,
            }}
          >
            {event.eventName}
          </Text>
        </LinearGradient>
      </ImageBackground>

      {event.eventHost && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation.navigate("StudentMiscStack", {
              screen: "HostInfo",
              params: {
                loginState: loginState,
                socket: socket,
                host: event.eventHost,
              },
            })
          }
          containerStyle={{
            width: "100%",
            margin: 0,
          }}
          style={{
            borderColor: "#cccccc",
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
          }}
        >
          <ListItem
            key={"Host"}
            containerStyle={{
              width: "100%",
              margin: 0,
            }}
          >
            <Avatar
              rounded
              size={"medium"}
              source={{ uri: event.eventHost.imageURL }}
              title={event.eventHost.hostName.charAt(0)}
            />
            <ListItem.Content style={{ alignItems: "flex-start" }}>
              <ListItem.Title style={{ fontSize: 16, fontWeight: "bold" }}>
                {event.eventHost.hostName}
              </ListItem.Title>
              <ListItem.Subtitle style={{ color: "#525252" }}>
                {event.eventHost.hostEmail}
              </ListItem.Subtitle>
            </ListItem.Content>

            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>
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
          <Text style={{ fontWeight: "bold" }}>
            {Math.abs(new Date(event.dateTime) - new Date(event.endDateTime)) /
              36e5 >
            24
              ? "Start date: "
              : "Date: "}
          </Text>
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
        {Math.abs(new Date(event.dateTime) - new Date(event.endDateTime)) /
          36e5 >
          24 && (
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
        )}
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
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            mapType='standard'
            //maxZoomLevel={20}
            showsBuildings={true}
            showsIndoorLevelPicker={true}
            showsIndoors={true}
            style={styles.map}
            initialRegion={{
              latitude: event.latitude,
              longitude: event.longitude,
              longitudeDelta: LONGITUDE_DELTA,
              latitudeDelta: LATITUDE_DELTA,
            }}
          >
            <Marker
              coordinate={{
                latitude: event.latitude,
                longitude: event.longitude,
                longitudeDelta: LONGITUDE_DELTA,
                latitudeDelta: LATITUDE_DELTA,
              }}
              title='Marker'
            />
          </MapView>
          {console.log(
            "latidue" +
              event.latitude +
              "longitude" +
              event.longitude +
              "latitudeDelta" +
              event.latitudeDelta +
              "longitudeDelta" +
              event.longitudeDelta +
              "location" +
              event.location
          )}
        </View>
      </View>

      {RSVP && event.active && (
        <TouchableOpacity style={styles.signOutBtn} onPress={onPress}>
          <Text style={styles.signOutBtnText}>RSVP</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.CalendarButton}
        onPress={addEventToCalendar}
      >
        <Text style={styles.signOutBtnText}>add to calendar</Text>
      </TouchableOpacity>

      {!RSVP && event.active && (
        <TouchableOpacity style={styles.signOutBtn} onPress={onCancel}>
          <Text style={styles.signOutBtnText}>CANCEL</Text>
        </TouchableOpacity>
      )}

      {event.updates.length > 0 && (
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
      )}
    </ScrollView>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar;
}

const styles = StyleSheet.create({
  signOutBtnText: {
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    color: "#2f402d",
  },
  signOutBtn: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    opacity: 0.8,
    width: KWidth * 0.8,
    backgroundColor: "#85ba7f",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 15,
  },
  CalendarButton: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    opacity: 0.8,
    width: KWidth * 0.8,
    backgroundColor: "#85ba7f",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  map: {
    width: Dimensions.get("window").width - 10,
    height: 180,
    borderRadius: 5,
    marginTop: 10,
  },
});
