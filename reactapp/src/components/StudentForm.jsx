import React, { useState } from "react";
import BubbleBackground from "./BubbleBackground";
import "./StudentForm.css";
import { API_BASE_URL } from "../apiConfig";

function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    subject: "",
    school: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const e = {};
    if (!formData.name) e.name = "Name is required";
    if (!formData.grade) e.grade = "Grade is required";
    if (!formData.subject) e.subject = "Subject is required";
    if (!formData.school) e.school = "School is required";
    if (!formData.phoneNumber) e.phoneNumber = "Phone Number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber))
      e.phoneNumber = "Invalid phone number format";
    return e;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const username = localStorage.getItem('username');
      const res = await fetch(`${API_BASE_URL}/addStudent`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Username": username || ""
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess("Student registration successful!");
        setFormData({ name: "", grade: "", subject: "", school: "", phoneNumber: "" });
      } else {
        const errorText = await res.text();
        setSuccess(`Registration failed: ${errorText}`);
      }
    } catch (err) {
      setSuccess("Registration failed due to network error.");
    }
  };

  return (
    <>
      <BubbleBackground count={6} color="#06b6d4" />
      <div className="form-container">
        <h2>Register as Student</h2>
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}

          <label htmlFor="grade">Grade:</label>
          <input id="grade" name="grade" value={formData.grade} onChange={handleChange} />
          {errors.grade && <span className="error">{errors.grade}</span>}

          <label htmlFor="subject">Subject:</label>
          <input id="subject" name="subject" value={formData.subject} onChange={handleChange} />
          {errors.subject && <span className="error">{errors.subject}</span>}

          <label htmlFor="school">School:</label>
          <input id="school" name="school" value={formData.school} onChange={handleChange} />
          {errors.school && <span className="error">{errors.school}</span>}

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}

          <button type="submit">Register Student</button>
        </form>
      </div>
    </>
  );
}

export default StudentForm;