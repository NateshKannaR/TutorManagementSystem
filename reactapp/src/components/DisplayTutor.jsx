import React, { useEffect, useState } from "react";
import "./DisplayTutor.css";
import { API_BASE_URL } from "../apiConfig";

function DisplayTutor() {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/getAllTutors`)
      .then(res => res.json())
      .then(data => setTutors(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="tutor-list">
      <h2>Submitted Tutor Applications</h2>
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
          {tutors.length > 0 ? tutors.map((t, i) => (
            <tr key={i}>
              <td>{t.name}</td>
              <td>{t.qualification}</td>
              <td>{t.subject}</td>
              <td>{t.experience}</td>
              <td>{t.phoneNumber}</td>
            </tr>
          )) : (
            <tr><td colSpan="5">No applications found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayTutor;
