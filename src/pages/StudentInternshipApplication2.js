import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaUpload, FaCheck, FaTimes } from 'react-icons/fa';
import StudentSidebar from '../components/StudentSidebar';
import './StudentInternships2.css';

const StudentInternshipApplication2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [applicationFiles, setApplicationFiles] = useState({
    cv: null,
    coverLetter: null,
    academicTranscript: null,
    idPassport: null,
    certificates: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    // In a real application, this would be an API call
    const internships = [
      {
        id: 1,
        title: 'Software Development Intern',
        company: 'Instabug',
        logo: '/images/instabug.png',
        duration: '3 months',
        type: 'Full-time',
        salary: '$25/hour',
        compensation: 'Paid',
        industry: 'Technology',
        requirements: ['Python', 'JavaScript', 'React'],
        description: 'Join our development team to work on cutting-edge web applications.',
        major: 'Computer Science',
        semester: 'Semester 1',
        date: '2024-03-15',
        social: {
          linkedin: 'https://linkedin.com/company/instabug',
          twitter: 'https://twitter.com/instabug',
          website: 'https://instabug.com'
        }
      },
      {
        id: 2,
        title: 'Junior Developer Intern',
        company: 'Breadfast',
        logo: '/images/breadfast.png',
        duration: '3 months',
        type: 'Part-time',
        salary: '$20/hour',
        compensation: 'Paid',
        industry: 'E-commerce',
        requirements: ['Java', 'HTML', 'CSS'],
        description: 'Learn the basics of software development in a supportive environment.',
        major: 'Computer Science',
        semester: 'Semester 2',
        date: '2024-03-10',
        social: {
          linkedin: 'https://linkedin.com/company/breadfast',
          website: 'https://breadfast.com',
          twitter: 'https://twitter.com/breadfast'
        }
      },
      {
        id: 3,
        title: 'Web Development Intern',
        company: 'Bosta',
        logo: '/images/bosta.png',
        duration: '4 months',
        type: 'Full-time',
        salary: '$22/hour',
        compensation: 'Paid',
        industry: 'Logistics',
        requirements: ['JavaScript', 'Node.js', 'MongoDB'],
        description: 'Work on full-stack web development projects.',
        major: 'Computer Science',
        semester: 'Semester 3',
        date: '2024-03-05',
        social: {
          linkedin: 'https://linkedin.com/company/bosta',
          website: 'https://bosta.co'
        }
      },
      {
        id: 4,
        title: 'Mobile App Development Intern',
        company: 'Valeo',
        logo: '/images/valeo.png',
        duration: '3 months',
        type: 'Full-time',
        salary: '$24/hour',
        compensation: 'Paid',
        industry: 'Automotive',
        requirements: ['React Native', 'JavaScript', 'Mobile Development'],
        description: 'Develop cross-platform mobile applications.',
        major: 'Computer Science',
        semester: 'Semester 4',
        date: '2024-03-01',
        social: {
          linkedin: 'https://linkedin.com/company/valeo',
          website: 'https://valeo.com'
        }
      }
    ];

    const foundInternship = internships.find(i => i.id === parseInt(id));
    if (foundInternship) {
      setInternship(foundInternship);
    } else {
      navigate('/student/internships');
    }
  }, [id, navigate]);

  const validateFiles = () => {
    const newErrors = {};
    if (!applicationFiles.cv) newErrors.cv = 'CV/Resume is required';
    if (!applicationFiles.coverLetter) newErrors.coverLetter = 'Cover Letter is required';
    if (!applicationFiles.academicTranscript) newErrors.academicTranscript = 'Academic Transcript is required';
    if (!applicationFiles.idPassport) newErrors.idPassport = 'ID/Passport Copy is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      setErrors(prev => ({
        ...prev,
        [type]: 'Please upload a PDF or Word document'
      }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [type]: 'File size should not exceed 5MB'
      }));
      return;
    }

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
      setErrors(prev => ({
        ...prev,
        [type]: null
      }));
    }
  };

  const removeFile = (type, index) => {
    if (type === 'certificates') {
      setApplicationFiles(prev => ({
        ...prev,
        certificates: prev.certificates.filter((_, i) => i !== index)
      }));
    } else {
      setApplicationFiles(prev => ({
        ...prev,
        [type]: null
      }));
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    if (!validateFiles()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // In a real application, this would be an API call to submit the application
      // and update the user's applications list
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setShowFeedback(true);
      setTimeout(() => {
        navigate('/student/internships');
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      // Handle error appropriately
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!internship) {
    return (
      <div className="pro-student-layout">
        <StudentSidebar />
        <div className="pro-student-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading internship details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pro-student-layout">
      <StudentSidebar />
      <div className="pro-student-content">
        {showFeedback && (
          <div className="feedback-message">
            Application submitted successfully! Redirecting to internships...
          </div>
        )}
        <div className="hero-banner">
          <h1>Application Form</h1>
          <p>Submit your application for the internship position</p>
        </div>

        <button onClick={() => navigate('/student/internships')} className="back-btn">← Back to Internships</button>

        <div className="application-container">
          <div className="application-header" style={{ textAlign: 'left' }}>
            <h2 style={{ color: '#0a3d62', margin: '0 0 5px 0' }}>
              Application for {internship.title}
            </h2>
            <p style={{ color: '#0a3d62', fontWeight: 'bold', fontSize: '16px', margin: 0 }}>
              {internship.company}
            </p>
          </div>


          <form className="application-form" onSubmit={handleSubmitApplication}>
            <div className="form-section">
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaFileAlt /> Resume/CV
                  <span className="required">*</span>
                </label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'cv')}
                    className={errors.cv ? 'error' : ''}
                  />
                  {applicationFiles.cv && (
                    <div className="file-preview">
                      <span>{applicationFiles.cv.name}</span>
                      <button
                        type="button"
                        className="remove-file"
                        onClick={() => removeFile('cv')}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  {errors.cv && <span className="error-message">{errors.cv}</span>}
                </div>
                <small>Upload your resume in PDF or Word format (max 5MB)</small>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaFileAlt /> Cover Letter
                  <span className="required">*</span>
                </label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'coverLetter')}
                    className={errors.coverLetter ? 'error' : ''}
                  />
                  {applicationFiles.coverLetter && (
                    <div className="file-preview">
                      <span>{applicationFiles.coverLetter.name}</span>
                      <button
                        type="button"
                        className="remove-file"
                        onClick={() => removeFile('coverLetter')}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  {errors.coverLetter && <span className="error-message">{errors.coverLetter}</span>}
                </div>
                <small>Upload your cover letter in PDF or Word format (max 5MB)</small>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaFileAlt /> Academic Transcript
                  <span className="required">*</span>
                </label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'academicTranscript')}
                    className={errors.academicTranscript ? 'error' : ''}
                  />
                  {applicationFiles.academicTranscript && (
                    <div className="file-preview">
                      <span>{applicationFiles.academicTranscript.name}</span>
                      <button
                        type="button"
                        className="remove-file"
                        onClick={() => removeFile('academicTranscript')}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  {errors.academicTranscript && <span className="error-message">{errors.academicTranscript}</span>}
                </div>
                <small>Upload your academic transcript in PDF or Word format (max 5MB)</small>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaFileAlt /> ID/Passport Copy
                  <span className="required">*</span>
                </label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'idPassport')}
                    className={errors.idPassport ? 'error' : ''}
                  />
                  {applicationFiles.idPassport && (
                    <div className="file-preview">
                      <span>{applicationFiles.idPassport.name}</span>
                      <button
                        type="button"
                        className="remove-file"
                        onClick={() => removeFile('idPassport')}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  {errors.idPassport && <span className="error-message">{errors.idPassport}</span>}
                </div>
                <small>Upload your ID or passport copy in PDF or image format (max 5MB)</small>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaFileAlt /> Additional Certificates (Optional)
                </label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'certificates')}
                    multiple
                  />
                  {applicationFiles.certificates.length > 0 && (
                    <div className="certificates-list">
                      {applicationFiles.certificates.map((cert, index) => (
                        <div key={index} className="file-preview">
                          <span>{cert.name}</span>
                          <button
                            type="button"
                            className="remove-file"
                            onClick={() => removeFile('certificates', index)}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <small>Upload any relevant certificates or achievements (max 5MB each)</small>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="action-button"
                disabled={isSubmitting}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  margin: '0 auto'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>
        {`
          .feedback-message {
            background: linear-gradient(to right, #0a3d62, #3c6382);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            margin: 0 0 20px 0;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            font-size: 15px;
            animation: slideIn 0.3s ease-out, fadeOut 0.3s ease-in 2.7s;
            position: fixed;
            top: 24px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(10, 61, 98, 0.3),
              0 8px 30px rgba(10, 61, 98, 0.2);
            min-width: 320px;
            text-align: center;
            letter-spacing: 0.3px;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          @keyframes slideIn {
            from {
              transform: translate(-50%, -100%);
              opacity: 0;
            }

            to {
              transform: translate(-50%, 0);
              opacity: 1;
            }
          }

          @keyframes fadeOut {
            from {
              opacity: 1;
              transform: translate(-50%, 0);
            }

            to {
              opacity: 0;
              transform: translate(-50%, -20px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default StudentInternshipApplication2; 