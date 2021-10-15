import React, { useEffect } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from '../../utils/context';

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

    useEffect(() => {
        socket.emit('getTags', {}, (err, res) => {
            if(err) {
                Alert.alert(
                    "Host signup",
                    "Error occurred.",
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
    
            for(let i = 0; i < res.length; i++) {
                tags.push({label: res[i].tagName, value: res[i]._id});
            }
    
            setTagTypes(tags);
        })
    }, []);

    let verifyValidEmail = () => {
        let re = /^(([^<>()[\]\ \.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            Alert.alert(
                "Host signup",
                "Please enter a valid email.",
                [
                    {
                        text: "OK"
                    }
                ]
            );
            return false;
        }
        return true;
    }

    var onContinue = () => {
        if (name.length === 0) {
            Alert.alert(
                "Host sign up",
                "Please enter a name for your organization.",
                [
                    {
                        text: "OK"
                    }
                ]
            );
            return;
        }

        if (!verifyValidEmail()) {
            return;
        }


        if (description.length === 0) {
            Alert.alert(
                "Host sign up",
                "Please enter a description for your organization.",
                [
                    {
                        text: "OK"
                    }
                ]
            );
            return;
        }

        if (tags.length === 0) {
            Alert.alert(
                "Host sign up",
                "Please choose at least one tag for your organization.",
                [
                    {
                        text: "OK"
                    }
                ]
            );
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
                    "Error signing you up.",
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

            <Text style={styles.secondaryText}>Organization name</Text>
            <TextInput
                autoCorrect={false}
                style={styles.TextInput}
                placeholder='Enter a name'
                placeholderTextColor='#3d3d3d'
                onChangeText={(name) => setName(name)}
            />

            <Text style={styles.secondaryText}>Organization email</Text>
            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.TextInput}
                placeholder='Enter an email'
                placeholderTextColor='#3d3d3d'
                onChangeText={(email) => setEmail(email)}
            />


            <Text style={styles.secondaryText}>Phone number (optional)</Text>
            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.TextInput}
                placeholder='Enter a phone number'
                placeholderTextColor='#3d3d3d'
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            />


            <Text style={styles.secondaryText}>Organization website (optional)</Text>
            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.TextInput}
                placeholder='Enter a website'
                placeholderTextColor='#3d3d3d'
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
            />

            <Text style={styles.secondaryText}>Your tags are...</Text>
            <DropDownPicker
                style={{
                    backgroundColor: "#85ba7f",
                    borderWidth: 0,
                }}
                containerStyle={{
                    bottom: 75,
                    width: '77%',
                    paddingBottom: 20
                }}
                dropDownContainerStyle={{
                    backgroundColor: "#85ba7f",
                    borderWidth: 0
                }}
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

            <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
                <Text style={styles.continueBtnText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#96db8f",
        justifyContent: "center",
        alignItems: "center",
    },
    secondaryText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "#3d3d3d",
        alignSelf: 'flex-start',
        left: 50,
        bottom: 80
    },
    TextInput: {
        color: "black",
        padding: 10,
        marginBottom: 10,
        borderBottomColor: "#d8ffd4",
        borderBottomWidth: 2,
        width: '77%',
        alignSelf: 'flex-start',
        left: 52,
        bottom: 80
    },
    TextBox: {
        backgroundColor: "#e6ffef",
        borderRadius: 5,
        color: "black",
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: "#d8ffd4",
        borderBottomWidth: 2,
        width: '77%',
        height: '10%',
        alignSelf: 'flex-start',
        left: 52,
        bottom: 80
    },
    continueBtn: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        opacity: 0.8,
        width: '70%',
        backgroundColor: '#85ba7f',
        padding: 15,
        borderRadius: 10,
    },
    continueBtnText: {
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
        color: "#2f402d"
    }
})