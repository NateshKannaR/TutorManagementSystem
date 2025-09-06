import React from "react";
import "./Home.css";

function Home() {
  return (
    <main className="home page">
      <h2>Welcome to the Tutor Application</h2>
      <p>
        Join our community of skilled tutors and help students achieve their academic goals!
      </p>
      <a href="/apply" className="btn">Become a Tutor</a>
    </main>
  );
}
export default Home;
