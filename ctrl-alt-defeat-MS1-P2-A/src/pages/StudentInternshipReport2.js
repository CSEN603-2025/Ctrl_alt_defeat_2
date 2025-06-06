import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaDownload, FaCheck, FaTrash } from 'react-icons/fa';
import StudentSidebar from '../components/StudentSidebar';
import './StudentInternships2.css';

const StudentInternshipReport2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const internship = location.state?.internship;
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Dummy list of courses
  const dummyCourses = [
    'Introduction to Programming',
    'Data Structures and Algorithms',
    'Web Development',
    'Database Management',
    'Digital Marketing',
    'Financial Accounting',
    'Project Management',
    'User Experience Design',
    'Cloud Computing',
    'Business Communication'
  ];

  const [reportData, setReportData] = useState({
    executiveSummary: '',
    objectives: '',
    methodology: '',
    results: '',
    conclusions: '',
    recommendations: '',
    attachments: [],
    courses: [] // Stores selected courses
  });

  const showFeedback = (message) => {
    setFeedbackMessage(message);
    setTimeout(() => {
      setFeedbackMessage('');
    }, 3000);
  };

  const handleCourseToggle = (course) => {
    setReportData((prev) => {
      const newCourses = prev.courses.includes(course)
        ? prev.courses.filter((c) => c !== course)
        : [...prev.courses, course];
      return { ...prev, courses: newCourses };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Report submitted:', reportData);
    showFeedback('Report submitted successfully!');
    setTimeout(() => {
      navigate(`/student/internships/${id}`);
    }, 1000);
  };

  const handleDelete = () => {
    console.log('Delete report clicked');
    // Redirect to the same location as the Back button
    navigate(`/student/internships/${id}`, {
      state: {
        internship,
        isCompleted: true
      }
    });
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

      Relevant Courses:
      ${reportData.courses.length > 0 ? reportData.courses.join(', ') : 'None selected'}
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
        <StudentSidebar />
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
      <StudentSidebar />
      <div className="pro-student-content">
        <div className="hero-banner">
          <h1>Internship Report</h1>
          <p>Submit your detailed internship report below</p>
        </div>

        <div
          className="back-btn"
          onClick={() =>
            navigate(`/student/internships/${id}`, {
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

              {/* Relevant Courses Section */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#000', marginBottom: '5px' }}>
                  Relevant Courses
                </label>
                <p style={{ fontSize: '13px', color: '#555', margin: '0 0 15px' }}>
                  Select the courses that helped you during your internship.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', alignItems: 'center', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px', border: '1px solid #ddd' }}>
                  {dummyCourses.map((course) => (
                    <React.Fragment key={course}>
                      <input
                        type="checkbox"
                        checked={reportData.courses.includes(course)}
                        onChange={() => handleCourseToggle(course)}
                        style={{
                          width: '16px',
                          height: '16px',
                          accentColor: '#007bff',
                          margin: '0',
                          cursor: 'pointer'
                        }}
                      />
                      <span
                        style={{
                          fontSize: '14px',
                          color: '#333',
                          lineHeight: '1.5'
                        }}
                      >
                        {course}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="action-button submit">
                  <FaCheck /> Submit Report
                </button>
              </div>
            </form>
            <div className="form-actions" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <button
                type="button"
                className="action-button download"
                onClick={handleDownload}
              >
                <FaDownload /> Download Report
              </button>
              <button
                type="button"
                className="action-button"
                onClick={handleDelete}
                style={{
                  color: '#dc3545' // Red text
                }}
              >
                <FaTrash style={{ color: '#dc3545', marginRight: '5px' }} /> {/* Red icon */}
                Delete Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInternshipReport2;