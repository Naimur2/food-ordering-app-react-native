import React, { useReducer } from "react";
import DataContext from "./data-context";
import { AsyncStorage } from 'react-native';


const defaultState = {
    data: [],
    category: [],
    isLoggedIn: true,
    isLoading: false,
    error: null,
};

const dataReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_DATA":
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case "FETCH_DATA_SUCCESS":
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case "FETCH_DATA_FAILURE":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export default function DataContextProvider({ children }) {
    const [dataState, dispatchData] = useReducer(dataReducer, defaultState);
    
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const state = {
        data: data,
        category: "",
        isLoading: loading,
        isLoggedIn: defaultState.isLoggedIn,
        error: error,
        getData: () => {},
        deleteData: () => {},
    };
    return (
        <DataContext.Provider value={state}>{children}</DataContext.Provider>
    );
}
