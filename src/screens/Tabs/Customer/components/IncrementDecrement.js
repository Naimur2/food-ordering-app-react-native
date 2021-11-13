import React, { useState } from "react";
import {  StyleSheet, Text, View, } from "react-native";

import PressAbleButton from "./PressAbleButton";

export default function IncrementDecrement({ max, min }) {
    const [count, setCount] = useState(1);
    const increment = () => {
        if (count < +max) setCount((c) => c + 1);
    };
    const decrement = () => {
        if (count > +min) setCount((c) => c - 1);
    };
    return (
        <View style={styles.container}>
             <PressAbleButton
                onPress={decrement}
                buttonStyle={{...styles.btn,...styles.decrementBtn}}
                title="-"
                titleStyle={styles.titleStyle}
            />
            <View style={styles.countContainer}>
                <Text style={styles.counter}>{count}</Text>
            </View>
            <PressAbleButton
                onPress={increment}
                buttonStyle={{...styles.btn,...styles.incrementBtn}}
                title="+"
                titleStyle={styles.titleStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    btn:{
        width: '40%',
        backgroundColor: "#00a680",
        height:'100%',
        alignItems: "center",
        textAlign: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    incrementBtn: {
        backgroundColor: "#E39508",
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
    },
    decrementBtn: {
        backgroundColor: "#FF1C73",
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
    },
    countContainer: {
        width: '20%',
        backgroundColor: "#FFA9C1",
        padding: 10,
        alignItems: 'center',
        height: '100%',
    },
    counter: {
       color: "white",
         fontSize: 20,
         fontWeight: "bold",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    titleStyle:{
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
    }
});
