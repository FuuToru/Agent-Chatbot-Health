import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  time: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser, time }) => {
  const messageClass = isUser ? 'user-message' : 'ai-message';

  return (
    <div className={`message-bubble ${messageClass}`}>
      <div className="message-text">
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
      <div className="message-time">{time}</div>
    </div>
  );
}

export default MessageBubble; 