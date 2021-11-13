import React from "react";
import { StyleSheet, View } from "react-native";
import RenderImage from "../../../../../common/RenderImage";
import IncrementDecrement from "../../components/IncrementDecrement";
import AddToCartButton from "./AddToCartButton";
import Description from "./Description";
import Header from "./Header";
import Offers from "./Offers";

export default function FoodDetails({ route, navigation }) {
    const params = route.params;
    const image = `uploads/${params.images[0]}`;
    return (
        <View style={styles.container}>
            <View>
                <RenderImage source={image} containerStyle={styles.image} />
                <View style={styles.textContent}>
                    <Offers style={styles} data={params} />
                    <Header style={styles} data={params} />
                    <Description style={styles} data={params} />
                </View>
            </View>
            <IncrementDecrement min="1" max="5" />
            <AddToCartButton style={styles} />
        </View>
    );
}

const styles = StyleSheet.create({
    addToCartButton: {
        backgroundColor: "red",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 10,
        justifyContent: "space-between",
    },
    image: {
        width: "100%",
        height: 200,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 10,
    },
    info: {
        width: "100%",
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        textAlignVertical: "center",
        borderRadius: 10,
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    price: {
        fontWeight: "bold",
        fontSize: 20,
        color: "green",
    },
    textContent: {
        width: "100%",
    },
    desc: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    descHeader: {
        fontWeight: "bold",
        fontSize: 17,
        paddingBottom: 5,
        textAlign: "left",
        color: "#3EA513",
        letterSpacing: 1,
        textTransform: "capitalize",
    },
    descBody: {
        textAlign: "justify",
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 1,
    },
    icon: {
        paddingVertical: 3,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconText: {
        fontWeight: "bold",
        color: "darkblue",
    },
});
