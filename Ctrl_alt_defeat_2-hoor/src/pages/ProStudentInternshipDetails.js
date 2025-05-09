import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaBuilding, FaClock, FaMoneyBillWave, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import './ProStudentInternshipDetails.css';

const ProStudentInternshipDetails = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationFiles, setApplicationFiles] = useState({
    cv: null,
    coverLetter: null,
    certificates: []
  });

  // Mock data for internship details
  const internshipDetails = {
    id: 1,
    title: 'Software Development Intern',
    company: 'Tech Solutions Inc.',
    duration: '3 months',
    type: 'Full-time',
    salary: '$25/hour',
    requirements: ['Python', 'JavaScript', 'React'],
    description: 'Join our development team to work on cutting-edge web applications. You will be responsible for developing and maintaining web applications, collaborating with team members on project features, and participating in code reviews and testing.',
    major: 'Computer Science',
    semester: 'Semester 5',
    location: 'New Cairo, Egypt',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    responsibilities: [
      'Develop and maintain web applications using modern technologies',
      'Collaborate with team members on project features',
      'Participate in code reviews and testing',
      'Learn and apply best practices in software development'
    ],
    benefits: [
      'Competitive salary',
      'Flexible working hours',
      'Professional development opportunities',
      'Networking events',
      'Potential for full-time employment'
    ]
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (type === 'certificates') {
      setApplicationFiles(prev => ({
        ...prev,
        certificates: [...prev.certificates, file]
      }));
    } else {
      setApplicationFiles(prev => ({
        ...prev,
        [type]: file
      }));
    }
  };

  const handleApply = () => {
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    // Handle application submission
    alert('Application submitted successfully!');
    navigate('/pro-student/applications');
  };

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="internship-details-content">
        <BackButton />
        
        {!showApplicationForm ? (
          <div className="internship-details-container">
            <div className="details-header">
              <h1>{internshipDetails.title}</h1>
              <div className="company-info">
                <FaBuilding className="icon" />
                <h2>{internshipDetails.company}</h2>
              </div>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <FaClock className="icon" />
                <div>
                  <label>Duration</label>
                  <p>{internshipDetails.duration}</p>
                </div>
              </div>
              <div className="detail-item">
                <FaMoneyBillWave className="icon" />
                <div>
                  <label>Salary</label>
                  <p>{internshipDetails.salary}</p>
                </div>
              </div>
              <div className="detail-item">
                <FaGraduationCap className="icon" />
                <div>
                  <label>Major</label>
                  <p>{internshipDetails.major}</p>
                </div>
              </div>
              <div className="detail-item">
                <FaCalendarAlt className="icon" />
                <div>
                  <label>Semester</label>
                  <p>{internshipDetails.semester}</p>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Description</h3>
              <p>{internshipDetails.description}</p>
            </div>

            <div className="details-section">
              <h3>Responsibilities</h3>
              <ul>
                {internshipDetails.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>

            <div className="details-section">
              <h3>Requirements</h3>
              <div className="requirements-grid">
                {internshipDetails.requirements.map((req, index) => (
                  <span key={index} className="requirement-tag">{req}</span>
                ))}
              </div>
            </div>

            <div className="details-section">
              <h3>Benefits</h3>
              <ul>
                {internshipDetails.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="details-section">
              <h3>Additional Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Location</label>
                  <p>{internshipDetails.location}</p>
                </div>
                <div className="info-item">
                  <label>Start Date</label>
                  <p>{new Date(internshipDetails.startDate).toLocaleDateString()}</p>
                </div>
                <div className="info-item">
                  <label>End Date</label>
                  <p>{new Date(internshipDetails.endDate).toLocaleDateString()}</p>
                </div>
                <div className="info-item">
                  <label>Type</label>
                  <p>{internshipDetails.type}</p>
                </div>
              </div>
            </div>

            <button className="apply-button" onClick={handleApply}>
              Apply Now
            </button>
          </div>
        ) : (
          <form className="application-form" onSubmit={handleSubmitApplication}>
            <h2>Submit Application</h2>
            
            <div className="form-group">
              <label>Resume/CV</label>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={(e) => handleFileUpload(e, 'cv')}
                required 
              />
              <small>Upload your resume in PDF or Word format</small>
            </div>

            <div className="form-group">
              <label>Cover Letter</label>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={(e) => handleFileUpload(e, 'coverLetter')}
                required 
              />
              <small>Upload your cover letter in PDF or Word format</small>
            </div>

            <div className="form-group">
              <label>Certificates (Optional)</label>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={(e) => handleFileUpload(e, 'certificates')}
                multiple 
              />
              <small>Upload any relevant certificates or achievements</small>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => setShowApplicationForm(false)}>
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProStudentInternshipDetails; 