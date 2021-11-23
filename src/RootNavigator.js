import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import CustomerContext from "./contexts/customer-context";
import DataContext from "./contexts/data-context";
import StartNavigator from "./screens/Start/StartNavigator";
import AdminRoute from "./screens/Tabs/Admin/AdminRoute";
import CustomerRoute from "./screens/Tabs/Customer/CustomerRoute";
import AdminContext from "./contexts/admin-context";

export default function RootNavigator() {
    const dataCtx = React.useContext(DataContext);
    const customerCtx = React.useContext(CustomerContext);
    const adminCtx = React.useContext(AdminContext);
    const isLoggedIn = dataCtx.isLoggedIn;
    const user = dataCtx.user;
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            dataCtx.setLoading(true);
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

                    if (result.role === "customer" ) {
                        customerCtx.logInHandler(data);
                    }
                    if (result.role === "admin") {
                        adminCtx.logInHandler(data);
                    }
                    await dataCtx.onLogIn(data);
                    await dataCtx.setLoading(true);
                }
                if (!key) {
                    await dataCtx.setLoading(false);
                }
            } catch (e) {
                console.log("error here 2",e);
            }
        };
        getData();
    }, []);

    const renderScreen = () => {
        if (isLoggedIn && user.role === "customer") return <CustomerRoute />;
        if (isLoggedIn && user.role === "admin") return <AdminRoute />;

        return <StartNavigator />;
    };

    return (
        <NavigationContainer>
            {dataCtx.isLoading ? (
                <ActivityIndicator
                    style={{
                        position: "absolute",
                        top: "40%",
                        left: "45%",
                    }}
                    size="large"
                    color="red"
                />
            ) : (
                renderScreen()
            )}
        </NavigationContainer>
    );
}
