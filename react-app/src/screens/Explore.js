import {
  LayoutAnimation,
  Animated,
  Dimensions,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Pressable,
  Alert,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import Constants from "expo-constants";
import { SearchBar } from "react-native-elements";
import { DefaultTheme } from "@react-navigation/native";
import { withDelay } from "react-native-reanimated";

var { height, width } = Dimensions.get("window");

const smallSize = width / 5;
const itemWidth = width * 0.67;
const itemHeight = height / 2 - Constants.statusBarHeight * 2;
const fontSize = 300;

const COLORS = [
  "coral",
  "mediumturquoise",
  "palevioletred",
  "papayawhip",
  "tomato",
];

const SMALL_ITEMS = [
  "https://s-media-cache-ak0.pinimg.com/564x/e3/44/6f/e3446f61632a9381c96362b45749c5f6.jpg",
  "https://s-media-cache-ak0.pinimg.com/236x/8e/e3/ef/8ee3efa5a843f2c79258e3f0684d306e.jpg",
  "https://s-media-cache-ak0.pinimg.com/236x/f1/1c/26/f11c26247021daeac5ec8c3aba1792d1.jpg",
  "https://s-media-cache-ak0.pinimg.com/236x/fa/5c/a9/fa5ca9074f962ef824e513aac4d59f1f.jpg",
  "https://s-media-cache-ak0.pinimg.com/236x/95/bb/e4/95bbe482ca9744ea71f68321ec4260a2.jpg",
  "https://s-media-cache-ak0.pinimg.com/564x/54/7d/13/547d1303000793176aca26505312089c.jpg",
];

export default function Explore({ navigation, route }) {
  const eventsData = route.params.eventsData;

  const [scrollX, setScrollX] = React.useState(new Animated.Value(0));
  const [search, setSearch] = React.useState("");

  const onLongPress = (event) => {
    navigation.navigate("event_info", { event: event });
  };
  useEffect(() => {
    LayoutAnimation.spring();
  }, []);

  const renderScroll = (scrollX, data) => {
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
        {data.map((event, i) => {
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

        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onLongPress={() => onLongPress(event)}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              Words of wisdom
            </Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: "300", fontSize: 12 }}>
            We live in a world of deadlines
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
      <TouchableOpacity onLongPress={() => onLongPress(event)}>
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
            source={{ uri: event.image }}
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
        {renderScroll(scrollX, eventsData)}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.heading}>Liked</Text>
        <ScrollView
          contentContainerStyle={{ alignItems: "flex-start" }}
          style={{ paddingHorizontal: 10, flex: 1, width: width }}
        >
          {eventsData.map((event, i) => {
            return renderNormal(event, i);
          })}
        </ScrollView>
      </View>
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
