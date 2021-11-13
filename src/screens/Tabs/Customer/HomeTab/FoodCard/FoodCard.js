import React from "react";
import { Pressable,StyleSheet } from "react-native";

import RenderImage from "../../../../../common/RenderImage";
import FoodCardInfo from "./FoodCardInfo";

export default function FoodCard({ propData, navigation }) {
    const onPressHandler = () => {
        navigation.navigate("Food", { ...propData });
    };
 
    return (

        <Pressable onPress={onPressHandler} style={styles.card}>
            <RenderImage
                style={styles.image}
                source={`uploads/${propData.images[0]}`}
            />
            <FoodCardInfo propData={propData} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        flexDirection: "row",
        width: "100%",
        overflow: "hidden",
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
        height: 120,
    },
    image: {
        width: 120,
        height: "auto",
    },
});
