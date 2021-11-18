import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon, Image } from "react-native-elements";

import CustomerContext from "../../../../contexts/customer-context";
const Item = (data) => {
    const customerCtx = useContext(CustomerContext);
    const { item } = data;

    const product = customerCtx.items.filter(
        (i) => item.productId === i._id
    )[0];
    const cart = customerCtx.cart;
    const min = product.min || "1";
    const max = product.max || "5";
    const steps = product.steps || "1";

    const onChangeHandler = (type) => {
        const { quantity } = cart.filter(
            (i) => i.productId === item.productId
        )[0];
        let newCount = quantity;
        if (type === "increment") {
            if (newCount < +max) {
                newCount = quantity + +steps;
            }
        }
        if (type === "decrement") {
            if (newCount > +min) {
                newCount = quantity - +steps;
            }
        }

        const cartItem = cart.filter((i) => i.productId === product._id);
        if (cartItem && cartItem.length > 0) {
            customerCtx.updateItem(cartItem[0].productId, newCount);
        }
    };

    const source = "http://192.168.0.105:5000/uploads/" + product.images[0];

    return (
        <View style={styles.item}>
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: source,
                    }}
                    style={styles.image}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>{product.price} Tk </Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityDecrementButton}
                        onPress={() => onChangeHandler("decrement")}
                    >
                        <Icon
                            name="minus"
                            type="font-awesome"
                            color="#000"
                            size={20}
                        />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={styles.quantityIncrementButton}
                        onPress={() => onChangeHandler("increment")}
                    >
                        <Icon
                            name="plus"
                            type="font-awesome"
                            color="#000"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.deleteContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => customerCtx.removeFromCart(item.productId)}
                >
                    <Icon
                        name="trash"
                        type="font-awesome"
                        color="#000"
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        height: "100%",
        width: "30%",
        overflow: "hidden",
        marginRight: 10,
    },
    item: {
        width: "100%",
        backgroundColor: "#fff",
        height: 120,
        borderRadius: 10,
        padding: 5,
        flexDirection: "row",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    infoContainer: {
        //   flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: "50%",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "green",
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: "#000",
    },
    quantityContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        alignSelf: "flex-start",
    },
    quantityIncrementButton: {
        width: 30,
        height: 30,
        backgroundColor: "#cca",
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    quantityDecrementButton: {
        width: 30,
        height: 30,
        backgroundColor: "#cca",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    quantity: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        minWidth: 25,
        height: 30,
        textAlign: "center",
        backgroundColor: "red",
        paddingVertical: 2,
    },
    deleteContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: "20%",
    },
    deleteButton: {
        width: 30,
        height: 30,
        backgroundColor: "#cca",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
});

export default Item;
