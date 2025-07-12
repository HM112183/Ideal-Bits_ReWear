// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Assuming you have these
import RegistrationPage from './pages/RegistrationPage'; // Assuming you have these
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import ItemDetailPage from './pages/ItemDetailPage';
import AddNewItemPage from './pages/AddNewItemPage';
import AdminDashboard from './pages/AdminDashboard'; // For admin role
import Header from './components/Header'; // A common header component
import Footer from './components/Footer'; // A common footer component (optional)

function App() {
  return (
    <Router>
      <Header /> {/* Your common header */}
      <main className="container"> {/* Basic container for content */}
        <Routes>
          {/* Existing routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          {/* New routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />
          <Route path="/add-item" element={<AddNewItemPage />} />
          <Route path="/admin" element={<AdminDashboard />} /> {/* Admin route */}
          {/* A route for Browse all items, potentially linked from "Browse Items" */}
          <Route path="/browse-items" element={<LandingPage />} /> {/* For now, points to landing */}
        </Routes>
      </main>
      <Footer /> {/* Your common footer */}
    </Router>
  );
}

export default App;