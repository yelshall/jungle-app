import { Text, View, Image, SafeAreaView } from "react-native";

import React from "react";

import LottieView from "lottie-react-native";
import {
  Directions,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Card from "../components/EventCard";

function Chat({ navigation, route }) {
  const Messages = [
    {
      id: "1",
      userName: "Jenny Doe",
      userImg:
        "https://i.insider.com/5c6ecb86eb3ce83d6b16ab54?width=700&format=jpeg&auto=webp",
      messageTime: "4 mins ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "2",
      userName: "John Doe",
      userImg:
        "https://www.macarthurjustice.org/wp-content/uploads/2019/08/epstein-booking-01-as-epa-190810_hpMain_4x3_992.jpg",
      messageTime: "2 hours ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "3",
      userName: "Ken William",
      userImg:
        "https://www.macarthurjustice.org/wp-content/uploads/2019/08/epstein-booking-01-as-epa-190810_hpMain_4x3_992.jpg",
      messageTime: "1 hours ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "4",
      userName: "Selina Paul",
      userImg:
        "https://i.insider.com/5c6ecb86eb3ce83d6b16ab54?width=700&format=jpeg&auto=webp",
      messageTime: "1 day ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "5",
      userName: "Christy Alex",
      userImg:
        "https://i.insider.com/5c6ecb86eb3ce83d6b16ab54?width=700&format=jpeg&auto=webp",
      messageTime: "2 days ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "6",
      userName: "Jenny Doe",
      userImg:
        "https://i.insider.com/5c6ecb86eb3ce83d6b16ab54?width=700&format=jpeg&auto=webp",
      messageTime: "4 mins ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "7",
      userName: "John Doe",
      userImg:
        "https://www.macarthurjustice.org/wp-content/uploads/2019/08/epstein-booking-01-as-epa-190810_hpMain_4x3_992.jpg",
      messageTime: "2 hours ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "8",
      userName: "Ken William",
      userImg:
        "https://www.macarthurjustice.org/wp-content/uploads/2019/08/epstein-booking-01-as-epa-190810_hpMain_4x3_992.jpg",
      messageTime: "1 hours ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "9",
      userName: "Selina Paul",
      userImg:
        "https://i.insider.com/5c6ecb86eb3ce83d6b16ab54?width=700&format=jpeg&auto=webp",
      messageTime: "1 day ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "10",
      userName: "Christy Alex",
      userImg:
        "https://i.insider.com/5c6ecb86eb3ce83d6b16ab54?width=700&format=jpeg&auto=webp",
      messageTime: "2 days ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "11",
      userName: "Selina Paul",
      userImg:
        "https://i.insider.com/5c6ecb86eb3ce83d6b16ab54?width=700&format=jpeg&auto=webp",
      messageTime: "1 day ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "12",
      userName: "Christy Alex",
      userImg:
        "https://i.insider.com/5c6ecb86eb3ce83d6b16ab54?width=700&format=jpeg&auto=webp",
      messageTime: "2 days ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "13",
      userName: "Jenny Doe",
      userImg:
        "https://i.insider.com/5c6ecb86eb3ce83d6b16ab54?width=700&format=jpeg&auto=webp",
      messageTime: "4 mins ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "14",
      userName: "John Doe",
      userImg:
        "https://www.macarthurjustice.org/wp-content/uploads/2019/08/epstein-booking-01-as-epa-190810_hpMain_4x3_992.jpg",
      messageTime: "2 hours ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "15",
      userName: "Ken William",
      userImg:
        "https://www.macarthurjustice.org/wp-content/uploads/2019/08/epstein-booking-01-as-epa-190810_hpMain_4x3_992.jpg",
      messageTime: "1 hours ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "16",
      userName: "Selina Paul",
      userImg:
        "https://i.insider.com/5c6ecb86eb3ce83d6b16ab54?width=700&format=jpeg&auto=webp",
      messageTime: "1 day ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
    {
      id: "17",
      userName: "Christy Alex",
      userImg:
        "https://i.insider.com/5c6ecb86eb3ce83d6b16ab54?width=700&format=jpeg&auto=webp",
      messageTime: "2 days ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    },
  ];

  return (
    <View style={{ flex: 1, alignItems: "center", paddingBottom: 20 }}>
      <View
        style={{
          backgroundColor: "#85ba7f",
          height: "15%",
          width: "100%",
          borderBottomEndRadius: 30,
          borderBottomStartRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            alignSelf: "center",
            marginBottom: 50,
            marginTop: 40,
            color:"white",
            position:"absolute"
          }}
        >
          Messages
        </Text>
      </View>

      <View style={{ flex: 1, width: "100%" }}>
        <FlatList
          data={Messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  borderBottomColor: "grey",
                  borderBottomWidth: 1,
                  width: "100%",
                  justifyContent: "space-between",
                  height: 50,
                  margin: 20,
                }}
              >
                <Image
                  style={{ width: 50, height: 50,borderRadius:25 }}
                  source={{
                    uri: "https://pix11.com/wp-content/uploads/sites/25/2018/11/mcdowell-2.jpg?w=692&h=384&crop=1",
                  }}
                ></Image>
                <Text
                  style={{
                    fontSize: 20,
                    paddingRight: 50,
                    alignSelf: "center",
                  }}
                >
                  {item.userName}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

export default Chat;
