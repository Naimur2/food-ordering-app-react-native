import React, { useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import CustomerContext from "../../../../contexts/customer-context";

export default function OrdersScreen({ navigation }) {
    const { orders, items, deliveryFee } = useContext(CustomerContext);

    const getDate = (date) => {
        const orderDate = new Date(date);
        const dateString = orderDate.toDateString();
        const timeString = orderDate.toLocaleTimeString();
        return `${dateString} ${timeString}`;
    };

    if (orders.length === 0) {
        return (
            <View style={styles.container}>
                <Text>You have no orders no Orders to show </Text>
            </View>
        );
    }

    const navigationHandler = (order) => {
        // get food information and cart and food information using individual cart id
        const output = order.cartdetails.map((cart) => {
            let com = items.filter((i) => cart.productId === i._id);
            return { cartContent: cart, product: com[0] };
        });

        navigation.navigate("OrderDetails", { order, output, deliveryFee,role:"customer" });
    };

    return (
        <ScrollView>
            <Text
                style={{
                    fontWeight: "bold",
                    padding: 10,
                    textAlign: "center",
                    fontSize: 20,
                }}
            >
                Orders
            </Text>
            <View>
                {orders.map((order, i) => (
                    <ListItem
                        key={order._id || i}
                        onPress={() => navigationHandler(order)}
                        bottomDivider
                    >
                        <Icon name="tag" />
                        <ListItem.Content>
                            <ListItem.Title style={{ flexDirection: "row" }}>
                                <Text style={{ textTransform: "uppercase" }}>
                                    Id: {order._id}
                                </Text>
                            </ListItem.Title>
                            <ListItem.Title style={{ flexDirection: "row" }}>
                                <Text
                                    style={{
                                        textTransform: "uppercase",
                                        fontSize: 14,
                                    }}
                                >
                                    Status: {order.deliveryStatus}
                                </Text>
                            </ListItem.Title>
                            <ListItem.Subtitle style={{ flexDirection: "row" }}>
                                <Text
                                    style={{
                                        textTransform: "uppercase",
                                        fontSize: 14,
                                    }}
                                >
                                    Created At: {getDate(order.createdAt)}
                                </Text>
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
});
