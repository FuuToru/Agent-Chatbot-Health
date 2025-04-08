import React from 'react';
import { LuMessageCircleDashed } from "react-icons/lu";
import { MdOutlineHistoryToggleOff } from "react-icons/md";

import '../assets/css/Header.css';

interface HeaderProps {
  onToggleHistory: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleHistory }) => {
  return (
    <div className="header">
      {/* Icon for the chat */}
      <button className="chat-icon">
        <LuMessageCircleDashed />
      </button>

      {/* Chat title */}
      <div>ChatHealth</div>

      {/* Chat state toggle - now toggles history */}
      <button className="chat-state" onClick={onToggleHistory}>
        <MdOutlineHistoryToggleOff />
      </button>
    </div>
  );
};

export default Header; 