
import { NavigationContainer } from "@react-navigation/native";
import CustomerRoute from "./screens/Tabs/Customer/RouteNavigators/CustomerRoute";
import React from 'react';
import DataContext from "./contexts/data-context";
import StartNavigator from "./screens/Start/StartNavigator";




export default function RootNavigator() {
    const dataCtx = React.useContext(DataContext);
    const isLoggedIn = dataCtx.isLoggedIn;
    return (
            <NavigationContainer>
                {isLoggedIn ? <CustomerRoute /> : <StartNavigator />}
                
            </NavigationContainer>
    );
}


