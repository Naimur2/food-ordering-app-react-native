import React from "react";
import { Pressable, Text } from "react-native";


export default function PressAbleButton({title, onPress, buttonStyle:style,titleStyle}) {
    const textColor =style.color ? style.color : '#fff';
    const btnTitle=title ? title : 'Press me';
    const titlestyle = titleStyle ? titleStyle : {color:textColor};
    return (
        <Pressable style={style} onPress={onPress}>
            <Text style={titlestyle} >{btnTitle}</Text>
        </Pressable>
    );
}
