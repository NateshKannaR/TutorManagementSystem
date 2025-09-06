import React from "react";
import "./NavBar.css";

function NavBar({ onLogout = () => {}, userRole }) {
  const username = localStorage.getItem('username') || 'testuser';

  return (
    <nav className="navbar">
      <h1 className="title">Tutor Application</h1>
      <ul className="nav-links">
        <li><a href="/" className="nav-link">Home</a></li>
        <li><a href="/dashboard" className="nav-link">Dashboard</a></li>
        
        {userRole === 'TUTOR' && (
          <>
            <li><a href="/apply" className="nav-link">Apply as Tutor</a></li>
            <li><a href="/getAllTutors" className="nav-link">Tutor Details</a></li>
          </>
        )}
        
        {userRole === 'STUDENT' && (
          <>
            <li><a href="/student-register" className="nav-link">Register as Student</a></li>
            <li><a href="/getAllStudents" className="nav-link">View Students</a></li>
            <li><a href="/search-students" className="nav-link">Search Students</a></li>
          </>
        )}
        
        {(!userRole || userRole === 'STUDENT') && (
          <li><a href="/getAllTutors" className="nav-link">Tutor Details</a></li>
        )}
        
        <li><a href="/search" className="nav-link">Search Tutors</a></li>
        <li><a href="/notifications" className="nav-link">Notifications</a></li>
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
