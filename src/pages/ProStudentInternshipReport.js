import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaDownload, FaCheck } from 'react-icons/fa';
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
          <p>Submit your detailed internship report below</p>
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
          <div className="feedback-message">
            {feedbackMessage}
          </div>
        )}

        <div className="report-form-container">
          <div className="report-form-card">
            <div className="internship-info">
              <h3>{internship.title}</h3>
              <p className="company-name">{internship.company}</p>
              <p>Duration: {internship.startDate} to {internship.endDate}</p>
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
                <div key={field} className="form-group" style={{ '--item-index': index }}>
                  <label style={{ color: '#000000', fontWeight: '700' }}>{field}</label>
                  <textarea
                    value={reportData[field.replace(/ /g, '').toLowerCase()]}
                    onChange={(e) =>
                      setReportData({ ...reportData, [field.replace(/ /g, '').toLowerCase()]: e.target.value })
                    }
                    placeholder={`Enter ${field.toLowerCase()}...`}
                    required
                  />
                </div>
              ))}

              <div className="form-actions">
                <button type="submit" className="action-button submit">
                  <FaCheck /> Submit Report
                </button>
              </div>
            </form>
          <div className="form-actions" style={{ marginTop: '24px' }}>
  <button
    type="button"
    className="action-button download"
    onClick={handleDownload}
  >
    <FaDownload /> Download Report
  </button>
</div>

        </div>
      </div>
    </div>
  </div>
  );
};

export default ProStudentInternshipReport;
