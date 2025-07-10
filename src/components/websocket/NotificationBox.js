import React, { useEffect, useState } from 'react';
import { connect, disconnect } from './websocket';

const NotificationBox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // 🔐 Lấy JWT token

    if (!token) {
      console.warn("❗ Không tìm thấy token trong localStorage");
      return;
    }

    connect((msg) => {
      setMessages(prev => [...prev, msg]);
    }, token); // ✅ Truyền token vào connect()

    return () => {
      disconnect();
    };
  }, []);

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '10px',
      width: '320px',
      backgroundColor: '#fdfdfd',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h4 style={{ marginTop: 0 }}>🔔 Thông báo</h4>
      {messages.length === 0 ? (
        <p>Không có thông báo.</p>
      ) : (
        <ul style={{ paddingLeft: '20px' }}>
          {messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationBox;
