import React, { useState, useEffect, useContext } from 'react';
import ProStudentSidebar from '../components/ProStudentSidebar';
import { WorkshopContext } from './WorkshopContext';
import './ProStudentNotifications.css';

const ProStudentNotifications = () => {
  const { workshops, notifications, setNotifications } = useContext(WorkshopContext);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const now = new Date('2025-05-14T20:44:00Z'); // Current date and time (11:44 PM EEST)
    const upcomingNotifications = workshops
      .filter(workshop => {
        if (!workshop.isRegistered || workshop.isCompleted) return false;
        const workshopDate = new Date(`${workshop.date}T${workshop.time}`);
        const timeDiff = workshopDate - now;
        const hoursUntil = timeDiff / (1000 * 60 * 60);
        return hoursUntil > 0 && hoursUntil <= 24;
      })
      .map(workshop => ({
        id: `workshop-${workshop.id}`,
        type: 'workshop',
        title: 'Upcoming Workshop Reminder',
        message: `Your registered workshop "${workshop.title}" is starting soon!`,
        details: `The workshop "${workshop.title}" is scheduled for ${workshop.date} at ${workshop.time}. Be sure to join on time!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      }));

    setNotifications(prev => {
      const existingIds = new Set(prev.map(n => n.id));
      const newNotifications = upcomingNotifications.filter(n => !existingIds.has(n.id));
      return [...prev, ...newNotifications];
    });
  }, [workshops, setNotifications]);

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
                     notification.type === 'interview' ? '📅' : 
                     notification.type === 'offer' ? '🎉' : 
                     notification.type === 'workshop' ? '🔔' : 
                     notification.type === 'chat' ? '💬' : '📢'}
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
                   selectedNotification.type === 'interview' ? '📅' : 
                   selectedNotification.type === 'offer' ? '🎉' : 
                   selectedNotification.type === 'workshop' ? '🔔' : 
                   selectedNotification.type === 'chat' ? '💬' : '📢'}
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