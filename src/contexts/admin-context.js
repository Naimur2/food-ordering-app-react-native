import React from "react";

const AdminContext = React.createContext({
    logInHandler:()=>{},
    logOutHandler:()=>{},
    getOrders:()=>{},
    orders:[],
    items:[],
    deliveryFee:0,
    updateOrder:()=>{},
    categories:[],
});

export default AdminContext;
