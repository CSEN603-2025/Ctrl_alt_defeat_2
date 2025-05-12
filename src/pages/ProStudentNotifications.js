import React, { useState } from 'react';
import ProStudentSidebar from '../components/ProStudentSidebar';
import './ProStudentNotifications.css';

const ProStudentNotifications = () => {
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
    }
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);

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
        <h1>Notifications</h1>
        
        <div className="notifications-container">
          <div className="notifications-list">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`notification-card ${notification.read ? 'read' : 'unread'}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="notification-header">
                  <span className={`notification-type ${notification.type}`}>
                    {notification.type === 'application' ? '📝' : 
                     notification.type === 'interview' ? '📅' : '🎉'}
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
                <span className={`notification-type ${selectedNotification.type}`}>
                  {selectedNotification.type === 'application' ? '📝' : 
                   selectedNotification.type === 'interview' ? '📅' : '🎉'}
                </span>
                <span className="notification-time">{selectedNotification.timestamp}</span>
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