import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../../utils/context";
import { ListItem, Avatar } from "react-native-elements";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements/dist/icons/Icon";

export default function HostProfile({ navigation, route }) {
  const { signOut } = React.useContext(AuthContext);
  const onSignout = () => {
    signOut();
  };

  const pressed = (direction) => {
    console.log(direction);
    navigation.navigate(direction) 
  };


  return (
    <View
      style={{
        width: "100%",
        height: "100%",
       
      }}
    >
      <Avatar
        rounded
        size="xlarge"
        containerStyle={{ marginTop: "10%",alignSelf:"center", }}
        source={{
          uri: "https://i.insider.com/5dcc135ce94e86714253af21?width=1000&format=jpeg&auto=webp",
        }}
      />
      <Text style={{alignSelf:"center"}}>John Doe</Text>
      <Text style={{alignSelf:"center"}}>Followed: 190</Text>
      <ScrollView>
      <ListItem
        bottomDivider
        containerStyle={{ width: "100%" }}
        onPress={() => pressed("HostInfo")}
      >
       <Icon
        name="info"
        />
        <ListItem.Content>
          <ListItem.Title>Host Info</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{ width: "100%" }}
        onPress={() => pressed("ChangePref")}
      >
         <Icon
        name="tag"
        />
        <ListItem.Content>
          <ListItem.Title>Tags</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{ width: "100%" }}
        onPress={() => pressed("Stats")}
      >
        <RiseOutlined />
       
        <ListItem.Content>
          <ListItem.Title>Stats</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem
        bottomDivider
        containerStyle={{ width: "100%" }}
        onPress={() => pressed("HostNofications")}
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
        
      >

        <Icon
        name="help"
        />
        <ListItem.Content>
          <ListItem.Title>About</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      </ScrollView>
      <View style={{width:"100%", height:50,backgroundColor:"brown"}}>
        
        </View>
        

          <TouchableOpacity   style={{height:"8%"}} onPress={onSignout}>
        <Text style={{borderColor:"green",borderBottomWidth:20}} >Sign Out</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  signOutBtn: {
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
