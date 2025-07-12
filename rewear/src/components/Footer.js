// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#333',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
      marginTop: '40px',
      fontSize: '14px'
    }}>
      <p>&copy; {new Date().getFullYear()} ReWear. All rights reserved.</p>
      <p>Promoting sustainable fashion.</p>
    </footer>
  );
}

export default Footer;