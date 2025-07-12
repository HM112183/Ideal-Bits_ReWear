// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css'; // Import CSS Module

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <Link to="/" className={styles.logo}>ReWear</Link>
        <div className={styles.navLinks}>
          <Link to="/browse-items">Browse Items</Link>
          <Link to="/add-item">List an Item</Link>
          <Link to="/dashboard">Dashboard</Link>
          {/* You'd conditionally render these based on authentication status */}
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;