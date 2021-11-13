import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FoodDetails from "../Customer/FoodDetails";
import HomeScreen from "../Customer/HomeScreen";
import React from "react";

const SettingsStack = createNativeStackNavigator();

export default function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerShown: false,
            }}
        >
            <SettingsStack.Screen name="Main" component={HomeScreen} />
            <SettingsStack.Screen name="Food" component={FoodDetails} />
        </SettingsStack.Navigator>
    );
}
