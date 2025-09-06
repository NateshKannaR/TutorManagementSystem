import React, { useEffect, useState } from "react";
import BubbleBackground from "./BubbleBackground";
import "./DisplayTutor.css";
import { API_BASE_URL } from "../apiConfig";

function DisplayTutor() {
  const [tutors, setTutors] = useState([]);
  const [error, setError] = useState("");

  const fetchTutors = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/getAllTutors`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      
      const data = await res.json();
      setTutors(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tutor applications.");
    }
  };

  useEffect(() => {
    fetchTutors();
    const interval = setInterval(fetchTutors, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <BubbleBackground count={14} color="#8b5cf6" />
      <div className="tutor-list">
        <div className="header-with-live">
        <h2>Submitted Tutor Applications</h2>
        <div className="live-indicator">
          <span className="live-dot"></span>
          <span>Live</span>
        </div>
      </div>

      {error && <p className="error">[Error - You need to specify the message]</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qualification</th>
            <th>Subject</th>
            <th>Experience</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {tutors.length > 0 ? (
            tutors.map((t, i) => (
              <tr key={i}>
                <td>{t.name}</td>
                <td>{t.qualification}</td>
                <td>{t.subject}</td>
                <td>{t.experience}</td>
                <td>{t.phoneNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No applications found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </>
  );
}

export default DisplayTutor;
