import React from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';


export default function Register({ navigation, route }) {
    const [name, setName] = React.useState("");
    const [dateOfBirth, setDateOfBirth] = React.useState("");

    const [gender, setGender] = React.useState("");
    const [openGender, setOpenGender] = React.useState(false);
    const [genders, setGenders] = React.useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Prefer not say', value: 'Unspecified' }
    ]);

    const [signupType, setSignupType] = React.useState("");
    const [openType, setOpenType] = React.useState(false);
    const [signupTypes, setSignupTypes] = React.useState([
        { label: 'Student', value: 'Student' },
        { label: 'Host', value: 'Host' }
    ]);

    // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
    var isValidDate = (dateString) => {
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            return false;

        var parts = dateString.split("/");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        return day > 0 && day <= monthLength[month - 1];
    };

    //Verify all fields are properly filled in before continuing
    var onContinue = () => {
        let fullName = name.trim().split(" ");
        if (fullName.length !== 2) {
            Alert.alert(
                "Sign up",
                "Please enter your full name as first name and last name only, like 'John Smith'.",
                [
                    {
                        text: "OK"
                    }
                ]
            );
            return;
        }

        if (!isValidDate(dateOfBirth)) {
            Alert.alert(
                "Sign up",
                "Please enter a valid date of birth in the form of mm/dd/yyyy.",
                [
                    {
                        text: "OK"
                    }
                ]
            );
            return;
        }

        if (gender === "") {
            Alert.alert(
                "Sign up",
                "Please choose a gender option.",
                [
                    {
                        text: "OK"
                    }
                ]
            );
            return;
        }

        if (signupType === "") {
            Alert.alert(
                "Sign up",
                "Please choose a sign up type.",
                [
                    {
                        text: "OK"
                    }
                ]
            );
            return;
        }

        if (signupType === "Host") {
            navigation.navigate('HostSignup', {
                newHost: {
                    email: route.params.email,
                    password: route.params.password
                }
            });
            return;
        }

        navigation.navigate('Preferences', {
            newStudent: {
                email: route.params.email,
                password: route.params.password,
                fullName: {
                    firstName: fullName[0],
                    lastName: fullName[1]
                },
                birthDate: new Date(dateOfBirth),
                gender: gender
            }
        });
    };

    return (
        <View style={styles.container}>

            <Text style={styles.secondaryText}>Full Name</Text>
            <TextInput
                autoCorrect={false}
                style={styles.TextInput}
                placeholder='Enter your name'
                placeholderTextColor='#3d3d3d'
                onChangeText={(name) => setName(name)}
            />

            <Text style={styles.secondaryText}>Date of birth</Text>
            <TextInput
                autoCorrect={false}
                style={styles.TextInput}
                placeholder='mm/dd/yyyy'
                placeholderTextColor='#3d3d3d'
                onChangeText={(dateOfBirth) => setDateOfBirth(dateOfBirth)}
            />

            <Text style={styles.secondaryText}>Gender</Text>
            <DropDownPicker
                style={{
                    backgroundColor: "#51b375",
                    borderWidth: 0,
                }}
                containerStyle={{
                    bottom: 175,
                    width: '77%',
                    paddingBottom: 20
                }}
                dropDownContainerStyle={{
                    backgroundColor: "#51b375",
                    borderWidth: 0
                }}
                placeholder="Choose an option"
                open={openGender}
                value={gender}
                items={genders}
                setOpen={setOpenGender}
                setValue={setGender}
                setItems={setGenders}
            />

            <Text style={styles.secondaryText}>Sign up as...</Text>
            <DropDownPicker
                style={{
                    backgroundColor: "#51b375",
                    borderWidth: 0,
                }}
                containerStyle={{
                    bottom: 175,
                    width: '77%',
                    paddingBottom: 20,
                    zIndex: -1
                }}
                dropDownContainerStyle={{
                    backgroundColor: "#51b375",
                    borderWidth: 0
                }}
                placeholder="Choose an option"
                open={openType}
                value={signupType}
                items={signupTypes}
                setOpen={setOpenType}
                setValue={setSignupType}
                setItems={setSignupTypes}
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
        backgroundColor: "#8acf82",
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
        bottom: 180
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
        bottom: 180
    },
    continueBtn: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        opacity: 0.8,
        width: '70%',
        backgroundColor: '#51b375',
        padding: 15,
        borderRadius: 10,
        bottom: 100
    },
    continueBtnText: {
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
        color: "#2f402d"
    }
})