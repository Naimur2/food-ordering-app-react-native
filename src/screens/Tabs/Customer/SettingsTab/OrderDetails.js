import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { ListItem, Icon, Image, Button } from "react-native-elements";
import AdminContext from "../../../../contexts/admin-context";
import CustomerContext from "../../../../contexts/customer-context";
import AcceptRejectButton from "./AcceptRejectButton";

export default function OrderDetails({ navigation, route }) {
    const adminCtx = useContext(AdminContext);
    const customerCtx = useContext(CustomerContext);

    // get all information from route
    const { order, output, deliveryFee, role } = route.params;

    // get required information from order
    const {
        address,
        totalPrice: subTotal,
        deliveryStatus,
        cartdetails,
    } = order;

    const [orderStatus, setOrderStatus] = useState(deliveryStatus);

    useEffect(() => {
        const orderId = order._id;
        let filtered;
        if (role === "customer") {
            filtered = customerCtx.orders.filter((ord) => ord._id === orderId);
            setOrderStatus(filtered[0].deliveryStatus);
        }
        if (role === "admin") {
            filtered=adminCtx.orders.filter((ord) => ord._id === orderId);
            setOrderStatus(filtered[0].deliveryStatus);
        }
    }, [customerCtx, adminCtx]);

    // get information from addres
    const {
        name: customername,
        phone,
        addressline1: address1,
        addressline2: address2,
    } = address;

    const city = "Dhaka";
    const fulladdress = `${address1}, ${address2}, ${city}`;

    const date = new Date(order.createdAt);
    const dateString = date.toDateString();
    const timeString = date.toLocaleTimeString();
    const dateTimeString = `${dateString} ${timeString}`;

    return (
        <ScrollView>
            <Text style={styles.confirm}>Order Details</Text>
            {output.map((item, i) => (
                <ListItem key={item.cartContent._id} bottomDivider>
                    <Image
                        style={styles.image}
                        source={{
                            uri: `http://192.168.0.105:5000/uploads/${item.product.images[0]}`,
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{item.product.title}</ListItem.Title>
                        <ListItem.Subtitle>
                            {item.product.description}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>
                            {item.product.price} Tk
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <Text>x{item.cartContent.quantity}</Text>
                </ListItem>
            ))}

            <View style={{ paddingVertical: 10 }}>
                <View style={styles.customer}>
                    <Text style={styles.customerHeader}>Name: </Text>
                    <Text style={styles.customerDetails}> {customername}</Text>
                </View>
                <View style={styles.customer}>
                    <Text style={styles.customerHeader}>Address: </Text>
                    <Text style={styles.customerDetails}> {fulladdress}</Text>
                </View>
                <View style={styles.customer}>
                    <Text style={styles.customerHeader}>Phone: </Text>
                    <Text style={styles.customerDetails}> {phone}</Text>
                </View>
                <View style={styles.customer}>
                    <Text style={styles.customerHeader}>Order Date: </Text>
                    <Text style={styles.customerDetails}>
                        {" "}
                        {dateTimeString}
                    </Text>
                </View>
            </View>
            <View style={styles.totalContainer}>
                <Text style={styles.total}>Total:</Text>
                <Text style={styles.total}> {subTotal} Tk</Text>
            </View>
            <View style={styles.deliveryFee}>
                <Text style={styles.total}>D. Fee:</Text>
                <Text style={styles.total}> {deliveryFee} Tk</Text>
            </View>
            <View style={styles.subTotal}>
                <Text style={styles.total}>Sub total</Text>
                <Text style={styles.total}> {subTotal} Tk</Text>
            </View>
            <View style={styles.subTotal}>
                <Text style={styles.total}>Payment: Cash On Delivery</Text>
            </View>
            <View style={styles.status}>
                <Text style={styles.total}>Status: {orderStatus}</Text>
            </View>
            {role === "admin" && (
                <AcceptRejectButton
                    role={role}
                    order={order}
                    orderStatus={orderStatus}
                />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    customer: {
        flexDirection: "row",
        paddingHorizontal: 10,
        marginTop: 5,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 10,
        marginRight: 10,
        marginVertical: 5,
    },
    confirmBtn: {
        backgroundColor: "#00a680",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    cancelBtn: {
        backgroundColor: "red",
        marginTop: 5,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    confirm: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "center",
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginTop: 10,
    },
    deliveryFee: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginTop: 5,
        paddingBottom: 10,
        borderBottomColor: "#00a680",
        borderBottomWidth: 1,
    },
    subTotal: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginBottom: 10,
    },
    status: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginBottom: 10,
    },
    total: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 5,
        textAlign: "center",
        textTransform: "capitalize",
    },
    customerHeader: {
        fontSize: 16,
        fontWeight: "bold",
    },
    customerDetails: { fontSize: 16, textTransform: "capitalize" },
});
