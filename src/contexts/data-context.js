import React from 'react';

const DataContext= React.createContext({
    user: {},
    isLoggedIn: null,
    error: null,
    onLogIn: () => {},
    onLogOut: () => {},
});

export default DataContext;