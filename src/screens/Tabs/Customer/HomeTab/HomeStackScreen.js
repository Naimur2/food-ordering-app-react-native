import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FoodDetails from "./FoodDetails/FoodDetails";
import HomeScreen from "./HomeScreen";
import React from "react";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerShown: false,
            }}
        >
            <HomeStack.Screen name="Main" component={HomeScreen} />
            <HomeStack.Screen name="Food" component={FoodDetails} />
        </HomeStack.Navigator>
    );
}
