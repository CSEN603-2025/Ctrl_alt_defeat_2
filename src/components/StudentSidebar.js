import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTh, FaUser, FaFileAlt, FaBriefcase, FaNewspaper, FaBell, FaChartBar } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { FaBars } from 'react-icons/fa';
import './ProStudentSidebar.css';

const StudentSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
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
        <Link to="/student/dashboard" className={`nav-item ${location.pathname === '/student/dashboard' ? 'active' : ''}`}> 
          <FaTh className="nav-icon" />
          <span className="nav-label">Dashboard</span>
        </Link>
        <Link to="/student/profile" className={`nav-item ${location.pathname === '/student/profile' ? 'active' : ''}`}> 
          <FaUser className="nav-icon" />
          <span className="nav-label">Profile</span>
        </Link>
        <Link to="/student/applications" className={`nav-item ${location.pathname === '/student/applications' ? 'active' : ''}`}> 
          <FaFileAlt className="nav-icon" />
          <span className="nav-label">My Applications</span>
        </Link>
        <Link to="/student/internships" className={`nav-item ${location.pathname === '/student/internships' ? 'active' : ''}`}> 
          <FaBriefcase className="nav-icon" />
          <span className="nav-label">Internships</span>
        </Link>
        <Link to="/student/notifications" className={`nav-item ${location.pathname === '/student/notifications' ? 'active' : ''}`}>
          <FaBell className="nav-icon" />
          <span className="nav-label">Notifications</span>
        </Link>
        <Link to="/student/suggested-companies" className={`nav-item ${location.pathname === '/student/suggested-companies' ? 'active' : ''}`}> 
          <FaBriefcase className="nav-icon" />
          <span className="nav-label">Suggested Companies</span>
        </Link>
        
        
      </nav>
      <div className="sidebar-footer">
        <img src="/images/woman.png" alt="User" className="sidebar-footer-img" />
        <div className="sidebar-footer-info">
          <p className="sidebar-footer-name">Malak</p>
          <p className="sidebar-footer-role">Student</p>
          <div className="sidebar-logout" onClick={handleLogout}>
            <FiLogOut className="logout-icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar; 