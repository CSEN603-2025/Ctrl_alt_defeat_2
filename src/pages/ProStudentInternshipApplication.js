import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaUpload, FaCheck, FaTimes } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import './ProStudentInternships.css';

const ProStudentInternshipApplication = () => {
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
      }
    ];

    const foundInternship = internships.find(i => i.id === parseInt(id));
    if (foundInternship) {
      setInternship(foundInternship);
    } else {
      navigate('/pro-student/internships');
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
      navigate('/pro-student/applications');
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
        <ProStudentSidebar />
        <div className="pro-student-content">
          <BackButton />
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
      <ProStudentSidebar />
      <div className="pro-student-content">
        <BackButton />
        <div className="application-container">
          <div className="application-header">
            <h2>Apply for {internship.title}</h2>
            <p className="company-name">{internship.company}</p>
          </div>

          <form className="application-form" onSubmit={handleSubmitApplication}>
            <div className="form-section">
              <h3>Required Documents</h3>
              <div className="form-group">
                <label>
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
                <label>
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
                <label>
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
                <label>
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
                <label>
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
                type="button" 
                className="cancel-button" 
                onClick={() => navigate(`/pro-student/internships/${id}`)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProStudentInternshipApplication; 