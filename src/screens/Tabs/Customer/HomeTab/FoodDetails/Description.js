import React from "react";
import { Text, View } from "react-native";

export default function Description({ data, style: styles }) {
    return (
        <View style={styles.info}>
            <Text style={styles.descHeader}>{data.description}</Text>
            <Text style={styles.descBody}>{data.details}</Text>
        </View>
    );
}
