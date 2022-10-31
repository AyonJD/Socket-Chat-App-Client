import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './Chat.css'

const Chat = () => {
    const { dataStore } = useContext(AuthContext);
    const { chats, token } = dataStore;
    
    return (
        <div className="container mx-auto">
            <div className='flex h-[100vh] w-full'>
                <div className="left_section h-full flex:-1 px-3 pb-5 bg-slate-300">
                    <h1 className='py-5 font-bold text-2xl'>Chats</h1>
                    <h1>Conversations</h1>
                </div>
                <div className="right_section h-full px-3 pb-5 bg-amber-300">
                    <h1 className='py-5 font-bold text-2xl'>Messages</h1>
                    <h1>Conversations</h1>
                </div>
            </div>
        </div>
    );
};

export default Chat;