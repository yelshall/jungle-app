import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { ListItem } from 'react-native-elements';

export default function HostAbout({ navigation, route }) {

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    Contacts
                </Text>
            </View>

            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Email: team17-cs307@purdue.edu</ListItem.Title>
                </ListItem.Content>
            </ListItem>

            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Phone: (317)-132-9687</ListItem.Title>
                </ListItem.Content>
            </ListItem>

            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Website: www.Team17Projects.com</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    titleView: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 0,
        paddingLeft: 15
    }
});