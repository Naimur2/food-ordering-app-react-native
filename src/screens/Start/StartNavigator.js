import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreeen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const StartNavigator = () => {
    const InitialStack = createNativeStackNavigator();
    return (
        <InitialStack.Navigator
            screenOptions={{
                // headerStyle: {
                //     backgroundColor: "#f4511e",
                // },
                // headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerTitleAlign: "center",
            }}
            initialRouteName="Login"
        >
            <InitialStack.Screen name="Register" component={RegisterScreen} />
            <InitialStack.Screen name="Login" component={LoginScreeen} />
        </InitialStack.Navigator>
    );
};

export default StartNavigator;
