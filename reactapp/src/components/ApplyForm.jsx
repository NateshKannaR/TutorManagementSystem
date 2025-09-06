import React, { useState } from "react";
import BubbleBackground from "./BubbleBackground";
import "./ApplyForm.css";
import { API_BASE_URL } from "../apiConfig";

function ApplyForm() {
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    subject: "",
    experience: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Form validation
  const validate = () => {
    const e = {};
    if (!formData.name) e.name = "Name is required";
    if (!formData.qualification) e.qualification = "Qualification is required";
    if (!formData.subject) e.subject = "Subject is required";
    if (formData.experience === "") e.experience = "Experience is required";
    else if (isNaN(formData.experience) || formData.experience < 0)
      e.experience = "Experience must be a valid number or at least 0";
    if (!formData.phoneNumber) e.phoneNumber = "Phone Number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber))
      e.phoneNumber = "Invalid phone number format";
    return e;
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
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
      const tutorData = { ...formData, experience: Number(formData.experience) };
      
      const res = await fetch(`${API_BASE_URL}/addTutor`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Username": username || ""
        },
        body: JSON.stringify(tutorData),
      });

      if (res.ok) {
        setSuccess("Application submitted successfully!");
        setFormData({ name: "", qualification: "", subject: "", experience: "", phoneNumber: "" });
      } else {
        const errorText = await res.text();
        console.error('Server response:', res.status, errorText);
        setSuccess(`Submission failed: ${errorText}`);
      }
   } catch (err) {
        console.error('Network error:', err);
        setSuccess("Submission failed due to network error.");
    }
};

return (
<>
<BubbleBackground count={6} color="#7c3aed" />
<div className="form-container">
<h2>Apply to Become a Tutor</h2>
{success && <p className="success">{success}</p>}
<form onSubmit={handleSubmit}>
<label htmlFor="name">Name:</label>
<input id="name" name="name" value={formData.name} onChange={handleChange} />
{errors.name && <span className="error">{errors.name}</span>}

<label htmlFor="qualification">Qualification:</label>
<input id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} />
{errors.qualification && <span className="error">{errors.qualification}</span>}

<label htmlFor="subject">Subject:</label>
<input id="subject" name="subject" value={formData.subject} onChange={handleChange} />
{errors.subject && <span className="error">{errors.subject}</span>}

<label htmlFor="experience">Experience (in years):</label>
<input id="experience" name="experience" value={formData.experience} onChange={handleChange} />
{errors.experience && <span className="error">{errors.experience}</span>}

<label htmlFor="phoneNumber">Phone Number:</label>
<input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
{errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}

<button type="submit">Submit Application</button>
</form>
</div>
</>
);
}

export default ApplyForm;