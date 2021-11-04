import React from "react";
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

const BackButton = ({ }) => (
    <Icon
        type={"material"}
        name={"chevron-left"}
        size={40}
        style={{ margin: 0, padding: 0 }}
    />
);

const HeaderBackground = (color, borderColor) => {
    return (
        <View
            style={{
                backgroundColor: color,
                height: '100%',
                width: '100%',
                borderBottomWidth: 0.5,
                borderColor: borderColor
            }}
        ></View>
    )
}


export const defaultOptions = (title, color, borderColor) => {
    return {
        title: title,
        headerBackTitleVisible: false,
        headerBackImage: BackButton,
        headerTitleStyle: {
            fontSize: 18
        },
        headerBackground: () => HeaderBackground(color, borderColor)
    }
}