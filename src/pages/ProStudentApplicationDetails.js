import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import './ProStudentApplicationDetails.css';

const ProStudentApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState({
    preferredDate: '',
    preferredTime: '',
    duration: '30',
    type: 'online',
    platform: '',
    notes: ''
  });

  // Mock application data - in a real app, this would be fetched based on the id
  const [application, setApplication] = useState({
    id: 1,
    company: 'Tech Solutions Inc.',
    position: 'Software Development Intern',
    status: 'Under Review',
    appliedDate: '2024-03-15',
    documents: {
      cv: 'resume.pdf',
      coverLetter: 'cover_letter.pdf',
      certificates: ['certificate1.pdf', 'certificate2.pdf']
    },
    internshipDetails: {
      duration: '3 months',
      type: 'Paid',
      salary: '$1000/month',
      startDate: '2024-06-01',
      location: 'Cairo, Egypt',
      requirements: [
        'Currently enrolled in CS or related field',
        'Strong programming skills in JavaScript and Python',
        'Experience with React and Node.js',
        'Good communication skills'
      ],
      responsibilities: [
        'Develop and maintain web applications',
        'Collaborate with team members',
        'Participate in code reviews',
        'Write technical documentation'
      ]
    }
  });

  useEffect(() => {
    // In a real app, fetch application details based on id
    console.log('Fetching application details for id:', id);
  }, [id]);

  const handleInterviewSubmit = (e) => {
    e.preventDefault();
    // Handle interview scheduling logic here
    console.log('Interview details:', interviewDetails);
    // Show success message or handle response
    alert('Interview scheduled successfully!');
    setShowInterviewForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInterviewDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <BackButton />
        
        {!showInterviewForm ? (
          <div className="application-details">
            <div className="application-header">
              <h1>Application Details</h1>
              <div className="application-status">
                <span className={`status-badge ${application.status.toLowerCase().replace(' ', '-')}`}>
                  {application.status}
                </span>
              </div>
            </div>

            <div className="application-info">
              <div className="info-section">
                <h2>Position Details</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Company</label>
                    <p>{application.company}</p>
                  </div>
                  <div className="info-item">
                    <label>Position</label>
                    <p>{application.position}</p>
                  </div>
                  <div className="info-item">
                    <label>Applied Date</label>
                    <p>{application.appliedDate}</p>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h2>Internship Details</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Duration</label>
                    <p>{application.internshipDetails.duration}</p>
                  </div>
                  <div className="info-item">
                    <label>Type</label>
                    <p>{application.internshipDetails.type}</p>
                  </div>
                  <div className="info-item">
                    <label>Salary</label>
                    <p>{application.internshipDetails.salary}</p>
                  </div>
                  <div className="info-item">
                    <label>Start Date</label>
                    <p>{application.internshipDetails.startDate}</p>
                  </div>
                  <div className="info-item">
                    <label>Location</label>
                    <p>{application.internshipDetails.location}</p>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h2>Requirements</h2>
                <ul className="requirements-list">
                  {application.internshipDetails.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="info-section">
                <h2>Responsibilities</h2>
                <ul className="responsibilities-list">
                  {application.internshipDetails.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="info-section">
                <h2>Submitted Documents</h2>
                <div className="documents-list">
                  <div className="document-item">
                    <i className="fas fa-file-pdf"></i>
                    <span>{application.documents.cv}</span>
                  </div>
                  <div className="document-item">
                    <i className="fas fa-file-pdf"></i>
                    <span>{application.documents.coverLetter}</span>
                  </div>
                  {application.documents.certificates.map((cert, index) => (
                    <div key={index} className="document-item">
                      <i className="fas fa-file-pdf"></i>
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="schedule-interview-btn"
                  onClick={() => setShowInterviewForm(true)}
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="interview-scheduling">
            <h1>Schedule Interview</h1>
            <form onSubmit={handleInterviewSubmit} className="interview-form">
              <div className="form-group">
                <label>Preferred Date</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={interviewDetails.preferredDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Preferred Time</label>
                <input
                  type="time"
                  name="preferredTime"
                  value={interviewDetails.preferredTime}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Duration (minutes)</label>
                <select
                  name="duration"
                  value={interviewDetails.duration}
                  onChange={handleInputChange}
                  required
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Interview Type</label>
                <select
                  name="type"
                  value={interviewDetails.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="online">Online</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>

              {interviewDetails.type === 'online' && (
                <div className="form-group">
                  <label>Platform</label>
                  <select
                    name="platform"
                    value={interviewDetails.platform}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Platform</option>
                    <option value="zoom">Zoom</option>
                    <option value="teams">Microsoft Teams</option>
                    <option value="meet">Google Meet</option>
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>Additional Notes</label>
                <textarea
                  name="notes"
                  value={interviewDetails.notes}
                  onChange={handleInputChange}
                  placeholder="Any specific requirements or notes for the interview..."
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowInterviewForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Schedule Interview
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProStudentApplicationDetails; 