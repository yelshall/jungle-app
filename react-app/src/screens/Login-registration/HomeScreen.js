import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { Video } from 'expo-av';

const { height } = Dimensions.get('window')

export default function HomeScreen({ navigation }) {
    return (
        <View>
            <Video
                source={require('../../../assets/homescreenloop.mp4')}
                style={styles.backgroundVideo}
                volume={0.0}
                isLooping={true}
                shouldPlay={true}
                resizeMode={Video.RESIZE_MODE_COVER}
            />

            <View style={styles.container}>
                <Text style={styles.title}>Jungle</Text>
                <Text style={styles.description}>
                    We bring events to you
                </Text>

                <TouchableOpacity
                    style={styles.createAccount}
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.createAccountText}>Create Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.login}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        top: 300,
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundVideo: {
        height: height,
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'stretch',
        bottom: 0,
        right: 0
    },
    title: {
        color: '#f4f4f4',
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 3
    },
    description: {
        letterSpacing: 1,
        color: '#f4f4f4',
        textTransform: 'uppercase'
    },
    createAccount: {
        opacity: 0.8,
        top: 20,
        width: '60%',
        backgroundColor: '#bfffb8',
        padding: 15,
        borderRadius: 10
    },
    createAccountText: {
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
        color: "#658a60"
    },
    login: {
        opacity: 0.8,
        top: 40,
        width: '60%',
        backgroundColor: '#85ba7f',
        padding: 15,
        borderRadius: 10
    },
    loginText: {
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
        color: "#bfffb8"
    }
})