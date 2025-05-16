import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProStudentSidebar from '../components/ProStudentSidebar';
import { FaArrowLeft } from 'react-icons/fa';
import './ProStudentNotifications.css';

const ProStudentNotifications = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'application',
      title: 'Application Status Update',
      message: 'Your application for Software Developer Intern at Tech Corp has been reviewed.',
      details: 'The company has reviewed your application and would like to schedule an interview. Please check your email for the interview details.',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'New interview scheduled with Data Analytics Co.',
      details: 'Your interview has been scheduled for next Monday at 2:00 PM. The interview will be conducted via Zoom. Please prepare your portfolio and be ready to discuss your previous projects.',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'offer',
      title: 'New Job Offer',
      message: 'Congratulations! You have received a job offer.',
      details: 'Web Solutions Inc. has offered you a position as a Frontend Developer Intern. The internship will start on June 1st and last for 3 months. Please review the offer details and respond within 5 business days.',
      timestamp: '3 days ago',
      read: false
    },
    {
      id: 4,
      type: 'appointment-accepted',
      title: 'Appointment Accepted by SCAD',
      message: 'Your appointment request with SCAD has been accepted.',
      details: 'Meeting with Academic Advisor at SCAD, scheduled for May 16, 2025, at 10:00 AM in Room 204, Building A. Please arrive 10 minutes early and bring any relevant documents.',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: 5,
      type: 'appointment-confirmed',
      title: 'Appointment Confirmed',
      message: 'You have confirmed your appointment with SCAD.',
      details: 'Meeting with Academic Advisor at SCAD, scheduled for May 16, 2025, at 10:00 AM in Room 204, Building A. A confirmation email has been sent to your inbox.',
      timestamp: '45 minutes ago',
      read: false
    },
    {
      id: 6,
      type: 'chat-message',
      title: 'New Live Chat Message',
      message: 'Alex sent you a message in the workshop live chat.',
      details: 'Hey, I had a quick question about the workshop project! Can we discuss it after the session?',
      timestamp: '30 minutes ago',
      read: false
    },
    {
      id: 7,
      type: 'workshop-reminder',
      title: 'Workshop Starting Soon',
      message: 'The upcoming workshop you registered for is about to start.',
      details: 'Introduction to React, starting in 30 minutes on May 15, 2025, at 12:25 PM. Join the session 5 minutes early to ensure a smooth start.',
      timestamp: '25 minutes ago',
      read: false
    },
    {
      id: 8,
      type: 'internship-start',
      title: 'Internship Cycle Begins',
      message: 'Your internship cycle with Web Solutions Inc. is scheduled to start soon.',
      details: 'The internship cycle will begin on June 1, 2025, at 9:00 AM EEST. Prepare your materials and confirm your availability by May 25, 2025.',
      timestamp: '1 week ago',
      read: false
    },
    {
      id: 9,
      type: 'internship-reminder',
      title: 'Internship Starting Soon',
      message: 'Your internship cycle is about to begin!',
      details: 'The internship with Web Solutions Inc. starts on June 1, 2025, at 9:00 AM EEST. Please log in to the portal and complete the pre-start checklist by May 31, 2025.',
      timestamp: '3 days ago',
      read: false
    },
    {
      id: 10,
      type: 'incoming-call',
      title: 'Incoming Call',
      message: 'You have an incoming call from Prof. Jane Doe.',
      details: 'Prof. Jane Doe is calling you regarding your appointment on May 16, 2025. Please prepare to discuss your career guidance session.',
      timestamp: '5 minutes ago',
      read: false
    },
    {
      id: 11,
      type: 'call-ended',
      title: 'Call Ended',
      message: 'Dr. Emily Carter has left the call.',
      details: 'The call with Dr. Emily Carter regarding your career guidance session has ended. Please follow up via email if you have additional questions.',
      timestamp: 'Just now',
      read: false
    }
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);

  // Simulate incoming call notification
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
    }, 5000); // Add after 5 seconds

    return () => clearTimeout(timer);
  }, [notifications.length]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
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

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        <h1>Notifications</h1>

        <div className="notifications-content">
          <div className={`notifications-list ${selectedNotification ? 'compressed' : ''}`}>
            {notifications.map(notification => (
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

export default ProStudentNotifications;