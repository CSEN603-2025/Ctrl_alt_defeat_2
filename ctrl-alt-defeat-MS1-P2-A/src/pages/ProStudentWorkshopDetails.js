import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaDownload } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import { WorkshopContext } from './WorkshopContext';
import './ProStudentWorkshopDetails.css';

const ProStudentWorkshopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workshops } = useContext(WorkshopContext) || { workshops: [] };
  const [workshop, setWorkshop] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [showDownloadFeedback, setShowDownloadFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [notes, setNotes] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'Alice Smith',
      message: 'Really enjoyed the session! Very insightful.',
      timestamp: '10:05 AM',
    },
    {
      sender: 'Bob Johnson',
      message: 'Can we get more examples on this topic?',
      timestamp: '10:08 AM',
    },
    {
      sender: 'Clara Lee',
      message: 'Thanks for the practical tips!',
      timestamp: '10:12 AM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    if (!workshops || !Array.isArray(workshops)) {
      console.error('Workshops data is invalid or undefined');
      return;
    }
    const foundWorkshop = workshops.find((w) => w.id === parseInt(id));
    if (foundWorkshop) {
      setWorkshop(foundWorkshop);
    } else {
      console.error(`Workshop with ID ${id} not found`);
    }
  }, [id, workshops]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
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
    console.log(`Feedback submitted for ${workshop?.title || 'unknown'}: ${rating} stars, Comment: ${feedback}`);
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
      link.download = `${workshop?.title || 'certificate'}-certificate.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      console.log(`Certificate for ${workshop?.title || 'unknown'} downloaded`);
      setShowDownloadFeedback(true);
      setTimeout(() => {
        setShowDownloadFeedback(false);
      }, 3000);
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Failed to download certificate. Please try again.');
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'You',
          message: newMessage,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
      setNewMessage('');
    }
  };

  if (!workshops || !Array.isArray(workshops)) {
    return <div>Error: Workshop data is unavailable</div>;
  }

  if (!workshop) {
    return <div>Workshop not found</div>;
  }

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="workshop-details-content">
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
            Certificate download started!
          </div>
        )}
        <button
          className="back-btn"
          onClick={() => navigate('/pro-student/workshops')}
          aria-label="Back to workshops"
        >
          ← Back to Workshops
        </button>

        <div className={`workshop-header ${workshop.isCompleted ? 'completed' : ''}`}>
          <h1>{workshop.title}</h1>
          <div className="workshop-meta">
            <span>Date: {workshop.date}</span>
            <span>Time: {workshop.time}</span>
            <span>Duration: {workshop.duration}</span>
          </div>
        </div>

        <div className="workshop-main">
          <div className="video-section">
            <div className="video-container">
              <video
                ref={videoRef}
                src="https://cdn.pixabay.com/video/2024/07/22/221093_tiny.mp4"
                controls
                aria-label="Workshop video"
              />
              <div className="video-controls">
                <button onClick={handlePlayPause} aria-label={isPlaying ? 'Pause video' : 'Play video'}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '0%' }}></div>
                </div>
                <span className="time-display">0:00 / 0:00</span>
              </div>
            </div>
          </div>

          <div className="workshop-info">
            <div className="workshop-description">
              <h3>Description</h3>
              <p>{workshop.description}</p>
            </div>
            {workshop.isCompleted && (
              <div className="certificate-section">
                <h3>Certificate of Completion</h3>
                <p>You have successfully completed this workshop! Download your certificate below.</p>
                <div className="certificate-preview">
                  <h4>Certificate of Completion</h4>
                  <div className="certificate-details">
                    <p>This certifies that</p>
                    <p><strong>{'User Name'}</strong></p>
                    <p>has successfully completed the workshop</p>
                    <p><strong>{workshop.title}</strong></p>
                    <p>on {workshop.date}</p>
                  </div>
                </div>
                <div className="certificate-actions">
                  <button
                    onClick={handleDownloadCertificate}
                    aria-label="Download certificate"
                  >
                    <FaDownload /> Download Certificate
                  </button>
                </div>
              </div>
            )}
            <div className="workshop-topics">
              <h3>Topics Covered</h3>
              <ul>
                {workshop.topics?.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="workshop-features">
            <div className="notes-section">
              <h3>Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your notes here..."
                aria-label="Workshop notes"
              />
            </div>

            <div className="chat-section">
              <h3>Live Chat</h3>
              <div className="chat-messages">
                {chatMessages.map((msg, index) => (
                  <div className="chat-message" key={index}>
                    <div className="message-header">
                      <span className="sender">{msg.sender}</span>
                      <span className="timestamp">{msg.timestamp}</span>
                    </div>
                    <p>{msg.message}</p>
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  aria-label="Chat message input"
                />
                <button onClick={handleSendMessage} aria-label="Send chat message">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="workshop-actions">
          <button
            className="feedback-button"
            onClick={handleRateWorkshop}
            aria-label="Rate this workshop"
          >
            Rate Workshop
          </button>
        </div>

        {showFeedback && (
          <div className="feedback-modal" role="dialog" aria-labelledby="feedback-title">
            <div className="feedback-content">
              <h3 id="feedback-title">Rate Workshop</h3>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= rating ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                    role="button"
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your feedback..."
                aria-label="Feedback text"
              />
              <div className="feedback-actions">
                <button
                  onClick={() => setShowFeedback(false)}
                  aria-label="Cancel feedback"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  aria-label="Submit feedback"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProStudentWorkshopDetails;