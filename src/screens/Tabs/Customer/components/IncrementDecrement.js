import React, { useState } from "react";
import { StyleSheet, Text, View,Button, } from "react-native";
import PressAbleButton from "./PressAbleButton";

export default function IncrementDecrement({
    max,
    min,
    buttonStyle,
    incrementBtnStyle,
    decrementBtnStyle,
    onChange,
    incrementBtnTextStyle,
    decrementBtnTextStyle,
    counterContainerStyle,
    counterTextStyle,
    containerStyle,
    inacitveIncrimentStyle,
    inacitveDecrementStyle,
}) {
    const getValue = (v) => {
        return v;
    };

    const [count, setCount] = useState(1);
    const increment = () => {
        if (count < +max) {
            let newCount = count + 1;
            setCount(newCount);
            onChange(newCount);
        }
    };
    const decrement = () => {
        if (count > +min) {
            let newCount = count - 1;
            setCount(newCount);
            onChange(newCount);
        }
    };

    const btnStyle = buttonStyle ? buttonStyle : styles.btn;
    const incrBtnStyle = incrementBtnStyle
        ? {...incrementBtnStyle,...styles.incrementBtn}
        : styles.incrementBtn;
    const decrBtnStyle = decrementBtnStyle
        ? {...decrementBtnStyle,...styles.decrementBtn}
        : styles.decrementBtn;
    const incrBtnTextStyle = incrementBtnTextStyle
        ? {...incrementBtnTextStyle,...styles.incrementBtnTextStyle}
        : styles.incrementBtnTextStyle;
    const decrBtnTextStyle = decrementBtnTextStyle
        ? {...decrementBtnTextStyle,...styles.decrementBtnTextStyle}
        : styles.decrementBtnTextStyle;
    const ctrContainerStyle = counterContainerStyle
        ? {...counterContainerStyle,...styles.counterContainerStyle}
        : styles.counterContainer;
    const ctrTextStyle = counterTextStyle
        ? {...counterTextStyle,...styles.counterTextStyle}
        : styles.counterTextStyle;
    const contStyle = containerStyle
        ? { ...containerStyle, ...styles.container }
        : styles.container;
    const incr = { ...btnStyle, ...incrBtnStyle };
    const decr = { ...btnStyle, ...decrBtnStyle };

    return (
        <View style={contStyle}>
            <PressAbleButton
                onPress={decrement}
                buttonStyle={incr}
                title="-"
                titleStyle={incrBtnTextStyle}
            />
            <View style={ctrContainerStyle}>
                <Text style={ctrTextStyle}>{count}</Text>
            </View>
            <PressAbleButton
                onPress={increment}
                buttonStyle={decr}
                title="+"
                titleStyle={decrBtnTextStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        width: "37.5%",
        backgroundColor: "#00a680",
        height: "100%",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    decrementBtn: {
        backgroundColor: "#E39508",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    incrementBtn: {
        backgroundColor: "#FF1C73",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    counterContainer: {
        width: "25%",
        backgroundColor: "#FFA9D0",
        padding: 5,
        alignItems: "center",
        textAlignVertical: "center",
        height: "100%",
    },
    counterTextStyle: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    incrementBtnTextStyle: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
    },
    decrementBtnTextStyle: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
    },
});
