import React from 'react';

const DataContext= React.createContext({
    data: [],
    category: [],
    isLoading: true,
    isLoggedIn: false,
    error: null,
    getData: () => {},
    deleteData: () => {},
});

export default DataContext;