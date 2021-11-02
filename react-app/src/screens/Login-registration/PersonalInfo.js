import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { Input, Icon } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Register({ navigation, route }) {
    const [name, setName] = React.useState("");
    const [dateOfBirth, setDateOfBirth] = React.useState("Date of birth");

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
        { label: 'Host', value: 'Host' },
        { label: 'Student', value: 'Student' }
    ]);

    const [errorName, setErrorName] = React.useState("");
    const [errorDate, setErrorDate] = React.useState("");
    const [errorGender, setErrorGender] = React.useState("");
    const [errorType, setErrorType] = React.useState("");

    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    //Verify all fields are properly filled in before continuing
    var onContinue = () => {
        let err = false;
        let fullName = name.trim().split(" ");
        if (fullName.length !== 2) {
            setErrorName("Please enter a first and last name")
            err = true;
        } else {
            setErrorName("");
        }

        if (dateOfBirth === "Date of birth") {
            setErrorDate("Please choose a date of birth");
            err = true;
        } else {
            setErrorDate("");
        }

        if (gender === "") {
            setErrorGender("Please choose one of the gender options");
            err = true;
        } else {
            setErrorGender("");
        }

        if (signupType === "") {
            setErrorType("Please choose a sign in type");
            err = true;
        } else {
            setErrorType("");
        }

        if (err) {
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
                    firstName: name[0],
                    lastName: name[1]
                },
                birthDate: new Date(dateOfBirth),
                gender: gender
            }
        });
    };

    return (
        <View style={styles.container}>
            <Input
                autoCorrect={false}
                placeholder='Full name'
                placeholderTextColor='#3d3d3d'
                containerStyle={{
                    width: '80%',
                    margin: '1.5%'
                }}
                inputStyle={{
                    fontSize: 14
                }}
                inputContainerStyle={{
                    borderColor: 'white',
                    borderBottomWidth: 1.5
                }}
                label={"Full Name"}
                labelStyle={{
                    fontSize: 16,
                    lineHeight: 21,
                    fontWeight: "bold",
                    letterSpacing: 0.25,
                    color: "#3d3d3d",
                }}
                onChangeText={(name) => setName(name)}
                onEndEditing={() => {
                    if (name.split(" ").length !== 2) {
                        setErrorName("Please enter a first and last name")
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

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                    setDatePickerVisibility(false);
                    setDateOfBirth((date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear());
                }}
                onCancel={() => setDatePickerVisibility(false)}
            />

            <Input
                containerStyle={{
                    width: '80%',
                    margin: '1.5%'
                }}
                inputStyle={{
                    fontSize: 14
                }}
                inputContainerStyle={{
                    borderColor: 'white',
                    borderBottomWidth: 1.5
                }}
                InputComponent={({ }) => (
                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                        <Text style={{ padding: 10, color: "#404040" }}>{dateOfBirth}</Text>
                    </TouchableOpacity>
                )
                }
                label={"Date of birth"}
                labelStyle={{
                    fontSize: 16,
                    lineHeight: 21,
                    fontWeight: "bold",
                    letterSpacing: 0.25,
                    color: "#3d3d3d",
                }}
                errorMessage={errorDate}
                errorStyle={{
                    fontSize: 13,
                    fontWeight: '500'
                }}
                disabled={true}
            />

            <View style={{ zIndex: 2, height: '15%' }}>
                <Text style={styles.secondaryText}>Gender</Text>
                <DropDownPicker
                    style={{
                        backgroundColor: "#71bd69",
                        borderWidth: 0
                    }}
                    containerStyle={{
                        width: '76%',
                        marginTop: '4%'
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: "#71bd69",
                        borderWidth: 0,
                        zIndex: 200
                    }}
                    placeholder="Choose an option"
                    open={openGender}
                    value={gender}
                    items={genders}
                    setOpen={setOpenGender}
                    setValue={setGender}
                    setItems={setGenders}
                />

                {
                    errorGender.length !== 0 &&
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: '500',
                            color: 'red',
                            marginTop: '1.5%',
                            alignSelf: 'flex-start',
                            marginLeft: '3%'
                        }}
                    >{errorGender}</Text>
                }
            </View>

            <View style={{ zIndex: 1, height: '15%' }}>
                <Text style={styles.secondaryText}>Sign up as...</Text>
                <DropDownPicker
                    style={{
                        backgroundColor: "#71bd69",
                        borderWidth: 0,
                    }}
                    containerStyle={{
                        width: '76%',
                        marginTop: '4%'
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: "#71bd69",
                        borderWidth: 0,
                    }}
                    placeholder="Choose an option"
                    open={openType}
                    value={signupType}
                    items={signupTypes}
                    setOpen={setOpenType}
                    setValue={setSignupType}
                    setItems={setSignupTypes}
                />
                {
                    errorType.length !== 0 &&
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: '500',
                            color: 'red',
                            marginTop: '1.5%',
                            alignSelf: 'flex-start',
                            marginLeft: '3%'
                        }}
                    >{errorType}</Text>
                }
            </View>

            <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
                <Text style={styles.continueBtnText}>Continue</Text>
            </TouchableOpacity>
        </View >
    );
}


const styles = StyleSheet.create({
    personal: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15
    },
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#96db8f",
        alignItems: "center"
    },
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
    },
    secondaryText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "#3d3d3d",
        marginLeft: '1.5%'
    },
})