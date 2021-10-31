import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import { SearchBar } from "react-native-elements";

import React, { useState, useEffect } from "react";

import LottieView from "lottie-react-native";
import {
  Directions,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Card from "../components/EventCard";
import filter from "lodash.filter";
import { color } from "react-native-elements/dist/helpers";
import { Icon } from "react-native-elements/dist/icons/Icon";

function Chat({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, (user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };

  const contains = ({ name, email }, query) => {
    const { first, last } = name;

    if (
      first.includes(query) ||
      last.includes(query) ||
      email.includes(query)
    ) {
      return true;
    }

    return false;
  };

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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18 }}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: "#D3D3D3",
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}
          backgroundColor="light-grey"
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Message Host</Text>

      <Text style= {{alignSelf:"flex-start", margin:15,fontWeight:"bold"}}>Hosts Following</Text>

      <FlatList
        horizontal
        data={Messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              marginBottom: 50,
              backgroundColor: "#96db8f",
            }}
          >
            <TouchableOpacity>
              <Image source={{ uri: item.userImg }} style={styles.coverImage} />
              <Text style={{ fontWeight: "bold" }}> {`${item.userName}`}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <FlatList
        ListHeaderComponent={renderHeader}
        data={Messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
            <View style={styles.listItem}>
              <Image source={{ uri: item.userImg }} style={styles.coverImage} />
              <View style={styles.metaInfo}>
                <View style={{ width: "100%", height: 30 }}>
                  <Text style={styles.title}>{`${item.userName}`}</Text>
                </View>
                <View style={{ width: "100%" }}>
                  <Text style={styles.textItem}>
                    {" "}
                    Hi do you want to attend the event{"\n"}
                    Hi do you want to attend the event{"\n"}
                    Hi do you want to attend the event {"\n"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 12.5,
                  backgroundColor: "#228B22",
                  padding: 5,
                  marginTop: 15,
                }}
              >
                <Text style={{ color: "white", alignSelf: "center" }}>1</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  }, //#f8f8f8
  text: {
    fontSize: 20,
    color: "#101010",
    marginTop: 60,
    fontWeight: "700",
    marginBottom: 15,
  },
  textItem: {
    fontSize: 10,
    color: "grey",
    marginTop: 5,
    fontWeight:  "normal"
  },
  listItem: {
    marginTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    flexDirection: "row",
  },
  coverImage: {
    width: 70,
    height: 70,
    borderRadius: 20,
    borderColor: "green",
    borderWidth: 2.5,
  },
  metaInfo: {
    marginLeft: 50,
  },
  title: {
    fontSize: 18,
    width: 200,
    paddingBottom: 5,
  },
});
export default Chat;

// <View style={{ flex: 1, width: "100%" }}>
//         <FlatList
//           data={Messages}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   flex: 1,
//                   borderBottomColor: "grey",
//                   borderBottomWidth: 1,
//                   width: "100%",
//                   justifyContent: "space-between",
//                   height: 50,
//                   margin: 20,
//                 }}
//               >
//                 <Image
//                   style={{ width: 50, height: 50,borderRadius:25 }}
//                   source={{
//                     uri: "https://pix11.com/wp-content/uploads/sites/25/2018/11/mcdowell-2.jpg?w=692&h=384&crop=1",
//                   }}
//                 ></Image>
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     paddingRight: 50,
//                     alignSelf: "center",
//                   }}
//                 >
//                   {item.userName}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
