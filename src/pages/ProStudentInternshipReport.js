import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaDownload, FaTimes, FaCheck } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import './ProStudentInternships.css';

const ProStudentInternshipReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const internship = location.state?.internship;

  const [reportData, setReportData] = useState({
    executiveSummary: '',
    objectives: '',
    methodology: '',
    results: '',
    conclusions: '',
    recommendations: '',
    attachments: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would implement the API call to save the report
    console.log('Report submitted:', reportData);
    navigate(`/pro-student/internships/${id}`);
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
  };

  const handleCancel = () => {
    navigate(`/pro-student/internships/${id}`);
  };

  if (!internship) {
    return (
      <div className="pro-student-layout">
        <ProStudentSidebar />
        <div className="pro-student-content">
          <BackButton />
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
        <BackButton />
        <div className="report-form-container">
          <div className="report-form-card">
            <h2>Internship Report</h2>
            <div className="internship-info">
              <h3>{internship.company}</h3>
              <p>{internship.title}</p>
              <p>Duration: {internship.startDate} to {internship.endDate}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Executive Summary</label>
                <textarea
                  value={reportData.executiveSummary}
                  onChange={(e) => setReportData({...reportData, executiveSummary: e.target.value})}
                  placeholder="Provide a brief overview of your internship experience..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Objectives</label>
                <textarea
                  value={reportData.objectives}
                  onChange={(e) => setReportData({...reportData, objectives: e.target.value})}
                  placeholder="List the main objectives of your internship..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Methodology</label>
                <textarea
                  value={reportData.methodology}
                  onChange={(e) => setReportData({...reportData, methodology: e.target.value})}
                  placeholder="Describe the methods and approaches used during your internship..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Results</label>
                <textarea
                  value={reportData.results}
                  onChange={(e) => setReportData({...reportData, results: e.target.value})}
                  placeholder="Detail the outcomes and achievements of your internship..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Conclusions</label>
                <textarea
                  value={reportData.conclusions}
                  onChange={(e) => setReportData({...reportData, conclusions: e.target.value})}
                  placeholder="Summarize the key findings and insights from your internship..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Recommendations</label>
                <textarea
                  value={reportData.recommendations}
                  onChange={(e) => setReportData({...reportData, recommendations: e.target.value})}
                  placeholder="Provide recommendations for future improvements..."
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" className="action-button download" onClick={handleDownload}>
                  <FaDownload /> Download Report
                </button>
                <button type="button" className="action-button cancel" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="action-button submit">
                  <FaCheck /> Submit Report
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