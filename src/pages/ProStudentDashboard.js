import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import notifications from './notificationsData';
import './ProStudentDashboard.css';

const ProStudentDashboard = () => {
  const navigate = useNavigate();
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Mock unread notifications count
  const [isBellAnimating, setIsBellAnimating] = useState(false);

  const handleBellClick = () => {
    setIsBellAnimating(true);
    setTimeout(() => {
      setIsBellAnimating(false);
      navigate('/pro-student/notifications');
    }, 500);
  };

  // Function to sort notifications by timestamp (most recent first)
  const sortNotifications = (notifications) => {
    const timeUnits = {
      'minutes ago': 1,
      'hour ago': 60,
      'hours ago': 60,
      'day ago': 1440,
      'days ago': 1440,
      'week ago': 10080,
      'weeks ago': 10080
    };

    return [...notifications].sort((a, b) => {
      const [aValue, aUnit] = a.timestamp.split(' ');
      const [bValue, bUnit] = b.timestamp.split(' ');
      const aMinutes = parseInt(aValue) * (timeUnits[aUnit] || 1);
      const bMinutes = parseInt(bValue) * (timeUnits[bUnit] || 1);
      return aMinutes - bMinutes; // Sort ascending (most recent first)
    });
  };

  const sortedNotifications = sortNotifications(notifications).slice(0, 6);

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <div className="hero-banner">
          <h2>Welcome back, Sara 👋</h2>
          <p className="subtext">
            Today is {new Date().toLocaleString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>

        <div className="floating-notif" onClick={handleBellClick}>
          <FaBell className="wiggle-bell" />
          {unreadNotifications > 0 && (
            <span className="notification-badge">{unreadNotifications}</span>
          )}
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Active Applications</h3>
            <p className="stat-number">5</p>
          </div>
          <div className="stat-card">
            <h3>Upcoming Interviews</h3>
            <p className="stat-number">2</p>
          </div>
          <div className="stat-card">
            <h3>Current Internships</h3>
            <p className="stat-number">1</p>
          </div>
          <div className="stat-card">
            <h3>Completed Internships</h3>
            <p className="stat-number">3</p>
          </div>
        </div>

        <div className="dashboard-sections">
          <div className="section-card">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {sortedNotifications.map(notification => (
                <div className="activity-item" key={notification.id}>
                  <span className="activity-icon">
                    {notification.type === 'application' ? '📝' :
                      notification.type === 'interview' ? '📅' :
                      notification.type === 'offer' ? '🎉' :
                      notification.type === 'appointment-accepted' ? '📅' :
                      notification.type === 'appointment-confirmed' ? '✅' :
                      notification.type === 'chat-message' ? '💬' :
                      notification.type === 'workshop-reminder' ? '🔔' :
                      notification.type === 'internship-start' ? '📢' :
                      notification.type === 'internship-reminder' ? '⏰' : ''}
                  </span>
                  <div className="activity-details">
                    <p>{notification.message}</p>
                    <span className="activity-time">{notification.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card video-card">
            <h2>Featured Video</h2>
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/pg0iNuiIzfA"
                title="Featured Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="video-iframe"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProStudentDashboard;