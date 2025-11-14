import React from 'react';
import './Welcome.css';

export default function Welcome({ message, role, onLogout }) {
  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>ยินดีต้อนรับ</h1>
        
        <div className="welcome-content">
          <div className="message-section">
            <h2>ข้อความ:</h2>
            <p className="message-text">{message}</p>
          </div>

          <div className="role-section">
            <h3>Role:</h3>
            <span className="role-badge">{role}</span>
          </div>
        </div>

        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
