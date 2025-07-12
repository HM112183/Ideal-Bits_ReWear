// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Correctly points to the new file
import RegistrationPage from './pages/RegistrationPage'; // Correctly points to the new file
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import ItemDetailPage from './pages/ItemDetailPage';
import AddNewItemPage from './pages/AddNewItemPage';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} /> {/* Route for signup */}

          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />
          <Route path="/add-item" element={<AddNewItemPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/browse-items" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;