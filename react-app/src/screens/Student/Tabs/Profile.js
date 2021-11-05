import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";

import { AuthContext } from "../../../utils/context";

import HostData from "../../../../assets/events-data/HostData";
import eventsData from "../../../../assets/events-data/eventsData";
import users from "../../../../assets/events-data/users";

export default function Profile({ navigation, route }) {
  const socket = route.params.socket;
  const loginState = route.params.loginState;
  const { signOut } = React.useContext(AuthContext);
  const onSignout = () => {
    signOut();
  };

  const onPref = () => {
    navigation.navigate("StudentMiscStack", {
      screen: "ChangePref",
      params: {
        users: users[0],
      },
    });
  };

  const onFollowing = () => {
    navigation.navigate("StudentMiscStack", {
      screen: "FollowedHosts",
      params: {
        HostData: HostData[0],
        eventsData: eventsData,
        socket: socket,
        loginState: loginState,
      },
    });
  };

  const list = [
    {
      name: "Amy Farha",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      subtitle: "Vice President",
      key: 1,
    },
    {
      name: "Chris Jackson",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "Vice Chairman",
      key: 2,
    },
  ];

  const pressed = (direction) => {
    console.log(direction);
	navigation.navigate("StudentMiscStack",{screen:direction}) 

};
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Avatar
        rounded
        size="xlarge"
        containerStyle={{ marginTop: "10%" }}
        source={{
          uri: "https://i.insider.com/5dcc135ce94e86714253af21?width=1000&format=jpeg&auto=webp",
        }}
      />
      <Text>John Doe</Text>
      <Text>Followed: 190</Text>

      <ListItem
        bottomDivider
        containerStyle={{ width: "100%" }}
        onPress={()=>pressed("AccountInfo")}
      >
        <Avatar
          source={{
            uri: "i.insider.com/5dcc135ce94e86714253af21?width=1000&format=jpeg&auto=webp",
          }}
        />
        <ListItem.Content>
          <ListItem.Title>Account Info</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{ width: "100%" }}
        onPress={()=>pressed("UpdatePreferences")}
      >
        <Avatar
          source={{
            uri: "i.insider.com/5dcc135ce94e86714253af21?width=1000&format=jpeg&auto=webp",
          }}
        />
        <ListItem.Content>
          <ListItem.Title>Preferences</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>



      <ListItem
        bottomDivider
        containerStyle={{ width: "100%" }}
        onPress={()=>pressed("FollowedHosts")}
      >
        <Avatar
          source={{
            uri: "i.insider.com/5dcc135ce94e86714253af21?width=1000&format=jpeg&auto=webp",
          }}
        />
        <ListItem.Content>
          <ListItem.Title>FollowedHosts</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{ width: "100%" }}
        onPress={()=>pressed("Notifcations")}
      >
        <Avatar
          source={{
            uri: "i.insider.com/5dcc135ce94e86714253af21?width=1000&format=jpeg&auto=webp",
          }}
        />
        <ListItem.Content>
          <ListItem.Title>Notifications</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{ width: "100%" }}
        onPress={pressed}
      >
        <Avatar
          source={{
            uri: "i.insider.com/5dcc135ce94e86714253af21?width=1000&format=jpeg&auto=webp",
          }}
        />
        <ListItem.Content>
          <ListItem.Title>Help</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{ width: "100%" }}
        onPress={pressed}
      >
        <Avatar
          source={{
            uri: "i.insider.com/5dcc135ce94e86714253af21?width=1000&format=jpeg&auto=webp",
          }}
        />
        <ListItem.Content>
          <ListItem.Title>About</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <TouchableOpacity style={styles.signOutBtn} onPress={onSignout}>
        <Text style={styles.signOutBtnText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signOutBtn: {
    //top: 300,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    opacity: 0.8,
    width: "50%",
    backgroundColor: "#85ba7f",
    padding: 15,
    borderRadius: 10,
  },
  signOutBtnText: {
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 12,
    color: "#2f402d",
  },
});
