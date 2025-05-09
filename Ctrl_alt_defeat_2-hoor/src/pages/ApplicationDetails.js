import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaGraduationCap, FaClock } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import './ApplicationDetails.css';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with actual API call
  const application = {
    id: parseInt(id),
    company: 'Tech Solutions Inc.',
    position: 'Software Development Intern',
    status: 'pending',
    appliedDate: '2024-03-15',
    requirements: ['Python', 'JavaScript', 'React'],
    description: 'Join our development team to work on cutting-edge web applications.',
    major: 'Computer Science',
    semester: 'Semester 5',
    location: 'New York, NY',
    type: 'Full-time',
    duration: '3 months',
    salary: '$25/hour',
    responsibilities: [
      'Develop and maintain web applications using React',
      'Collaborate with the team on new features',
      'Write clean and maintainable code',
      'Participate in code reviews'
    ],
    qualifications: [
      'Currently pursuing a degree in Computer Science or related field',
      'Strong understanding of web development fundamentals',
      'Experience with React and JavaScript',
      'Good problem-solving skills'
    ]
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-badge-pending';
      case 'finalized':
        return 'status-badge-finalized';
      case 'accepted':
        return 'status-badge-accepted';
      case 'rejected':
        return 'status-badge-rejected';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending Review';
      case 'finalized':
        return 'Finalized';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const handleScheduleInterview = () => {
    navigate(`/pro-student/schedule-interview/${id}`);
  };

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <BackButton />
        <div className="application-details-container">
          <div className="application-header">
            <div className="company-info">
              <FaBuilding className="company-icon" />
              <div>
                <h1>{application.position}</h1>
                <p className="company-name">{application.company}</p>
              </div>
            </div>
            <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>
              {getStatusText(application.status)}
            </span>
          </div>

          <div className="application-meta">
            <div className="meta-item">
              <FaCalendarAlt />
              <span>Applied on {application.appliedDate}</span>
            </div>
            <div className="meta-item">
              <FaGraduationCap />
              <span>{application.major} - {application.semester}</span>
            </div>
            <div className="meta-item">
              <FaClock />
              <span>{application.type} - {application.duration}</span>
            </div>
          </div>

          <div className="application-content">
            <section className="content-section">
              <h2>Job Description</h2>
              <p>{application.description}</p>
            </section>

            <section className="content-section">
              <h2>Requirements</h2>
              <div className="requirement-tags">
                {application.requirements.map(req => (
                  <span key={req} className="requirement-tag">{req}</span>
                ))}
              </div>
            </section>

            <section className="content-section">
              <h2>Responsibilities</h2>
              <ul className="list">
                {application.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="content-section">
              <h2>Qualifications</h2>
              <ul className="list">
                {application.qualifications.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="content-section">
              <h2>Additional Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Location:</strong>
                  <span>{application.location}</span>
                </div>
                <div className="info-item">
                  <strong>Salary:</strong>
                  <span>{application.salary}</span>
                </div>
              </div>
            </section>
          </div>

          <div className="application-actions">
            {application.status === 'pending' && (
              <button 
                className="schedule-interview-button"
                onClick={handleScheduleInterview}
              >
                <FaCalendarAlt /> Schedule Interview
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails; 