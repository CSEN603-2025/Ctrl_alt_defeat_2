import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaShareSquare, FaPhoneSlash, FaBell, FaPlay, FaPause, FaStop } from 'react-icons/fa';
import io from 'socket.io-client';
import ProStudentSidebar from '../components/ProStudentSidebar';
import '../pages/ProStudentAppointments.css';

const mockUser = { id: 'user1', name: 'Student Name', role: 'student' };

// Mock notifications data
const initialNotifications = [
  { id: 1, message: 'Video call started', isRead: false, type: 'info', timestamp: '2025-05-15T10:00:00Z' },
  { id: 2, message: 'Reminder: Video call in progress', isRead: false, type: 'warning', timestamp: '2025-05-15T12:00:00Z' },
  { id: 3, message: 'New message from mentor', isRead: false, type: 'info', timestamp: '2025-05-15T14:00:00Z' },
];

const VideoCall = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { call } = state || {};
  const [notification, setNotification] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCallerOnline, setIsCallerOnline] = useState(true);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isBellAnimating, setIsBellAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const socketRef = useRef(null);

  // Calculate unread notifications count
  const unreadNotifications = notifications.filter((n) => !n.isRead).length;

  // Handle bell click
  const handleBellClick = () => {
    setIsBellAnimating(true);
    // Mark all notifications as read
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setTimeout(() => {
      setIsBellAnimating(false);
      navigate('/pro-student/notifications');
    }, 500);
  };

  // Show notification and add to notifications list
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

  // Cleanup function
  const cleanup = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    setIsScreenSharing(false);
    setIsVideoOn(true);
    setIsMicOn(true);
    setIsPlaying(false);
  };

  // Initialize WebSocket
  useEffect(() => {
    console.log('VideoCall useEffect, call:', call);
    if (!call || !call.from) {
      console.warn('Incomplete call data, proceeding with defaults');
      showNotification('Warning: Incomplete call data', 'warning');
    }

    socketRef.current = io('http://localhost:3001', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    socketRef.current.emit('join', mockUser.id);

    socketRef.current.on('connect_error', () => {
      console.error('Socket.IO connection error');
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

    return cleanup;
  }, [call]);

  // Toggle video (dummy)
  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    showNotification(isVideoOn ? 'Video turned off' : 'Video turned on');
  };

  // Toggle microphone (dummy)
  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    showNotification(isMicOn ? 'Microphone muted' : 'Microphone unmuted');
  };

  // Toggle screen share (dummy)
  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    showNotification(isScreenSharing ? 'Screen sharing stopped' : 'Screen sharing started');
  };

  // End call
  const endCall = () => {
    console.log('Ending call');
    cleanup();
    showNotification('Call ended');
    navigate('/pro-student/appointments');
  };

  // Play YouTube video
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      setIsPlaying(true);
      showNotification('Video started');
    }
  };

  // Pause YouTube video
  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      setIsPlaying(false);
      showNotification('Video paused');
    }
  };

  // Stop YouTube video
  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
      setIsPlaying(false);
      showNotification('Video stopped');
    }
  };

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <div className="hero-banner">
          <div className="banner-content">
            <h2>Video Call</h2>
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
            <div className="video-container">
              <iframe
                ref={videoRef}
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/xelccK5HuUY?enablejsapi=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="remote-video"
              />
            </div>
            <div className="call-controls">
              <button
                onClick={toggleVideo}
                aria-label={isVideoOn ? 'Turn off video' : 'Turn on video'}
                title="Toggle Video"
                className="action-button"
              >
                {isVideoOn ? <FaVideo /> : <FaVideoSlash />}
              </button>
              <button
                onClick={toggleMic}
                aria-label={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
                title="Toggle Microphone"
                className="action-button"
              >
                {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
              </button>
              <button
                onClick={toggleScreenShare}
                aria-label={isScreenSharing ? 'Stop screen sharing' : 'Share screen'}
                title="Toggle Screen Share"
                className="action-button"
              >
                <FaShareSquare />
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
            <div className="call-controls">
              <button
                onClick={playVideo}
                aria-label="Play video"
                title="Play Video"
                className="action-button"
                disabled={isPlaying}
              >
                <FaPlay />
              </button>
              <button
                onClick={pauseVideo}
                aria-label="Pause video"
                title="Pause Video"
                className="action-button"
                disabled={!isPlaying}
              >
                <FaPause />
              </button>
              <button
                onClick={stopVideo}
                aria-label="Stop video"
                title="Stop Video"
                className="action-button"
              >
                <FaStop />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;