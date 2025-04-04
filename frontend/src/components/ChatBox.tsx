import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import LoadingSpinner from './LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital } from '@fortawesome/free-regular-svg-icons';
import './ChatBox.css';

interface Message {
  message: string;
  isUser: boolean;
  time: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const handleSendMessage = async (message: string) => {
    if (showIntro) setShowIntro(false);
  
    const userMessage: Message = { 
      message, 
      isUser: true, 
      time: new Date().toLocaleTimeString() 
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    setIsLoading(true);
    try {
      const response = await fetch('https://backend.ifobito.online/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message }),
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
  
      // Stream response handling
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let botMessage = '';
      setIsLoading(false);
  
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        botMessage += decoder.decode(value, { stream: true });
  
        // Update the message gradually (simulate streaming effect)
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
  
          if (lastMessage && !lastMessage.isUser) {
            updatedMessages[updatedMessages.length - 1].message = botMessage; // Update existing AI message
          } else {
            updatedMessages.push({ 
              message: botMessage, 
              isUser: false, 
              time: new Date().toLocaleTimeString() 
            });
          }
  
          return updatedMessages;
        });
      }
    } catch (error) {
      const errorMessage: Message = { 
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 
        isUser: false, 
        time: new Date().toLocaleTimeString() 
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="chat-box">
      {showIntro && (
        <div className="deepseek-intro">
          <div className="icon-container">
            <FontAwesomeIcon icon={faHospital} />
          </div>
          <div className="intro-text">
            <div className="greeting">Hi, I'm ChatHealth.</div>
            <div className="question">How can I help you today?</div>
          </div>
        </div>
      )}

      <div className="messages">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg.message} isUser={msg.isUser} time={msg.time} />
        ))}
        {isLoading && <LoadingSpinner />}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatBox; 