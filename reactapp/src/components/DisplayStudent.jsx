import React, { useEffect, useState } from "react";
import BubbleBackground from "./BubbleBackground";
import "./DisplayStudent.css";
import { API_BASE_URL } from "../apiConfig";

function DisplayStudent() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  const fetchStudents = () => {
    fetch(`${API_BASE_URL}/getAllStudents`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setStudents(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch student registrations.");
      });
  };

  useEffect(() => {
    fetchStudents();
    const interval = setInterval(fetchStudents, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <BubbleBackground count={14} color="#06b6d4" />
      <div className="student-list">
        <div className="header-with-live">
          <h2>Registered Students</h2>
          <div className="live-indicator">
            <span className="live-dot"></span>
            <span>Live</span>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Grade</th>
              <th>Subject</th>
              <th>School</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td>
                  <td>{s.grade}</td>
                  <td>{s.subject}</td>
                  <td>{s.school}</td>
                  <td>{s.phoneNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DisplayStudent;