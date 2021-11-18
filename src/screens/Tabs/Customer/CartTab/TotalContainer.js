import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";


export default function TotalContainer({ total, onCheckout }) {
    return (
        <View style={styles.totalContainer}>
            <View style={styles.total}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalTextValue}>{total} Tk</Text>
            </View>
            <View style={styles.checkoutButtonContainer}>
                <Button
                    titleStyle={{
                        fontSize: 18,
                        textTransform: "uppercase",
                        color: "white",
                    }}
                    buttonStyle={styles.addToCartButton}
                    title="Checkout"
                    onPress={onCheckout}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    totalContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingVertical: 5,
        width: "100%",
        position: "absolute",
        bottom: 0,
        top: "auto",
        zIndex: 1,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    total: {
        width: "50%",
        paddingVertical: 5,
    },
    totalText: {
        fontSize: 20,
        fontWeight: "bold",
        width: "100%",
        color: "green",
        paddingHorizontal: 5,
    },
    totalTextValue: {
        fontSize: 20,
        fontWeight: "bold",
        width: "100%",
        paddingHorizontal: 5,
        color: "darkblue",
    },

    checkoutButtonContainer: {
        width: "50%",
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    addToCartButton: {
        backgroundColor: "red",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#ccc",
    },
});
