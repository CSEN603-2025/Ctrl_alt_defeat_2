import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBell, FaArrowLeft, FaHome, FaBuilding, FaUserGraduate, FaBriefcase, FaFileAlt, FaChartBar, FaCalendarCheck } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import io from 'socket.io-client';
import './ProStudentAppointments.css';
import './ScadDashboard.css';

const mockUser = { id: 'scad_admin', name: 'Amr Adel', role: 'admin' };

const ScadAcceptedAppointments = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { mockCall } = state || {};
  const initialCalls = mockCall ? [{ ...mockCall, callType: mockCall.callType || 'video' }] : [];
  const [incomingCalls, setIncomingCalls] = useState(initialCalls);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New call incoming', isRead: false, type: 'info', timestamp: '2025-05-15T10:00:00Z' },
  ]);
  const [notification, setNotification] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(1);
  const [isBellAnimating, setIsBellAnimating] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    setUnreadNotifications(notifications.filter((n) => !n.isRead).length);
  }, [notifications]);

  useEffect(() => {
    socketRef.current = io('http://localhost:3001', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on('connect', () => {
      console.log('WebSocket connected');
      socketRef.current.emit('join', mockUser.id);
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err);
      setNotification({ message: 'Failed to connect to server', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    });

    socketRef.current.on('incomingCall', ({ from, appointmentId, signal, callType }) => {
      setIncomingCalls((prev) => {
        if (prev.some((call) => call.appointmentId === appointmentId)) {
          return prev;
        }
        const newCall = { from, appointmentId, signal, callType: callType || 'video' };
        const newNotification = {
          id: Date.now(),
          message: `Incoming ${newCall.callType} call from ${from.name}`,
          isRead: false,
          type: 'call',
          timestamp: new Date().toISOString(),
        };
        setNotifications((prevNotifs) => [...prevNotifs, newNotification]);
        console.log('New incoming call:', newCall);
        return [...prev, newCall];
      });
    });

    socketRef.current.on('callRejected', () => {
      setNotification({ message: 'Call rejected by the other user', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    });

    socketRef.current.on('callEnded', () => {
      setNotification({ message: 'The other user has left the call', type: 'info' });
      setIncomingCalls([]);
      setTimeout(() => setNotification(null), 3000);
    });

    console.log('Current incomingCalls:', incomingCalls);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log('WebSocket disconnected');
      }
    };
  }, [incomingCalls]);

  const handleBellClick = () => {
    setIsBellAnimating(true);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setTimeout(() => {
      setIsBellAnimating(false);
      navigate('/scad/notifications');
    }, 500);
  };

  const handleAcceptCall = (call) => {
    if (!call?.from?.id || !call.appointmentId) {
      setNotification({ message: 'Invalid call data', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    const route = (call.callType || 'video') === 'voice' ? '/scad/voice-call' : '/scad/video-call';
    navigate(route, { state: { call } });
  };

  const handleRejectCall = (call) => {
    if (!call?.from?.id) {
      setNotification({ message: 'Invalid call data', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    socketRef.current.emit('rejectCall', { to: call.from.id });
    setIncomingCalls((prev) => prev.filter((c) => c.appointmentId !== call.appointmentId));
    setNotification({ message: 'Call rejected', type: 'info' });
    setTimeout(() => setNotification(null), 3000);
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
        <li onClick={() => navigate('/scad-dashboard')}>
          <FaHome /> Dashboard
        </li>
        <li onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'companies' }})}>
          <FaBuilding /> Companies
        </li>
        <li onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'students' }})}>
          <FaUserGraduate /> Students
        </li>
        <li onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'internship-postings' }})}>
          <FaBriefcase /> Internship Postings
        </li>
        <li onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'reports' }})}>
          <FaFileAlt /> Reports
        </li>
        <li onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'statistics' }})}>
          <FaChartBar /> Statistics
        </li>
        <li onClick={() => navigate('/scad/appointments')}>
          <FaCalendarCheck /> Career/Report Appointment
        </li>
        <li onClick={() => navigate('/scad/notifications')}>
          <FaBell /> Notifications
        </li>
      </ul>
      <div className="scad-sidebar-footer">
        <img src="/images/Scad Logo.jpg" alt="SCAD Logo" className="scad-sidebar-footer-img" />
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
        <div className="hero-banner">
          <div className="banner-content">
            <h2>Accepted Appointments</h2>
            <p className="subtext">Manage your incoming calls!</p>
          </div>
          <div className="floating-notif" onClick={handleBellClick}>
            <FaBell className={`wiggle-bell ${isBellAnimating ? 'animating' : ''}`} />
            {unreadNotifications > 0 && (
              <span className="notification-badge">{unreadNotifications}</span>
            )}
          </div>
        </div>

        {notification && (
          <div className="feedback-message" role="alert" aria-live="polite">
            {notification.message}
          </div>
        )}

        <div className="button-container">
          <button
            className="back-btn"
            onClick={() => navigate('/scad/appointments')}
            aria-label="Back to appointments"
          >
            <FaArrowLeft /> Back to Appointments
          </button>
        </div>

        <div className="appointments-section">
          <h3 className="category-header">Incoming Calls</h3>
          <div className="appointments-table-container">
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Caller</th>
                  <th>Call Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomingCalls.length === 0 ? (
                  <tr>
                    <td colSpan="3">No incoming calls</td>
                  </tr>
                ) : (
                  incomingCalls.map((call) => (
                    <tr key={call.appointmentId}>
                      <td>{call.from?.name || 'Unknown'}</td>
                      <td>{call.callType ? call.callType.charAt(0).toUpperCase() + call.callType.slice(1) : 'Video'}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-button accept"
                            onClick={() => handleAcceptCall(call)}
                          >
                            Accept
                          </button>
                          <button
                            className="action-button reject"
                            onClick={() => handleRejectCall(call)}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScadAcceptedAppointments;