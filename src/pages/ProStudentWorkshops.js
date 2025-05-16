import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBell } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import { WorkshopContext } from './WorkshopContext';
import './ProStudentWorkshops.css';

const ProStudentWorkshops = () => {
  const navigate = useNavigate();
  const { workshops } = useContext(WorkshopContext) || { workshops: [] };
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [isBellAnimating, setIsBellAnimating] = useState(false);

  const handleBellClick = () => {
    setIsBellAnimating(true);
    setTimeout(() => {
      setIsBellAnimating(false);
      navigate('/pro-student/notifications');
    }, 500);
  };

  const handleViewDetails = (workshopId) => {
    if (!workshopId) return;
    navigate(`/pro-student/workshops/${workshopId}/description`);
  };

  const handleRateWorkshop = (workshop) => {
    if (!workshop) return;
    setSelectedWorkshop(workshop);
    setShowFeedback(true);
    setRating(0);
    setFeedback('');
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (!selectedWorkshop) {
      alert('No workshop selected for feedback');
      return;
    }
    console.log(`Feedback submitted for ${selectedWorkshop.title}: ${rating} stars, Comment: ${feedback}`);
    setShowFeedback(false);
    setRating(0);
    setFeedback('');
    setSelectedWorkshop(null);
  };

  const filteredWorkshops = workshops
    .filter(workshop =>
      workshop &&
      (selectedTab === 'upcoming' ? !workshop.isCompleted : workshop.isCompleted) &&
      (workshop.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  if (!workshops) {
    return <div>Error: Workshop data is unavailable</div>;
  }

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="workshops-content">
        <div className="hero-banner">
          <div className="banner-content">
            <h2>Career Workshops</h2>
            <p className="subtext">Explore and join our upcoming workshops to enhance your skills!</p>
          </div>
          <div className="floating-notif" onClick={handleBellClick}>
            <FaBell className={`wiggle-bell ${isBellAnimating ? 'animating' : ''}`} />
            {unreadNotifications > 0 && (
              <span className="notification-badge">{unreadNotifications}</span>
            )}
          </div>
        </div>

        <div className="workshop-tabs">
          <button
            className={`tab-button ${selectedTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setSelectedTab('upcoming')}
          >
            Upcoming Workshops
          </button>
          <button
            className={`tab-button ${selectedTab === 'completed' ? 'active' : ''}`}
            onClick={() => setSelectedTab('completed')}
          >
            Completed Workshops
          </button>
        </div>

        <div className="filter-bar fade-in-delayed">
          <div className="icon-field">
            <FaSearch className="input-icon" />
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="workshop-table-container animated fadeInUp">
          <table className="workshop-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkshops.map((workshop) => (
                <tr
                  key={workshop.id}
                  className="pop-in delay-0"
                  onClick={() => handleViewDetails(workshop.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{workshop.title}</td>
                  <td>{workshop.date}</td>
                  <td>{workshop.duration}</td>
                  <td>
                    <span className={`workshop-type ${workshop.type}`}>
                      {workshop.type === 'live' ? 'Live' : 'Recorded'}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-tag ${workshop.isCompleted ? 'completed' : workshop.isRegistered ? 'registered' : 'available'}`}
                    >
                      {workshop.isCompleted ? 'Completed' : workshop.isRegistered ? 'Registered' : 'Available'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showFeedback && (
          <div className="feedback-modal">
            <div className="feedback-content animated fadeInUp">
              <h3>Rate Workshop</h3>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= rating ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your feedback..."
              />
              <div className="feedback-actions">
                <button onClick={() => setShowFeedback(false)}>Cancel</button>
                <button onClick={handleSubmitFeedback}>Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProStudentWorkshops;