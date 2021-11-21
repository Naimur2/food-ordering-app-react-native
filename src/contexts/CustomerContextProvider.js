import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useReducer } from "react";
import CustomerContext from "./customer-context";
import DataContext from "./data-context";

const defaultState = {
    items: [],
    category: [],
    cart: [],
    orders: [],
    isLoading: true,
    error: null,
    totalCartAmount: 0,
    deliveryFee: 0,
    address: [],
};

const dataReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        const { item, totalAmount: totalCartAmount } = action.payload;
        const cart = [...state.cart, item];

        return {
            ...state,
            cart,
            totalCartAmount,
        };
    }
    if (action.type === "UPDATE_CART") {
        const { newCart: cart, totalAmount: totalCartAmount } = action.payload;
        return {
            ...state,
            cart,
            totalCartAmount,
            isLoading: false,
        };
    }

    if (action.type === "SET_DATA") {
        return {
            ...state,
            category: action.payload.foodData.categories,
            items: action.payload.foodData.foods,
            isLoading: false,
            cart: action.payload.cart,
            address: action.payload.address,
            orders: action.payload.orders,
            totalCartAmount: action.payload.totalAmount,
        };
    }

    if (action.type === "LOGGED_IN") {
        return {
            ...state,
            isLoading: false,
            cart: action.payload.cart,
            address: action.payload.address,
            orders: action.payload.orders,
            totalCartAmount: action.payload.totalAmount,
        };
    }


    if (action.type === "REMOVE_DATA") {
        return {
            ...state,
            isLoading: false,
            cart: [],
            address: [],
            orders: [],
            totalCartAmount: 0,
        };
    }

    if (action.type === "ADD_ADDRESS") {
        return {
            ...state,
            address: action.payload,
            isLoading: false,
        };
    }
    if (action.type === "ADD_ORDER") {
        return {
            ...state,
            cart: [],
            orders: [...state.orders, action.payload],
            isLoading: false,
        };
    }

    return state;
};

