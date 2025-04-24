import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage   
 = () => {
    setMessages([...messages, { role: 'user', content: userInput }]);
    // Process user input and generate chatbot response
    const chatbotResponse = { role: 'bot', content: 'You said: ' + userInput };
    setMessages([...messages, chatbotResponse]);
    setUserInput('');
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.role === 'user' ? 'You: ' : 'Bot: '}{message.content}</div>
        ))}
      </div>
      <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
    </div>   

  );
};

export default Chatbot;