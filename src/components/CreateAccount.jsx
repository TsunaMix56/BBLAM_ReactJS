import React, { useState } from 'react';
import { authAPI } from '../services/authAPI';
import './CreateAccount.css';

export default function CreateAccount({ onBackToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const result = await authAPI.createAccount(username, password, role);
      
      if (result.success === true) {
        // Account created successfully
        setIsSuccess(true);
        setMessage(result.message || result.Message || 'Account created successfully');
      } else {
        // Failed to create account
        setIsSuccess(false);
        setMessage(result.error || result.message || 'Failed to create account');
      }
    } catch (err) {
      setIsSuccess(false);
      setMessage('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    onBackToLogin();
  };

  return (
    <div className="create-account-container">
      <div className="create-account-box">
        <h1>สร้างบัญชีใหม่</h1>
        
        {!isSuccess ? (
          <form onSubmit={handleSubmit}>
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

            <div className="form-group">
              <label>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                disabled={loading}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'กำลังสร้างบัญชี...' : 'Submit Create Account'}
            </button>

            {message && !isSuccess && (
              <div className="error-message">{message}</div>
            )}

            <button 
              type="button" 
              className="btn-back" 
              onClick={handleBackToLogin}
              disabled={loading}
            >
              Back To Login
            </button>
          </form>
        ) : (
          <div className="success-container">
            <div className="success-message">{message}</div>
            <button className="btn-back-success" onClick={handleBackToLogin}>
              Back To Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
