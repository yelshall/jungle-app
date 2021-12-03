import { TouchableOpacity, ScrollView, ImageBackground, Text, View } from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { ListItem, Avatar, ButtonGroup } from 'react-native-elements';
import Constants from "expo-constants";
import { GeneralContext } from "../utils/context";
import { GiftedChat } from 'react-native-gifted-chat';

function Messages({ navigation, route }) {
    const [messages, setMessages] = useState([
      /**
       * Mock message data
       */
      // example of system message
      {
        _id: 0,
        text: "New room created.",
        createdAt: new Date().getTime(),
        system: true,
      },
      // example of chat message
      {
        _id: 1,
        text: "Henlo!",
        createdAt: new Date().getTime(),
        user: {
          _id: 2,
          name: "Test User",
        },
      },
    ]);
  
    function handleSend(newMessage = []) {
      setMessages(GiftedChat.append(messages, newMessage));
    }
  
    return (
      <View
        style={{
          flex: 1,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <GiftedChat
          messages={messages}
          onSend={(newMessage) => handleSend(newMessage)}
          user={{ _id: 1 }}
        />
      </View>
    );
  }
  export default Messages;