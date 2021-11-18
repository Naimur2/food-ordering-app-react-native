import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Icon, Image, Button } from "react-native-elements";
import CustomerContext from "../../../../contexts/customer-context";
import DataContext from "../../../../contexts/data-context";

const list = [
    {
        title: "Appointments",
        icon: "av-timer",
    },
    {
        title: "Trips",
        icon: "flight-takeoff",
    },
];

export default function OrderTab({ navigation, route }) {
    const { cart, items, deliveryFee } = React.useContext(CustomerContext);
    const { user } = React.useContext(DataContext);
    const totalCount = cart.reduce((curr, item) => {
        return curr + item.quantity * item.price;
    }, 0);

    const output = cart.map((cc) => {
        let com = items.filter((i) => cc.productId === i._id);
        return { cartContent: cc, product: com[0] };
    });
    const subTotal = totalCount + +deliveryFee;
    const params = route.params;

    
    const customerCtx = React.useContext(CustomerContext);

    const orderHandler = async () => {
        const orderDetails = {
            address: params,
            cartdetails: cart,
            user: user._id,
            deliveryStatus: "pending",
            paymentStatus: "pending",
            totalPrice: subTotal,
            deliveryFee: deliveryFee,
        };
        await customerCtx.orderHandler(orderDetails,"add");
        await navigation.navigate("CartScreen");
    };



    return (
        <View>
            <Text style={styles.confirm}>Confirm Your Order</Text>
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

            <View style={styles.totalContainer}>
                <Text style={styles.total}>Total:</Text>
                <Text style={styles.total}> {totalCount} Tk</Text>
            </View>
            <View style={styles.deliveryFee}>
                <Text style={styles.total}>D. Fee:</Text>
                <Text style={styles.total}> {deliveryFee} Tk</Text>
            </View>
            <View style={styles.subTotal}>
                <Text style={styles.total}>Subtotal</Text>
                <Text style={styles.total}> {subTotal} Tk</Text>
            </View>
            <View style={styles.subTotal}>
                <Text style={styles.total}>Payment: Cash On Delivery</Text>
            </View>
            <Button
                buttonStyle={styles.confirmBtn}
                title="Confirm Order"
                onPress={orderHandler}
            />
            <Button
                buttonStyle={styles.cancelBtn}
                title="Cancel Order"
                onPress={() => navigation.navigate("CartScreen")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
        marginTop: 50,
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
    total: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 5,
        textAlign: "center",
    },
});
