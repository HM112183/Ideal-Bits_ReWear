// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure you have axios installed

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      setMessageType('error');
      return;
    }

    setMessage('Attempting login...');
    setMessageType('');

    try {
      // Send login data to your new backend API
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      console.log('Login successful:', response.data);
      setMessage('Successfully logged in! Redirecting...');
      setMessageType('success');

      // Store user details received from the backend in localStorage (no token needed here)
      // This is still browser-side localStorage for client-side state management.
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      // You might also want a simple 'isLoggedIn' flag
      localStorage.setItem('isLoggedIn', 'true');


      setTimeout(() => {
        navigate('/'); // Redirect to home/dashboard after successful login
      }, 1500);

    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setMessage(error.response && error.response.data.message ? error.response.data.message : 'Login failed. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div id="auth-container">
      <h1>Login</h1>
      <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button className="button-74" role="button" onClick={handleLogin}>Login</button>
      {message && <div className={`message-box ${messageType}`}>{message}</div>}
    </div>
  );
};

export default LoginPage;