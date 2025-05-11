import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaStop, FaStar, FaComments, FaDownload, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import './ProStudentWorkshops.css';

const ProStudentWorkshops = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [notes, setNotes] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const videoRef = useRef(null);
  const chatRef = useRef(null);

  // Mock data for workshops
  const workshops = [
    {
      id: 1,
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
      isRegistered: false,
      isCompleted: false
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      date: "2024-03-25",
      time: "10:00",
      duration: "3 hours",
      type: "recorded",
      speaker: {
        name: "Prof. Michael Chen",
        title: "Data Science Lead",
        company: "AI Research Lab"
      },
      description: "Master the fundamentals of data science, including Python, pandas, and basic machine learning concepts.",
      topics: [
        "Python for Data Science",
        "Data Manipulation with Pandas",
        "Data Visualization",
        "Introduction to Machine Learning"
      ],
      isRegistered: true,
      isCompleted: false
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      date: "2024-02-15",
      time: "15:00",
      duration: "2.5 hours",
      type: "recorded",
      speaker: {
        name: "Emily Rodriguez",
        title: "Senior UX Designer",
        company: "Design Innovation Co."
      },
      description: "Master the fundamentals of UI/UX design, including user research, wireframing, and prototyping.",
      topics: [
        "User Research Methods",
        "Wireframing Techniques",
        "Interactive Prototyping",
        "User Testing"
      ],
      isRegistered: true,
      isCompleted: true,
      completionDate: "2024-02-15",
      certificateId: "CERT-2024-002"
    },
    {
      id: 4,
      title: "Cloud Computing Essentials",
      date: "2024-02-01",
      time: "13:00",
      duration: "3 hours",
      type: "live",
      speaker: {
        name: "James Wilson",
        title: "Cloud Architect",
        company: "Cloud Solutions Ltd."
      },
      description: "Learn essential cloud computing concepts and hands-on experience with major cloud platforms.",
      topics: [
        "Cloud Architecture",
        "AWS Services",
        "Azure Fundamentals",
        "Cloud Security"
      ],
      isRegistered: true,
      isCompleted: true,
      completionDate: "2024-02-01",
      certificateId: "CERT-2024-003"
    }
  ];

  // Mock data for chat messages
  const mockMessages = [
    { id: 1, sender: 'Alice', message: 'Great workshop so far!', timestamp: '14:05' },
    { id: 2, sender: 'Bob', message: 'Does anyone have questions about the career paths?', timestamp: '14:10' },
    { id: 3, sender: 'Charlie', message: 'I found the industry trends section very helpful', timestamp: '14:15' }
  ];

  useEffect(() => {
    if (selectedWorkshop?.type === 'recorded' && videoRef.current) {
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [selectedWorkshop]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

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

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleViewDetails = (workshopId) => {
    navigate(`/pro-student/workshops/${workshopId}`);
  };

  const handleRegister = (workshopId) => {
    navigate(`/pro-student/workshops/${workshopId}/register`);
  };

  const handleJoinWorkshop = (workshopId) => {
    // Here you would typically connect to the live workshop platform
    console.log(`Joining workshop ${workshopId}`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
      setUnreadMessages(0);
    }
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to the backend
    console.log('Feedback submitted:', { rating, feedback });
    setShowFeedbackForm(false);
  };

  const handleDownloadCertificate = () => {
    // Here you would typically generate and download the certificate
    console.log('Downloading certificate...');
  };

  const renderWorkshopCard = (workshop) => (
    <div className="workshop-card" key={workshop.id}>
      <div className="workshop-card-header">
        <h3>{workshop.title}</h3>
        <span className={`workshop-type ${workshop.type}`}>
          {workshop.type === 'live' ? 'Live' : 'Recorded'}
        </span>
      </div>
      <div className="workshop-card-content">
        <div className="workshop-info">
          <p><strong>Date:</strong> {workshop.date}</p>
          <p><strong>Time:</strong> {workshop.time}</p>
          <p><strong>Duration:</strong> {workshop.duration}</p>
          <p><strong>Speaker:</strong> {workshop.speaker.name}</p>
        </div>
        <div className="workshop-description">
          <p>{workshop.description}</p>
        </div>
        <div className="workshop-topics">
          <h4>Topics Covered:</h4>
          <ul>
            {workshop.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="workshop-card-actions">
        <button
          className="view-details-button"
          onClick={() => handleViewDetails(workshop.id)}
        >
          View Details
        </button>
        {!workshop.isRegistered && (
          <button
            className="register-button"
            onClick={() => handleRegister(workshop.id)}
          >
            Register
          </button>
        )}
        {workshop.isRegistered && !workshop.isCompleted && (
          <button
            className="join-button"
            onClick={() => handleViewDetails(workshop.id)}
          >
            Join Workshop
          </button>
        )}
      </div>
    </div>
  );

  const renderWorkshopDetails = () => {
    if (!selectedWorkshop) return null;

    return (
      <div className="workshop-details-view">
        <div className="workshop-content">
          {selectedWorkshop.isCompleted && (
            <>
              {selectedWorkshop.type === 'recorded' ? (
                <div className="video-container">
                  <video
                    ref={videoRef}
                    src={selectedWorkshop.videoUrl}
                    className="workshop-video"
                  />
                  <div className="video-controls">
                    <button onClick={handlePlayPause}>
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
                    <span className="time-display">
                      {Math.floor(currentTime)} / {Math.floor(duration)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="live-workshop-container">
                  <h2>Workshop Recording</h2>
                  <p>This workshop was conducted on {selectedWorkshop.date} at {selectedWorkshop.time}</p>
                </div>
              )}
            </>
          )}

          <div className="workshop-info">
            <h2>{selectedWorkshop.title}</h2>
            <p className="description">{selectedWorkshop.description}</p>
            <div className="workshop-meta">
              <p><strong>Speaker:</strong> {selectedWorkshop.speaker.name}</p>
              <p><strong>Duration:</strong> {selectedWorkshop.duration}</p>
              <p><strong>Date:</strong> {selectedWorkshop.date}</p>
              {selectedWorkshop.isCompleted && (
                <p><strong>Completed on:</strong> {selectedWorkshop.completionDate}</p>
              )}
            </div>
          </div>

          <div className="workshop-notes">
            <h3>Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Take notes here..."
              rows="6"
            />
          </div>

          {selectedWorkshop.isCompleted && (
            <div className="workshop-feedback">
              <button 
                className="feedback-button"
                onClick={() => setShowFeedbackForm(true)}
              >
                Rate & Give Feedback
              </button>
              <button 
                className="certificate-button"
                onClick={handleDownloadCertificate}
              >
                <FaDownload /> Download Certificate
              </button>
            </div>
          )}
        </div>

        {showFeedbackForm && (
          <div className="feedback-modal">
            <div className="feedback-content">
              <h3>Rate & Give Feedback</h3>
              <form onSubmit={handleSubmitFeedback}>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={star <= rating ? 'star active' : 'star'}
                      onClick={() => setRating(star)}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your feedback..."
                  rows="4"
                />
                <div className="feedback-actions">
                  <button type="button" onClick={() => setShowFeedbackForm(false)}>
                    Cancel
                  </button>
                  <button type="submit">Submit Feedback</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <BackButton />
        <h1>Career Workshops</h1>

        <div className="workshop-tabs">
          <button
            className={selectedTab === 'upcoming' ? 'active' : ''}
            onClick={() => setSelectedTab('upcoming')}
          >
            Upcoming Workshops
          </button>
          <button
            className={selectedTab === 'completed' ? 'active' : ''}
            onClick={() => setSelectedTab('completed')}
          >
            Completed Workshops
          </button>
        </div>

        {selectedWorkshop ? (
          <>
            <button 
              className="back-to-list-button"
              onClick={() => setSelectedWorkshop(null)}
            >
              Back to Workshops
            </button>
            {renderWorkshopDetails()}
          </>
        ) : (
          <div className="workshops-grid">
            {selectedTab === 'upcoming'
              ? workshops
                  .filter(workshop => !workshop.isCompleted)
                  .map(renderWorkshopCard)
              : workshops
                  .filter(workshop => workshop.isCompleted)
                  .map(renderWorkshopCard)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProStudentWorkshops; 