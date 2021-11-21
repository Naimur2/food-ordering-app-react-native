import React from "react";
import DataContextProvider from "./src/contexts/DataContextProvider";
import RootNavigator from "./src/RootNavigator";
import CustomerContextProvider from "./src/contexts/CustomerContextProvider";
import AdminContextProvider from "./src/contexts/AdminContextProvider";


export default function App() {
    return (
        <DataContextProvider>
            <AdminContextProvider>
                <CustomerContextProvider>
                    <RootNavigator />
                </CustomerContextProvider>
            </AdminContextProvider>
        </DataContextProvider>
    );
}
