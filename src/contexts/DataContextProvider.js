import React, { useReducer, useEffect } from "react";
import DataContext from "./data-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultState = {
    data: [],
    category: [],
    isLoggedIn: false,
    error: null,
    isLoading: false,
    user: {},
};

const dataReducer = (state, action) => {
    if (action.type === "LOGIN") {
        return {
            ...state,
            user: action.payload,
            isLoading: false,
            isLoggedIn: true,
        };
    }
    if (action.type === "LOGOUT") {
        return {
            ...state,
            user: {},
            isLoading: false,
            isLoggedIn: false,
        };
    }
    return state;
};

export default function DataContextProvider({ children }) {
    const [dataState, dispatchData] = useReducer(dataReducer, defaultState);

    const setDataHandler = async (info) => {
        try {
            await AsyncStorage.setItem("@acc_token", info.access_token);
            dispatchData({ type: "LOGIN", payload: info.user });
     
        } catch (e) {
            console.log(e);
        }
    };

const logOutHandler = async () => {
    try {
        await AsyncStorage.removeItem("@acc_token");
        dispatchData({ type: "LOGOUT" });
    } catch (e) {
        console.log(e);
    }
};


    const state = {
        data: dataState.data,
        category: dataState.category,
        isLoading: dataState.isLoading,
        isLoggedIn: dataState.isLoggedIn,
        error: dataState.error,
        setData: setDataHandler,
        user: dataState.user,
        onLogOut: logOutHandler,
    };

    return (
        <DataContext.Provider value={state}>{children}</DataContext.Provider>
    );
}
