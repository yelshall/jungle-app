import {
    Dimensions,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Icon } from "react-native-elements";
import { Flex, Spacer, Box, Stack } from 'native-base';
import { LinearGradient } from "expo-linear-gradient";

var { height, width } = Dimensions.get("window");

const smallSize = width / 5;
const itemWidth = width * 0.67;
const itemHeight = height / 2 - Constants.statusBarHeight * 2;

export const CardItem = ({ event, onPress, edit }) => (
    <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        key={event._id}
    >
        <Flex
            style={{
                flexDirection: 'row',
                width: '95%',
                justifyContent: 'center',
                marginVertical: '1%',
                padding: '2%',
                borderRadius: 1,
                backgroundColor: 'white',
                borderColor: '#cccccc',
                borderWidth: 0.5
            }}
        >
            <Image
                source={{ uri: event.imageURL }}
                style={[
                    {
                        height: smallSize,
                        width: smallSize,
                        opacity: 1,
                        resizeMode: "cover",
                        borderWidth: 0.5,
                        borderColor: '#cccccc'
                    },
                ]}
            />
            <Spacer />
            <Stack direction={'column'} style={{ width: '75%', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{event.eventName.length > 28 ?
                    event.eventName.substring(0, 28) + '...' : event.eventName}</Text>
                <Flex>
                    <Flex
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Icon
                            type={"ionicon"}
                            name={"location-outline"}
                            size={14}
                            containerStyle={{
                                marginRight: '1%'
                            }}
                        />
                        <Text>{event.location.length > 30 ? event.location.substring(0, 30) + '...' : event.location}</Text>
                    </Flex>
                    <Flex
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Icon
                            type={"ionicon"}
                            name={"calendar-outline"}
                            size={14}
                            containerStyle={{
                                marginRight: '1%'
                            }}
                        />
                        <Text>{(new Date(event.dateTime)).toDateString()}</Text>
                    </Flex>
                </Flex>
                {!edit &&
                    <Flex
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'flex-end'
                        }}
                    >
                        <Text style={{ color: '#0a84ff' }}>Learn more</Text>
                        <Icon
                            type={"ionicon"}
                            name={"chevron-forward-outline"}
                            size={14}
                            containerStyle={{
                                marginRight: '1%'
                            }}
                            color={"#0a84ff"}
                        />
                    </Flex>
                }
            </Stack>
        </Flex>
    </TouchableOpacity>
);

export const CardRow = ({ event, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
    >
        <ImageBackground
            source={{ uri: event.imageURL }}
            style={{
                height: itemHeight,
                width: itemWidth,
                opacity: 1,
                resizeMode: "cover",
                justifyContent: 'flex-end'
            }}
        >
            <LinearGradient
                colors={['#000000', 'transparent', 'transparent']}
                start={{ x: 0, y: 0.9 }}
                end={{ x: 0, y: 0 }}
                style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'flex-end'
                }}
            >
                <Stack direction={'column'} style={{ width: '100%', margin: '3%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24, color: 'white' }}>{event.eventName.length > 18 ?
                        event.eventName.substring(0, 18) + '...' : event.eventName}</Text>
                    <Flex>
                        <Flex
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <Icon
                                type={"ionicon"}
                                name={"location-outline"}
                                size={16}
                                containerStyle={{
                                    marginRight: '1%'
                                }}
                                color={"white"}
                            />
                            <Text style={{ fontSize: 16, color: 'white' }}>{event.location.length > 25 ? event.location.substring(0, 25) + '...' : event.location}</Text>
                        </Flex>
                        <Flex
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <Icon
                                type={"ionicon"}
                                name={"calendar-outline"}
                                size={14}
                                containerStyle={{
                                    marginRight: '1%'
                                }}
                                color={'white'}
                            />
                            <Text style={{ fontSize: 16, color: 'white' }}>{(new Date(event.dateTime)).toDateString()}</Text>
                        </Flex>
                    </Flex>
                </Stack>
            </LinearGradient>
        </ImageBackground>
    </TouchableOpacity>
);