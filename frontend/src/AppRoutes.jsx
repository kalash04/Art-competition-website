import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Competitions from './components/Competitions.jsx';
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Submit from './components/Submit.jsx';
import Winners from './components/Winners.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from './pages/AdminDash.jsx';
import ProtectedRoute from './components/ProtectedRoutes.jsx'; // For protecting admin routes

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/competitions" element={<Competitions />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/submit" element={<Submit />} />
      <Route path="/winners" element={<Winners />} />
      <Route path="*" element={<NotFound />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
