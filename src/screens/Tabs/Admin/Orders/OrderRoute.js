import React,{useEffect,useContext} from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewOrder from "./ViewOrder";
import OrdersScreen from "./OrdersScreen";
import OrderDetails from "../../Customer/SettingsTab/OrderDetails";
import OrdersMenu from "./OrdersMenu";


const OrderStack = createNativeStackNavigator();

export default function OrderRoute() {

    return (
        <OrderStack.Navigator
            initialRouteName="OrdersMenu"
            screenOptions={{
                headerShown: false
              }}
        >
            <OrderStack.Screen name="ViewOrder" component={ViewOrder} />
            <OrderStack.Screen name="AllOrder" component={OrdersScreen} />
            <OrderStack.Screen name="OrdersMenu" component={OrdersMenu} />
            <OrderStack.Screen name="OrderDetails" component={OrderDetails} />
        </OrderStack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
});
