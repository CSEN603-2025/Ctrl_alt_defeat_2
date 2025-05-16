import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBuilding, FaClock, FaMoneyBillWave, FaGraduationCap, FaCalendarAlt, FaIndustry, FaLinkedin, FaTwitter, FaGlobe, FaFileAlt } from 'react-icons/fa';
import StudentSidebar from '../components/StudentSidebar';
import './ProStudentInternships.css';

const StudentInternshipDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const internship = location.state?.internship;

  if (!internship) {
    // If no internship data, redirect back
    navigate('/student/internships');
    return null;
  }

  return (
    <div className="pro-student-layout">
      <StudentSidebar />
      <div className="pro-student-content">
        <button className="back-btn" onClick={() => navigate('/student/internships')}>← Back to Internships</button>
        <div className="internship-details-container">
          <div className="details-card">
            <div className="details-header">
              <div className="logo-container">
                <img
                  src={internship.logo}
                  alt={internship.company}
                  className="company-logo-large"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = '/images/default-company.png';
                  }}
                />
              </div>
              <div className="company-info">
                <h2>{internship.company}</h2>
                <p className="internship-title">{internship.title}</p>
                <div className="tags-container">
                  <span className="badge">{internship.industry}</span>
                  <span className="status-tag">{internship.type}</span>
                  <span className="date-tag">📅 {internship.date}</span>
                </div>
              </div>
            </div>
            <div className="details-content">
              <div className="info-grid">
                <div className="info-item">
                  <FaClock />
                  <div>
                    <label>Duration</label>
                    <p>{internship.duration}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaMoneyBillWave />
                  <div>
                    <label>Compensation</label>
                    <p>{internship.compensation} {internship.salary}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaGraduationCap />
                  <div>
                    <label>Major</label>
                    <p>{internship.major}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaCalendarAlt />
                  <div>
                    <label>Semester</label>
                    <p>{internship.semester}</p>
                  </div>
                </div>
              </div>
              <div className="description-documents-container">
                <div className="description">
                  <h4>Description</h4>
                  <p className="description-text">{internship.description}</p>
                </div>
                <div className="documents-section">
                  <h4>Required Documents</h4>
                  <ul className="documents-list">
                    {internship.requiredDocuments && internship.requiredDocuments.map((doc, idx) => (
                      <li key={idx}>
                        <FaFileAlt />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="requirements-section">
                <h4>Required Skills</h4>
                <div className="skills-list">
                  {internship.requirements.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              {internship.social && (
                <div className="social-links">
                  {internship.social.linkedin && (
                    <a href={internship.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                  )}
                  {internship.social.twitter && (
                    <a href={internship.social.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter />
                    </a>
                  )}
                  {internship.social.website && (
                    <a href={internship.social.website} target="_blank" rel="noopener noreferrer">
                      <FaGlobe />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="action-buttons-container" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="action-button apply" onClick={() => navigate(`/student/internships/${internship.id}/apply`, { state: { internship } })}>
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInternshipDetails; 