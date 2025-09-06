import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ApplyForm from "./components/ApplyForm";
import DisplayTutor from "./components/DisplayTutor";
import StudentForm from "./components/StudentForm";
import DisplayStudent from "./components/DisplayStudent";
import StudentSearch from "./components/StudentSearch";
import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import TutorSearch from "./components/TutorSearch";
import Notifications from "./components/Notifications";
import ParticleBackground from "./components/ParticleBackground";
import StarField from "./components/StarField";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showLogin, setShowLogin] = useState('login');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleLogin = (authData) => {
    setIsAuthenticated(true);
    setUserRole(authData.role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const handleRegister = () => {
    setShowLogin('login');
  };

  const AuthComponent = () => (
    <div className="auth-container">
      <div className="auth-toggle">
        <button 
          className={showLogin === 'login' ? 'active' : ''}
          onClick={() => setShowLogin('login')}
        >
          Login
        </button>
        <button 
          className={showLogin === 'register' ? 'active' : ''}
          onClick={() => setShowLogin('register')}
        >
          Register
        </button>
        <button 
          className={showLogin === 'admin' ? 'active' : ''}
          onClick={() => setShowLogin('admin')}
        >
          Admin
        </button>
      </div>
      {showLogin === 'login' && <Login onLogin={handleLogin} />}
      {showLogin === 'register' && <Register onRegister={handleRegister} />}
      {showLogin === 'admin' && <Login onLogin={handleLogin} isAdmin={true} />}
    </div>
  );

  if (!isAuthenticated) {
    return (
      <Router>
        <div className="app">
          <ParticleBackground />
          <StarField />
          <NavBar onLogout={handleLogout} userRole={null} />
          <Routes>
            <Route path="/" element={<AuthComponent />} />
            <Route path="/home" element={<Home />} />
            <Route path="/apply" element={<ApplyForm />} />
            <Route path="/getAllTutors" element={<DisplayTutor />} />
            <Route path="*" element={<AuthComponent />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app">
        <ParticleBackground />
        <StarField />
        <div className="floating-orbs">
          <div className="orb"></div>
          <div className="orb"></div>
          <div className="orb"></div>
        </div>
        <NavBar onLogout={handleLogout} userRole={userRole} />
        <Routes>
          <Route path="/" element={userRole === 'ADMIN' ? <AdminDashboard /> : <Home />} />
          <Route path="/apply" element={<ApplyForm />} />
          <Route path="/getAllTutors" element={<DisplayTutor />} />
          <Route path="/student-register" element={<StudentForm />} />
          <Route path="/getAllStudents" element={<DisplayStudent />} />
          <Route path="/search-students" element={<StudentSearch />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/search" element={<TutorSearch />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
