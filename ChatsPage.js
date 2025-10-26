import React from 'react';
import './ChatsPage.css';
import { conversations } from './chatData.js';

const ChatsPage = () => {
  return (
    <div className="chats-page">
      <h1>Chats</h1>
      
      <div className="conversation-list">
        {conversations.map(convo => (
          <div key={convo.id} className="conversation-item">
            <div className="avatar-placeholder"></div>
            <div className="convo-details">
              <p className="convo-name">{convo.name}</p>
              <p className="convo-message">{convo.message}</p>
            </div>
            <div className="convo-meta">
              <p className="convo-time">{convo.time}</p>
              {convo.unread > 0 && (
                <div className="unread-badge">{convo.unread}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatsPage;
