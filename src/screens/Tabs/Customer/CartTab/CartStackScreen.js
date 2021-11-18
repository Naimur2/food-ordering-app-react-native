import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CartScreen from "./CartScreen";
import React from "react";
import SelectAddress from "./SelectAddress";
import AddNewAddress from "../SettingsTab/AddNewAddress";
import OrderTab from "./OrderTab";

const CartStack = createNativeStackNavigator();

export default function CartStackScreen() {
    return (
        <CartStack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerShown: false,
            }}
        >
            <CartStack.Screen name="CartScreen" component={CartScreen} />
            <CartStack.Screen name="AddAddress" component={AddNewAddress} />
            <CartStack.Screen name="SelectAddress" component={SelectAddress} />
            <CartStack.Screen name="Order" component={OrderTab} />
        </CartStack.Navigator>
    );
}
