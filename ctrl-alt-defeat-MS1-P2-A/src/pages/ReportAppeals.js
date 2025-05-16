import React, { useState } from 'react';
import { FaComments, FaPaperPlane, FaTimes } from 'react-icons/fa';
import './ReportAppeals.css';
import ProStudentSidebar from '../components/ProStudentSidebar';
import './ProStudentInternships.css'; 

function ReportAppeals() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [appealMessage, setAppealMessage] = useState('');
  const [appealError, setAppealError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // Dummy data for flagged/rejected reports
  const reports = [
    {
      id: 1,
      jobPosition: 'Frontend Developer Intern',
      company: 'InstaBug',
      submittedDate: '2025-04-10',
      status: 'Flagged',
      comments: 'The report lacks sufficient detail in the project outcomes section. Please provide more specific metrics and results achieved during the internship.'
    },
    {
      id: 2,
      jobPosition: 'Marketing Intern',
      company: 'Breadfast',
      submittedDate: '2025-03-25',
      status: 'Rejected',
      comments: 'The report does not meet the required standards for analysis depth. The marketing strategies discussed need more evidence of impact and implementation details.'
    },
    {
      id: 3,
      jobPosition: 'Finance Analyst Intern',
      company: 'Valeo',
      submittedDate: '2025-02-15',
      status: 'Flagged',
      comments: 'The financial analysis section is incomplete. Please include a detailed breakdown of the budgeting process and forecasting methods used.'
    }
  ];

  const handleKnowWhyClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleAppealClick = (report) => {
    setSelectedReport(report);
    setAppealMessage('');
    setAppealError('');
  };

  const handleAppealSubmit = (e) => {
    e.preventDefault();
    if (!appealMessage.trim()) {
      setAppealError('Please provide an appeal message.');
      return;
    }

    // Simulate appeal submission
    setStatusMessage(`✔️ Appeal for "${selectedReport.jobPosition}" submitted successfully!`);
    setSelectedReport(null);
    setAppealMessage('');
    setTimeout(() => setStatusMessage(''), 3000);
  };

 return (
  <div className="pro-student-layout">
    <ProStudentSidebar />
    <div className="pro-student-content">

      <div className="reports-section">
        {statusMessage && (
          <div className="feedback-message">
            {statusMessage}
          </div>
        )}

        <section className="hero-banner">
          <h2>Flagged/Rejected Reports</h2>
          <p className="subtext">Review comments and appeal decisions for your internship reports</p>
        </section>

        <div className="reports-table-container animated fadeInUp">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Job Position</th>
                <th>Company</th>
                <th>Submitted Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <React.Fragment key={report.id}>
                  <tr className="pop-in delay-0">
                    <td>{report.jobPosition}</td>
                    <td>{report.company}</td>
                    <td>{report.submittedDate}</td>
                    <td>
                      <span className={`status-tag ${report.status.toLowerCase()}`}>
                        {report.status}
                      </span>
                    </td>
                    <td>
                      <button className="know-why-btn" onClick={() => handleKnowWhyClick(report.id)}>
                        <FaComments /> Know Why
                      </button>
                      <button className="appeal-btn" onClick={() => handleAppealClick(report)}>
                        <FaPaperPlane /> Appeal
                      </button>
                    </td>
                  </tr>
                  {expandedRow === report.id && (
                    <tr>
                      <td colSpan="5">
                        <div className="comments-card">
                          <p><strong>Reviewer Comments:</strong></p>
                          <p>{report.comments}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {selectedReport && (
          <div className="appeal-form-card">
            <button className="close-eval-btn" onClick={() => setSelectedReport(null)}>
              <FaTimes />
            </button>
            <h3>Appeal Report Decision</h3>
            <p style={{ margin: '0 0 15px', color: '#333' }}>
              Appealing report for <strong>{selectedReport.jobPosition}</strong> at <strong>{selectedReport.company}</strong>
            </p>
            <form onSubmit={handleAppealSubmit}>
              <textarea
                rows="5"
                className="evaluation-textarea"
                placeholder="Enter your appeal message..."
                value={appealMessage}
                onChange={(e) => setAppealMessage(e.target.value)}
                required
              />
              {appealError && (
                <p className="error-text">{appealError}</p>
              )}
              <button type="submit" className="appeal-btn">
                <FaPaperPlane /> Submit Appeal
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  </div>
);

}

export default ReportAppeals;