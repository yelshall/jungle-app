import React, { useEffect } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from '../../utils/context';
import { Input, Icon } from 'react-native-elements';

export default function Register({ navigation, route }) {
    const socket = route.params.socket;
    const { signUp } = React.useContext(AuthContext);

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [email, setEmail] = React.useState("");

    //Add validation for these fields
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [website, setWebsite] = React.useState("");

    const [tags, setTags] = React.useState([]);
    const [openTags, setOpenTags] = React.useState(false);
    const [tagTypes, setTagTypes] = React.useState([]);

    const [errorName, setErrorName] = React.useState("");
    const [errorEmail, setErrorEmail] = React.useState("");
    const [errorDescription, setErrorDescription] = React.useState("");
    const [errorTags, setErrorTags] = React.useState("");

    useEffect(() => {
        socket.emit('getTags', {}, (err, res) => {
            if (err) {
                Alert.alert(
					"Host signup",
					"Server error occurred, try again later",
					[
						{
							text: "OK"
						}
					]
				);
                navigation.navigate('HomeScreen');
                return;
            }

            let tags = [];

            for (let i = 0; i < res.length; i++) {
                tags.push({ label: res[i].tagName, value: res[i]._id });
            }

            setTagTypes(tags);
        })
    }, []);

    const verifyValidEmail = () => {
        let re =
            /^(([^<>()[\]\ \.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            setErrorEmail("Please enter a valid email");
            return false;
        }
        setErrorEmail("");
        return true;
    };

    var onContinue = () => {
        let err = false;

        if (!verifyValidEmail()) {
            err = true;
        } else {
            setErrorEmail("");
        }
    
        if (name.length === 0) {
            setErrorName("Please enter a name for your organization");
            err = true;
        } else {
            setErrorName("");
        }

        if (description.length === 0) {
            setErrorDescription("Write at least 50 characters")
            err = true;
        } else {
            setErrorDescription("");
        }

        if (tags.length === 0) {
            setErrorTags("Choose at least one tag for your organization");
            err = true;
        } else {
            setErrorTags("");
        }

        if(err) {
            return;
        }

        route.params.newHost.hostName = name;
        route.params.newHost.hostEmail = email;
        route.params.newHost.tags = tags;
        route.params.newHost.description = description;
        route.params.newHost.phoneNumber = phoneNumber;
        route.params.newHost.website = website;

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
    };

    return (
        <View style={styles.container}>
            <Icon
                type={"material"}
                name={"chevron-left"}
                size={45}
                containerStyle={{
                    position: 'absolute',
                    top: 50,
                    left: 10,
                    zIndex: 10000
                }}
                onPress={() => {
                    navigation.goBack();
                }}
            />
            <Text style={styles.host}>Host information</Text>

            <ScrollView
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute'
                }}
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <View style={{
                    width: '100%',
                    height: 150
                }}></View>

                <Input
                    autoCorrect={false}
                    placeholder='Organization name'
                    placeholderTextColor='#3d3d3d'
                    containerStyle={{
                        width: '77%',
                        margin: 5
                    }}
                    inputStyle={{
                        fontSize: 14
                    }}
                    inputContainerStyle={{
                        borderColor: 'white',
                        borderBottomWidth: 1.5
                    }}
                    label={"Organization name"}
                    labelStyle={{
                        fontSize: 16,
                        lineHeight: 21,
                        fontWeight: "bold",
                        letterSpacing: 0.25,
                        color: "#3d3d3d",
                    }}
                    onChangeText={(name) => setName(name)}
                    onEndEditing={() => {
                        if (name.length === 0) {
                            setErrorName("Please enter a name for your organization")
                            return;
                        }
                        setErrorName("");
                    }}
                    errorMessage={errorName}
                    errorStyle={{
                        fontSize: 13,
                        fontWeight: '500'
                    }}
                />

                <Input
                    autoCorrect={false}
                    autoCapitalize='none'
                    placeholder='Email'
                    placeholderTextColor='#3d3d3d'
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o', size: 20 }}
                    containerStyle={{
                        width: '77%',
                        margin: 5
                    }}
                    inputStyle={{
                        fontSize: 14
                    }}
                    inputContainerStyle={{
                        borderColor: 'white',
                        borderBottomWidth: 1.5
                    }}
                    label={"Organization email"}
                    labelStyle={{
                        fontSize: 16,
                        lineHeight: 21,
                        fontWeight: "bold",
                        letterSpacing: 0.25,
                        color: "#3d3d3d",
                    }}
                    onChangeText={(email) => setEmail(email.toLowerCase())}
                    onEndEditing={verifyValidEmail}
                    errorMessage={errorEmail}
                    errorStyle={{
                        fontSize: 13,
                        fontWeight: '500'
                    }}
                />

                <Input
                    autoCorrect={false}
                    autoCapitalize='none'
                    placeholder='Phone number'
                    placeholderTextColor='#3d3d3d'
                    leftIcon={{ type: 'ionicon', name: 'call-outline', size: 20 }}
                    containerStyle={{
                        width: '77%',
                        margin: 5
                    }}
                    inputStyle={{
                        fontSize: 14
                    }}
                    inputContainerStyle={{
                        borderColor: 'white',
                        borderBottomWidth: 1.5
                    }}
                    label={"Organization phone number (optional)"}
                    labelStyle={{
                        fontSize: 16,
                        lineHeight: 21,
                        fontWeight: "bold",
                        letterSpacing: 0.25,
                        color: "#3d3d3d",
                    }}
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />

                <Input
                    autoCorrect={false}
                    autoCapitalize='none'
                    placeholder='Website'
                    placeholderTextColor='#3d3d3d'
                    leftIcon={{ type: 'ionicon', name: 'globe-outline', size: 20 }}
                    containerStyle={{
                        width: '77%',
                        margin: 5
                    }}
                    inputStyle={{
                        fontSize: 14
                    }}
                    inputContainerStyle={{
                        borderColor: 'white',
                        borderBottomWidth: 1.5
                    }}
                    label={"Organization website (optional)"}
                    labelStyle={{
                        fontSize: 16,
                        lineHeight: 21,
                        fontWeight: "bold",
                        letterSpacing: 0.25,
                        color: "#3d3d3d",
                    }}
                    onChangeText={(website) => setWebsite(website)}
                />

                <Text style={styles.secondaryText}>Description</Text>
                <TextInput
                    multiline
                    numberOfLines={4}
                    style={styles.TextBox}
                    placeholder='Write a description'
                    placeholderTextColor='#3d3d3d'
                    onChangeText={(description) => setDescription(description)}
                    onEndEditing={() => {
                        if(description.length < 50) {
                            setErrorDescription("Write at least 50 characters");
                            return;
                        }
                        setErrorDescription("");
                    }}
                />
                {
                    errorDescription.length !== 0 &&
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: '500',
                            color: 'red',
                            bottom: 20,
                            right: 50
                        }}
                    >{errorDescription}</Text>
                }

                <Text style={styles.secondaryText}>Your tags are...</Text>
                <DropDownPicker
                    style={{
                        backgroundColor: "#51b375",
                        borderWidth: 0,
                    }}
                    containerStyle={{
                        width: '76%',
                        margin: 10,
                        zIndex: 1
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: "#51b375",
                        borderWidth: 0,
                    }}
                    dropDownDirection="BOTTOM"
                    multiple={true}
                    min={0}
                    max={3}
                    placeholder="Choose an option"
                    open={openTags}
                    value={tags}
                    items={tagTypes}
                    setOpen={setOpenTags}
                    setValue={setTags}
                    setItems={setTagTypes}
                    bottomOffset={100}
                />
                {
                    errorTags.length !== 0 &&
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: '500',
                            color: 'red',
                            bottom: 20,
                            right: 50
                        }}
                    >{errorTags}</Text>
                }

                <View style={{
                    width: '100%',
                    zindex: -1,
                    height: 150
                }}></View>

                <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
                    <Text style={styles.continueBtnText}>Continue</Text>
                </TouchableOpacity>

                <View style={{
                    width: '100%',
                    height: 140
                }}></View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#8acf82",
        justifyContent: "center",
        alignItems: "center"
    },
    secondaryText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "#3d3d3d",
        alignSelf: 'flex-start',
        left: 50,
    },
    TextBox: {
        backgroundColor: "#e6ffef",
        borderRadius: 5,
        color: "black",
        margin: 10,
        marginBottom: 24,
        borderBottomColor: "#d8ffd4",
        borderBottomWidth: 2,
        width: '75%',
        height: 100
    },
    continueBtn: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        opacity: 0.8,
        width: '75%',
        backgroundColor: '#51b375',
        padding: 15,
        borderRadius: 10,
        zIndex: -1
    },
    continueBtnText: {
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
        color: "white"
    },
    host: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
        zIndex: 10000,
        bottom: 339
    },
})