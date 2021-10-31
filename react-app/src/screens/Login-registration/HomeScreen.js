import React from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import { Video } from 'expo-av';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.view}>
            <Video
                source={require('../../../assets/homescreenloop.mp4')}
                style={styles.backgroundVideo}
                volume={0.0}
                isLooping={true}
                shouldPlay={true}
                resizeMode={Video.RESIZE_MODE_COVER}
            />


            <View style={styles.container}>
                <Image
                    source={require("../../../assets/logo/Logo-light.png")}
                    style={styles.logo}
                />

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
    view: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 50,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 15,
        opacity: 0.8
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
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
        width: '60%',
        backgroundColor: '#bfffb8',
        padding: 15,
        borderRadius: 10,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
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
        width: '60%',
        backgroundColor: '#85ba7f',
        padding: 15,
        borderRadius: 10,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    loginText: {
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
        color: "#bfffb8"
    }
});