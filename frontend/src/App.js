import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/GovtDashboard";
import FarmerDashoard from "./pages/FarmerDashoard"
import ApplyForm from "./components/ApplyForm";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default Route: Navigate to Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} /> {/* Your dashboard screen */}

        <Route path="/FarmerDashoard" element={<FarmerDashoard />} /> 
        <Route path="/ApplyForm" element={<ApplyForm />} /> 

      </Routes>
    </Router>
  );
};

export default App;
