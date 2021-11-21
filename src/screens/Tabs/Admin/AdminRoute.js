import React,{useEffect,useContext} from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import OrdersScreen from "./Orders/OrdersScreen";
import ProductsScreen from "./ProductsScreen";
import AdminContext from "../../../contexts/admin-context";
import AddCategory from "./AddCategory";
import AddFood from "./AddFood";
import CategoriesScreen from "./CategoriesScreen";
import DeliverManRoute from "./Deliveryman/DeliverManRoute";
import MyAccountScreen from "../Customer/SettingsTab/MyAccountScreen";
import OrderDetails from "../Customer/SettingsTab/OrderDetails";

const HomeStack = createNativeStackNavigator();

export default function AdminRoute() {
    const { container } = styles;
const adminCtx = useContext(AdminContext);
    useEffect(() => {
         adminCtx.getOrders();
      }, []);

    return (
        <HomeStack.Navigator
            initialRouteName="Main"
        >
            <HomeStack.Screen name="Main" component={HomeScreen} />
            <HomeStack.Screen name="Orders" component={OrdersScreen} />
            <HomeStack.Screen name="Products" component={ProductsScreen} />
            <HomeStack.Screen name="AddFood" component={AddFood} />
            <HomeStack.Screen name="AddCategory" component={AddCategory} />
            <HomeStack.Screen name="Categories" component={CategoriesScreen} />
            <HomeStack.Screen name="DeliveryMan" component={DeliverManRoute} />
            <HomeStack.Screen name="ManageProfile" component={MyAccountScreen} />
            <HomeStack.Screen name="OrderDetails" component={OrderDetails} />
        </HomeStack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
});
