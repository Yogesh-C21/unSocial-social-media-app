import './messenger.css'
import Topbar from '../../components/topbar/Topbar'

import React, { useEffect, useRef, useState } from 'react'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import SendIcon from '@mui/icons-material/Send';
import ChatOnline from '../../components/chatOnline/ChatOnline'
import useAuth from '../../context/useAuth'
import axios from 'axios'
import { io } from 'socket.io-client';

function Messenger() {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const scrollRef = useRef();
    const { user } = useAuth();

    useEffect(() => {
        socket.current = io('ws://localhost:9000');
        socket.current.on('getMessage', ({ senderId, text }) => {
            setArrivalMessage({
                sender: senderId,
                text: text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage && currentChat?.members?.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit('addUser', user._id);
        socket.current.on('getUsers', users => console.log(users));
    }, [user]);



    // GET CONVERSATIONS AND GET MESSAGE
    useEffect(() => {
        async function getConversations() {
            try {
                const res = await axios.get('http://localhost:8080/api/conversations/' + user._id);
                setConversations(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getConversations();
    }, [user]);

    useEffect(() => {
        async function getMessages() {
            try {
                const resp = currentChat && await axios.get('http://localhost:8080/api/messages/' + currentChat._id);
                setMessages(resp && resp.data);
            } catch (error) {
                console.log(error);
            }

        }
        getMessages();
    }, [currentChat]);


    //SCROLL FUNCTIONLITY
    useEffect(() => {
        scrollRef?.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [messages]);

    async function submitHandler(event) {
        event.preventDefault();
        const message = {
            conversationId: currentChat._id,
            sender: user._id,
            text: newMessage,
        };

        const receiverId = currentChat.members.find(member => member !== user._id);

        socket.current.emit('sendMessage', {
            senderId: user._id,
            receiverId,
            text: newMessage,
        })

        try {
            const res = await axios.post('http://localhost:8080/api/messages/', message);
            setMessages([...messages, res.data]);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder="Seach for Friends" className="chatMenuInput" />
                        {conversations?.length > 0 && conversations.map((conv) => (
                            <div key={conv._id} onClick={() => setCurrentChat(conv)}>
                                <Conversation conversation={conv} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                                <>
                                    <div className="chatBoxTop">
                                        {messages?.map((text) => (
                                            <div ref={scrollRef} key={text._id}>
                                                <Message text={text} own={text.sender === user._id} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            value={newMessage}
                                            className="chatMessageInput"></textarea>
                                        <button
                                            onClick={submitHandler}
                                            className="chatSubmitButton"><SendIcon /></button>
                                    </div>
                                </> :
                                <span className='noConversationText'>Lets Chat!!! Click On a user to start chatting</span>
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger