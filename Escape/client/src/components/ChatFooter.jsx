import { Button } from '@mui/material';
import React, { useState } from 'react';

const ChatFooter = (props) => {
    const { socket } = props;
    const [message, setMessage] = useState('');

    const handleTyping = () => {
        socket.emit('typing', `${localStorage.getItem('username')} is typing...`)
    }
    // connected to onKeyDown in input field, which engages when someone presses their keyboard

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('username')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('username'),
                id: `${socket.id}${Math.random()}`,
                socketId: socket.id
            })
        }
        setMessage('');
    };
    //  checks if the text field is empty, and if username exists in local storage(via sign-in on Home).
        //  this is done before sending message event containing the user input, username (from local storage), message Id generated, and the socket/client id.
    return (
        <div className="register">
            <form className="resgister_form" onSubmit={handleSendMessage}>
                <input type="text" placeholder="Write message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleTyping} />
                <Button>Send</Button>
            </form>
        </div>
    );
};

export default ChatFooter;