import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMicrophone, FaMicrophoneSlash, FaPhoneSlash, FaBell, FaHome, FaBuilding, FaUserGraduate, FaBriefcase, FaFileAlt, FaChartBar, FaCalendarCheck } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import './ProStudentAppointments.css';
import './ScadDashboard.css';

const mockUser = { id: 'scad_admin', name: 'Amr Adel', role: 'admin' };

const initialNotifications = [
  { id: 1, message: 'Voice call started', isRead: false, type: 'info', timestamp: '2025-05-15T10:00:00Z' },
  { id: 2, message: 'Reminder: Voice call in progress', isRead: false, type: 'warning', timestamp: '2025-05-15T12:00:00Z' },
];

const ScadVoiceCall = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { call } = state || {};
  const [notification, setNotification] = useState(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCallerOnline, setIsCallerOnline] = useState(true);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isBellAnimating, setIsBellAnimating] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const socketRef = useRef(null);

  const unreadNotifications = notifications.filter((n) => !n.isRead).length;

  const showNotification = (message, type = 'success') => {
    const newNotification = {
      id: Date.now(),
      message,
      isRead: false,
      type,
      timestamp: new Date().toISOString(),
    };
    setNotifications((prev) => [...prev, newNotification]);
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const cleanup = () => {
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
      console.log('WebSocket disconnected');
    }
    setIsMicOn(true);
  };

  useEffect(() => {
    if (!call || !call.from) {
      console.warn('Incomplete call data');
      showNotification('Warning: Incomplete call data', 'warning');
      navigate('/scad/appointments');
      return;
    }

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
      showNotification('Failed to connect to server', 'error');
    });

    socketRef.current.on('userStatus', (status) => {
      if (call?.from?.id && status[call.from.id] !== undefined) {
        setIsCallerOnline(status[call.from.id]);
      }
    });

    socketRef.current.on('callEnded', () => {
      console.log('Call ended by other user');
      showNotification('The other user has left the call', 'info');
      endCall();
    });

    const initCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setLocalStream(stream);

        const peerInstance = new Peer({ initiator: false, trickle: false, stream });
        setPeer(peerInstance);

        peerInstance.on('signal', (data) => {
          socketRef.current.emit('acceptCall', {
            to: call.from.id,
            signal: data,
            appointmentId: call.appointmentId,
          });
        });

        peerInstance.on('stream', (remoteStream) => {
          const audio = new Audio();
          audio.srcObject = remoteStream;
          audio.play().catch((err) => console.error('Audio playback error:', err));
        });

        peerInstance.on('error', (err) => {
          console.error('Peer error:', err);
          showNotification('Call error', 'error');
          endCall();
        });

        peerInstance.signal(call.signal);
      } catch (err) {
        console.error('Error accessing microphone:', err);
        showNotification('Failed to access microphone', 'error');
        navigate('/scad/appointments');
      }
    };

    initCall();

    return cleanup;
  }, [call, navigate]);

  const toggleMic = async () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
        setIsMicOn(!isMicOn);
        showNotification(isMicOn ? 'Microphone muted' : 'Microphone unmuted');
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setLocalStream(stream);
        if (peer) {
          peer.addStream(stream);
        }
        setIsMicOn(true);
        showNotification('Microphone unmuted');
      } catch (err) {
        console.error('Error accessing microphone:', err);
        showNotification('Failed to access microphone', 'error');
      }
    }
  };

  const endCall = () => {
    console.log('Ending call');
    socketRef.current.emit('callEnded', { to: call?.from?.id });
    cleanup();
    showNotification('Call ended');
    navigate('/scad/appointments');
  };

  const handleBellClick = () => {
    setIsBellAnimating(true);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setTimeout(() => {
      setIsBellAnimating(false);
      navigate('/scad/notifications');
    }, 500);
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
          <FaFileAlt /> Reports
        </li>
        <li onClick={() => navigate('/Scad-Dashboard', { state: { activeSection: 'statistics' }})}>
          <FaChartBar /> Statistics
        </li>
        <li onClick={() => navigate('/scad/appointments')}>
          <FaCalendarCheck /> Career/Report Appointment
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
            <h2>Voice Call</h2>
            <p className="subtext">Manage your call!</p>
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

        <div className="call-section">
          <div className="caller-info">
            <h3>{call?.from?.name || 'Unknown Caller'}</h3>
            <span className={`online-status ${isCallerOnline ? 'online' : 'offline'}`}>
              {isCallerOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <div className="call-interface">
            <div className="call-controls">
              <button
                onClick={toggleMic}
                aria-label={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
                title="Toggle Microphone"
                className="action-button"
              >
                {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
              </button>
              <button
                onClick={endCall}
                aria-label="End call"
                className="action-button end-call"
                title="End Call"
              >
                <FaPhoneSlash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScadVoiceCall;