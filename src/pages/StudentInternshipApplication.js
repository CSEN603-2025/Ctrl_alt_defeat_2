import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';
import StudentSidebar from '../components/StudentSidebar';
import './ProStudentInternships.css';

const inputBoxStyle = {
  border: '2px dashed #b2bec3',
  borderRadius: '8px',
  padding: '1rem',
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  background: '#fafbfc',
};

const fileLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontWeight: 500,
};

const StudentInternshipApplication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const internship = location.state?.internship;

  const [cv, setCv] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [idPassport, setIdPassport] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!internship) {
    navigate('/student/internships');
    return null;
  }

  const handleCertificatesChange = (e) => {
    setCertificates(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cv || !coverLetter || !transcript || !idPassport) {
      setError('All required documents must be uploaded.');
      return;
    }
    // Save application to localStorage
    const applications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
    applications.push({
      internshipId: internship.id,
      internship,
      cv: cv.name,
      coverLetter: coverLetter ? coverLetter.name : '',
      transcript: transcript ? transcript.name : '',
      idPassport: idPassport ? idPassport.name : '',
      certificates: certificates.map(f => f.name),
      message,
      status: 'pending',
      appliedAt: new Date().toISOString(),
    });
    localStorage.setItem('studentApplications', JSON.stringify(applications));
    navigate('/student/applications');
  };

  return (
    <div className="pro-student-layout">
      <StudentSidebar />
      <div className="pro-student-content">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <div className="hero-banner">
          <h2>Apply for {internship.title} at {internship.company}</h2>
        </div>
        <form className="application-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group" style={inputBoxStyle}>
            <label style={fileLabelStyle}><FaFileAlt /> CV/Resume (required)</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={e => setCv(e.target.files[0])} required />
            {cv && <span style={{ marginLeft: '1rem', color: '#636e72' }}>{cv.name}</span>}
          </div>
          <div className="form-group" style={inputBoxStyle}>
            <label style={fileLabelStyle}><FaFileAlt /> Cover Letter (required)</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={e => setCoverLetter(e.target.files[0])} required />
            {coverLetter && <span style={{ marginLeft: '1rem', color: '#636e72' }}>{coverLetter.name}</span>}
          </div>
          <div className="form-group" style={inputBoxStyle}>
            <label style={fileLabelStyle}><FaFileAlt /> Academic Transcript (required)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setTranscript(e.target.files[0])} required />
            {transcript && <span style={{ marginLeft: '1rem', color: '#636e72' }}>{transcript.name}</span>}
          </div>
          <div className="form-group" style={inputBoxStyle}>
            <label style={fileLabelStyle}><FaFileAlt /> ID/Passport Copy (required)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setIdPassport(e.target.files[0])} required />
            {idPassport && <span style={{ marginLeft: '1rem', color: '#636e72' }}>{idPassport.name}</span>}
          </div>
          <div className="form-group" style={inputBoxStyle}>
            <label style={fileLabelStyle}><FaFileAlt /> Certificates (you can select multiple)</label>
            <input type="file" multiple onChange={handleCertificatesChange} />
            {certificates.length > 0 && (
              <span style={{ marginLeft: '1rem', color: '#636e72' }}>{certificates.map(f => f.name).join(', ')}</span>
            )}
          </div>
          <div className="form-group">
            <label>Message (optional)</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} />
          </div>
          <button className="apply-btn" type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default StudentInternshipApplication; 