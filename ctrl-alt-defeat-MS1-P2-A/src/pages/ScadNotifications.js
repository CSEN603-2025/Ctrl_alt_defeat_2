import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome, FaBuilding, FaUserGraduate, FaBriefcase, FaFileAlt, FaChartBar, FaCalendarCheck, FaBell, FaClipboardList } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import notificationsData from './notificationsData';
import './ProStudentNotifications.css';
import './ScadDashboard.css';

const mockUser = { id: 'scad_admin', name: 'Amr Adel', role: 'admin' };

const ScadNotifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(notificationsData);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newCallNotification = {
        id: notifications.length + 1,
        type: 'incoming-call',
        title: 'Incoming Call',
        message: 'You have an incoming call from Prof. John Smith.',
        details: 'Prof. John Smith is calling you regarding your report clarification session scheduled for May 21, 2025. Please prepare your questions and materials.',
        timestamp: 'Just now',
        read: false
      };
      setNotifications((prev) => [...prev, newCallNotification]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notifications.length]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const closeDetails = () => {
    setSelectedNotification(null);
  };

  const Sidebar = () => (
    <aside className="scad-sidebar">
      <div className="scad-logo">
        <img src="/images/guc-logo.png" alt="GUC Logo" className="scad-logo-img" />
        <div className="scad-logo-text">
          <span className="scad-tagline"></span>
        </div>
      </div>
      <ul>
        <li onClick={() => navigate('/Scad-Dashboard')}>
          <FaHome /> Dashboard
        </li>
        <li onClick={() => navigate('/Scad-Dashboard', { state: { activeSection: 'companies' }})}>
          <FaBuilding /> Companies
        </li>
        <li onClick={() => navigate('/Scad-Dashboard', { state: { activeSection: 'students' }})}>
          <FaUserGraduate /> Students
        </li>
        <li onClick={() => navigate('/Scad-Dashboard', { state: { activeSection: 'internship-postings' }})}>
          <FaBriefcase /> Internship Postings
        </li>
        <li onClick={() => navigate('/Scad-Dashboard', { state: { activeSection: 'reports' }})}>
          <FaFileAlt /> Internship Reports
        </li>
        <li onClick={() => navigate('/Scad-Dashboard', { state: { activeSection: 'statistics' }})}>
          <FaChartBar /> Statistics
        </li>
        <li onClick={() => navigate('/Scad-Dashboard', { state: { activeSection: 'evaluations' }})}>
          <FaClipboardList /> Evaluations
        </li>
        <li onClick={() => navigate('/scad/appointments')}>
          <FaCalendarCheck /> Career/Report Appointment
        </li>
        <li onClick={() => navigate('/scad/notifications')}>
          <FaBell /> Notifications
        </li>
      </ul>
      <div className="scad-sidebar-footer">
        <img src="/images/Scad Logo.png" alt="SCAD Logo" className="scad-sidebar-footer-img" />
        <div className="scad-sidebar-footer-info">
          <p className="scad-sidebar-footer-name">Amr Adel</p>
          <p className="scad-sidebar-footer-role">SCAD Office Admin</p>
          <div className="scad-sidebar-logout" onClick={() => { localStorage.clear(); navigate('/'); }}>
            <FiLogOut className="scad-logout-icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="pro-student-layout">
      <Sidebar />
      <div className="pro-student-content">
        <button className="back-btn" onClick={() => navigate('/scad/appointments')}>
          <FaArrowLeft /> Back to Appointments
        </button>

        <h1>Notifications</h1>

        <div className="notifications-content">
          <div className={`notifications-list ${selectedNotification ? 'compressed' : ''}`}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-card ${notification.read ? 'read' : 'unread'} ${notification.type}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="notification-header">
                  <span className={`notification-type ${notification.type}`}>
                    {notification.type === 'application' ? '📝' :
                     notification.type === 'interview' ? '📅' :
                     notification.type === 'offer' ? '🎉' :
                     notification.type === 'appointment-accepted' ? '📅' :
                     notification.type === 'appointment-confirmed' ? '✅' :
                     notification.type === 'chat-message' ? '💬' :
                     notification.type === 'workshop-reminder' ? '🔔' :
                     notification.type === 'internship-start' ? '📢' :
                     notification.type === 'internship-reminder' ? '⏰' :
                     notification.type === 'incoming-call' ? '📞' :
                     notification.type === 'call-ended' ? '📴' : ''}
                  </span>
                  <span className="notification-time">{notification.timestamp}</span>
                </div>
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                {!notification.read && <div className="unread-indicator" />}
              </div>
            ))}
          </div>

          {selectedNotification && (
            <div className="notification-details">
              <button className="close-button" onClick={closeDetails}>×</button>
              <div className="details-header">
                <div className="header-left">
                  <span className={`notification-type ${selectedNotification.type}`}>
                    {selectedNotification.type === 'application' ? '📝' :
                     selectedNotification.type === 'interview' ? '📅' :
                     selectedNotification.type === 'offer' ? '🎉' :
                     selectedNotification.type === 'appointment-accepted' ? '📅' :
                     selectedNotification.type === 'appointment-confirmed' ? '✅' :
                     selectedNotification.type === 'chat-message' ? '💬' :
                     selectedNotification.type === 'workshop-reminder' ? '🔔' :
                     selectedNotification.type === 'internship-start' ? '📢' :
                     selectedNotification.type === 'internship-reminder' ? '⏰' :
                     selectedNotification.type === 'incoming-call' ? '📞' :
                     selectedNotification.type === 'call-ended' ? '📴' : ''}
                  </span>
                  <span className="notification-time">{selectedNotification.timestamp}</span>
                </div>
              </div>
              <h2>{selectedNotification.title}</h2>
              <p className="details-message">{selectedNotification.message}</p>
              <div className="details-content">
                <p>{selectedNotification.details}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScadNotifications;