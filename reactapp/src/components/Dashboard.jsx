import React, { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "../apiConfig";
import "./Dashboard.css";

function Dashboard() {
  const [analytics, setAnalytics] = useState({});
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const fetchDashboardData = useCallback(async () => {
    try {
      if (role === "SYSTEM_ADMINISTRATOR" || role === "EDUCATION_MANAGER") {
        const analyticsRes = await fetch(`${API_BASE_URL}/admin/analytics/dashboard`);
        if (analyticsRes.ok) {
          const data = await analyticsRes.json();
          setAnalytics(data);
        }

        const appsRes = await fetch(`${API_BASE_URL}/applications/all`);
        if (appsRes.ok) {
          const appsData = await appsRes.json();
          setApplications(appsData);
        }
      } else {
        const userAppsRes = await fetch(`${API_BASE_URL}/applications/user/${username}`);
        if (userAppsRes.ok) {
          const userAppsData = await userAppsRes.json();
          setApplications(userAppsData);
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, [role, username]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const updateApplicationStatus = async (appId, status, comments) => {
    try {
      const res = await fetch(`${API_BASE_URL}/applications/${appId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          comments,
          reviewerUsername: username
        })
      });
      
      if (res.ok) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      {(role === "SYSTEM_ADMINISTRATOR" || role === "EDUCATION_MANAGER") && (
        <div className="analytics-section">
          <h3>Analytics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Applications</h4>
              <p>{analytics.totalApplications || 0}</p>
            </div>
            <div className="stat-card">
              <h4>Total Tutors</h4>
              <p>{analytics.totalTutors || 0}</p>
            </div>
            <div className="stat-card">
              <h4>Pending Applications</h4>
              <p>{analytics.pendingApplications || 0}</p>
            </div>
            <div className="stat-card">
              <h4>Approved Applications</h4>
              <p>{analytics.approvedApplications || 0}</p>
            </div>
          </div>
        </div>
      )}

      <div className="applications-section">
        <h3>{role === "TUTOR" ? "My Applications" : "All Applications"}</h3>
        <div className="applications-list">
          {applications.length > 0 ? (
            applications.map((app) => (
              <div key={app.id} className="application-card">
                <h4>{app.tutor?.name}</h4>
                <p>Subject: {app.tutor?.subject}</p>
                <p>Status: <span className={`status ${app.status.toLowerCase()}`}>{app.status}</span></p>
                <p>Submitted: {new Date(app.submissionDate).toLocaleDateString()}</p>
                
                {(role === "EDUCATION_MANAGER" || role === "SYSTEM_ADMINISTRATOR") && app.status === "SUBMITTED" && (
                  <div className="action-buttons">
                    <button 
                      onClick={() => updateApplicationStatus(app.id, "APPROVED", "Application approved")}
                      className="approve-btn"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => updateApplicationStatus(app.id, "REJECTED", "Application rejected")}
                      className="reject-btn"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No applications found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;