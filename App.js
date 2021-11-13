import React from "react";
import DataContextProvider from "./src/contexts/DataContextProvider";
import RootNavigator from "./src/RootNavigator";


export default function App() {
    return (
        <DataContextProvider>
            <RootNavigator />
        </DataContextProvider>
    );
}
