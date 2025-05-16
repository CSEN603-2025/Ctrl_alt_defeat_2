import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTh, FaUser, FaFileAlt, FaBriefcase, FaNewspaper, FaBell } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import './ProStudentSidebar.css';

const ProStudentSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing session/tokens)
    navigate('/'); // Redirect to sign-in page
  };

  return (
    <div className="pro-student-sidebar">
      <div className="logo">
        <img src="/images/guc-logo.png" alt="GUC Logo" className="logo-img" />
        <div className="logo-text">
          <span className="tagline"></span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link to="/pro-student/dashboard" className={`nav-item ${location.pathname === '/pro-student/dashboard' ? 'active' : ''}`}>
          <FaTh className="nav-icon" />
          <span className="nav-label">Dashboard</span>
        </Link>
        <Link to="/pro-student/profile" className={`nav-item ${location.pathname === '/pro-student/profile' ? 'active' : ''}`}>
          <FaUser className="nav-icon" />
          <span className="nav-label">Profile</span>
        </Link>
        <Link to="/pro-student/applications" className={`nav-item ${location.pathname === '/pro-student/applications' ? 'active' : ''}`}>
          <FaFileAlt className="nav-icon" />
          <span className="nav-label">Applications</span>
        </Link>
        <Link to="/pro-student/internships" className={`nav-item ${location.pathname === '/pro-student/internships' ? 'active' : ''}`}>
          <FaBriefcase className="nav-icon" />
          <span className="nav-label">My Internships</span>
        </Link>
        <Link to="/pro-student/workshops" className={`nav-item ${location.pathname === '/pro-student/workshops' ? 'active' : ''}`}>
          <FaNewspaper className="nav-icon" />
          <span className="nav-label">Career Workshops</span>
        </Link>
        <Link to="/pro-student/notifications" className={`nav-item ${location.pathname === '/pro-student/notifications' ? 'active' : ''}`}>
          <FaBell className="nav-icon" />
          <span className="nav-label">Notifications</span>
        </Link>
        <Link to="/pro-student/suggested-companies" className={`nav-item ${location.pathname === '/pro-student/suggested-companies' ? 'active' : ''}`}>
          <FaBriefcase className="nav-icon" />
          <span className="nav-label">Suggested Companies</span>
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