import React from 'react';

const DataContext= React.createContext({
    data: [],
    category: [],
    user: {},
    isLoading: null,
    isLoggedIn: null,
    error: null,
    setData: () => {},
    deleteData: () => {},
    onLogOut: () => {},
});

export default DataContext;