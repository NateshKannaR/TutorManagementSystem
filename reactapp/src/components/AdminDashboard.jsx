import React, { useState, useEffect } from "react";
import BubbleBackground from "./BubbleBackground";
import "./AdminDashboard.css";
import { API_BASE_URL } from "../apiConfig";

function AdminDashboard() {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalTutors: 0,
    totalStudents: 0,
    totalApplications: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tutorsRes, studentsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/getAllTutors`),
          fetch(`${API_BASE_URL}/getAllStudents`)
        ]);
        
        const tutors = await tutorsRes.json();
        const students = await studentsRes.json();
        
        setAnalytics({
          totalUsers: tutors.length + students.length,
          totalTutors: tutors.length,
          totalStudents: students.length,
          totalApplications: tutors.length + students.length
        });
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      }
    };
    
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <BubbleBackground count={8} color="#ef4444" />
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Total Users</h3>
            <p className="count">{analytics.totalUsers}</p>
          </div>
          <div className="analytics-card">
            <h3>Total Tutors</h3>
            <p className="count">{analytics.totalTutors}</p>
          </div>
          <div className="analytics-card">
            <h3>Total Students</h3>
            <p className="count">{analytics.totalStudents}</p>
          </div>
          <div className="analytics-card">
            <h3>Total Applications</h3>
            <p className="count">{analytics.totalApplications}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;