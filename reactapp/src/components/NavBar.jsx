import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar({ onLogout, userRole }) {
  const username = localStorage.getItem('username');

  return (
    <nav className="navbar">
      <h1 className="title">Tutor Application</h1>
      <ul className="nav-links">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
        <li><Link to="/getAllTutors" className="nav-link">Tutor Details</Link></li>
        <li><Link to="/search" className="nav-link">Search Tutors</Link></li>
        <li><Link to="/notifications" className="nav-link">Notifications</Link></li>
        {userRole === 'TUTOR' && (
          <li><Link to="/apply" className="nav-link">Apply</Link></li>
        )}
      </ul>
      <div className="navbar-user">
        <span className="user-info">
          {username} ({userRole})
        </span>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
