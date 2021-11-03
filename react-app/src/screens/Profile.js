import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AuthContext } from "../utils/context";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";

import HostData from "../../assets/events-data/HostData";
import eventsData from "../../assets/events-data/eventsData";
import users from "../../assets/events-data/users";

export default function Profile({ navigation, route }) {
  const socket = route.params.socket;
  const loginState = route.params.loginState;
  const { signOut } = React.useContext(AuthContext);
  const onSignout = () => {
    signOut();
  };

  const onPref = () => {
    navigation.navigate("ChangePref", {
      users: users[0],
    });
  };

  const onFollowing = () => {
    navigation.navigate("FollowedHosts", {
      HostData: HostData[0],
      eventsData: eventsData,
      socket: socket,
      loginState: loginState,
    });
  };

  const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    },
  
  ]
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/*<Text style={{ margin: 90, fontSize: 28 }}>Profile</Text>
			<LottieView
				source={require("../../assets/Lottie/Profile.json")}
				autoPlay
			/>*/}

      <Image
        style={{ width: 150, height: 150, borderRadius: 75 }}
        source={{
          uri: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTUzMDg3Nzk3MDA2MTgxMzgz/madeline-mccann_credit-to-mccann-family-500.jpg",
        }}
      ></Image>
      <Text>Maddy Mcanan</Text>
      <Text>Following: 120</Text>


        {list.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{ uri: l.avatar_url }} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}

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

//      <TouchableOpacity style={styles.signOutBtn} onPress={onPref}>
{
  /* <Text style={styles.signOutBtnText}>Preferences</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.signOutBtn} onPress={onFollowing}>
  <Text style={styles.signOutBtnText}>Following</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.signOutBtn} onPress={onSignout}>
  <Text style={styles.signOutBtnText}>Sign Out</Text>
</TouchableOpacity> */
}
