import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CartScreen from "./CartScreen";
import React from "react";

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
        </CartStack.Navigator>
    );
}
