import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/chatBody.css';

const ChatBody = (props) => {
    const { messages, newestMessagRef, typingStatus } = props;
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        localStorage.removeItem('username');
        navigate('/home');
        window.location.reload();
    };

    return (
        <>
            <header className="chat__mainHeader">
                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                    Leave Chat
                </button>
                <p>Connect with Escaped members</p>
            </header>

            {/* {/Shows messages sent from you/} */}
            <div className="message__container">
                {messages.map((message) =>
                    message.name === localStorage.getItem('username') ? (
                        <div className="message__chats" key={message.id}>
                            <p className="sender__name">You:   </p>
                            <div className="message__sender">
                                <p> {message.text}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="message__chats" key={message.id}>
                            <p id='from'>Message from {message.name}: </p>
                            <div className="message__recipient">
                                <p id='messageFrom'>{message.text}</p>
                            </div>
                        </div>
                    )
                )}
                {/* displays the messages depending on whether you or another user sent the message */}

                {/* {/Triggered when a user is typing/} */}
                {/* <div className="message__status">
                    <p>{typingStatus}</p>
                </div> */}
                <div ref={newestMessagRef} />
            </div>
        </>
    );
};

export default ChatBody;