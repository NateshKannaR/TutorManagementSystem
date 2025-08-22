import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <main className="home page">
      <h2>Welcome to the Tutor Application</h2>
      <p>
        Join our community of skilled tutors and help students achieve their academic goals!
      </p>
      <Link to="/apply" className="btn">Become a Tutor</Link>
    </main>
  );
}
export default Home;
