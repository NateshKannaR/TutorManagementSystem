import React, { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "../apiConfig";
import BubbleBackground from "./BubbleBackground";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem('username');

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications/user/${username}`);
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [username]);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications/user/${username}/count`);
      if (res.ok) {
        const count = await res.json();
        setUnreadCount(count);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  }, [username]);

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, [fetchNotifications, fetchUnreadCount]);

  const markAsRead = async (notificationId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
        method: 'PUT'
      });
      if (res.ok) {
        setNotifications(notifications.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        ));
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (loading) return <div>Loading notifications...</div>;

  return (
    <div className="notifications">
      <BubbleBackground count={8} color="#f59e0b" />
      <div className="notifications-header">
        <h2>Notifications</h2>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount} unread</span>
        )}
      </div>

      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`notification-item ${!notification.read ? 'unread' : ''}`}
              onClick={() => !notification.read && markAsRead(notification.id)}
            >
              <div className="notification-header">
                <h4>{notification.title}</h4>
                <span className="notification-date">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="notification-message">{notification.message}</p>
              <div className="notification-meta">
                <span className={`notification-type ${notification.type.toLowerCase()}`}>
                  {notification.type}
                </span>
                {!notification.read && <span className="unread-indicator">●</span>}
              </div>
            </div>
          ))
        ) : (
          <p className="no-notifications">No notifications found.</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;