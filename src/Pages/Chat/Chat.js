import React from 'react';
import './Chat.css'

const Chat = () => {
    return (
        <div className='flex h-[100vh] w-full'>
            <div className="left_section h-full flex:-1 bg-slate-300">
                Users here
            </div>
            <div className="right_section h-full bg-amber-300">
                Chat here
            </div>
        </div>
    );
};

export default Chat;