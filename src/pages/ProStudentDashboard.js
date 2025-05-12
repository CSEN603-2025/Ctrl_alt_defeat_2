import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaTh, FaFileAlt, FaUsers, FaChartBar, FaNewspaper, FaBriefcase } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import './ProStudentDashboard.css';

const ProStudentDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [isBellAnimating, setIsBellAnimating] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleBellClick = () => {
    setIsBellAnimating(true);
    setTimeout(() => {
      setIsBellAnimating(false);
      navigate('/pro-student/notifications');
    }, 500);
  };

  const handleLogout = () => {
    navigate('/SignIn');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-overview">
            <div className="hero-banner">
              <h2>Welcome back, Sara 👋</h2>
              <p className="subtext">
                Today is {new Date().toLocaleString('en-US', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
              </p>
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
                  <button className="action-button" onClick={() => navigate('/pro-student/profile', { state: { tab: 'assessments' } })}>
                    Online Assessments
                  </button>
                  <button className="action-button" onClick={() => navigate('/pro-student/internship-management')}>
                    Internship Management
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <h2>Loading...</h2>;
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo">
          <img src="/images/guc-logo.png" alt="GUC Logo" className="logo-img" />
          <div className="logo-text">
            <span className="tagline"></span>
          </div>
        </div>
        <ul>
          <li className={activeSection === 'dashboard' ? 'active' : ''} onClick={() => setActiveSection('dashboard')}><FaTh /> Dashboard</li>
          <li className={activeSection === 'applications' ? 'active' : ''} onClick={() => navigate('/pro-student/applications')}><FaFileAlt /> Applications</li>
          <li className={activeSection === 'internships' ? 'active' : ''} onClick={() => navigate('/pro-student/internships')}><FaBriefcase /> Internships</li>
          <li className={activeSection === 'profile' ? 'active' : ''} onClick={() => navigate('/pro-student/profile')}><FaUsers /> Profile</li>
          <li className={activeSection === 'statistics' ? 'active' : ''} onClick={() => setActiveSection('statistics')}><FaChartBar /> Statistics</li>
          <li className={activeSection === 'news' ? 'active' : ''} onClick={() => setActiveSection('news')}><FaNewspaper /> News</li>
        </ul>
        <div className="sidebar-footer">
          <img src="/images/woman.png" alt="User" className="sidebar-footer-img" />
          <div className="sidebar-footer-info">
            <p className="sidebar-footer-name">Sara Ahmed</p>
            <p className="sidebar-footer-role">Pro Student</p>
            <div className="sidebar-logout" onClick={handleLogout}>
              <FiLogOut className="logout-icon" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="header-bar">
          <div className="header-left">
            <h2 className="header-title">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
          </div>
          <div className="header-tools">
            <div className="notif-icon" onClick={handleBellClick}>
              <FaBell className={isBellAnimating ? 'wiggle-bell' : ''} />
              {unreadNotifications > 0 && (
                <span className="notif-badge">{unreadNotifications}</span>
              )}
            </div>
            <div className="profile-wrapper" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <img src="/images/woman.png" alt="Profile" className="profile-img" />
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <p onClick={() => navigate('/pro-student/profile')}>Profile</p>
                  <p>Settings</p>
                  <p onClick={handleLogout}>Logout</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default ProStudentDashboard; 