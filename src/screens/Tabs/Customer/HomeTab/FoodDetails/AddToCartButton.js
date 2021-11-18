import React from "react";
import { View,StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import CustomerContext from "../../../../../contexts/customer-context";


const AddToCartButton = ({ style, item }) => {
    const customerCtx = React.useContext(CustomerContext);
    const cart =[...customerCtx.cart];
    const product = cart.filter(it => it.productId === item.productId);
    const renderTitle = () => {
        if (product && product.length > 0 && product[0].quantity > 0) {
            return "Remove from cart";
        } else {
            return "Add to cart";
        }
    };

    const addRemoveFromCart = () => {
        if (product && product.length > 0 && product[0].quantity > 0) {
            customerCtx.removeFromCart(item.productId);
        } else {
            customerCtx.addToCart(item);
        }
    };

    return (
        <View >
            <Button
                titleStyle={{ fontSize: 18, textTransform: "uppercase" }}
                buttonStyle={product && product.length>0 ? styles.removeCartButton : styles.addToCartButton}
                title={renderTitle()}
                onPress={addRemoveFromCart}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    addToCartButton: {
        backgroundColor: "#ff5a60",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },
    removeCartButton:{
        backgroundColor: "red",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    }
});


export default AddToCartButton;
