import {
  Text,
  View,
  Image,
  StyleSheet,
  Alert,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Icon,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import eventsData from "../../assets/events-data/eventsData";
import React from "react";
import { Button, TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { mdiPlusCircle } from "@mdi/js";

const isValidDate = (dateString) => {
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

  var parts = dateString.split("/");
  var day = parseInt(parts[1], 10);
  var month = parseInt(parts[0], 10);
  var year = parseInt(parts[2], 10);

  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  return day > 0 && day <= monthLength[month - 1];
};

export default function HostManage({ navigation, route }) {
  const [model1Open, setModal1Open] = React.useState(false);
  const [eventName, setEventName] = React.useState("");

  const onCreateEvent = () => {
    if (eventName === "") {
      Alert.alert();
      return;
    }
  };

  const Item = ({ item, onPress }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("editEvents", { event: item });
      }}
    >
      <View style={styles.container}>
        <SafeAreaView style={styles.itemView}>
          <Image
            style={{ height: 100, width: 100 }}
            source={{ uri: item.image }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              paddingLeft: 0,
              //flexWrap: "wrap",
            }}
          ></Text>
          <Text
            style={{ fontSize: 15, position: "absolute", paddingLeft: 100 }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              {item.event_name + "\n"}
            </Text>
            {item.event_date_time}
          </Text>
          {/** 
		  <MaterialIcons
			name="keyboard-arrow-right"
			size={20}
			color="black"
			//alignSelf="stretch"
			styles={styles.arrow}
		  />
		  */}
        </SafeAreaView>
      </View>
      <View
        style={{
          borderColor: "grey",
          borderWidth: 1,
          height: 1,
          width: "100%",
          alignSelf: "center",
        }}
      ></View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return <Item item={item} onPress={() => {}} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <Text style={{ margin: 60, fontSize: 28, fontWeight: "bold" }}>
        Manage
      </Text>

      <FlatList
        data={eventsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.container}
      />

      <Modal visible={model1Open} animationType="slide">
        <TextInput onChangeText={(text) => setEventName(text)} />
        <View style={styles.modelContent}>
          <TouchableOpacity
            style={styles.signOutBtn}
            onPress={() => setModal1Open(!model1Open)}
          >
            <Text style={styles.signOutBtnText}>Create Event</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity
        style={{ position: "absolute", top: 760, right: 15 }}
        onPress={() => setModal1Open(true)}
      >
        <AntDesign name="pluscircleo" size={70} color="gray" spin={true} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
  },

  createEvent: {
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    color: "#2f402d",
  },

  itemView: {
    //flexWrap: "wrap",
    //flexDirection: "row",
    width: "100%",

    //flex: 1,
    padding: 0,
    marginBottom: 0,
    color: "green",
    //alignItems: "center",
    //justifyContent: "space-evenly",
  },

  arrow: {
    paddingLeft: 100,
  },

  modelContent: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",

    padding: 30,
  },
  signOutBtn: {
    //top: 300,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    opacity: 0.8,
    width: "70%",
    backgroundColor: "#85ba7f",
    padding: 15,
    borderRadius: 10,
  },
  signOutBtnText: {
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    color: "#2f402d",
  },
});
