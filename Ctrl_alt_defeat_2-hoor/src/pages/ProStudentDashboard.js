import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
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

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <div className="hero-banner">
          <h2>Welcome to Your Dashboard</h2>
          <p className="subtext">Here's a quick look at your current internship activity.</p>
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
              <div className="activity-item">
                <span className="activity-icon">📝</span>
                <div className="activity-details">
                  <p>Application submitted for Software Developer Intern at Tech Corp</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">📅</span>
                <div className="activity-details">
                  <p>Interview scheduled with Data Analytics Co.</p>
                  <span className="activity-time">1 day ago</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">✅</span>
                <div className="activity-details">
                  <p>Completed internship at Web Solutions Inc.</p>
                  <span className="activity-time">1 week ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="section-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <button className="action-button" onClick={() => navigate('/pro-student/applications')}>
                View Applications
              </button>
              <button className="action-button" onClick={() => navigate('/pro-student/profile')}>
                Update Profile
              </button>
              <button className="action-button" onClick={() => navigate('/pro-student/internships')}>
                View Internships
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProStudentDashboard; 