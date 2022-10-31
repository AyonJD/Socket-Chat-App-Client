import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const dataStore = {
        chats,
        setChats,
        token,
        setToken,
        user,
        setUser,
    }

    const _retriveToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }

    useEffect(() => {
        _retriveToken();
    }, []);


    const getChats = async () => {
        const userId = await user?.id;
        const url = `http://localhost:5000/api/v1/chat/${userId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const dataResponse = await response.json();
        if (!dataResponse.success) {
            console.log(dataResponse.message);
            return;
        }
        setChats(dataResponse);
    }

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
        getChats();
    }, [token, user]);

    console.log(chats);

    return (
        <AuthContext.Provider value={{ dataStore }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };