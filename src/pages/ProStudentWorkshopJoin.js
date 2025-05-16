import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaPause, FaStop } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import { WorkshopContext } from './WorkshopContext';
import './ProStudentWorkshopJoin.css';

const ProStudentWorkshopJoin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workshops } = useContext(WorkshopContext) || { workshops: [] };
  const [workshop, setWorkshop] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [notes, setNotes] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'Alice Smith',
      message: 'Great insights on career planning! Thanks for the tips.',
      timestamp: '10:05 AM',
    },
    {
      sender: 'Bob Johnson',
      message: 'Can you elaborate on the networking strategies?',
      timestamp: '10:07 AM',
    },
    {
      sender: 'Clara Lee',
      message: 'Loving the interactive format of this workshop!',
      timestamp: '10:10 AM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const playerRef = useRef(null);
  const playerInitialized = useRef(false);

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

  // Load YouTube Iframe API script
  useEffect(() => {
    if (window.YT && window.YT.Player && !playerInitialized.current) {
      initializePlayer();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  const initializePlayer = () => {
    if (playerInitialized.current) return;
    playerInitialized.current = true;

    try {
      playerRef.current = new window.YT.Player('youtube-player', {
        events: {
          onReady: () => {
            setIsPlayerReady(true);
          },
          onStateChange: (event) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
          onError: (event) => {
            console.error('YouTube Player Error:', event.data);
          },
        },
      });
    } catch (error) {
      console.error('Error initializing YouTube Player:', error);
      setIsPlayerReady(false);
      playerInitialized.current = false;
    }
  };

  // Fetch duration after player is ready
  useEffect(() => {
    if (!isPlayerReady || !playerRef.current) return;

    const checkDuration = () => {
      try {
        if (typeof playerRef.current.getDuration === 'function') {
          const videoDuration = playerRef.current.getDuration();
          if (videoDuration > 0) {
            setDuration(videoDuration);
          } else {
            console.warn('Invalid duration received, retrying...');
            setTimeout(checkDuration, 500);
          }
        } else {
          console.warn('getDuration not available, retrying...');
          setTimeout(checkDuration, 500);
        }
      } catch (error) {
        console.error('Error fetching video duration:', error);
        setDuration(0);
      }
    };

    checkDuration();
  }, [isPlayerReady]);

  // Update progress bar and time display
  useEffect(() => {
    if (!isPlayerReady || !playerRef.current) return;

    const interval = setInterval(() => {
      if (isPlaying && playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        try {
          const time = playerRef.current.getCurrentTime();
          setCurrentTime(time || 0);
        } catch (error) {
          console.error('Error fetching current time:', error);
          setCurrentTime(0);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isPlayerReady]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlayPause = () => {
    if (!isPlayerReady || !playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (!isPlayerReady || !playerRef.current) return;

    playerRef.current.stopVideo();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'You',
          message: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setNewMessage('');
    }
  };

  if (!workshops) {
    return <div>Error: Workshop data is unavailable</div>;
  }

  if (!workshop) {
    return <div>Workshop not found</div>;
  }

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="workshop-join-content">
        <button className="back-btn" onClick={() => navigate('/pro-student/workshops')}>
          <FaArrowLeft /> Back to Workshops
        </button>

        <div className="workshop-header">
          <h1>{workshop.title}</h1>
          <div className="workshop-meta">
            <span>Date: {workshop.date}</span>
            <span>Time: {workshop.time}</span>
            <span>Duration: {workshop.duration}</span>
          </div>
        </div>

        <div className="workshop-main">
          <div className="workshop-info">
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
          </div>

          <div className="video-section">
            <div className="video-container">
              <iframe
                id="youtube-player"
                src="https://www.youtube.com/embed/pquPUX1EihM?enablejsapi=1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Workshop Video"
              ></iframe>
              <div className="video-controls">
                <button onClick={handlePlayPause} aria-label={isPlaying ? 'Pause video' : 'Play video'}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button onClick={handleStop} aria-label="Stop video">
                  <FaStop />
                </button>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <span className="time-display">{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
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
      </div>
    </div>
  );
};

export default ProStudentWorkshopJoin;