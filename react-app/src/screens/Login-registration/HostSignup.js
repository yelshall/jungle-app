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
import { Input } from 'react-native-elements';

export default function Register({ navigation, route }) {
    const socket = route.params.socket;

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

        if (err) {
            return;
        }

        route.params.newHost.hostName = name;
        route.params.newHost.hostEmail = email;
        route.params.newHost.tags = tags;
        route.params.newHost.description = description;
        route.params.newHost.phoneNumber = phoneNumber;
        route.params.newHost.website = website;

        navigation.navigate('ProfilePic', {
            newHost: route.params.newHost,
            signupType: route.params.signupType
        });
    };

    return (
        <ScrollView
            contentContainerStyle={{
                alignItems: "center"
            }}
            style={{
                backgroundColor: "#96db8f",
                width: "100%",
                height: "100%"
            }}
        >
            <Input
                autoCorrect={false}
                placeholder='Organization name'
                placeholderTextColor='#3d3d3d'
                containerStyle={{
                    width: '80%',
                    margin: "1.5%"
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
                    width: '80%',
                    margin: "1.5%"
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
                    width: '80%',
                    margin: "1.5%"
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
                    width: '80%',
                    margin: "1.5%"
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

            <View style={{ width: '80%', margin: '2.5%' }}>
                <Text style={styles.secondaryText}>Description</Text>
                <TextInput
                    multiline
                    numberOfLines={4}
                    style={styles.TextBox}
                    placeholder='Write a description'
                    placeholderTextColor='#3d3d3d'
                    onChangeText={(description) => setDescription(description)}
                    onEndEditing={() => {
                        if (description.length < 50) {
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
                            marginLeft: '2.5%'
                        }}
                    >{errorDescription}</Text>
                }
            </View>

            < View style={{ width: '80%', margin: '2.5%', alignItems: 'center' }}>
                <Text style={styles.secondaryText}>Your tags are...</Text>
                <DropDownPicker
                    style={{
                        backgroundColor: "#51b375",
                        borderWidth: 0,
                    }}
                    containerStyle={{
                        margin: '2.5%',
                        zIndex: 1
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: "#51b375",
                        borderWidth: 0,
                    }}
                    dropDownDirection="AUTO"
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
                    bottomOffset={50}
                />
                {
                    errorTags.length !== 0 &&
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: '500',
                            color: 'red',
                            marginLeft: '2.5%'
                        }}
                    >{errorTags}</Text>
                }
            </View>

            <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
                <Text style={styles.continueBtnText}>Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    secondaryText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "#3d3d3d",
        alignSelf: 'flex-start',
        marginLeft: '2.5%'
    },
    TextBox: {
        backgroundColor: "#e6ffef",
        borderRadius: 5,
        color: "black",
        margin: '2.5%',
        borderBottomColor: "#d8ffd4",
        borderBottomWidth: 2,
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
        zIndex: -1,
        margin: '10%'
    },
    continueBtnText: {
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
        color: "white"
    },
})