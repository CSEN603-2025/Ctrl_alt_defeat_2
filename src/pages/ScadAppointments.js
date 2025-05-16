import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaBuilding, FaUserGraduate, FaBriefcase, FaFileAlt, FaChartBar, FaCalendarCheck, FaBell, FaArrowLeft, FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaShareSquare, FaPhoneSlash } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import './ScadAppointments.css';
import './ScadDashboard.css'; // For sidebar styling

function ScadAppointments({ isEmbedded = false }) {
  const [activeSection, setActiveSection] = useState('appointments');
  const [appointments, setAppointments] = useState([
    { id: 1, studentId: 'user1', mentorId: 'mentor1', mentorName: 'Dr. Jane Doe', purpose: 'Career Guidance', type: 'career', date: '2025-05-20', time: '10:00 AM', status: 'pending' },
    { id: 2, studentId: 'user1', mentorId: 'mentor2', mentorName: 'Prof. John Smith', purpose: 'Report Clarification', type: 'report', date: '2025-05-21', time: '2:00 PM', status: 'accepted' },
  ]);
  const [scadAppointments, setScadAppointments] = useState([
    { id: 3, studentId: 'user1', mentorId: 'mentor3', mentorName: 'Dr. Alice Brown', purpose: 'Portfolio Review', type: 'career', date: '2025-05-22', time: '11:00 AM', status: 'accepted' },
    { id: 4, studentId: 'user1', mentorId: 'mentor4', mentorName: 'Prof. Bob Wilson', purpose: 'Project Feedback', type: 'report', date: '2025-05-23', time: '3:00 PM', status: 'pending' },
  ]);
  const [formData, setFormData] = useState({ purpose: '', type: 'career', date: '', time: '' });
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [onlineUsers, setOnlineUsers] = useState({});
  const [incomingCall, setIncomingCall] = useState(null);
  const [callStatus, setCallStatus] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New appointment request from Dr. Jane Doe', isRead: false, type: 'info', timestamp: '2025-05-15T10:00:00Z' },
    { id: 2, message: 'Your appointment with Prof. John Smith is confirmed', isRead: false, type: 'success', timestamp: '2025-05-15T12:00:00Z' },
  ]);
  const [isBellAnimating, setIsBellAnimating] = useState(false);
  const [isRequestActive, setIsRequestActive] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const hasRendered = useRef(false);

  const mockUser = { id: 'scad_admin', name: 'Amr Adel', role: 'admin' };

  // Reset call-related state when mounting to ensure consistency
  useEffect(() => {
    if (hasRendered.current) {
      console.log('Prevented duplicate render');
      return;
    }
    hasRendered.current = true;
    console.log('ScadAppointments mounted, isEmbedded:', isEmbedded, 'location:', location.pathname);
    
    // Reset call-related state
    if (incomingCall) {
      setIncomingCall(null);
    }
    if (callStatus) {
      setCallStatus(null);
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
    setIsVideoOn(true);
    setIsMicOn(true);
    setIsScreenSharing(false);

    return () => {
      console.log('ScadAppointments unmounted');
      hasRendered.current = false;
    };
  }, [isEmbedded, location.pathname, incomingCall, callStatus, localStream, peer]);

  // Calculate unread notifications count
  const unreadNotifications = notifications.filter((n) => !n.isRead).length;

  // Initialize WebSocket
  useEffect(() => {
    socketRef.current = io('http://localhost:3001', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    socketRef.current.emit('join', mockUser.id);

    socketRef.current.on('userStatus', (status) => {
      setOnlineUsers((prev) => ({ ...prev, ...status }));
    });

    socketRef.current.on('incomingCall', ({ from, appointmentId, signal }) => {
      if (!incomingCall) {
        const newCall = { from, appointmentId, signal };
        setIncomingCall(newCall);
        const newNotification = {
          id: Date.now(),
          message: `Incoming call from ${from.name}`,
          isRead: false,
          type: 'call',
          timestamp: new Date().toISOString(),
        };
        setNotifications((prev) => [...prev, newNotification]);
        showNotification(newNotification.message, newNotification.type);
      }
    });

    socketRef.current.on('callAccepted', ({ signal }) => {
      if (peer) {
        peer.signal(signal);
        setCallStatus('connected');
      }
    });

    socketRef.current.on('callRejected', () => {
      showNotification('Call rejected by the other user', 'error');
      setIncomingCall(null);
      endCall();
    });

    socketRef.current.on('callEnded', () => {
      showNotification('The other user has left the call', 'info');
      setIncomingCall(null);
      endCall();
    });

    socketRef.current.on('newScadAppointment', (appointment) => {
      setScadAppointments((prev) => [...prev, appointment]);
      const newNotification = {
        id: Date.now(),
        message: `New SCAD appointment request from ${appointment.mentorName}`,
        isRead: false,
        type: 'info',
        timestamp: new Date().toISOString(),
      };
      setNotifications((prev) => [...prev, newNotification]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [peer, incomingCall]);

  // Handle form submission
  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.purpose) newErrors.purpose = 'Purpose is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newAppointment = {
        id: appointments.length + 1,
        studentId: mockUser.id,
        mentorId: 'mentor1',
        mentorName: 'Dr. Jane Doe',
        purpose: formData.purpose,
        type: formData.type,
        date: formData.date,
        time: formData.time,
        status: 'pending',
      };
      setAppointments([...appointments, newAppointment]);
      socketRef.current.emit('requestAppointment', newAppointment);
      setFormData({ purpose: '', type: 'career', date: '', time: '' });
      setShowForm(false);
      setIsRequestActive(false);
      showNotification('Appointment requested successfully!');
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: 'Appointment request submitted successfully',
          isRead: false,
          type: 'success',
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  // Handle accept SCAD appointment
  const handleAccept = (appointmentId) => {
    setScadAppointments((prev) =>
      prev.map((appt) =>
        appt.id === appointmentId ? { ...appt, status: 'accepted' } : appt
      )
    );
    socketRef.current.emit('acceptAppointment', { appointmentId, studentId: mockUser.id });
    showNotification('Appointment accepted!');
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: 'SCAD appointment accepted',
        isRead: false,
        type: 'success',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // Handle reject SCAD appointment
  const handleReject = (appointmentId) => {
    setScadAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
    socketRef.current.emit('rejectAppointment', { appointmentId, studentId: mockUser.id });
    showNotification('Appointment rejected.');
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: 'SCAD appointment rejected',
        isRead: false,
        type: 'error',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // Start a call
  const startCall = async (appointment) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;

      const peerInstance = new Peer({ initiator: true, trickle: false, stream });
      setPeer(peerInstance);

      peerInstance.on('signal', (data) => {
        socketRef.current.emit('callUser', {
          to: appointment.mentorId,
          appointmentId: appointment.id,
          signal: data,
          from: mockUser,
        });
      });

      peerInstance.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
      });

      peerInstance.on('error', (err) => {
        console.error('Peer error:', err);
        showNotification('Error during call setup', 'error');
        endCall();
      });

      setCallStatus('calling');
    } catch (err) {
      console.error('Error accessing media devices:', err);
      showNotification('Failed to access camera/microphone', 'error');
    }
  };

  // Accept an incoming call
  const acceptCall = async () => {
    try {
      if (!incomingCall || !incomingCall.from?.id || !incomingCall.appointmentId) {
        throw new Error('Invalid or missing incoming call data');
      }
      navigate('/scad/video-call', { state: { call: incomingCall } });
      setIncomingCall(null);
      showNotification('Call accepted!');
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: 'Call accepted',
          isRead: false,
          type: 'success',
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.error('Error accepting call:', err.message);
      showNotification(`Failed to accept call: ${err.message}`, 'error');
      navigate('/scad/appointments');
    }
  };

  // Reject an incoming call
  const rejectCall = () => {
    if (incomingCall && socketRef.current) {
      socketRef.current.emit('rejectCall', { to: incomingCall.from.id });
    }
    setIncomingCall(null);
    showNotification('Call rejected');
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: 'Call rejected',
        isRead: false,
        type: 'error',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // End the call
  const endCall = () => {
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    setCallStatus(null);
    setIsVideoOn(true);
    setIsMicOn(true);
    setIsScreenSharing(false);
    if (socketRef.current && (incomingCall?.from.id || callStatus === 'connected')) {
      socketRef.current.emit('callEnded', { to: incomingCall?.from.id || 'mentor1' });
    }
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: 'Call ended',
        isRead: false,
        type: 'info',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // Toggle video
  const toggleVideo = async () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
        setIsVideoOn(!isVideoOn);
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setLocalStream(stream);
        localVideoRef.current.srcObject = stream;
        if (peer) {
          peer.addStream(stream);
        }
        setIsVideoOn(true);
      } catch (err) {
        console.error('Error accessing camera:', err);
        showNotification('Failed to access camera', 'error');
      }
    }
  };

  // Toggle microphone
  const toggleMic = async () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
        setIsMicOn(!isMicOn);
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setLocalStream(stream);
        if (peer) {
          peer.addStream(stream);
        }
        setIsMicOn(true);
      } catch (err) {
        console.error('Error accessing microphone:', err);
        showNotification('Failed to access microphone', 'error');
      }
    }
  };

  // Toggle screen sharing
  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      localStream.getTracks().forEach((track) => track.stop());
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;
      peer.replaceTrack(
        localStream.getVideoTracks()[0],
        stream.getVideoTracks()[0],
        localStream
      );
      setIsScreenSharing(false);
    } else {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setLocalStream(screenStream);
        localVideoRef.current.srcObject = screenStream;
        peer.replaceTrack(
          localStream.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          localStream
        );
        setIsScreenSharing(true);
        screenStream.getVideoTracks()[0].onended = () => toggleScreenShare();
      } catch (err) {
        console.error('Error sharing screen:', err);
        showNotification('Failed to share screen', 'error');
      }
    }
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle appointment click
  const handleAppointmentClick = (appt) => {
    if (appt.status === 'accepted') {
      const mockCall = {
        from: { id: appt.mentorId, name: appt.mentorName },
        appointmentId: appt.id,
        signal: {},
      };
      navigate('/scad/accepted-appointments', { state: { appointment: appt, mockCall } });
    }
  };

  // Handle bell click
  const handleBellClick = () => {
    setIsBellAnimating(true);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setTimeout(() => {
      setIsBellAnimating(false);
      navigate('/scad/notifications');
    }, 500);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // Handle request appointment
  const handleRequestAppointment = () => {
    setIsRequestActive(true);
    setShowForm(true);
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate('/Scad-Dashboard');
  };

  // Sidebar component
  const Sidebar = () => (
    <aside className="scad-sidebar">
      <div className="scad-logo">
        <img src="/images/guc-logo.png" alt="GUC Logo" className="scad-logo-img" />
        <div className="scad-logo-text">
          <span className="scad-tagline"></span>
        </div>
      </div>
      <ul>
        <li
          className={activeSection === 'dashboard' ? 'active' : ''}
          onClick={() => navigate('/Scad-Dashboard')}
        >
          <FaHome /> Dashboard
        </li>
        <li
          className={activeSection === 'companies' ? 'active' : ''}
          onClick={() => navigate('/Scad-Dashboard', { state: { activeSection: 'companies' }})}
        >
          <FaBuilding /> Companies
        </li>
        <li
          className={activeSection === 'students' ? 'active' : ''}
          onClick={() => navigate('/Scad-Dashboard', { state: { activeSection: 'students' }})}
        >
          <FaUserGraduate /> Students
        </li>
        <li
          className={activeSection === 'internship-postings' ? 'active' : ''}
          onClick={() => navigate('/Scad-Dashboard', { state: { activeSection: 'internship-postings' }})}
        >
          <FaBriefcase /> Internship Postings
        </li>
        <li
          className={activeSection === 'reports' ? 'active' : ''}
          onClick={() => navigate('/Scad-Dashboard', { state: { activeSection: 'reports' }})}
        >
          <FaFileAlt /> Reports
        </li>
        <li
          className={activeSection === 'statistics' ? 'active' : ''}
          onClick={() => navigate('/Scad-Dashboard', { state: { activeSection: 'statistics' }})}
        >
          <FaChartBar /> Statistics
        </li>
        <li
          className={activeSection === 'appointments' ? 'active' : ''}
          onClick={() => navigate('/scad/appointments')}
        >
          <FaCalendarCheck /> Career/Report Appointment
        </li>
      </ul>
      <div className="scad-sidebar-footer">
        <img src="/images/Scad Logo.jpg" alt="SCAD Logo" className="scad-sidebar-footer-img" />
        <div className="scad-sidebar-footer-info">
          <p className="scad-sidebar-footer-name">Amr Adel</p>
          <p className="scad-sidebar-footer-role">SCAD Office Admin</p>
          <div className="scad-sidebar-logout" onClick={handleLogout}>
            <FiLogOut className="scad-logout-icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </aside>
  );

  // Main content
  const Content = () => (
    <div className="pro-student-content">
      {!isEmbedded && (
        <div className="hero-banner">
          <div className="banner-content">
            <h2>Career/Report Appointments</h2>
            <p className="subtext">Schedule and manage your appointments!</p>
          </div>
          <div className="floating-notif" onClick={handleBellClick}>
            <FaBell className={`wiggle-bell ${isBellAnimating ? 'animating' : ''}`} />
            {unreadNotifications > 0 && (
              <span className="notification-badge">{unreadNotifications}</span>
            )}
          </div>
        </div>
      )}

      {notification && (
        <div className="feedback-message" role="alert" aria-live="polite">
          {notification.message}
        </div>
      )}

      <div className="button-container">
        <button className="back-btn" onClick={handleBackClick} aria-label="Back to Dashboard">
          <FaArrowLeft /> Back
        </button>
        <button
          className={`status-btn-outline accepted ${isRequestActive ? 'active' : ''}`}
          onClick={handleRequestAppointment}
        >
          Request Appointment
        </button>
      </div>

      <div className="appointments-section">
        <h3 className="category-header">My Appointment Requests</h3>
        <div className="appointments-table-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Purpose</th>
                <th>Type</th>
                <th>Mentor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr
                  key={appt.id}
                  onClick={() => handleAppointmentClick(appt)}
                  style={{ cursor: appt.status === 'accepted' ? 'pointer' : 'default' }}
                >
                  <td>{appt.purpose}</td>
                  <td>{appt.type.charAt(0).toUpperCase() + appt.type.slice(1)}</td>
                  <td>{appt.mentorName}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td>
                    <span className={`status-tag ${appt.status}`}>
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="category-header">SCAD Appointment Requests</h3>
        <div className="appointments-table-container">
          <table className="scad-appointments-table">
            <thead>
              <tr>
                <th>Purpose</th>
                <th>Type</th>
                <th>Mentor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scadAppointments.map((appt) => (
                <tr
                  key={appt.id}
                  onClick={() => handleAppointmentClick(appt)}
                  style={{ cursor: appt.status === 'accepted' ? 'pointer' : 'default' }}
                >
                  <td>{appt.purpose}</td>
                  <td>{appt.type.charAt(0).toUpperCase() + appt.type.slice(1)}</td>
                  <td>{appt.mentorName}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td>
                    {appt.status === 'pending' ? (
                      <div className="action-buttons">
                        <button
                          className={`action-button accept ${appt.status === 'accepted' ? 'selected' : ''}`}
                          onClick={(e) => { e.stopPropagation(); handleAccept(appt.id); }}
                        >
                          Accept
                        </button>
                        <button
                          className={`action-button reject ${appt.status === 'rejected' ? 'selected' : ''}`}
                          onClick={(e) => { e.stopPropagation(); handleReject(appt.id); }}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className={`status-tag ${appt.status}`}>
                        {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="appointment-modal">
          <div className="appointment-form">
            <h3>Request Appointment</h3>
            <form onSubmit={handleSubmitAppointment}>
              <div className="form-group">
                <label htmlFor="purpose">Purpose</label>
                <input
                  type="text"
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className={errors.purpose ? 'input-error' : ''}
                />
                {errors.purpose && <span className="error-message">{errors.purpose}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className={errors.type ? 'input-error' : ''}
                >
                  <option value="career">Career</option>
                  <option value="report">Report</option>
                </select>
                {errors.type && <span className="error-message">{errors.type}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={errors.date ? 'input-error' : ''}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className={errors.time ? 'input-error' : ''}
                />
                {errors.time && <span className="error-message">{errors.time}</span>}
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => { setShowForm(false); setIsRequestActive(false); }}>
                  Cancel
                </button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {incomingCall && (
        <div className="call-notification">
          <div className="call-notification-content">
            <h3>Incoming Call</h3>
            <p>From: {incomingCall.from.name}</p>
            <div className="call-actions">
              <button className={`action-button accept ${incomingCall.status === 'accepted' ? 'selected' : ''}`} onClick={acceptCall}>
                Accept
              </button>
              <button className={`action-button reject ${incomingCall.status === 'rejected' ? 'selected' : ''}`} onClick={rejectCall}>
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {callStatus && (
        <div className="call-interface">
          <div className="video-container">
            <video ref={localVideoRef} autoPlay muted playsInline className="local-video" />
            <video ref={remoteVideoRef} autoPlay playsInline className="remote-video" />
          </div>
          <div className="call-controls">
            <button onClick={toggleVideo} aria-label={isVideoOn ? 'Turn off video' : 'Turn on video'} className="action-button">
              {isVideoOn ? <FaVideo /> : <FaVideoSlash />}
            </button>
            <button onClick={toggleMic} aria-label={isMicOn ? 'Mute microphone' : 'Unmute microphone'} className="action-button">
              {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </button>
            <button onClick={toggleScreenShare} aria-label={isScreenSharing ? 'Stop screen sharing' : 'Share screen'} className="action-button">
              <FaShareSquare />
            </button>
            <button onClick={endCall} aria-label="End call" className="action-button end-call">
              <FaPhoneSlash />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return isEmbedded ? (
    <Content />
  ) : (
    <div className="pro-student-layout">
      <Sidebar />
      <Content />
    </div>
  );
}

export default ScadAppointments;