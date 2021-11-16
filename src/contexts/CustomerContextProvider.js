import React, { useReducer } from "react";
import CustomerContext from "./customer-context";


const defaultState = {
    items: [],
    category: [],
    cart: [],
    orders: [],
    isLoading: true,
    error: null,
};

const dataReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        return {
            ...state,
            isLoading: false,
        };
    }
    if (action.type === "SET_DATA") {
        return {
            ...state,
            category: action.payload.categories,
            items: action.payload.foods,
            isLoading: false,
        };
    }
    return state;
};

export default function DataContextProvider({ children }) {
    const [dataState, dispatchData] = useReducer(dataReducer, defaultState);
    const addToCartHandler = (item) => {
        console.log(item)
        dispatchData({ type: "ADD_ITEM", payload: item });
    };
    const removeFromCartHandler = (info) => {
        dispatchData({ type: "REMOVE_ITEM", payload: item });
    };
    const addFoodData = async () => {
            try {
                const response = await fetch("http://192.168.0.105:5000/foods/all");
                const newdata = await response.json();
                await dispatchData({ type: "SET_DATA", payload: newdata.result });
            } catch (err) {
                console.log(err);
            }
        
    };

    const state = {
        cart: [],
        orders: [],
        isLoading: dataState.isLoading,
        items: dataState.items,
        category: dataState.category,
        error: dataState.error,
        addToCart: addToCartHandler,
        removeCart: removeFromCartHandler,
        addData: addFoodData,
    };

    
    return (
        <CustomerContext.Provider value={state}>
            {children}
        </CustomerContext.Provider>
    );
}
