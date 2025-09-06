import React, { useState } from "react";
import { API_BASE_URL } from "../apiConfig";
import BubbleBackground from "./BubbleBackground";
import "./StudentSearch.css";

function StudentSearch() {
  const [searchCriteria, setSearchCriteria] = useState({
    name: "",
    grade: "",
    subject: ""
  });
  const [students, setStudents] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/getAllStudents`);
      const allStudents = await res.json();
      
      const filtered = allStudents.filter(student => {
        return (!searchCriteria.name || student.name.toLowerCase().includes(searchCriteria.name.toLowerCase())) &&
               (!searchCriteria.grade || student.grade.toLowerCase().includes(searchCriteria.grade.toLowerCase())) &&
               (!searchCriteria.subject || student.subject.toLowerCase().includes(searchCriteria.subject.toLowerCase()));
      });
      
      setStudents(filtered);
      setSearched(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="student-search">
      <BubbleBackground count={10} color="#10b981" />
      <h2>Find Students</h2>
      
      <form className="search-form" onSubmit={handleSearch}>
        <div className="form-group">
          <label>Student Name:</label>
          <input name="name" value={searchCriteria.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Grade:</label>
          <input name="grade" value={searchCriteria.grade} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Subject:</label>
          <input name="subject" value={searchCriteria.subject} onChange={handleChange} />
        </div>
        <button type="submit">Search Students</button>
      </form>

      {searched && (
        <div className="search-results">
          <h3>Search Results ({students.length} found)</h3>
          <div className="students-grid">
            {students.map((student, index) => (
              <div key={index} className="student-card">
                <h3>{student.name}</h3>
                <p><strong>Grade:</strong> {student.grade}</p>
                <p><strong>Subject:</strong> {student.subject}</p>
                <p><strong>School:</strong> {student.school}</p>
                <p><strong>Phone:</strong> {student.phoneNumber}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentSearch;