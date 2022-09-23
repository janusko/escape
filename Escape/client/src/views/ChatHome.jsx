import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@mui/material'
import '../styles/chatHome.css';


const ChatHome = (props) => {
    const navigate = useNavigate();
    const { socket } = props;
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('username', username);
        
        socket.emit('newUser', { username, socketId: socket.id})
        // create an event that listens to users when they sign in.
        // sends username and socket id to node.js server
        navigate('/chat');
    };
    return (
        <div>
            <Header/>
            <div className="register">
            <form className='resgister_form' onSubmit={handleSubmit}>
                <h2 id="dive">Dive in Our Chat</h2>
                <label htmlFor="username"></label>
                <input type="text" minLength={2} name="username" placeholder='User Name' id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                />
                <Button varriant='outlined' type="submit">Sign In</Button>
            </form>
            </div>
            <Footer/>
        </div>
    );
};

export default ChatHome;