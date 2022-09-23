import React, { useState, useEffect, useRef } from 'react';
import ChatBar from '../components/ChatBar';
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Chat = (props) => {
    const { socket } = props
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState('');
    const newestMessageRef = useRef(null);

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);
    // socket listens to messages sent via the MessageResponse event and spreads the data into the messages array
    // the array of messages is passed into the ChatBody

    useEffect(() => {
        newestMessageRef.current?.scrollIntoView({ block: "start", inline: "nearest", behavior: 'auto' })
    }, [messages])

    useEffect(() => {
        socket.on('typingResponse', data => {
            setTypingStatus(data)
        }, [socket])
    })

    return (
        <div className="chat">
            <Header />
            <ChatBar socket={socket} />
            <div className="chat__main">
                <ChatBody socket={socket} messages={messages} newestMessageRef={newestMessageRef} typingStatus={typingStatus} />
                <ChatFooter socket={socket} />
            </div>
            <Footer />
        </div>
    );
};

export default Chat;