import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaPlay, FaPause, FaStop, FaArrowLeft, FaPaperPlane, FaDownload } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import { WorkshopContext } from './WorkshopContext';
import './ProStudentWorkshopDetails.css';

const ProStudentWorkshopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(WorkshopContext);
  const { workshops, addChatNotification } = context || {};

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
  const videoRef = useRef(null);

  const currentDate = 'May 15, 2025';

  const dummyMessages = [
    { id: 1, sender: 'Moderator', text: 'Welcome to the workshop!', time: '10:00 AM' },
    { id: 2, sender: 'John Doe', text: 'Hello everyone!', time: '10:02 AM' },
    { id: 3, sender: 'Sarah Smith', text: 'Excited to be here!', time: '10:03 AM' },
    { id: 4, sender: 'Moderator', text: 'We will start in 5 minutes', time: '10:05 AM' },
  ];

  useEffect(() => {
    if (!workshops) {
      console.error('Workshops array is undefined');
      return;
    }
    const foundWorkshop = workshops.find(w => w.id === parseInt(id));
    if (foundWorkshop) {
      setWorkshop({
        ...foundWorkshop,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        studentName: "John Doe",
        certificateId: foundWorkshop.isCompleted ? `CERT-2024-${String(foundWorkshop.id).padStart(3, '0')}` : `CERT-2024-${String(foundWorkshop.id).padStart(3, '0')}`
      });
      setChatMessages(dummyMessages);
    } else {
      console.error(`Workshop with ID ${id} not found`);
    }
  }, [id, workshops]);

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

  const handleRegister = () => {
    navigate(`/pro-student/workshops/${id}/register`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now(),
        sender: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, newMsg]);
      setNewMessage('');

      if (newMsg.sender !== 'You' && addChatNotification) {
        addChatNotification(workshop?.title, newMsg.sender, newMsg.text);
      }

      if (Math.random() > 0.5) {
        setTimeout(() => {
          const responses = [
            'That\'s a great question!',
            'Thanks for sharing!',
            'I was wondering the same thing.',
            'The presenter will cover that later.',
            'Let me check on that for you.'
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          
          const botMsg = {
            id: Date.now() + 1,
            sender: ['Moderator', 'Speaker', 'Participant'][Math.floor(Math.random() * 3)],
            text: randomResponse,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          setChatMessages(prev => [...prev, botMsg]);

          if (addChatNotification) {
            addChatNotification(workshop?.title, botMsg.sender, botMsg.text);
          }
        }, 1000 + Math.random() * 2000);
      }
    }
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', { rating, feedback });
    setShowFeedback(false);
    setRating(0);
    setFeedback('');
  };

  const handleDownloadCertificate = () => {
    console.log('Downloading certificate...');
    const link = document.createElement('a');
    link.href = '/images/certificate.webp';
    link.download = 'certificate.webp';
    link.click();
  };

  if (!context || !workshops) {
    return <div>Error: Workshop data is unavailable</div>;
  }

  if (!workshop) {
    return <div>Workshop not found</div>;
  }

  const hasJoined = location.pathname.includes('/register') || workshop.isRegistered;

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="workshop-details-content">
        <button className="back-button" onClick={() => navigate('/pro-student/workshops')}>
          <FaArrowLeft /> Back to Workshops
        </button>

        {workshop.isCompleted ? (
          <div>
            <div className="workshop-header completed">
              <h1>{workshop.title}</h1>
              <div className="workshop-meta">
                <span>Date: {workshop.date}</span>
                <span>Time: {workshop.time}</span>
                <span>Duration: {workshop.duration}</span>
                <span>Main Topic: {workshop.mainTopic}</span>
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
              </div>
            </div>
            <div className="certificate-section">
              <h3>Certificate of Completion</h3>
              <p>Congratulations on completing the workshop!</p>
              <div className="certificate-preview">
                <img
                  src="/images/certificate.webp"
                  alt="Certificate of Completion"
                  style={{ width: '100%', maxWidth: '600px', borderRadius: '8px', marginBottom: '1rem' }}
                />
                <div className="certificate-details">
                  <p>This is to certify that</p>
                  <p><strong>{workshop.studentName}</strong></p>
                  <p>has successfully completed the workshop</p>
                  <p><strong>{workshop.title}</strong></p>
                  <p>on {workshop.completionDate || currentDate}</p>
                  <p>Certificate ID: {workshop.certificateId}</p>
                </div>
              </div>
              <div className="certificate-actions">
                <button className="download-button" onClick={handleDownloadCertificate}>
                  <FaDownload /> Download Certificate
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="workshop-header">
              <h1>{workshop.title}</h1>
              <div className="workshop-meta">
                <span>Date: {workshop.date}</span>
                <span>Time: {workshop.time}</span>
                <span>Duration: {workshop.duration}</span>
                <span>Main Topic: {workshop.mainTopic}</span>
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
                    <button className="join-button" onClick={handleRegister}>
                      Register
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

                <div className="certificate-section">
                  <h3>Certificate of Completion</h3>
                  <p>Congratulations! You are eligible for a certificate.</p>
                  <div className="certificate-preview">
                    <img
                      src="/images/certificate.webp"
                      alt="Certificate of Completion"
                      style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }}
                    />
                    <div className="certificate-details">
                      <p>This is to certify that</p>
                      <p><strong>{workshop.studentName}</strong></p>
                      <p>has successfully completed the workshop</p>
                      <p><strong>{workshop.title}</strong></p>
                      <p>on {currentDate}</p>
                      <p>Certificate ID: {workshop.certificateId}</p>
                    </div>
                  </div>
                  <div className="certificate-actions">
                    <button className="download-button" onClick={handleDownloadCertificate}>
                      <FaDownload /> Download Certificate
                    </button>
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

                  <div className="chat-section">
                    <h3>Live Chat</h3>
                    <div className="chat-messages">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className="chat-message" style={{ textAlign: msg.sender === 'You' ? 'right' : 'left' }}>
                          <div className="message-header">
                            <span className="sender">{msg.sender}</span>
                            <span className="timestamp">{msg.time}</span>
                          </div>
                          <p>{msg.text}</p>
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
                      <button type="submit"><FaPaperPlane /></button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {workshop.isCompleted && (
          <div className="workshop-actions">
            <button className="feedback-button" onClick={() => setShowFeedback(true)}>
              Rate Workshop
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

export default ProStudentWorkshopDetails;