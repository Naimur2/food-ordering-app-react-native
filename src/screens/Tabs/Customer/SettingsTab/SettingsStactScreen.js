import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "./SettingsScreen";
import React from "react";
import AddNewAddress from "./AddNewAddress";

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
        </SettingsStack.Navigator>
    );
}
