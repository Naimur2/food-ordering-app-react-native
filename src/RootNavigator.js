import { NavigationContainer } from "@react-navigation/native";
import CustomerRoute from "./screens/Tabs/Customer/CustomerRoute";
import React, { useEffect, useState } from "react";
import DataContext from "./contexts/data-context";
import StartNavigator from "./screens/Start/StartNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";

export default function RootNavigator() {
    const dataCtx = React.useContext(DataContext);
    const isLoggedIn = dataCtx.isLoggedIn;
    const user = dataCtx.user;
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const key = await AsyncStorage.getItem("@acc_token");
                if (key) {
                    const response = await fetch(
                        "http://192.168.0.105:5000/user/auth",
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${key}`,
                            },
                        }
                    );
                    const { result } = await response.json();
                    const data = await { access_token: key, user: result };
                    await dataCtx.onLogIn(data);
                    setIsLoading(false);
                }
                if (!key) {
                    setIsLoading(false);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, []);

    const renderScreen = () => {

        if (isLoggedIn && user.role === "customer")
            return <CustomerRoute />;

        return <StartNavigator />;

    };

    return <NavigationContainer>{isLoading ? (<Text>Loading...</Text>) : renderScreen()}</NavigationContainer>;
}
