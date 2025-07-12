// src/pages/RegistrationPage.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure you have axios installed (npm install axios in frontend)

function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !email || !password) {
      setMessage("Please enter username, email, and password.");
      setMessageType('error');
      return;
    }
    // Client-side password length validation
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setMessageType('error');
      return;
    }

    setMessage("Processing registration...");
    setMessageType('');

    try {
      // Send registration data to your new backend API
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password
      });

      console.log('Registration successful:', response.data);
      setMessage("Registration successful! Redirecting to login...");
      setMessageType('success');

      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      setMessage(error.response && error.response.data.message ? error.response.data.message : 'Registration failed. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div id="auth-container">
      <h1>Signup</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button className="button-74" role="button" onClick={handleSignup}>Sign Up</button>
      {message && <div className={`message-box ${messageType}`}>{message}</div>}
    </div>
  );
}

export default RegistrationPage;