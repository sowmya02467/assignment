import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import LoginPage from './Components/Auth/LoginPage';
import ActiveOrders from './Components/SalesOrders/ActiveOrders';
import CompletedOrders from './Components/SalesOrders/CompletedOrders';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute><ActiveOrders /></PrivateRoute>} />
      <Route path="/completed" element={<PrivateRoute><CompletedOrders /></PrivateRoute>} />
    </Routes>
  </Router>
);

export default AppRoutes;
