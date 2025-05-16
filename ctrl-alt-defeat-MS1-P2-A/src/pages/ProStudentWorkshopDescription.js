import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import { WorkshopContext } from './WorkshopContext';
import './ProStudentWorkshopDescription.css';

const ProStudentWorkshopDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workshops } = useContext(WorkshopContext) || { workshops: [] };
  const [workshop, setWorkshop] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [showDownloadFeedback, setShowDownloadFeedback] = useState(false); // New state for download feedback
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!workshops) {
      console.error('Workshops array is undefined');
      return;
    }
    const foundWorkshop = workshops.find(w => w.id === parseInt(id));
    if (foundWorkshop) {
      setWorkshop(foundWorkshop);
    } else {
      console.error(`Workshop with ID ${id} not found`);
    }
  }, [id, workshops]);

  const handleButtonClick = () => {
    if (workshop.isRegistered) {
      navigate(`/pro-student/workshops/${id}/join`);
    } else {
      navigate(`/pro-student/workshops/${id}/register`);
    }
  };

  const handleRateWorkshop = () => {
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
    console.log(`Feedback submitted for ${workshop.title}: ${rating} stars, Comment: ${feedback}`);
    setShowFeedback(false);
    setShowFeedbackMessage(true);
    setTimeout(() => {
      setShowFeedbackMessage(false);
      setRating(0);
      setFeedback('');
    }, 3000);
  };

  const handleDownloadCertificate = async () => {
    try {
      const imageUrl = '/images/certificate.webp';
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${workshop.title}-certificate.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      console.log(`Certificate for ${workshop.title} downloaded`);
      setShowDownloadFeedback(true); // Show download feedback
      setTimeout(() => {
        setShowDownloadFeedback(false); // Hide after 3 seconds
      }, 3000);
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Failed to download certificate. Please try again.');
    }
  };

  if (!workshops) {
    return <div>Error: Workshop data is unavailable</div>;
  }

  if (!workshop) {
    return <div>Workshop not found</div>;
  }

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="workshop-description-content">
        {showFeedbackMessage && (
          <div
            className="feedback-message"
            role="alert"
            aria-live="polite"
          >
            Feedback submitted successfully!
          </div>
        )}
        {showDownloadFeedback && (
          <div
            className="feedback-message"
            role="alert"
            aria-live="polite"
          >
            Certificate downloaded successfully!
          </div>
        )}
        <button className="back-btn" onClick={() => navigate('/pro-student/workshops')} aria-label="Back to workshops">
          ← Back to Workshops
        </button>

        <div className="workshop-header">
          <h1>{workshop.title}</h1>
          {workshop.isCompleted && (
            <button className="rate-button" onClick={handleRateWorkshop}>
              Rate Workshop
            </button>
          )}
          <div className="workshop-meta">
            <span>Date: {workshop.date}</span>
            <span>Time: {workshop.time}</span>
            <span>Duration: {workshop.duration}</span>
          </div>
        </div>

        <div className="workshop-main">
          <div className="workshop-info">
            <div className="speaker-info">
              <h3>Speaker</h3>
              <p className="speaker-name">{workshop.speaker.name}</p>
              <p className="speaker-title">{workshop.speaker.title}</p>
              <p className="speaker-company">{workshop.speaker.company}</p>
            </div>
            <div className="workshop-description">
              <h3>Description</h3>
              <p>{workshop.description.replace(/\n/g, ' ').trim()}</p>
            </div>
            <div className="workshop-topics">
              <h3>Topics Covered</h3>
              <ul>
                {workshop.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
            {workshop.isCompleted && (
              <div className="certificate-section">
                <h3>Certificate of Completion</h3>
                <p>You have successfully completed this workshop! Download your certificate below.</p>
                <div className="certificate-preview">
                  <img src="/images/certificate.webp" alt="Certificate of Completion" />
                </div>
                <div className="certificate-actions">
                  <button
                    className="download-button"
                    onClick={handleDownloadCertificate}
                    aria-label="Download certificate"
                  >
                    <FaDownload /> Download Certificate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {!workshop.isCompleted && (
          <div className="action-section">
            <button className="action-button" onClick={handleButtonClick}>
              {workshop.isRegistered ? 'Join Workshop' : 'Register'}
            </button>
          </div>
        )}

        {showFeedback && (
          <div className="feedback-modal">
            <div className="feedback-content">
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

export default ProStudentWorkshopDescription;