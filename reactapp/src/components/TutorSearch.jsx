import React, { useState } from "react";
import { API_BASE_URL } from "../apiConfig";
import BubbleBackground from "./BubbleBackground";
import "./TutorSearch.css";

function TutorSearch() {
  const [searchParams, setSearchParams] = useState({
    subject: "",
    minExperience: 0
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams({
        subject: searchParams.subject,
        minExperience: searchParams.minExperience
      });
      
      const res = await fetch(`${API_BASE_URL}/matching/recommend?${params}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tutor-search">
      <BubbleBackground count={10} color="#06b6d4" />
      <h2>Find Tutors</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label>Subject:</label>
          <input
            name="subject"
            value={searchParams.subject}
            onChange={handleChange}
            placeholder="Enter subject (e.g., Math, Science)"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Minimum Experience (years):</label>
          <input
            name="minExperience"
            type="number"
            value={searchParams.minExperience}
            onChange={handleChange}
            min="0"
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search Tutors"}
        </button>
      </form>

      <div className="search-results">
        {results.length > 0 ? (
          <div className="tutors-grid">
            {results.map((tutor) => (
              <div key={tutor.id} className="tutor-card">
                <h3>{tutor.name}</h3>
                <p><strong>Subject:</strong> {tutor.subject}</p>
                <p><strong>Qualification:</strong> {tutor.qualification}</p>
                <p><strong>Experience:</strong> {tutor.experience} years</p>
                <p><strong>Phone:</strong> {tutor.phoneNumber}</p>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>No tutors found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default TutorSearch;