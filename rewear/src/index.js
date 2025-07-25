// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; // Import your global styles
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();