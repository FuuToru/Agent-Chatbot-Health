import React from 'react';
import './ChatHistory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

interface ChatSession {
  id: string;
  title: string;
  date: string;
  preview: string;
}

interface ChatHistoryProps {
  visible: boolean;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
  currentSessionId: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ 
  visible, 
  onSelectSession, 
  onNewChat,
  currentSessionId
}) => {
  // Trong thực tế, bạn sẽ lấy dữ liệu này từ localStorage hoặc từ API
  const [sessions, setSessions] = React.useState<ChatSession[]>([
    {
      id: '1',
      title: 'Sức khỏe tim mạch',
      date: '19/03/2023',
      preview: 'Tôi cần tư vấn về bệnh tim...'
    },
    {
      id: '2',
      title: 'Dinh dưỡng hằng ngày',
      date: '18/03/2023',
      preview: 'Làm thế nào để cân bằng dinh dưỡng...'
    },
    {
      id: '3',
      title: 'Vấn đề về giấc ngủ',
      date: '15/03/2023',
      preview: 'Tôi gặp khó khăn khi ngủ...'
    }
  ]);

  const deleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    // Xóa session
    setSessions(sessions.filter(session => session.id !== sessionId));
    // Trong thực tế, bạn cũng sẽ cần xóa dữ liệu này từ localStorage hoặc gọi API
  };

  return (
    <div className={`chat-history ${visible ? 'visible' : ''}`}>
      <div className="history-header">
        <h2>Lịch sử Chat</h2>
        <button className="new-chat-btn" onClick={onNewChat}>
          <FontAwesomeIcon icon={faPlus} /> Tạo mới
        </button>
      </div>
      
      <div className="session-list">
        {sessions.map(session => (
          <div 
            key={session.id} 
            className={`session-item ${currentSessionId === session.id ? 'active' : ''}`}
            onClick={() => onSelectSession(session.id)}
          >
            <div className="session-info">
              <div className="session-title">{session.title}</div>
              <div className="session-date">{session.date}</div>
              <div className="session-preview">{session.preview}</div>
            </div>
            <button 
              className="delete-session-btn"
              onClick={(e) => deleteSession(e, session.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory; 