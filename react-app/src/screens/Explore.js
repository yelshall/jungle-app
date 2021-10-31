import {
  LayoutAnimation,
  Animated,
  Dimensions,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import Constants from "expo-constants";
import { SearchBar } from "react-native-elements";
import { DefaultTheme } from "@react-navigation/native";

var { height, width } = Dimensions.get("window");

const smallSize = width / 5;
const itemWidth = width * 0.67;
const itemHeight = height / 2 - Constants.statusBarHeight * 2;
const fontSize = 300;

export default function Explore({ navigation, route }) {
  const socket = route.params.socket;
  const loginState = route.params.loginState;
  const interestedEvents = React.useRef([]).current;
  const confirmedEvents = React.useRef([]).current;
  const [isLoading, setIsLoading] = React.useState(true);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  useEffect(() => {
    socket.emit("getStudentEvents", { sid: loginState.id }, (err, res) => {
      if (err) {
        return;
      }

      for (let i = 0; i < res.confirmedEvents.length; i++) {
        confirmedEvents.push(res.confirmedEvents[i]);
      }

      for (let i = 0; i < res.interestedEvents.length; i++) {
        interestedEvents.push(res.interestedEvents[i]);
      }

      forceUpdate();

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  }, []);

  const [scrollX, setScrollX] = React.useState(new Animated.Value(0));
  const [search, setSearch] = React.useState("");

  const onLongPress = (event, type) => {
    event.type = type;
    navigation.navigate("event_info", {
      event: event,
      socket: socket,
      loginState: loginState,
    });
  };
  useEffect(() => {
    LayoutAnimation.spring();
  }, []);

  const renderScroll = (scrollX) => {
    return (
      <Animated.ScrollView
        horizontal={true}
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
        decelerationRate={0}
        snapToInterval={itemWidth}
        scrollEventThrottle={16}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } },
        ])}
      >
        {confirmedEvents.map((event, i) => {
          return renderRow(event, i, scrollX);
        })}
      </Animated.ScrollView>
    );
  };

  const renderNormal = (event, index) => {
    if (event === null) {
      return null;
    }

    return (
      <View
        key={index}
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          flexShrink: 1,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onLongPress={() => onLongPress(event, "INTERESTED")}>
          <ImageBackground
            source={{ uri: event.imageURL }}
            style={[
              {
                height: smallSize,
                width: smallSize,
                opacity: 1,
                resizeMode: "cover",
                position: "relative",
                //flex: 1,
              },
            ]}
          />
        </TouchableOpacity>

        <View
          style={{
            marginLeft: 20,
            //flexDirection: "row",
            width: width,
            flex: 1,
          }}
        >
          <TouchableOpacity
            onLongPress={() => onLongPress(event, "INTERESTED")}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 16,
                flexShrink: 1,
                width: 300,
                //flex: 1,
                position: "relative",
              }}
            >
              {event.eventName}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "300",
              fontSize: 12,
              flexShrink: 1,
              //flex: 1,
              //width: width,
              position: "relative",
              width: 200,
              height: 20,
            }}
          >
            {event.description}
          </Text>
        </View>
      </View>
    );
  };

  const renderRow = (event, i, scrollX) => {
    let inputRange = [
      (i - 1) * itemWidth,
      i * itemWidth,
      (i + 1) * itemWidth,
      (i + 2) * itemWidth,
    ];
    let secondRange = [(i - 1) * itemWidth, i * itemWidth, (i + 1) * itemWidth];

    // Ensure that we're leaving space for latest item.
    if (event === null) {
      return (
        <View
          key={i}
          style={[styles.emptyItem, { width: width * 0.33 }]}
        ></View>
      );
    }

    return (
      <TouchableOpacity onLongPress={() => onLongPress(event, "CONFIRMED")}>
        <Animated.View
          key={i}
          style={[
            styles.emptyItem,
            {
              opacity: scrollX.interpolate({
                inputRange: secondRange,
                outputRange: [0.3, 1, 1],
              }),
              height: scrollX.interpolate({
                inputRange: secondRange,
                outputRange: [itemHeight * 0.8, itemHeight, itemHeight],
              }),
            },
          ]}
        >
          <ImageBackground
            key={i}
            source={{ uri: event.imageURL }}
            style={[
              StyleSheet.AbsoluteFill,
              {
                height: itemHeight,
                width: itemWidth,
                opacity: 1,
                resizeMode: "cover",
              },
            ]}
          ></ImageBackground>
          {/** 
          <View
            style={[
              StyleSheet.AbsoluteFill,
              {
                opacity: 0.4,
                //backgroundColor: COLORS[i],
                width: itemWidth,
                height: itemHeight,
              },
            ]}
          ></View>
          */}
        </Animated.View>
        {/** 
        <Animated.View
          style={[
            {
              width: itemWidth,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flex: 1,
              position: "relative",
              height: itemHeight,
              opacity: scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 1, 1, 1],
              }),
              transform: [
                {
                  scale: scrollX.interpolate({
                    inputRange,
                    outputRange: [0.5, 1, 1.4, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              width: itemWidth,
              height: itemHeight,
              position: "absolute",
              bottom: -itemHeight / 4,
              right: -itemWidth / 4,
            }}
          >
            <Text style={{ fontSize: fontSize, color: "rgba(0,0,0,0.4)" }}>
              {i + 1}
            </Text>
          </View>
        </Animated.View>
          */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView
          contentContainerStyle={{ alignItems: "flex-start" }}
          style={{
            paddingHorizontal: 10,
            flex: 1,
            width: width,
          }}
        >
          <View style={{ height: 20 + height / 2 }}>
            <SearchBar
              placeholder="Search..."
              onChangeText={(search) => setSearch(search)}
              value={search}
              round={DefaultTheme}
              platform={"ios"}
              containerStyle={styles.SearchStyle}
            />
            <Text style={[styles.heading, { fontSize: 28 }]}>Reserved</Text>
            {renderScroll(scrollX)}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.heading}>Liked</Text>
            {interestedEvents.map((event, i) => {
              return renderNormal(event, i);
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  heading: {
    fontSize: 22,
    fontWeight: "300",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  SearchStyle: {
    backgroundColor: "#F3F3F3",
  },
});
