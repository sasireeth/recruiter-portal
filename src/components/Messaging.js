import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import useListenMessages from '../hooks/useListenMessages'

const socket = io('http://localhost:9000');

const Messaging = () => {
  const { candidateId } = useParams();
  console.log(candidateId)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useListenMessages();

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/messages/${candidateId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [candidateId]);

  const handleSendMessage = async () => {
    try {
      await axios.post('http://localhost:9000/api/messages', { candidateId, content: newMessage }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setNewMessage('');
      await fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Messages</h2>
      <div className="mb-4">
        {messages.map((msg) => (
          <div key={msg._id} className="mb-2 p-2 border rounded-md">
            <p className="font-semibold">{msg.sender}:</p>
            <p>{msg.content}</p>
            <p className="text-sm text-gray-500">{new Date(msg.sentAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        rows="4"
        placeholder="Write your message here..."
      ></textarea>
      <button
        onClick={handleSendMessage}
        className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Send
      </button>
    </div>
  );
};

export default Messaging;