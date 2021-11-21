import React from 'react';

const DataContext= React.createContext({
    user: {},
    isLoggedIn: null,
    isLoading: true,
    error: null,
    onLogIn: () => {},
    onLogOut: () => {},
    setLoading: () => {},
});

export default DataContext;