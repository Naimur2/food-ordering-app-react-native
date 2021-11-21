import React, { useReducer, useEffect } from "react";
import DataContext from "./data-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultState = {
    isLoggedIn: false,
    error: null,
    isLoading: true,
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
    if (action.type === "SET_LOADING") {
        return {
            ...state,
            isLoading: action.payload,

        };
    }
    return state;
};

export default function DataContextProvider({ children }) {
    const [dataState, dispatchData] = useReducer(dataReducer, defaultState);

    const logInHandler = async (user) => {
        try {
            dispatchData({ type: "LOGIN", payload: user });
        } catch (err) {
            console.log("error here 11",err);
        }
    };

const logOutHandler = async () => {
    try {
        await AsyncStorage.removeItem("@acc_token");
        await dispatchData({ type: "LOGOUT" });
    } catch (err) {
        console.log("error here 12",err);
    }
};


    const state = {
        isLoading: dataState.isLoading,
        isLoggedIn: dataState.isLoggedIn,
        error: dataState.error,
        onLogIn: logInHandler,
        user: dataState.user,
        onLogOut: logOutHandler,
        setLoading: (isLoading) => {    
            dispatchData({ type: "SET_LOADING", payload: isLoading });
        }
    };

    return (
        <DataContext.Provider value={state}>{children}</DataContext.Provider>
    );
}
