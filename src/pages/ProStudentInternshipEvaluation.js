import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaStar, FaDownload, FaTimes, FaCheck } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import './ProStudentInternships.css';

const ProStudentInternshipEvaluation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const internship = location.state?.internship;

  const [evaluationData, setEvaluationData] = useState({
    rating: 0,
    feedback: '',
    skillsGained: [],
    challenges: '',
    recommendations: ''
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Load previous evaluation data when component mounts
  useEffect(() => {
    const savedEvaluation = localStorage.getItem(`evaluation_${id}`);
    if (savedEvaluation) {
      const parsedData = JSON.parse(savedEvaluation);
      setEvaluationData(parsedData);
      setIsEditing(true);
    }
  }, [id]);

  const handleRatingClick = (rating) => {
    setEvaluationData({ ...evaluationData, rating });
  };

  const handleRatingHover = (rating) => {
    setHoverRating(rating);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  // Function to show feedback message
  const showFeedback = (message) => {
    setFeedbackMessage(message);
    setTimeout(() => {
      setFeedbackMessage('');
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(`evaluation_${id}`, JSON.stringify(evaluationData));
    showFeedback('Evaluation submitted successfully!');
    setTimeout(() => {
      navigate(`/pro-student/internships/${id}`);
    }, 1000);
  };

  const handleDownload = () => {
    const pdfContent = `
      Internship Evaluation Form
      ========================
      
      Company: ${internship.company}
      Position: ${internship.title}
      Duration: ${internship.startDate} to ${internship.endDate}
      
      Overall Rating: ${evaluationData.rating}/5
      
      Feedback:
      ${evaluationData.feedback}
      
      Skills Gained:
      ${evaluationData.skillsGained.join(', ')}
      
      Challenges:
      ${evaluationData.challenges}
      
      Recommendations:
      ${evaluationData.recommendations}
    `;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evaluation_${internship.company}_${internship.title}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    showFeedback('Evaluation form downloaded successfully!');
  };

  const handleCancel = () => {
    navigate(`/pro-student/internships/${id}`);
  };

  if (!internship) {
    return (
      <div className="pro-student-layout">
        <ProStudentSidebar />
        <div className="pro-student-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading evaluation form...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <div className="hero-banner">
          <h1>Internship Evaluation</h1>
          <p>Share your feedback and experience for this internship</p>
        </div>
<div
  className="back-btn"
  onClick={() =>
    navigate(`/pro-student/internships/${id}`, {
      state: {
        internship,
        isCompleted: true
      }
    })
  }
>
  ← Back to Internship Details
</div>


        {feedbackMessage && (
          <div className="feedback-message">
            {feedbackMessage}
          </div>
        )}
        <div className="evaluation-form-container">
          <div className="evaluation-form-card">
            {isEditing && (
              <div className="editing-notice">
                You are editing your previous evaluation
              </div>
            )}
            <div className="internship-info">
              <h3>{internship.title}</h3>
              <p className="company-name">{internship.company}</p>
              <p>Duration: {internship.startDate} to {internship.endDate}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ '--item-index': 0 }}>
                <label style={{ color: '#000000', fontWeight: '700' }}>Overall Rating</label>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= (hoverRating || evaluationData.rating) ? 'filled' : ''}`}
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => handleRatingHover(star)}
                      onMouseLeave={handleRatingLeave}
                      style={{ cursor: 'pointer' }}
                    >
                      <FaStar />
                    </span>
                  ))}
                  <span className="rating-value">
                    {evaluationData.rating > 0 ? `${evaluationData.rating}/5` : 'Select rating'}
                  </span>
                </div>
              </div>

              <div className="form-group" style={{ '--item-index': 1 }}>
                <label style={{ color: '#000000', fontWeight: '700' }}>Feedback</label>
                <textarea
                  value={evaluationData.feedback}
                  onChange={(e) => setEvaluationData({ ...evaluationData, feedback: e.target.value })}
                  placeholder="Share your experience..."
                  required
                />
              </div>

              <div className="form-group" style={{ '--item-index': 2 }}>
                <label style={{ color: '#000000', fontWeight: '700' }}>Skills Gained</label>
                <input
                  type="text"
                  value={evaluationData.skillsGained.join(', ')}
                  onChange={(e) => setEvaluationData({
                    ...evaluationData,
                    skillsGained: e.target.value.split(',').map(skill => skill.trim())
                  })}
                  placeholder="Enter skills separated by commas"
                />
              </div>

              <div className="form-group" style={{ '--item-index': 3 }}>
                <label style={{ color: '#000000', fontWeight: '700' }}>Challenges</label>
                <textarea
                  value={evaluationData.challenges}
                  onChange={(e) => setEvaluationData({ ...evaluationData, challenges: e.target.value })}
                  placeholder="Describe the challenges you faced..."
                />
              </div>

              <div className="form-group" style={{ '--item-index': 4 }}>
                <label style={{ color: '#000000', fontWeight: '700' }}>Recommendations</label>
                <textarea
                  value={evaluationData.recommendations}
                  onChange={(e) => setEvaluationData({ ...evaluationData, recommendations: e.target.value })}
                  placeholder="Share your recommendations..."
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="action-button submit">
                  <FaCheck /> {isEditing ? 'Update Evaluation' : 'Submit Evaluation'}
                </button>
              </div>
            </form>
            <div className="form-actions">
              <button type="button" className="action-button download" onClick={handleDownload}>
                <FaDownload /> Download Form
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProStudentInternshipEvaluation; 