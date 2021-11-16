import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreen from "./SearchScreen";
import React from "react";

const SearchStack = createNativeStackNavigator();

export default function SearchStackScreen() {
    return (
        <SearchStack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerShown: false,
            }}
        >
            <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
        </SearchStack.Navigator>
    );
}
