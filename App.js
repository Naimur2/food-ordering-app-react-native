import React from "react";
import DataContextProvider from "./src/contexts/DataContextProvider";
import RootNavigator from "./src/RootNavigator";
import CustomerContextProvider from "./src/contexts/CustomerContextProvider";


export default function App() {
    return (
        <DataContextProvider>
            <CustomerContextProvider>
                <RootNavigator />
            </CustomerContextProvider>
        </DataContextProvider>
    );
}
