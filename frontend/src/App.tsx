import React, { useState } from 'react';
import Header from './components/Header';
import ChatBox from './components/ChatBox';
import ChatHistory from './components/ChatHistory';
import './styles.css';

const App: React.FC = () => {
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [currentSessionId, setCurrentSessionId] = useState<string>('1');

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
  };

  const handleNewChat = () => {
    setCurrentSessionId('new');
  };

  return (
    <div className="app">
     
      
      <div className="main-content">
        <Header onToggleHistory={toggleHistory} />
        <ChatHistory 
          visible={showHistory}
          onSelectSession={handleSelectSession}
          onNewChat={handleNewChat}
          currentSessionId={currentSessionId}
        />
        
        <div className={`chatbox-container ${showHistory ? 'with-history' : ''}`}>
          <ChatBox sessionId={currentSessionId} />
        </div>
      </div>
    </div>
  );
};

export default App;