export default function DataContextProvider({ children }) {
    const [dataState, dispatchData] = useReducer(dataReducer, defaultState);
    const dataContext = useContext(DataContext);

    const addToCartHandler = async (item) => {
        try {
            const user = dataContext.user._id;
            const value = item.price * +item.quantity;
            delete item.deliveryCharge;

            const { cart } = dataState;
            let amount = cart.reduce((acc, curr) => {
                return acc + curr.price * curr.quantity;
            }, 0);

            const product = { user, ...item };
            const key = await AsyncStorage.getItem("@acc_token");
            const response = await fetch("http://192.168.0.105:5000/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${key}`,
                },
                body: JSON.stringify(product),
            });
            const { result } = await response.json();

            await dispatchData({
                type: "ADD_TO_CART",
                payload: { item: result, totalAmount: amount + value },
            });
        } catch (err) {
            console.log("error here 4",err);
        }
    };

    const removeFromCartHandler = async (id) => {
        try {
            const { cart } = dataState;
            const newCart = cart.filter((item) => item.productId !== id);
            const cartItem = cart.filter((item) => item.productId === id);

            const body = {
                _id: cartItem[0]._id,
            };

            let amount = cart.reduce((acc, curr) => {
                return acc + curr.price * curr.quantity;
            }, 0);
            const product = cart.filter((item) => item.productId === id)[0];
            const price = +product.price * +product.quantity;
            amount = +amount - price;

            const key = await AsyncStorage.getItem("@acc_token");
            await fetch("http://192.168.0.105:5000/cart/remove", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${key}`,
                },
                body: JSON.stringify(body),
            });

            await dispatchData({
                type: "UPDATE_CART",
                payload: { newCart, totalAmount: amount },
            });
        } catch (err) {
            console.log("error here 5",err);
        }
    };

    const updateCartItem = async (id, quantity) => {
        try {
            const { cart } = dataState;
            const cartItem = cart.filter((item) => item.productId === id);
            const newCart = cart.map((item) => {
                if (item.productId === id) {
                    return { ...item, quantity };
                }
                return item;
            });

            let amount = newCart.reduce((acc, curr) => {
                return acc + curr.price * curr.quantity;
            }, 0);

            const body = {
                _id: cartItem[0]._id,
                quantity,
            };
            const key = await AsyncStorage.getItem("@acc_token");
            await fetch("http://192.168.0.105:5000/cart/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${key}`,
                },
                body: JSON.stringify(body),
            });

            await dispatchData({
                type: "UPDATE_CART",
                payload: { newCart, totalAmount: amount },
            });
        } catch (err) {
            console.log("error here 6",err);
        }
    };

    const addFoodData = async () => {
        try {
            const { user } = dataContext;
            const key = await AsyncStorage.getItem("@acc_token");

            // fetch food data
            const response = await fetch("http://192.168.0.105:5000/foods/all");
            const newdata = await response.json();
            const foodData =await newdata.result;

          // fetching cart data,address data ,orders data
          const result = await fetch("http://192.168.0.105:5000/user/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({ user: user._id }),
        });

        const allData = await result.json();
        const finalResult =await allData.result;
        const totalCartAmount =await finalResult.cart.reduce((acc, curr) => {
            return acc + curr.price * curr.quantity;
        }, 0);

            await dispatchData({
                type: "SET_DATA",
                payload: {
                    foodData,
                    cart: finalResult.cart,
                    address: finalResult.address,
                    orders: finalResult.orders,
                    totalAmount: totalCartAmount,
                },
            });
        } catch (err) {
            console.log("error here1",err);
        }
    };

    const addressHandler = async (address, type) => {
        const { user } = dataContext;
        const key = await AsyncStorage.getItem("@acc_token");
        try {
            let response = {};
            if (type === "add") {
                response = await fetch(
                    "http://192.168.0.105:5000/address/add",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${key}`,
                        },
                        body: JSON.stringify({ ...address, user: user._id }),
                    }
                );

                const data = await response.json();
                const { result } = data;
                console.log(result);
                const payload =await [data.result, ...dataState.address];
                await dispatchData({ type: "ADD_ADDRESS", payload });
            }
        } catch (err) {
            console.log("error here 7",err);
        }
    };
    const orderHandler = async (details, type) => {
        const detailsData = { ...details,createdAt:new Date() };
        const { user } = dataContext;
        const key = await AsyncStorage.getItem("@acc_token");
        try {
            let response = {};
            if (type === "add") {
         

                await fetch("http://192.168.0.105:5000/cart/all", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${key}`,
                    },
                    body: JSON.stringify({ user: user._id }),
                });

                response = await fetch("http://192.168.0.105:5000/orders/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${key}`,
                    },

                    body: JSON.stringify(detailsData),
                });

                const data = await response.json();
                const payload =await data.result;
                await dispatchData({ type: "ADD_ORDER", payload });
            }
        } catch (err) {
            console.log("error here8",err);
        }
    };

    const logOut = async () => {
        try {
            // remove user data
            await dataContext.onLogOut();
            // remove data,cart dataaddress data, orders data
            await dispatchData({ type: "REMOVE_DATA" });
        } catch (err) {
            console.log("error here 9",err);
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
            const {_id:userId} = data.user;
            

            // add access token
            await AsyncStorage.setItem("@acc_token", data.access_token);
            // remove data,cart dataaddress data, orders data
            await dispatchData({ type: "REMOVE_DATA" });
            
                 // fetching cart data,address data ,orders data
                 const result = await fetch("http://192.168.0.105:5000/user/data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${key}`,
                    },
                    body: JSON.stringify({ user: userId}),
                });
        
                const allData = await result.json();
                const finalResult =await allData.result;

            const totalCartAmount =await finalResult.cart.reduce((acc, curr) => {
                return acc + curr.price * curr.quantity;
            }, 0);
            // update state
            await dispatchData({
                type: "LOGGED_IN",
                payload: {
                    orders: finalResult.orders,
                    address: finalResult.address,
                    cart: finalResult.cart,
                    totalAmount: totalCartAmount,
                },
            });

            // add user data
            await dataContext.onLogIn(data.user);
            
        } catch (err) {
            console.log("error here 10",err);
        }
    };

    const state = {
        cart: dataState.cart,
        orders: dataState.orders,
        isLoading: dataState.isLoading,
        items: dataState.items,
        category: dataState.category,
        error: dataState.error,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
        addData: addFoodData,
        totalCartAmount: dataState.totalCartAmount,
        totalCartItems: dataState.cart.length,
        deliveryFee: dataState.deliveryFee,
        updateItem: updateCartItem,
        address: dataState.address,
        updateAddress: addressHandler,
        orderHandler: orderHandler,
        logOutHandler: logOut,
        logInHandler: logIn,
    };

    return (
        <CustomerContext.Provider value={state}>
            {children}
        </CustomerContext.Provider>
    );
}
