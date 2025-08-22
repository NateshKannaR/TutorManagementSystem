import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="title">Tutor Application</h1>
      <ul className="nav-links">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/getAllTutors" className="nav-link">Tutor Details</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
