import { View, Text } from "react-native";
import React, { useState, useEffect, useReducer } from 'react';
import { Chat, defaultTheme } from '@flyerhq/react-native-chat-ui'

function Messages({ navigation, route }) {
	const [messageId, setMessageId] = useState(null);
	const loginState = route.params.loginState;
	const socket = route.params.socket;
	const createChat = route.params.createChat;

	const [messages, setMessages] = useState([]);
	const [messageCount, setMessageCount] = useState(0);

	const senderId = loginState.id;
	const receiverId = route.params.rid;

	const sid = loginState.signInType == 'HOST' ? receiverId : senderId;
	const hid = loginState.signInType == 'HOST' ? senderId : receiverId;

	socket.on('newMessage', (response) => {
		response.message.id = messageCount;
		setMessageCount(count => count + 1);
		addMessage(response.message);
	});

	useEffect(() => {
		if (createChat) {
			return;
		}

		socket.emit('getMessages', { sid: sid, hid: hid }, (err, res) => {
			if (err) {
				return;
			}

			setMessageId(res[0]._id);

			let msgs = [];
			for (let i = res[0].messages.length - 1; i >= 0; i--) {
				msgs.push({
					author: res[0].messages[i].author,
					createdAt: res[0].messages[i].createdAt,
					id: i,
					text: res[0].messages[i].text,
					type: 'text'
				})
			}
			setMessages(msgs);
			setMessageCount(res[0].messages.length);
			return;
		});
	}, []);

	const addMessage = (message) => {
		setMessages([message, ...messages])
	}

	const handleSendPress = (message) => {
		const textMessage = {
			author: { id: senderId },
			createdAt: Date.now(),
			id: messageCount,
			text: message.text,
			type: 'text',
		}
		setMessageCount(count => count + 1);
		addMessage(textMessage);

		let msg = {
			text: message.text,
			createdAt: Date.now(),
			author: { id: senderId },
			type: 'text'
		};

		if (messageCount == 0 && createChat) {
			socket.emit('createMessages', { sid: sid, hid: hid, message: msg, receiverId: receiverId }, (err, res) => {
				if (err) {
					return;
				}

			});
			return;
		}

		socket.emit('sendMessage', { mid: messageId, receiverId: receiverId, message: msg }, (err, res) => {
			if (err) {
				return;
			}
		});
	}

	return (
		<Chat
			theme={{
				...defaultTheme,
				borders: {
					...defaultTheme.borders,
					inputBorderRadius: 5
				},
				colors: {
					...defaultTheme.colors,
					inputBackground: '#ababab',
					secondary: '#9fd4b2',
					primary: '#9fd4b2'
				},
				fonts: {
					...defaultTheme.fonts,
					receivedMessageBodyTextStyle: {
						...defaultTheme.fonts.receivedMessageBodyTextStyle,
						color: 'black'
					},
					sentMessageBodyTextStyle: {
						...defaultTheme.fonts.sentMessageBodyTextStyle,
						color: 'black'
					}
				}
			}}
			messages={messages}
			onSendPress={handleSendPress}
			user={{ id: senderId }}
		/>
	)
}
export default Messages;
