import React, { useState } from 'react';
import { authAPI } from '../services/authAPI';
import './Login.css';

export default function Login({ onLoginSuccess, onNavigateToCreate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authAPI.login(username, password, 'admin');
      
      if (result.success === true) {
        // Login successful
        onLoginSuccess({
          message: result.message || result.Message,
          role: result.role
        });
      } else {
        // Login failed
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>เข้าสู่ระบบ</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'Login'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="button" 
          className="btn-create" 
          onClick={onNavigateToCreate}
          disabled={loading}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
