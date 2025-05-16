import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBell, FaArrowLeft } from 'react-icons/fa';
import io from 'socket.io-client';
import ProStudentSidebar from '../components/ProStudentSidebar';
import '../pages/ProStudentAppointments.css';

const mockUser = { id: 'user1', name: 'Student Name', role: 'student' };

const AcceptedAppointments = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { mockCall } = state || {};
  const [incomingCalls, setIncomingCalls] = useState(mockCall ? [mockCall] : []);
  const [notification, setNotification] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [isBellAnimating, setIsBellAnimating] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');
    socketRef.current.emit('join', mockUser.id);

    socketRef.current.on('incomingCall', ({ from, appointmentId, signal }) => {
      setIncomingCalls((prev) => [...prev, { from, appointmentId, signal }]);
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

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleBellClick = () => {
    setIsBellAnimating(true);
    setTimeout(() => {
      setIsBellAnimating(false);
      navigate('/pro-student/notifications');
    }, 500);
  };

  const handleAcceptCall = (call) => {
    navigate('/pro-student/video-call', { state: { call } });
  };

  const handleRejectCall = (call) => {
    socketRef.current.emit('rejectCall', { to: call.from.id });
    setIncomingCalls((prev) => prev.filter((c) => c.appointmentId !== call.appointmentId));
    setNotification({ message: 'Call rejected', type: 'info' });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
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
          <button className="back-btn" onClick={() => navigate('/pro-student/appointments')} aria-label="Back to appointments">
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomingCalls.length === 0 ? (
                  <tr>
                    <td colSpan="2">No incoming calls</td>
                  </tr>
                ) : (
                  incomingCalls.map((call) => (
                    <tr key={call.appointmentId}>
                      <td>{call.from.name}</td>
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

export default AcceptedAppointments;