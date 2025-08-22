// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <h1>Tutor Portal</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/apply">Apply</Link></li>
        <li><Link to="/tutors">Tutors</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
