import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaDownload, FaCheck, FaTrash } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import './ProStudentInternships.css';

const ProStudentInternshipReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const internship = location.state?.internship;
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const [reportData, setReportData] = useState({
    executiveSummary: '',
    objectives: '',
    methodology: '',
    results: '',
    conclusions: '',
    recommendations: '',
    attachments: []
  });

  const showFeedback = (message) => {
    setFeedbackMessage(message);
    setTimeout(() => {
      setFeedbackMessage('');
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Report submitted:', reportData);
    showFeedback('Report submitted successfully!');
    setTimeout(() => {
      navigate(`/pro-student/internships/${id}`);
    }, 1000);
  };

  const handleDelete = () => {
    console.log('Delete report clicked');
    showFeedback('Report deleted successfully!'); // Display feedback message
    setTimeout(() => {
      navigate(`/pro-student/internships/${id}`, {
        state: {
          internship,
          isCompleted: true
        }
      });
    }, 1000); // Delay navigation by 1 second
  };

  const handleDownload = () => {
    const pdfContent = `
      Internship Report
      ===============

      Company: ${internship.company}
      Position: ${internship.title}
      Duration: ${internship.startDate} to ${internship.endDate}

      Executive Summary:
      ${reportData.executiveSummary}

      Objectives:
      ${reportData.objectives}

      Methodology:
      ${reportData.methodology}

      Results:
      ${reportData.results}

      Conclusions:
      ${reportData.conclusions}

      Recommendations:
      ${reportData.recommendations}
    `;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${internship.company}_${internship.title}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    showFeedback('Report downloaded successfully!');
  };

  // Updated button style with centered text
  const buttonStyle = {
    width: '100%', // Full width
    display: 'flex',
    justifyContent: 'center', // Center text and icons horizontally
    alignItems: 'center', // Vertically center content
    gap: '5px',
    padding: '10px 20px',
    backgroundColor: '#f4f7f9', // Default background
    color: '#0a3d62', // Default text color
    border: '1px solid #0a3d62', // Default border color
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s',
    textAlign: 'center' // Ensure text is centered
  };

  // Hover effect for all buttons
  const handleMouseOver = (e) => {
    e.currentTarget.style.backgroundColor = '#0a3d62';
    e.currentTarget.style.color = '#fff'; // Text to white on hover
    // Update the icon color by targeting child elements
    const icon = e.currentTarget.querySelector('svg');
    if (icon) {
      icon.style.color = '#fff'; // Icon to white on hover
    }
  };

  const handleMouseOut = (e, isDeleteButton = false) => {
    e.currentTarget.style.backgroundColor = '#f4f7f9';
    e.currentTarget.style.color = isDeleteButton ? '#dc3545' : '#0a3d62'; // Reset text color
    const icon = e.currentTarget.querySelector('svg');
    if (icon) {
      icon.style.color = isDeleteButton ? '#dc3545' : '#0a3d62'; // Reset icon color
    }
  };

  if (!internship) {
    return (
      <div className="pro-student-layout">
        <ProStudentSidebar />
        <div className="pro-student-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading report form...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        {/* ✅ Hero Banner */}
        <div className="hero-banner">
          <h1>Internship Report</h1>
        </div>

        {/* ✅ Back Button (Styled like screenshot) */}
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
          <div
            style={{
              padding: '10px',
              backgroundColor: '#e6f4ea',
              color: '#2e7d32',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center'
            }}
          >
            {feedbackMessage}
          </div>
        )}

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {/* Internship Info */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#000', margin: '0 0 5px' }}>{internship.title}</h3>
              <p style={{ fontSize: '14px', color: '#777', margin: '0 0 5px' }}>{internship.company}</p>
              <p style={{ fontSize: '14px', color: '#777', margin: '0' }}>
                Duration: {internship.startDate} to {internship.endDate}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {[
                'Executive Summary',
                'Objectives',
                'Methodology',
                'Results',
                'Conclusions',
                'Recommendations'
              ].map((field, index) => (
                <div key={field} style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#000', marginBottom: '5px' }}>
                    {field}
                  </label>
                  <textarea
                    value={reportData[field.replace(/ /g, '').toLowerCase()]}
                    onChange={(e) =>
                      setReportData({ ...reportData, [field.replace(/ /g, '').toLowerCase()]: e.target.value })
                    }
                    placeholder={`Enter ${field.toLowerCase()}...`}
                    required
                    style={{
                      width: '100%',
                      minHeight: '100px',
                      padding: '10px',
                      fontSize: '14px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      resize: 'vertical'
                    }}
                  />
                </div>
              ))}

              {/* Buttons */}
              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <button
                  type="submit"
                  style={buttonStyle}
                  onMouseOver={handleMouseOver}
                  onMouseOut={(e) => handleMouseOut(e, false)}
                >
                  <FaCheck /> Submit Report
                </button>
                <button
                  type="button"
                  style={buttonStyle}
                  onMouseOver={handleMouseOver}
                  onMouseOut={(e) => handleMouseOut(e, false)}
                  onClick={handleDownload}
                >
                  <FaDownload /> Download Report
                </button>
                <button
                  type="button"
                  style={{
                    ...buttonStyle,
                    color: '#dc3545' // Red text for Delete by default
                  }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={(e) => handleMouseOut(e, true)}
                  onClick={handleDelete}
                >
                  <FaTrash style={{ color: '#dc3545' }} /> {/* Red icon by default */}
                  Delete Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProStudentInternshipReport;