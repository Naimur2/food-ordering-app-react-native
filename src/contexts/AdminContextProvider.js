import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useReducer } from "react";
import AdminContext from "./admin-context";
import DataContext from "./data-context";

const defaultState = {
    isLoading: true,
    orders: [],
    foods: [],
    categories: [],
    deliveryFee: 0,
};

const dataReducer = (state, action) => {
    if (action.type === "ORDERS") {
        return {
            ...state,
            orders: action.payload.orders,
            foods: action.payload.foods,
            categories: action.payload.categories,
            isLoading: false,
        };
    }
    if (action.type === "UPDATE_ORDER") {
        return {
            ...state,
            orders: action.payload,
        };
    }
    if (action.type === "LOG_OUT") {
        return {
            ...state,
            orders: [],
        };
    }

    return state;
};

export default function AdminContextProvider({ children }) {
    const [dataState, dispatchData] = useReducer(dataReducer, defaultState);
    const dataContext = useContext(DataContext);

    const logOut = async () => {
        try {
            // remove user data
            await dataContext.onLogOut();
            await AsyncStorage.removeItem("@acc_token");
            dispatchData({ type: "LOG_OUT" });
        } catch (err) {
            console.log("error here 3", err);
        }
    };

    const logIn = async (data) => {
        try {
            // check  if access token ccessexists
            const key = await AsyncStorage.getItem("@acc_token");
            if (key) {
                // remove if access token ccessexists
                await AsyncStorage.removeItem("@acc_token");
            }
            // get user id
            const { _id: userId } = data.user;

            // add access token
            await AsyncStorage.setItem("@acc_token", data.access_token);
            // remove data,cart dataaddress data, orders data
            await dataContext.onLogIn(data.user);
        } catch (err) {
            console.log(err);
        }
    };

    const updateOrder = async (order, type) => {
        try {
            // get access token
            const key = await AsyncStorage.getItem("@acc_token");
            // get oreders id
            const orderId = order._id;
            // update server side order state
            const body = {
                orderId,
                status: type,
            };

            const fetchedData = await fetch(
                "http://192.168.0.105:5000/orders/update",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${key}`,
                    },
                    body: JSON.stringify(body),
                }
            );

            const filtredOrder = await dataState.orders.filter(item=>item._id !== orderId);

            const output = await fetchedData.json();
            await filtredOrder.push(output.result);
        
            await dispatchData({ type: "UPDATE_ORDER", payload: filtredOrder });

        } catch (err) {
            console.log(err);
        }
    };

    const getOrders = async () => {
        try {
            const key = await AsyncStorage.getItem("@acc_token");
            const result = await fetch(
                "http://192.168.0.105:5000/user/admindata",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${key}`,
                    },
                    body: JSON.stringify({ type: "all" }),
                }
            );

            const newData = await result.json();
            const finalResult = await newData.result;

            // update state
            await dispatchData({
                type: "ORDERS",
                payload: finalResult,
            });
        } catch (err) {
            console.log("Error 13", err);
        }
    };

    const state = {
        logOutHandler: logOut,
        logInHandler: logIn,
        getOrders,
        orders: dataState.orders,
        items: dataState.foods,
        deliveryFee: dataState.deliveryFee,
        updateOrder,
        categories: dataState.categories,
    };

    return (
        <AdminContext.Provider value={state}>{children}</AdminContext.Provider>
    );
}
