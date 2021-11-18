import React from "react";

const CustomerContext = React.createContext({
    items: null,
    category: null,
    cart: [],
    orders: [],
    isLoading: null,
    error: null,
    addToCart: null,
    removeRomCart: null,
    addData: null,
    totalCartAmount:null,
    totalCartItems:null,
    deliveryFee:null,
    updateItem:null,
    address:null,
    updateAddress:()=>{},
    orderHandler:()=>{},
    logInHandler:()=>{},
    logOutHandler:()=>{},
});

export default CustomerContext;
