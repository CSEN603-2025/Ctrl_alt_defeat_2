import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './ProStudentSidebar.css';
import { FiLogOut } from 'react-icons/fi';

const ProStudentSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing session/tokens)
    navigate('/'); // Redirect to sign-in page
  };

  return (
    <div className="pro-student-sidebar">
      <div className="sidebar-header">
        <h2>Pro Student Portal</h2>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/pro-student/dashboard" className={`nav-item ${location.pathname === '/pro-student/dashboard' ? 'active' : ''}`}>
          <span className="nav-icon">📊</span>
          <span className="nav-label">Dashboard</span>
        </Link>
        <Link to="/pro-student/profile" className={`nav-item ${location.pathname === '/pro-student/profile' ? 'active' : ''}`}>
          <span className="nav-icon">👤</span>
          <span className="nav-label">Profile</span>
        </Link>
        <Link to="/pro-student/applications" className={`nav-item ${location.pathname === '/pro-student/applications' ? 'active' : ''}`}>
          <span className="nav-icon">📝</span>
          <span className="nav-label">Applications</span>
        </Link>
        <Link to="/pro-student/internships" className={`nav-item ${location.pathname === '/pro-student/internships' ? 'active' : ''}`}>
          <span className="nav-icon">💼</span>
          <span className="nav-label">My Internships</span>
        </Link>
        <Link to="/pro-student/workshops" className={`nav-item ${location.pathname === '/pro-student/workshops' ? 'active' : ''}`}>
          <span className="nav-icon">🎓</span>
          <span className="nav-label">Career Workshops</span>
        </Link>
        <Link to="/pro-student/notifications" className={`nav-item ${location.pathname === '/pro-student/notifications' ? 'active' : ''}`}>
          <span className="nav-icon">🔔</span>
          <span className="nav-label">Notifications</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <img src="/images/woman.png" alt="User" className="sidebar-footer-img" />
        <div className="sidebar-footer-info">
          <p className="sidebar-footer-name">Sara Emad</p>
          <p className="sidebar-footer-role">Pro Student Admin</p>
          <div className="sidebar-logout" onClick={handleLogout}>
            <FiLogOut className="logout-icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProStudentSidebar; 