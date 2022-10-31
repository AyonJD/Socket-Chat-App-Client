import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const dataStore = {
        chats,
        setChats,
        token,
        setToken,
        user,
        setUser
    }

    const _retriveToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }

    const getChats = async () => {
        const res = await fetch('http://localhost:5000/chats');
        const data = await res.json();
        setChats(data);
    }

    useEffect(() => {
        _retriveToken();
        getChats();
    }, []);

    return (
        <AuthContext.Provider value={{ dataStore }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };