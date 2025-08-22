// src/components/DisplayTutor.jsx
import React, { useEffect, useState } from "react";
import API_BASE_URL from "../apiConfig";
import "./DisplayTutor.css";

function DisplayTutor() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tutors`);
        if (!response.ok) throw new Error("Failed to fetch tutors");
        const data = await response.json();
        setTutors(data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  if (loading) return <p>Loading tutors...</p>;

  return (
    <div className="tutor-list">
      <h2>Available Tutors</h2>
      {tutors.length === 0 ? (
        <p>No tutors available</p>
      ) : (
        <ul>
          {tutors.map((tutor) => (
            <li key={tutor.id}>
              <strong>{tutor.name}</strong> – {tutor.subject}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DisplayTutor;
