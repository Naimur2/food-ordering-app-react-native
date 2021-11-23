import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "./SettingsScreen";
import React from "react";
import AddNewAddress from "./AddNewAddress";
import OrdersScreen from "./OrdersScreen";
import OrderDetails from "./OrderDetails";
import AddressTab from "./AddressTab";
import MyAccountScreen from "./MyAccountScreen";
import EditAddress from "./EditAddressTab";

const SettingsStack = createNativeStackNavigator();

export default function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerShown: false,
            }}
        >
            <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
            <SettingsStack.Screen name="AddAddress" component={AddNewAddress} />
            <SettingsStack.Screen name="AddressTab" component={AddressTab} />
            <SettingsStack.Screen name="Orders" component={OrdersScreen} />
            <SettingsStack.Screen name="OrderDetails" component={OrderDetails} />
            <SettingsStack.Screen name="MyAccount" component={MyAccountScreen} />
            <SettingsStack.Screen name="EditAddress" component={EditAddress} />
        </SettingsStack.Navigator>
    );
}
