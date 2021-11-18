import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import RenderImage from "../../../../../common/RenderImage";
import IncrementDecrement from "../../components/IncrementDecrement";
import AddToCartButton from "./AddToCartButton";
import Description from "./Description";
import Header from "./Header";
import Offers from "./Offers";
import CustomerContext from "../../../../../contexts/customer-context";

export default function FoodDetails({ route, navigation }) {
    const params = route.params;
    const image = `uploads/${params.images[0]}`;
    const customerContext = useContext(CustomerContext);
    const [counter, setCounter] = useState(1);
    const cart = customerContext.cart;

    useEffect(() => {
        const getValue = () => {
            const product = cart.filter((i) => i.productId === params._id);
            if (product && product.length > 0) {
                setCounter(product[0].quantity);
            }
        };
        getValue();
    }, [customerContext.cart]);

    const onChangeHandler = (type, steps, max, min) => {
        let newCount = counter;
        if (type === "increment") {
            if (counter < +max) {
                 newCount = counter + +steps;
               
            }
        }
        if (type === "decrement") {
            if (counter > +min) {
                 newCount = counter - +steps;
            }
        }

        const product = cart.filter((i) => i.productId === params._id);
            if (product && product.length > 0) {
                customerContext.updateItem(product[0].productId, newCount);
            }

        setCounter(newCount);
    };

    const item = {
        productId: params._id,
        quantity: counter,
        price: params.price,
        deliveryCharge: params.deliveryCharge,
    };

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
            <View
                style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <IncrementDecrement
                    containerStyle={{ width: 300 }}
                    onChange={onChangeHandler}
                    min={params.min || "1"}
                    max={params.max || "5"}
                    steps={params.steps || "1"}
                    value={counter}
                />
            </View>
            <AddToCartButton item={item} style={styles} />
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
