import React from "react";

const CustomerContext = React.createContext({
    items: null,
    category: null,
    cart: [],
    orders: [],
    isLoading: null,
    error: null,
    addToCart: null,
    removeCart: null,
    addData: null,
});

export default CustomerContext;
