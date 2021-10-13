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


export default function Register({ navigation }) {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    
    //Add validation for these fields
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [website, setWebsite] = React.useState("");
    const [email, setEmail] = React.useState("");

    const [tags, setTags] = React.useState([]);
    const [openTags, setOpenTags] = React.useState(false);
    const [tagTypes, setTagTypes] = React.useState([
        { label: 'Tag1', value: '1' },
        { label: 'Tag2', value: '2' },
        { label: 'Tag3', value: '3' }
    ]);


    var onContinue = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>

            <Text style={styles.secondaryText}>Organization name</Text>
            <TextInput
                style={styles.TextInput}
                placeholder='Enter a name'
                placeholderTextColor='#3d3d3d'
                onChangeText={(name) => setName(name)}
            />

            <Text style={styles.secondaryText}>Organization email</Text>
            <TextInput
                style={styles.TextInput}
                placeholder='Enter an email'
                placeholderTextColor='#3d3d3d'
                onChangeText={(email) => setEmail(email)}
            />


            <Text style={styles.secondaryText}>Phone number (optional)</Text>
            <TextInput
                style={styles.TextInput}
                placeholder='Enter a phone number'
                placeholderTextColor='#3d3d3d'
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            />


            <Text style={styles.secondaryText}>Organization website (optional)</Text>
            <TextInput
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
                    bottom: 95,
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
        bottom: 100
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
        bottom: 100
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
        bottom: 100
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
        bottom: 20
    },
    continueBtnText: {
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
        color: "#2f402d"
    }
})