import React, { useState, useContext } from 'react';
import { FaChartBar, FaLock, FaUnlock ,FaBell } from 'react-icons/fa';
import StudentSidebar from '../components/StudentSidebar';
import { useNavigate } from 'react-router-dom';
import AssessmentQuestions from './AssessmentQuestions';
import { AssessmentsContext } from './AssessmentsContext'; // Updated import path
import './ProStudentProfile.css';



const StudentAssessments = () => {
  const { assessments, setAssessments, postedScores, setPostedScores, updateAssessment } = useContext(AssessmentsContext);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [assessmentFilter, setAssessmentFilter] = useState('all');
  const [showScore, setShowScore] = useState(false);
  const navigate = useNavigate();
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Mock unread notifications count
  const [isBellAnimating, setIsBellAnimating] = useState(false);
     
    const handleBellClick = () => {
    setIsBellAnimating(true);
    setTimeout(() => {
      setIsBellAnimating(false);
      navigate('/student/assessments');
    }, 500);
  };
  

  const handleStartAssessment = (assessmentId) => {
    setCurrentAssessment(assessmentId);
  };


  const handleAssessmentComplete = (score) => {
    const updatedAssessment = assessments.find(assessment => assessment.id === currentAssessment);
    if (updatedAssessment) {
      updateAssessment({
        ...updatedAssessment,
        status: 'completed',
        score: score
      });
    }

    const sortedAssessments = [...assessments].sort((a, b) => {
      if (a.status === 'completed' && b.status !== 'completed') return -1;
      if (a.status !== 'completed' && b.status === 'completed') return 1;
      return 0;
    });

    setAssessments(sortedAssessments);
    setCurrentAssessment(null);
  };

  const handleToggleScoreVisibility = () => {
    setShowScore(!showScore);
  };

  const handlePostScore = (assessment) => {
    if (!postedScores.includes(assessment.id)) {
      setPostedScores([...postedScores, assessment.id]);
    } else {
      setPostedScores(postedScores.filter(id => id !== assessment.id));
    }
  };

  if (currentAssessment) {
    return (
      <div className="pro-student-layout">
        <StudentSidebar />
        <div className="pro-student-content">
          <AssessmentQuestions
            assessmentId={currentAssessment}
            onComplete={handleAssessmentComplete}
          />
        </div>
      </div>
    );
  }

  const filteredAssessments = assessments.filter(assessment => {
    if (assessmentFilter === 'all') return true;
    return assessment.status === assessmentFilter;
  });

  return (
    <div className="pro-student-layout">
      <StudentSidebar />
      <div className="pro-student-content">
        <div className="hero-banner">
          <h2>Online Assessments</h2>
          <p className="subtext">
            Today is {new Date().toLocaleString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          </p>
          
        </div>
        <div className="floating-notif" onClick={handleBellClick}>
                    <FaBell className="wiggle-bell" />
                    {unreadNotifications > 0 && (
                      <span className="notification-badge">{unreadNotifications}</span>
                    )}
                  </div>
        <div className="assessments-section">
          <div className="assessments-header">
            <h2>Available Assessments</h2>
            <div className="assessment-filters">
              
              <button
                className={`filter-button ${assessmentFilter === 'all' ? 'active' : ''}`}
                onClick={() => setAssessmentFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-button ${assessmentFilter === 'available' ? 'active' : ''}`}
                onClick={() => setAssessmentFilter('available')}
              >
                Available
              </button>
              <button
                className={`filter-button ${assessmentFilter === 'completed' ? 'active' : ''}`}
                onClick={() => setAssessmentFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>
          <div className="assessments-list">
            {filteredAssessments.map(assessment => (
              <div key={assessment.id} className="assessment-card">
                <div className="assessment-header">
                  <h3>{assessment.title}</h3>
                  <span className={`assessment-status ${assessment.status}`}>
                    {assessment.status === 'completed' ? 'Completed' : 'Available'}
                  </span>
                </div>
                <div className="assessment-details">
                  <p><strong>Duration:</strong> {assessment.duration}</p>
                  <p><strong>Questions:</strong> {assessment.questions}</p>
                  <div className="assessment-topics">
                    <strong>Topics:</strong>
                    <div className="topic-tags">
                      {assessment.topics.map(topic => (
                        <span key={topic} className="topic-tag">{topic}</span>
                      ))}
                    </div>
                  </div>
                  {assessment.status === 'completed' && (
                    <div className="assessment-score">
                      <div className="score-header">
                        <FaChartBar />
                        <h4>Your Score</h4>
                        <button
                          className="visibility-toggle"
                          onClick={handleToggleScoreVisibility}
                          aria-label={showScore ? 'Lock to hide score' : 'Unlock to reveal score'}
                        >
                          {showScore ? <FaUnlock /> : <FaLock />}
                          <span className="visibility-text">
                            {showScore ? 'Lock to hide score' : 'Unlock to reveal score'}
                          </span>
                        </button>
                      </div>
                      {showScore ? (
                        <div className="score-display">
                          <span className="score-value">{assessment.score}%</span>
                          <button
                            className={`post-score-button ${postedScores.includes(assessment.id) ? 'posted' : ''}`}
                            onClick={() => handlePostScore(assessment)}
                          >
                            {postedScores.includes(assessment.id) ? 'Posted on Profile' : 'Post on Profile'}
                          </button>
                        </div>
                      ) : (
                        <div className="score-hidden">
                          <span>Score Hidden</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {assessment.status === 'available' && (
                  <button
                    className="start-assessment-button"
                    onClick={() => handleStartAssessment(assessment.id)}
                  >
                    Start Assessment
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAssessments;