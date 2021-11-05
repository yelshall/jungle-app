import {
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  ActivityIndicator,
  View,
  Button,
  Alert,
} from "react-native";

import React, { useEffect } from "react";
import Card from "../EventCard/index";
import { useState } from "react";
import { BottomSheet, ListItem } from "react-native-elements";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function CardSwipe({ route }) {
  const socket = route.params.socket;
  const loginState = route.params.loginState;
  const events = React.useRef([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    socket.emit("getEvents", { sid: loginState.id }, (err, res) => {
      if (err) {
        return;
      }

      events.current = [...res];
      setIsLoading(false);
    });
  }, []);

  const position = React.useRef(new Animated.ValueXY()).current;
  const [rotate, setRotate] = React.useState(
    position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp",
    })
  );
  const [rotateAndTranslate, setRotateAndTranslate] = React.useState({
    transform: [
      {
        rotate: rotate,
      },
      ...position.getTranslateTransform(),
    ],
  });
  const [likeOpacity, setLikeOpacity] = React.useState(
    position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: "clamp",
    })
  );
  const [dislikeOpacity, setDislikeOpacity] = React.useState(
    position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: "clamp",
    })
  );
  const [nextCardOpacity, setNextCardOpacity] = React.useState(
    position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: "clamp",
    })
  );

  const [nextCardScale, setNextCardScale] = React.useState(
    position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: "clamp",
    })
  );
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const panResponder = React.useRef(
    PanResponder.create({
      useNativeDriver: true,

      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        // LIKED EVENT
        if (gestureState.dx > 120) {
          socket.emit("addInterestedEvent", {
            uid: loginState.id,
            eid: events.current[0]._id,
          });

          Animated.spring(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
          }).start(() => {
            events.current.shift();
            position.setValue({ x: 0, y: 0 });
            if (events.length === 5) {
              socket.emit("getEvents", { sid: loginState.id }, (err, res) => {
                if (err) {
                  return;
                }

                events.current = [...events.current, ...res];
              });
            }
            forceUpdate();
          });
        }
        // NOPED EVENT
        else if (gestureState.dx < -120) {
          socket.emit("addUnlikedStudent", {
            uid: loginState.id,
            eid: events.current[0]._id,
          });

          Animated.spring(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
          }).start(() => {
            events.current.shift();
            position.setValue({ x: 0, y: 0 });
            if (events.current.length === 5) {
              socket.emit("getEvents", { sid: loginState.id }, (err, res) => {
                if (err) {
                  return;
                }

                events.current = [...events.current, ...res];
              });
            }
            forceUpdate();
          });
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start();
        }
      },
    })
  ).current;

  const renderUsers = () => {
    return events.current
      .map((item, i) => {
        if (i == 0) {
          return (
            <Animated.View
              {...panResponder.panHandlers}
              key={item._id}
              style={[
                rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: "absolute",
                  zIndex: 1,
                },
              ]}
            >
              <Animated.View
                style={{
                  opacity: likeOpacity,
                  transform: [{ rotate: "-30deg" }],
                  position: "absolute",
                  top: 50,
                  left: 40,
                  zIndex: 1000,
                  useNativeDriver: true,
                }}
              >
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: "green",
                    color: "green",
                    fontSize: 32,
                    fontWeight: "800",
                    padding: 10,
                  }}
                >
                  LIKE
                </Text>
              </Animated.View>

              <Animated.View
                style={{
                  opacity: dislikeOpacity,
                  transform: [{ rotate: "30deg" }],
                  position: "absolute",
                  top: 50,
                  right: 40,
                  zIndex: 1000,
                  useNativeDriver: true,
                }}
              >
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: "red",
                    color: "red",
                    fontSize: 32,
                    fontWeight: "800",
                    padding: 10,
                  }}
                >
                  NOPE
                </Text>
              </Animated.View>

              <SafeAreaView style={styles.container}>
                <Card eventData={item} />
              </SafeAreaView>
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={item._id}
              style={[
                {
                  opacity: nextCardOpacity,
                  transform: [{ scale: nextCardScale }],
                  height: SCREEN_HEIGHT,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: "absolute",
                  useNativeDriver: true,
                  zIndex: -1,
                },
              ]}
            >
              <Animated.View
                style={{
                  opacity: 0,
                  transform: [{ rotate: "-30deg" }],
                  position: "absolute",
                  top: 50,
                  left: 40,
                  zIndex: 1000,
                  useNativeDriver: true,
                }}
              >
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: "green",
                    color: "green",
                    fontSize: 32,
                    fontWeight: "800",
                    padding: 10,
                  }}
                >
                  LIKE
                </Text>
              </Animated.View>

              <Animated.View
                style={{
                  opacity: 0,
                  transform: [{ rotate: "30deg" }],
                  position: "absolute",
                  top: 50,
                  right: 40,
                  zIndex: 1000,
                  useNativeDriver: true,
                }}
              >
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: "red",
                    color: "red",
                    fontSize: 32,
                    fontWeight: "800",
                    padding: 10,
                  }}
                >
                  NOPE
                </Text>
              </Animated.View>

              <SafeAreaView style={styles.container}>
                <Card eventData={item} />
              </SafeAreaView>
            </Animated.View>
          );
        }
      })
      .reverse();
  };
  const [isVisible, setIsVisible] = useState(false);
  const listTags = [
    { title: "Swimming", onPress: () => Alert.alert("chose swimming") },
    { title: "cycling", onPress: () => Alert.alert("chose cycling") },
    { title: "Running", onPress: () => Alert.alert("chose running") },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "lightgreen" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  onPressTags = () => {
    setIsVisible(true);
  };

  const [isVisibleLocation, setIsVisibleLocation] = useState(false);
  const listLocations = [
    { title: "On-Campus", onPress: () => Alert.alert("chose On-Campus") },
    { title: "Off-Campus", onPress: () => Alert.alert("chose Off-Campus") },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "lightgreen" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisibleLocation(false),
    },
  ];

  onPressLocation = () => {
    setIsVisibleLocation(true);
  };

  const [isVisibleDate, setIsVisibleDate] = useState(false);
  const listDates = [
    { title: "Today", onPress: () => Alert.alert("chose Today") },
    { title: "This Week", onPress: () => Alert.alert("chose Week") },
    { title: "This Month", onPress: () => Alert.alert("chose Month") },

    {
      title: "Cancel",
      containerStyle: { backgroundColor: "lightgreen" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisibleDate(false),
    },
  ];

  onPressDate = () => {
    setIsVisibleDate(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text
          style={{
            marginRight: 30,
            marginTop: 5,
            fontSize: 30,
            fontWeight: "bold",
            color: "lightgreen",
          }}
        >
          {" "}
          JUNGLE
        </Text>
        <View
          style={{ backgroundColor: "#fefefe", borderRadius: 20, opacity: 0.3 }}
        >
          <Button
            style={{ height: 100, width: 100 }}
            title='Tags'
            color='black'
            onPress={onPressTags}
          >
            {" "}
          </Button>
        </View>
        <BottomSheet
          isVisible={isVisible}
          containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
        >
          {listTags.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>

        <View
          style={{
            backgroundColor: "#fefefe",
            borderRadius: 20,
            marginLeft: 25,
            opacity: 0.3,
          }}
        >
          <Button
            style={{ height: 100, width: 100 }}
            title='Location'
            onPress={onPressLocation}
            color='black'
          >
            {" "}
          </Button>
        </View>
        <BottomSheet
          isVisible={isVisibleLocation}
          containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
        >
          {listLocations.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
        <View
          style={{
            backgroundColor: "#fefefe",
            borderRadius: 20,
            marginLeft: 25,
            opacity: 0.3,
          }}
        >
          <Button
            style={{ height: 100, width: 100 }}
            title='Date'
            color='black'
            onPress={onPressDate}
          >
            {" "}
          </Button>
        </View>
        <BottomSheet
          isVisible={isVisibleDate}
          containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
        >
          {listDates.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </View>
      <View
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {isLoading ? <ActivityIndicator size='large' /> : renderUsers()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
});
