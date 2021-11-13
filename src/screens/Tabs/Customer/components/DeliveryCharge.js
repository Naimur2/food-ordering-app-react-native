import React from "react";
import { Text, View,StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export default function DeliveryCharge({value}) {
    return (
        <View style={styles.iconContainer}>
            <Icon
                style={styles.icon}
                name="local-shipping"
                type="material"
                color="#517fa4"
            />
            <Text>
                {value === 0
                    ? "Free"
                    : `Tk: ${value}`}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    icon: {
        paddingHorizontal: 3,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});