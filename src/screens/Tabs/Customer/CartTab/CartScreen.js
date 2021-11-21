import React, { useContext } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Item from "./Item";
import CustomerContext from "../../../../contexts/customer-context";
import TotalContainer from "./TotalContainer";

export default function CartScreen({ navigation }) {
    const customerCtx = useContext(CustomerContext);

    const checkOutHandler = () => { 
    if(customerCtx.address.length<=0){
        navigation.navigate("AddAddress")
    }
    else{
        navigation.navigate("SelectAddress")
    }
    };

    return (
        <>
            {customerCtx.cart.length > 0 ? (
                <View>
                    <ScrollView contentContainerStyle={styles.container}>
                        {customerCtx.cart.map((item) => (
                            <Item key={item._id} item={item} />
                        ))}
                    </ScrollView>
                    <TotalContainer onCheckout={checkOutHandler} total={customerCtx.totalCartAmount} />
                </View>
            ) : (
                <View style={styles.emptyCart}>
                    <Text style={{fontWeight:'bold', fontSize:20}}>Your cart is empty</Text>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 80,
        paddingTop: 10,

    },
    emptyCart: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

});
