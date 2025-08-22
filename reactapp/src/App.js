// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ApplyForm from "./components/ApplyForm";
import DisplayTutor from "./components/DisplayTutor";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation bar */}
        <NavBar />

        {/* Main Routes */}
        <main style={{ padding: "20px", minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<ApplyForm />} />
            <Route path="/tutors" element={<DisplayTutor />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
