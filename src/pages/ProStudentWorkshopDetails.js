import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaStop, FaArrowLeft } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import './ProStudentWorkshopDetails.css';

const ProStudentWorkshopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workshop, setWorkshop] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [notes, setNotes] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const videoRef = useRef(null);

  // Mock workshop data
  useEffect(() => {
    // In a real application, this would be an API call
    const mockWorkshop = {
      id: id,
      title: "Advanced Web Development Workshop",
      date: "2024-03-20",
      time: "14:00",
      duration: "2 hours",
      type: "live",
      speaker: {
        name: "Dr. Sarah Johnson",
        title: "Senior Web Developer",
        company: "Tech Solutions Inc."
      },
      description: "Learn advanced web development techniques including React, Node.js, and modern deployment strategies.",
      topics: [
        "React Hooks and Context API",
        "Server-side rendering with Next.js",
        "API development with Node.js",
        "Deployment and CI/CD"
      ],
      videoUrl: "https://example.com/workshop-video.mp4",
      isRegistered: true,
      isCompleted: true,
      completionDate: "2024-03-20",
      studentName: "John Doe",
      certificateId: "CERT-2024-001"
    };
    console.log('Setting workshop data:', mockWorkshop);
    setWorkshop(mockWorkshop);
  }, [id]);

  // Add console log to check workshop state
  useEffect(() => {
    console.log('Current workshop state:', workshop);
  }, [workshop]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleJoinWorkshop = () => {
    setHasJoined(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: Date.now(),
          sender: 'You',
          message: newMessage,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
      setNewMessage('');
    }
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // In a real application, this would be an API call
    console.log('Feedback submitted:', { rating, feedback });
    setShowFeedback(false);
    setRating(0);
    setFeedback('');
  };

  const handleDownloadCertificate = () => {
    // In a real application, this would generate and download a certificate
    console.log('Downloading certificate...');
  };

  if (!workshop) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="workshop-details-content">
        <button className="back-button" onClick={() => navigate('/pro-student/workshops')}>
          <FaArrowLeft /> Back to Workshops
        </button>

        <div className={`workshop-header ${workshop.isCompleted ? 'completed' : ''}`}>
          <h1>{workshop.title}</h1>
          <div className="workshop-meta">
            <span>Date: {workshop.date}</span>
            <span>Time: {workshop.time}</span>
            <span>Duration: {workshop.duration}</span>
            {workshop.isCompleted && <span>Completed on: {workshop.completionDate}</span>}
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
              <p>{workshop.description}</p>
            </div>

            <div className="workshop-topics">
              <h3>Topics Covered</h3>
              <ul>
                {workshop.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>

            {!hasJoined && (
              <div className="join-workshop-section">
                <button className="join-button" onClick={handleJoinWorkshop}>
                  Join Workshop
                </button>
              </div>
            )}
          </div>
        </div>

        {hasJoined && (
          <>
            <div className="workshop-main">
              <div className="video-section">
                <div className="video-container">
                  <video
                    ref={videoRef}
                    src={workshop.videoUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onDurationChange={handleDurationChange}
                  />
                  <div className="video-controls">
                    <button onClick={isPlaying ? handlePause : handlePlay}>
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button onClick={handleStop}>
                      <FaStop />
                    </button>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                    <div className="time-display">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="workshop-features">
              <div className="notes-section">
                <h3>Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take notes during the workshop..."
                />
              </div>

              {workshop.type === 'live' && (
                <div className="chat-section">
                  <h3>Live Chat</h3>
                  <div className="chat-messages">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="chat-message">
                        <div className="message-header">
                          <span className="sender">{msg.sender}</span>
                          <span className="timestamp">{msg.timestamp}</span>
                        </div>
                        <p>{msg.message}</p>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="chat-input">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                    />
                    <button type="submit">Send</button>
                  </form>
                </div>
              )}
            </div>
          </>
        )}

        {workshop.isCompleted && (
          <div className="certificate-section">
            <h3>Certificate of Completion</h3>
            <p>Congratulations! You have successfully completed this workshop.</p>
            <div className="certificate-preview">
              <h4>Certificate of Completion</h4>
              <div className="certificate-details">
                <p>This is to certify that</p>
                <p><strong>{workshop.studentName}</strong></p>
                <p>has successfully completed the workshop</p>
                <p><strong>{workshop.title}</strong></p>
                <p>on {workshop.completionDate}</p>
                <p>Certificate ID: {workshop.certificateId}</p>
              </div>
            </div>
            <div className="certificate-actions">
              <button className="download-button" onClick={handleDownloadCertificate}>
                Download Certificate
              </button>
            </div>
          </div>
        )}

        <div className="workshop-actions">
          {workshop.isCompleted && (
            <>
              <button
                className="feedback-button"
                onClick={() => setShowFeedback(true)}
              >
                Rate Workshop
              </button>
            </>
          )}
        </div>

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

export default ProStudentWorkshopDetails; 