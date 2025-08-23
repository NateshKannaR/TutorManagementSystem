import React, { useEffect, useState } from "react";
import "./DisplayTutor.css";
import { API_BASE_URL } from "../apiConfig";

function DisplayTutor() {
  const [tutors, setTutors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch tutor applications with proper headers
    fetch(`${API_BASE_URL}/getAllTutors`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setTutors(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch tutor applications.");
      });
  }, []);

  return (
    <div className="tutor-list">
      <h2>Submitted Tutor Applications</h2>

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
  );
}

export default DisplayTutor;
