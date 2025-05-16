import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import { WorkshopContext } from './WorkshopContext';
import Header from '../components/Header'; // Updated path
import './ProStudentWorkshops.css';

const ProStudentWorkshops = () => {
  const navigate = useNavigate();
  const { workshops } = useContext(WorkshopContext);
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const handleViewDetails = (workshopId) => {
    navigate(`/pro-student/workshops/${workshopId}`);
  };

  const handleRegister = (workshopId) => {
    navigate(`/pro-student/workshops/${workshopId}/register`);
  };

  const handleJoinWorkshop = (workshopId) => {
    navigate(`/pro-student/workshops/${workshopId}`);
  };

  const handleRateWorkshop = (workshop) => {
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
    console.log(`Feedback submitted for ${selectedWorkshop.title}: ${rating} stars, Comment: ${feedback}`);
    setShowFeedback(false);
    setRating(0);
    setFeedback('');
    setSelectedWorkshop(null);
  };

  const filteredWorkshops = workshops
    .filter(workshop =>
      (selectedTab === 'upcoming' ? !workshop.isCompleted : workshop.isCompleted) &&
      (workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       workshop.speaker.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="workshops-content">
        <Header showBack={false} />
        <div className="hero-banner">
          <h2>Career Workshops</h2>
          <p className="subtext">Explore and join our upcoming workshops to enhance your skills!</p>
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
              placeholder="Search by title or speaker"
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
                <th>Main Topic</th>
                <th>Speaker</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
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
                  <td>{workshop.mainTopic}</td>
                  <td>{workshop.speaker.name}</td>
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
                  <td>
                    {!workshop.isCompleted ? (
                      workshop.isRegistered ? (
                        <button
                          className="action-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJoinWorkshop(workshop.id);
                          }}
                        >
                          Join Workshop
                        </button>
                      ) : (
                        <button
                          className="action-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRegister(workshop.id);
                          }}
                        >
                          Register
                        </button>
                      )
                    ) : (
                      <button
                        className="action-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRateWorkshop(workshop);
                        }}
                      >
                        Rate
                      </button>
                    )}
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