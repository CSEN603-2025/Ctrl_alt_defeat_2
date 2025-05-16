import React, { useState, useRef } from 'react';
import { FaDownload, FaEdit, FaTrash, FaPlus, FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import html2pdf from 'html2pdf.js';
import './ProStudentInternshipManagement.css';

const ProStudentInternshipManagement = () => {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [activeTab, setActiveTab] = useState('evaluation');
  const [evaluation, setEvaluation] = useState({
    rating: 5,
    pros: '',
    cons: '',
    recommendation: true,
    comments: ''
  });
  const [report, setReport] = useState({
    title: '',
    introduction: '',
    body: '',
    courses: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [submittedData, setSubmittedData] = useState({
    evaluation: null,
    report: null
  });

  const evaluationRef = useRef(null);
  const reportRef = useRef(null);

  // Mock data for completed internships
  const completedInternships = [
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      position: 'Software Development Intern',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      status: 'completed'
    },
    {
      id: 2,
      company: 'Data Analytics Co.',
      position: 'Data Science Intern',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      status: 'completed'
    }
  ];

  // Mock data for available courses
  const availableCourses = [
    { id: 1, code: 'CS101', name: 'Introduction to Programming', semester: 1 },
    { id: 2, code: 'CS201', name: 'Data Structures', semester: 2 },
    { id: 3, code: 'CS301', name: 'Database Systems', semester: 3 },
    { id: 4, code: 'CS401', name: 'Software Engineering', semester: 4 },
    { id: 5, code: 'CS501', name: 'Web Development', semester: 5 }
  ];

  const handleInternshipSelect = (internship) => {
    setSelectedInternship(internship);
    // Reset forms when selecting a new internship
    setEvaluation({
      rating: 5,
      pros: '',
      cons: '',
      recommendation: true,
      comments: ''
    });
    setReport({
      title: '',
      introduction: '',
      body: '',
      courses: []
    });
    setIsEditing(false);
  };

  const handleEvaluationSubmit = (e) => {
    e.preventDefault();
    // Save the evaluation data
    setSubmittedData(prev => ({
      ...prev,
      evaluation: { ...evaluation }
    }));
    setIsEditing(false);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    // Save the report data
    setSubmittedData(prev => ({
      ...prev,
      report: { ...report }
    }));
    setIsEditing(false);
  };

  const handleEdit = (type) => {
    if (type === 'evaluation') {
      setEvaluation(submittedData.evaluation);
    } else {
      setReport(submittedData.report);
    }
    setIsEditing(true);
  };

  const handleCourseToggle = (courseId) => {
    setReport(prev => ({
      ...prev,
      courses: prev.courses.includes(courseId)
        ? prev.courses.filter(id => id !== courseId)
        : [...prev.courses, courseId]
    }));
  };

  const generatePDF = async (type) => {
    const element = type === 'evaluation' ? evaluationRef.current : reportRef.current;
    const opt = {
      margin: 1,
      filename: `${type}_${selectedInternship.company}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const renderEvaluationView = () => (
    <div className="evaluation-view" ref={evaluationRef}>
      <div className="view-header">
        <h3>Company Evaluation</h3>
        <button className="edit-button" onClick={() => handleEdit('evaluation')}>
          <FaEdit /> Edit
        </button>
      </div>
      <div className="view-content">
        <div className="view-section">
          <h4>Rating</h4>
          <p>{submittedData.evaluation.rating}/5</p>
        </div>
        <div className="view-section">
          <h4>Pros</h4>
          <p>{submittedData.evaluation.pros}</p>
        </div>
        <div className="view-section">
          <h4>Cons</h4>
          <p>{submittedData.evaluation.cons}</p>
        </div>
        <div className="view-section">
          <h4>Recommendation</h4>
          <p>{submittedData.evaluation.recommendation ? 'Yes' : 'No'}</p>
        </div>
        {submittedData.evaluation.comments && (
          <div className="view-section">
            <h4>Additional Comments</h4>
            <p>{submittedData.evaluation.comments}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderReportView = () => (
    <div className="report-view" ref={reportRef}>
      <div className="view-header">
        <h3>Internship Report</h3>
        <button className="edit-button" onClick={() => handleEdit('report')}>
          <FaEdit /> Edit
        </button>
      </div>
      <div className="view-content">
        <div className="view-section">
          <h4>Title</h4>
          <p>{submittedData.report.title}</p>
        </div>
        <div className="view-section">
          <h4>Introduction</h4>
          <p>{submittedData.report.introduction}</p>
        </div>
        <div className="view-section">
          <h4>Report Body</h4>
          <p>{submittedData.report.body}</p>
        </div>
        <div className="view-section">
          <h4>Relevant Courses</h4>
          <div className="selected-courses">
            {submittedData.report.courses.map(courseId => {
              const course = availableCourses.find(c => c.id === courseId);
              return (
                <div key={courseId} className="selected-course">
                  <span className="course-code">{course.code}</span>
                  <span className="course-name">{course.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvaluationForm = () => (
    <div className="evaluation-form">
      <h3>Company Evaluation</h3>
      <form onSubmit={handleEvaluationSubmit}>
        <div className="form-group">
          <label>Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={evaluation.rating}
            onChange={(e) => setEvaluation(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
            required
          />
        </div>
        <div className="form-group">
          <label>Pros</label>
          <textarea
            value={evaluation.pros}
            onChange={(e) => setEvaluation(prev => ({ ...prev, pros: e.target.value }))}
            placeholder="What did you like about the internship?"
            required
          />
        </div>
        <div className="form-group">
          <label>Cons</label>
          <textarea
            value={evaluation.cons}
            onChange={(e) => setEvaluation(prev => ({ ...prev, cons: e.target.value }))}
            placeholder="What could be improved?"
            required
          />
        </div>
        <div className="form-group">
          <label>Would you recommend this company to other students?</label>
          <div className="recommendation-toggle">
            <button
              type="button"
              className={evaluation.recommendation ? 'active' : ''}
              onClick={() => setEvaluation(prev => ({ ...prev, recommendation: true }))}
            >
              <FaCheck /> Yes
            </button>
            <button
              type="button"
              className={!evaluation.recommendation ? 'active' : ''}
              onClick={() => setEvaluation(prev => ({ ...prev, recommendation: false }))}
            >
              <FaTimes /> No
            </button>
          </div>
        </div>
        <div className="form-group">
          <label>Additional Comments</label>
          <textarea
            value={evaluation.comments}
            onChange={(e) => setEvaluation(prev => ({ ...prev, comments: e.target.value }))}
            placeholder="Any other thoughts about your experience?"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">
            {isEditing ? 'Update Evaluation' : 'Submit Evaluation'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderReportForm = () => (
    <div className="report-form">
      <h3>Internship Report</h3>
      <form onSubmit={handleReportSubmit}>
        <div className="form-group">
          <label>Report Title</label>
          <input
            type="text"
            value={report.title}
            onChange={(e) => setReport(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter report title"
            required
          />
        </div>
        <div className="form-group">
          <label>Introduction</label>
          <textarea
            value={report.introduction}
            onChange={(e) => setReport(prev => ({ ...prev, introduction: e.target.value }))}
            placeholder="Write the introduction of your report"
            required
          />
        </div>
        <div className="form-group">
          <label>Report Body</label>
          <textarea
            value={report.body}
            onChange={(e) => setReport(prev => ({ ...prev, body: e.target.value }))}
            placeholder="Write the main content of your report"
            required
          />
        </div>
        <div className="form-group">
          <label>Relevant Courses</label>
          <div className="courses-list">
            {availableCourses.map(course => (
              <div
                key={course.id}
                className={`course-item ${report.courses.includes(course.id) ? 'selected' : ''}`}
                onClick={() => handleCourseToggle(course.id)}
              >
                <span className="course-code">{course.code}</span>
                <span className="course-name">{course.name}</span>
                <span className="course-semester">Semester {course.semester}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">
            {isEditing ? 'Update Report' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <BackButton />
        <h1>Internship Management</h1>

        <div className="internship-management-container">
          <div className="internships-list">
            <h3>Select a Completed Internship</h3>
            {completedInternships.map(internship => (
              <div
                key={internship.id}
                className={`internship-card ${selectedInternship?.id === internship.id ? 'selected' : ''}`}
                onClick={() => handleInternshipSelect(internship)}
              >
                <h4>{internship.position}</h4>
                <p className="company-name">{internship.company}</p>
                <p className="internship-dates">
                  {new Date(internship.startDate).toLocaleDateString()} - {new Date(internship.endDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {selectedInternship && (
            <div className="management-content">
              <div className="content-tabs">
                <button
                  className={activeTab === 'evaluation' ? 'active' : ''}
                  onClick={() => setActiveTab('evaluation')}
                >
                  Evaluation
                </button>
                <button
                  className={activeTab === 'report' ? 'active' : ''}
                  onClick={() => setActiveTab('report')}
                >
                  Report
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'evaluation' ? (
                  submittedData.evaluation && !isEditing ? renderEvaluationView() : renderEvaluationForm()
                ) : (
                  submittedData.report && !isEditing ? renderReportView() : renderReportForm()
                )}
              </div>

              <div className="document-actions">
                <button
                  className="download-button"
                  onClick={() => generatePDF('evaluation')}
                  disabled={!submittedData.evaluation}
                >
                  <FaDownload /> Download Evaluation
                </button>
                <button
                  className="download-button"
                  onClick={() => generatePDF('report')}
                  disabled={!submittedData.report}
                >
                  <FaDownload /> Download Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProStudentInternshipManagement; 