import React, { useState } from "react";

function ApplyForm() {
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    subject: "",
    experience: "",
    phoneNumber: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/tutors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        setFormData({
          name: "",
          qualification: "",
          subject: "",
          experience: "",
          phoneNumber: ""
        });
      } else {
        alert("Failed to submit application");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting application");
    }
  };

  return (
    <div className="apply-form-container">
      <h2>Apply as Tutor</h2>
      <form onSubmit={handleSubmit} className="apply-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
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
        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          value={formData.experience}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default ApplyForm;
