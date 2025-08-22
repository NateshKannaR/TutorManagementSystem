// src/components/ApplyForm.jsx
import React, { useState } from "react";
import API_BASE_URL from "../apiConfig";
import "./ApplyForm.css";

function ApplyForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Application submitted successfully!");
        setFormData({ name: "", email: "", subject: "" });
      } else {
        setMessage("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error submitting form");
    }
  };

  return (
    <div className="apply-form">
      <h2>Apply as Tutor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ApplyForm;
