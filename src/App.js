// frontend/src/App.js
import React from 'react';
import {Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthContext } from "./context/AuthContext";

import Login from './pages/Login';
import BulkStatusUpdate from './components/BulkStatusUpdate';
import Registration from './pages/Registration';
import Header from './components/Header';
import Messaging from './components/Messaging';
import ApplicationList from './components/ApplicationList';
import RealTimeNotifications from './components/RealTimeNotifications';

const App = () => {
  const authUser = localStorage.getItem("token");
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Registration />} />
        <Route exact path="/applications" element={<ApplicationList />} />
        <Route exact path="/notifications" element={<RealTimeNotifications />} />
        <Route exact path="/bulk-update" element={<BulkStatusUpdate />} />
        <Route exact path="/messages/:candidateId" element={<Messaging />} />
      </Routes>
    </Router>
  );
};

export default App;
