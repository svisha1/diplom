import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser({ ...decodedToken });
        }
    }, []);

    const login = (token) => {
        const decodedToken = jwtDecode(token);
        localStorage.setItem('token', token);
        setUser({ ...decodedToken });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


