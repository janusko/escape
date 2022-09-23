import React, { useState, useEffect } from 'react';
import '../styles/chatBar.css';

const ChatBar = (props) => {
    const { socket } = props;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on('newUserResponse', data => setUsers(data));
    }, [socket, users])
    // listens and displays list of active users

    return (
        <div className="chat__sidebar">
            <h2>Open Chat</h2>
            <div>
                <h4 className="chat__header">Active Users:</h4>
                <div className="chat__users">
                    {users.map((user) => (
                        <p key={user.socketId}>
                            {user.username}
                        </p>
                    ))}
                </div>
                <p id="connectedAs">You are connected as: {localStorage.getItem('username')}</p>
            </div>
        </div>
    );
};

export default ChatBar;