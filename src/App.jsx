import React, { useState } from 'react'
import Login from './components/Login'
import Welcome from './components/Welcome'
import CreateAccount from './components/CreateAccount'

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [userData, setUserData] = useState(null);

  const handleLoginSuccess = (data) => {
    setUserData(data);
    setCurrentPage('welcome');
  };

  const handleLogout = () => {
    setUserData(null);
    setCurrentPage('login');
  };

  const handleNavigateToCreate = () => {
    setCurrentPage('create');
  };

  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

  return (
    <>
      {currentPage === 'login' && (
        <Login 
          onLoginSuccess={handleLoginSuccess}
          onNavigateToCreate={handleNavigateToCreate}
        />
      )}
      
      {currentPage === 'welcome' && userData && (
        <Welcome 
          message={userData.message}
          role={userData.role}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'create' && (
        <CreateAccount 
          onBackToLogin={handleBackToLogin}
        />
      )}
    </>
  )
}
