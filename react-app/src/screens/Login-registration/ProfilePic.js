import React, { useState, useEffect } from 'react';
import { Text, View, Platform, ImageBackground, TouchableOpacity, StyleSheet, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';
import { AuthContext } from '../../utils/context';

export default function ProfilePic({ navigation, route }) {
    const { signUp } = React.useContext(AuthContext);
    const socket = route.params.socket;
    const newStudent = route.params.newStudent;
    const signupType = route.params.signupType;
    const newHost = route.params.newHost;

    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        setTitle(signupType == 'Student' ? 
        `${newStudent.fullName.firstName.charAt(0)}${newStudent.fullName.lastName.charAt(0)}` :
        `${newHost.hostName.charAt(0)}`
        )
    }, []);

    const [buttonText, setButtonText] = useState('SKIP');

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setButtonText('CONTINUE');
        }
    };

    const onContinue = () => {
        if (signupType === "Host") {
            socket.emit('hostSignup', { newHost: route.params.newHost }, (err, response) => {
                if (err) {
                    Alert.alert(
                        "Host sign up",
                        "Error signing you up",
                        [
                            {
                                text: "OK"
                            }
                        ]
                    );
                    return
                }
                signUp(response);
            });
            return;
        }
        newStudent.profilePic = image;
        navigation.navigate('Preferences', {
            newStudent: newStudent
        });
    };

    return (
        <View style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            backgroundColor: '#96db8f'
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 0.25,
                color: "#3d3d3d",
                marginBottom: '5%',
                marginTop: '40%'
            }}>Pick a profile picture</Text>

            <TouchableOpacity
                activeOpacity={1}
                onPress={pickImage}
                style={{
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    backgroundColor: '#e3e3e3'
                }}
            >
                <ImageBackground
                    source={{ uri: image }}
                    resizeMode={'cover'}
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    imageStyle={{
                        width: 200,
                        height: 200,
                        borderRadius: 100
                    }}
                >
                    {image == null &&
                        <>
                            <Text style={{
                                color: '#a8a8a8',
                                fontSize: 60,
                                fontWeight: '500'
                            }}>{title}</Text>
                            <Icon
                                name="edit"
                                type="material"
                                size={40}
                                color={'white'}
                                containerStyle={{
                                    backgroundColor: '#a8a8a8',
                                    borderRadius: 23,
                                    padding: 6,
                                    position: 'absolute',
                                    left: '70%',
                                    top: '75%'
                                }}
                            />
                        </>
                    }
                    {image &&
                        <View style={{
                            position: 'absolute',
                            top: '100%'
                        }}>
                            <Button title="Cancel" onPress={() => {
                                setImage(null);
                                setButtonText("SKIP");
                            }} />
                        </View>
                    }
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
                <Text style={styles.continueBtnText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    continueBtn: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        opacity: 0.8,
        width: '75%',
        backgroundColor: '#71bd69',
        padding: 15,
        borderRadius: 10,
        marginTop: '10%'
    },
    continueBtnText: {
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
        color: "black"
    }
});