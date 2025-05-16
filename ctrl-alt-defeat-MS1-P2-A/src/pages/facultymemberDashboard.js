import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaTh, FaSearch, FaFileAlt, FaChartBar, FaBell, FaFilter, FaSortAmountDown, FaClipboardList, FaEdit, FaRegCalendarAlt,FaDownload
} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import './facultymemberDashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function FacultyMemberDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMajor, setFilterMajor] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [clarification, setClarification] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [submittedClarification, setSubmittedClarification] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isClarificationVisible, setIsClarificationVisible] = useState(true);
  const [clarificationError, setClarificationError] = useState(''); // Fix ESLint no-undef
  const [clarificationMessage, setClarificationMessage] = useState('');
  const clarificationRef = useRef(null);
  
  const navigate = useNavigate();

  // Move internshipReports to state
  const [internshipReports, setInternshipReports] = useState([
    {
      id: 1,
      title: 'Frontend Developer Internship Report',
      student: 'John Doe',
      photo: '/images/man2.png',
      company: 'InstaBug',
      major: 'CS',
      status: 'Accepted',
      date: '2025-04-01',
      document: 'report1.pdf',
      cycle: 'Cycle 1',
      reviewTime: 3
    },
    {
      id: 2,
      title: 'Marketing Internship Report',
      student: 'Sarah Smith',
      photo: '/images/woman.png',
      company: 'Breadfast',
      major: 'Marketing',
      status: 'Flagged',
      date: '2025-03-20',
      document: 'report2.pdf',
      cycle: 'Cycle 2',
      reviewTime: 5
    },
    {
      id: 3,
      title: 'Finance Analyst Internship Report',
      student: 'Ali Mostafa',
      photo: '/images/man3.png',
      company: 'Valeo',
      major: 'Finance',
      status: 'Rejected',
      date: '2025-03-15',
      document: 'report3.pdf',
      cycle: 'Cycle 3',
      reviewTime: 2
    }
  ]);

  const evaluations = [
    {
      id: 1,
      student: 'John Doe',
      photo: '/images/man2.png',
      company: 'InstaBug',
      title: 'Frontend Developer Intern',
      supervisor: 'Jane Smith',
      startDate: '2025-01-01',
      endDate: '2025-04-01',
      date: '2025-04-02',
      rating: 4,
      strengths: ['JavaScript', 'Teamwork'],
      weaknesses: ['Time Management'],
      comments: 'Excellent technical skills but needs to improve punctuality.',
      recommendation: 'Yes',
      major: 'CS',
      cycle: 'Cycle 1'
    },
    {
      id: 2,
      student: 'Sarah Smith',
      photo: '/images/woman.png',
      company: 'Breadfast',
      title: 'Marketing Intern',
      supervisor: 'Mark Johnson',
      startDate: '2025-02-01',
      endDate: '2025-04-01',
      date: '2025-04-03',
      rating: 3,
      strengths: ['Creativity', 'Communication'],
      weaknesses: ['Analytical Skills'],
      comments: 'Creative ideas but needs to work on data analysis.',
      recommendation: 'No',
      major: 'Marketing',
      cycle: 'Cycle 2'
    }
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const generatePDF = (content, filename) => {
    const latexContent = `
\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{a4paper, margin=1in}
\\usepackage{hyperref}
\\begin{document}
\\title{${filename}}
\\author{Faculty Member}
\\date{\\today}
\\maketitle
${content}
\\end{document}
    `;
    console.log(`Generating PDF: ${filename}.tex`);
    return latexContent;
  };

  const downloadReportPDF = (report) => {
    const content = `
\\section{Internship Report}
\\textbf{Title:} ${report.title}\\\\
\\textbf{Student:} ${report.student}\\\\
\\textbf{Company:} ${report.company}\\\\
\\textbf{Major:} ${report.major}\\\\
\\textbf{Status:} ${report.status}\\\\
\\textbf{Date:} ${report.date}\\\\
\\textbf{Cycle:} ${report.cycle}\\\\
\\textbf{Document:} \\href{run:${report.document}}{${report.document}}
    `;
    const latex = generatePDF(content, `Report_${report.id}`);
    setStatusMessage(`✔️ PDF for ${report.title} Downloaded successfully.`);
    setTimeout(() => setStatusMessage(''), 3000);
    return latex;
  };

  const downloadEvaluationPDF = (evaluation) => {
    const content = `
\\section{Evaluation Report}
\\textbf{Student:} ${evaluation.student}\\\\
\\textbf{Company:} ${evaluation.company}\\\\
\\textbf{Title:} ${evaluation.title}\\\\
\\textbf{Supervisor:} ${evaluation.supervisor}\\\\
\\textbf{Start Date:} ${evaluation.startDate}\\\\
\\textbf{End Date:} ${evaluation.endDate}\\\\
\\textbf{Rating:} ${evaluation.rating}/5\\\\
\\textbf{Strengths:} ${evaluation.strengths.join(', ')}\\\\
\\textbf{Weaknesses:} ${evaluation.weaknesses.join(', ')}\\\\
\\textbf{Comments:} ${evaluation.comments}\\\\
\\textbf{Recommendation:} ${evaluation.recommendation}\\\\
\\textbf{Major:} ${evaluation.major}\\\\
\\textbf{Cycle:} ${evaluation.cycle}
    `;
    const latex = generatePDF(content, `Evaluation_${evaluation.id}`);
    setStatusMessage(`✔️ PDF for ${evaluation.student}'s evaluation Dowloaded Successfully.`);
    setTimeout(() => setStatusMessage(''), 3000);
    return latex;
  };

  const downloadStatisticsPDF = () => {
    const content = `
\\section{Internship Statistics}
\\subsection{Reports Status per Cycle}
\\begin{itemize}
  \\item Cycle 1: Accepted (10), Rejected (3), Flagged (2)
  \\item Cycle 2: Accepted (8), Rejected (4), Flagged (1)
  \\item Cycle 3: Accepted (12), Rejected (2), Flagged (3)
\\end{itemize}
\\subsection{Average Review Time}
Average: 3.5 days\\\\
\\subsection{Most Frequently Used Courses}
\\begin{itemize}
  \\item Web Development (25\\%)
  \\item Artificial Intelligence (20\\%)
  \\item Data Science (15\\%)
\\end{itemize}
\\subsection{Top Rated Companies}
\\begin{itemize}
  \\item InstaBug: 4.5/5
  \\item Breadfast: 4.0/5
  \\item Valeo: 3.8/5
\\end{itemize}
\\subsection{Top Companies by Internship Count}
\\begin{itemize}
  \\item InstaBug: 15 internships
  \\item Breadfast: 10 internships
  \\item Valeo: 8 internships
\\end{itemize}
    `;
    const latex = generatePDF(content, 'Statistics_Report');
    setStatusMessage(`✔️ Statistics report PDF generated.`);
    setTimeout(() => setStatusMessage(''), 3000);
    return latex;
  };

  const filterAndSortReports = (list) => {
    return list
      .filter(r =>
        (r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!filterMajor || r.major === filterMajor) &&
        (!filterStatus || r.status === filterStatus)
      )
      .sort((a, b) => sortOrder === 'newest'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
      );
  };

  const filterAndSortEvaluations = (list) => {
    return list
      .filter(e =>
        (e.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!filterMajor || e.major === filterMajor) &&
        (!filterStatus || e.recommendation === filterStatus)
      )
      .sort((a, b) => sortOrder === 'newest'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
      );
  };

const submitClarification = (reportId) => {
  if (!clarification) {
    setClarificationError('Please provide a clarification.');
    setClarificationMessage('⚠️ Please provide a clarification.');
    setTimeout(() => {
      setClarificationMessage('');
      setClarificationError('');
    }, 3000);
    return;
  }
  setSubmittedClarification(clarification);
  setIsEditing(false);
  setClarificationError('');
  setClarificationMessage(`✔️ Clarification for report ${reportId} submitted.`);
  setTimeout(() => {
    setClarificationMessage('');
    /* setSelectedReport(null); */ // Redirect after message animation completes
  }, 3500); // Increase to 3.5s to ensure animation (2.7s fadeOut + 0.3s slideIn) completes
};

  const startEditing = () => {
    setClarification(submittedClarification);
    setIsEditing(true);
  };

  const updateReportStatus = (newStatus) => {
    if (selectedReport) {
      // Update the internshipReports state
      setInternshipReports(prevReports =>
        prevReports.map(report =>
          report.id === selectedReport.id
            ? { ...report, status: newStatus }
            : report
        )
      );

      // Update the selected report
      if (newStatus === 'Accepted' && (selectedReport.status === 'Rejected' || selectedReport.status === 'Flagged')) {
        setIsClarificationVisible(false);
        setTimeout(() => {
          setSelectedReport({ ...selectedReport, status: newStatus });
          setSubmittedClarification('');
          setIsEditing(false);
        }, 300);
      } else {
        if (newStatus === 'Rejected' || newStatus === 'Flagged') {
          setIsClarificationVisible(true);
          setTimeout(() => {
            clarificationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
        setSelectedReport({ ...selectedReport, status: newStatus });
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
      case 'Yes':
        return '#38ada9';
      case 'Rejected':
      case 'No':
        return '#e55039';
      case 'Flagged':
        return '#f6b93b';
      case 'Pending':
        return '#ccc';
      default:
        return '#ccc';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-overview">
            <section className="hero-banner animated fadeSlideUp">
              <h2>Welcome back, Dr. Salem 👋</h2>
            
            </section>
           
            <div className="stats-grid">
              <div className="stat-card fade-in">
                <h3>Total Reports</h3>
                <p className="stat-number">35</p>
              </div>
              <div className="stat-card fade-in delay-1">
                <h3>Pending Reviews</h3>
                <p className="stat-number">8</p>
              </div>
              <div className="stat-card fade-in delay-2">
                <h3>Average Review Time</h3>
                <p className="stat-number">3.5 days</p>
              </div>
            </div>
            <div className="dashboard-charts" style={{ marginTop: '40px' }}>
              <div className="chart-section">
                <h4>Reports Status per Cycle</h4>
                <Bar
                  data={{
                    labels: ['Cycle 1', 'Cycle 2', 'Cycle 3'],
                    datasets: [
                      { label: 'Accepted', data: [10, 8, 12], backgroundColor: '#38ada9' },
                      { label: 'Rejected', data: [3, 4, 2], backgroundColor: '#e55039' },
                      { label: 'Flagged', data: [2, 1, 3], backgroundColor: '#f6b93b' }
                    ]
                  }}
                  options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
                />
              </div>
              <div className="chart-section">
                <h4>Most Used Courses</h4>
                <Pie
                  data={{
                    labels: ['Web Dev', 'AI', 'Data Science', 'Mobile Dev', 'UI/UX'],
                    datasets: [{
                      label: 'Course Usage',
                      data: [25, 20, 15, 10, 5],
                      backgroundColor: ['#60a3d9', '#38ada9', '#f6b93b', '#e55039', '#1e3799']
                    }]
                  }}
                  options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
                />
              </div>
            </div>
          </div>
        );

 case 'reports':
        return (
          <div className="internship-section animated fadeInUp">
            <section className="hero-banner animated fadeSlideUp">
              <h2>Reports</h2>
           
            </section>
            {selectedReport ? (
              <div className="internship-details-container fadeIn">
                <button onClick={() => setSelectedReport(null)} className="back-btn">← Back to Internships</button>
                <div className="details-card-grid">
                  <div className="details-box" style={{ animation: 'fadeInUpSubmitter 0.6s cubic-bezier(0.23, 1, 0.32, 1)', position: 'relative' }}>
                    <div className="details-header">
                      <img src={selectedReport.photo} alt={selectedReport.student} />
                      <div>
                        <h3 style={{ color: '#0a3d62', margin: '0 0 8px 0', fontSize: '1.5em', fontWeight: 'bold' }}>{selectedReport.student}</h3>
                        <p style={{ color: '#0a3d62', margin: '0 0 8px 0', fontSize: '1.2em', fontWeight: 'bold' }}>{selectedReport.title}</p>
                        <p style={{ color: '#0a3d62', margin: '0 0 8px 0', fontSize: '1.1em' }}>{selectedReport.company}</p>
                        <p style={{ color: '#000', margin: '0', fontSize: '1em' }}>
                          <span style={{ marginRight: '15px' }}><b>Major:</b> {selectedReport.major}</span>
                          <span><b>Cycle:</b> {selectedReport.cycle}</span>
                        </p>
                      </div>
                    </div>
                    <span style={{ position: 'absolute', top: '18px', right: '24px', color: '#0a3d62', fontWeight: 500, fontSize: '1em', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FaRegCalendarAlt style={{ fontSize: '1.1em', marginRight: '3px' }} />
                      {selectedReport.date}
                    </span>
                  </div>
                  <div className="details-box" style={{ animation: 'slideInRight 0.5s ease-out 0.25s' }}>
                    <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Report Preview</h3>
                    <div style={{ minHeight: '80px', color: '#222', fontSize: '15px', marginBottom: '18px', fontFamily: 'Georgia, Times, "Times New Roman", serif', lineHeight: '1.7', background: '#fff', border: '1.5px solid #b0b0b0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '28px 24px', position: 'relative' }}>
                      <h2 style={{ color: '#0a3d62', margin: '0 0 10px 0', fontSize: '1.4em' }}>{selectedReport.title}</h2>
                      <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>
                        Student: <span style={{ color: '#111' }}>{selectedReport.student}</span> &nbsp; | &nbsp; Company: <span style={{ color: '#111' }}>{selectedReport.company}</span>
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '0.98em' }}>
                        <span style={{ marginRight: '18px' }}><b>Major:</b> <span style={{ color: '#111' }}>{selectedReport.major}</span></span>
                        <span><b>Cycle:</b> <span style={{ color: '#111' }}>{selectedReport.cycle}</span></span>
                      </div>
                      <h3 style={{ color: '#3c6382', margin: '18px 0 6px 0', fontSize: '1.1em' }}>Introduction</h3>
                      <p>This report outlines my experience as a <b style={{ color: '#111' }}>{selectedReport.title.replace('Internship Report', 'Intern')}</b> at <b style={{ color: '#111' }}>{selectedReport.company}</b> during the <span style={{ color: '#111' }}>{selectedReport.cycle}</span> internship cycle. The internship provided valuable hands-on exposure to real-world projects and professional work environments.</p>
                      <h3 style={{ color: '#3c6382', margin: '18px 0 6px 0', fontSize: '1.1em' }}>Objectives</h3>
                      <ul style={{ margin: '0 0 8px 18px' }}>
                        <li>Apply academic knowledge to practical tasks in a professional setting.</li>
                        <li>Develop technical and soft skills relevant to the industry.</li>
                        <li>Contribute to ongoing projects and collaborate with team members.</li>
                      </ul>
                      <h3 style={{ color: '#3c6382', margin: '18px 0 6px 0', fontSize: '1.1em' }}>Key Tasks & Responsibilities</h3>
                      <ul style={{ margin: '0 0 8px 18px' }}>
                        <li>Participated in daily stand-up meetings and sprint planning sessions.</li>
                        <li>Worked on feature development, bug fixing, and code reviews.</li>
                        <li>Prepared documentation and presented progress to supervisors.</li>
                      </ul>
                      <h3 style={{ color: '#3c6382', margin: '18px 0 6px 0', fontSize: '1.1em' }}>Outcomes & Achievements</h3>
                      <ul style={{ margin: '0 0 8px 18px' }}>
                        <li>Successfully delivered assigned project modules on time.</li>
                        <li>Improved proficiency in industry-standard tools and technologies.</li>
                        <li>Received positive feedback from mentors and team leaders.</li>
                      </ul>
                      <h3 style={{ color: '#3c6382', margin: '18px 0 6px 0', fontSize: '1.1em' }}>Conclusion</h3>
                      <p>The internship at <b style={{ color: '#111' }}>{selectedReport.company}</b> was a transformative experience that enhanced my professional and personal growth. I am grateful for the opportunity and look forward to applying these learnings in my future career.</p>
                    </div>
                    <button className="status-btn" style={{ width: '100%', height: '38px', marginTop: '5px' }} onClick={() => downloadReportPDF(selectedReport)}>
                       <FaDownload /> Download Report as PDF
                    </button>
                  </div>
                  <div className="details-box" style={{ animation: 'slideInRight 0.5s ease-out 0.2s' }}>
                    <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Update Report Status</h3>
                    <div className="status-buttons">
                      {['Accepted', 'Rejected', 'Flagged'].map((option) => (
                        <button
                          key={option}
                          className={`status-btn-outline ${option.toLowerCase()} ${selectedReport.status === option ? 'active' : ''}`}
                          onClick={() => updateReportStatus(option)}
                          style={{ height: '36px' }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
           {(selectedReport.status === 'Rejected' || selectedReport.status === 'Flagged') && (
  <div
    ref={clarificationRef}
    className="details-box"
    style={{
      opacity: isClarificationVisible ? 1 : 0,
      transform: `translateY(${isClarificationVisible ? '0' : '-20px'})`,
      transition: 'all 0.3s ease-out',
      height: isClarificationVisible ? 'auto' : '0',
      overflow: 'hidden',
      marginBottom: isClarificationVisible ? '20px' : '0',
      animation: 'slideInRight 0.5s ease-out 0.3s'
    }}
  >
    <h3 style={{ marginBottom: '15px', color: '#0a3d62' }}>Clarification</h3>
    {clarificationMessage && (
      <p className={`feedback-message ${clarificationMessage.includes('✔️') ? 'success' : 'error'}`}>
        {clarificationMessage}
      </p>
    )}
    {isEditing ? (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!e.target.checkValidity()) {
            e.target.reportValidity();
            return;
          }
          submitClarification(selectedReport.id);
        }}
        noValidate
      >
        <textarea
          className="evaluation-textarea"
          value={clarification}
          onChange={(e) => setClarification(e.target.value)}
          placeholder="Explain why this report was flagged or rejected..."
          required
        />
        {clarificationError && (
          <p style={{ color: 'red', fontSize: '12px', margin: '4px 0 8px' }}>
            {clarificationError}
          </p>
        )}
        <button className="status-btn" style={{ width: '100%', height: '38px', marginTop: '5px' }} type="submit">
          Submit Clarification
        </button>
      </form>
    ) : (
      <>
        <p style={{
          whiteSpace: 'pre-wrap',
          marginBottom: '15px',
          backgroundColor: '#f5f6fa',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          color: submittedClarification ? 'inherit' : '#888',
          fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>{submittedClarification || 'Add clarification on why report is rejected/flagged'}</p>
        <button className="status-btn" style={{ width: '100%', height: '38px', marginTop: '5px' }} onClick={startEditing}>
          {submittedClarification ? '✏️ Edit' : 'Add Clarification'}
        </button>
      </>
    )}
  </div>
)}
                </div>
              </div>
            ) : (
        <>
          <div className="filter-bar fade-in-delayed">
            <div className="icon-field">
              <FaSearch className="input-icon" />
              <input
                type="text"
                placeholder="Search by position, student, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="icon-field">
              <FaFilter className="input-icon" />
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">Status</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Flagged">Flagged</option>
              </select>
            </div>
            <div className="icon-field">
              <FaFilter className="input-icon" />
              <select value={filterMajor} onChange={(e) => setFilterMajor(e.target.value)}>
                <option value="">All Majors</option>
                <option value="CS">CS</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>
          <div className="internship-table-container animated fadeInUp">
            <table className="internship-table">
              <thead>
                <tr>
                  <th>Intern Name</th>
                  <th>Position</th>
                  <th>Company</th>
                  <th>Submission Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filterAndSortReports(internshipReports).map((report, idx) => (
                  <tr key={idx} className="pop-in delay-0" onClick={() => setSelectedReport(report)} style={{ cursor: 'pointer' }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={report.photo}
                          alt={report.student}
                          style={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '1px solid #ccc'
                          }}
                        />
                        {report.student}
                      </div>
                    </td>
                    <td>{report.title}</td>
                    <td>{report.company}</td>
                    <td>{report.date}</td>
                    <td><span className={`status-tag ${report.status.toLowerCase()}`}>{report.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
 case 'evaluations':
  return (
    <div className="internship-section animated fadeInUp">
      <section className="hero-banner animated fadeSlideUp">
        <h2>Evaluations</h2>
        
      </section>
      {selectedEvaluation ? (
        <div className="internship-details-container fadeIn">
          <button onClick={() => setSelectedEvaluation(null)} className="back-btn">← Back to Evaluations</button>
          <div className="details-card-grid">
            <div className="details-box" style={{ animation: 'fadeInUpSubmitter 0.6s cubic-bezier(0.23, 1, 0.32, 1)', position: 'relative' }}>
              <div className="details-header">
                <img src={selectedEvaluation.photo} alt={selectedEvaluation.student} />
                <div>
                  <h3 style={{ color: '#0a3d62', margin: '0 0 8px 0', fontSize: '1.5em', fontWeight: 'bold' }}>{selectedEvaluation.student}</h3>
                  <p style={{ color: '#0a3d62', margin: '0 0 8px 0', fontSize: '1.2em', fontWeight: 'bold' }}>{selectedEvaluation.title}</p>
                  <p style={{ color: '#0a3d62', margin: '0 0 8px 0', fontSize: '1.1em' }}>{selectedEvaluation.company}</p>
                  <p style={{ color: '#000', margin: '0', fontSize: '1em' }}>
                    <span style={{ marginRight: '15px' }}><b>Major:</b> {selectedEvaluation.major}</span>
                    <span><b>Cycle:</b> {selectedEvaluation.cycle}</span>
                  </p>
                </div>
              </div>
              <span style={{ position: 'absolute', top: '18px', right: '24px', color: '#0a3d62', fontWeight: 500, fontSize: '1em', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaRegCalendarAlt style={{ fontSize: '1.1em', marginRight: '3px' }} />
                {selectedEvaluation.date}
              </span>
            </div>
            <div className="details-box" style={{ animation: 'slideInRight 0.5s ease-out 0.25s' }}>
              <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Evaluation Preview</h3>
              <div style={{ minHeight: '80px', color: '#222', fontSize: '15px', marginBottom: '18px', fontFamily: 'Georgia, Times, "Times New Roman", serif', lineHeight: '1.7', background: '#fff', border: '1.5px solid #b0b0b0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '28px 24px', position: 'relative' }}>
                <h2 style={{ color: '#0a3d62', margin: '0 0 10px 0', fontSize: '1.4em' }}>{selectedEvaluation.title} Evaluation</h2>
                <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>
                  Student: <span style={{ color: '#111' }}>{selectedEvaluation.student}</span>   |   Company: <span style={{ color: '#111' }}>{selectedEvaluation.company}</span>
                </p>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '0.98em' }}>
                  <span style={{ marginRight: '18px' }}><b>Major:</b> <span style={{ color: '#111' }}>{selectedEvaluation.major}</span></span>
                  <span><b>Cycle:</b> <span style={{ color: '#111' }}>{selectedEvaluation.cycle}</span></span>
                </div>
                <h3 style={{ color: '#3c6382', margin: '18px 0 6px 0', fontSize: '1.1em' }}>Supervisor</h3>
                <p>{selectedEvaluation.supervisor}</p>
                <h3 style={{ color: '#3c6382', margin: '18px 0 6px 0', fontSize: '1.1em' }}>Period</h3>
                <p>From <b style={{ color: '#111' }}>{selectedEvaluation.startDate}</b> to <b style={{ color: '#111' }}>{selectedEvaluation.endDate}</b></p>
                <h3 style={{ color: '#3c6382', margin: '18px 0 6px 0', fontSize: '1.1em' }}>Rating</h3>
                <p>{'★'.repeat(selectedEvaluation.rating)}{'☆'.repeat(5 - selectedEvaluation.rating)} ({selectedEvaluation.rating}/5)</p>
                <h3 style={{ color: '#3c6382', margin: '18px 0 6px 0', fontSize: '1.1em' }}>Strengths</h3>
                <ul style={{ margin: '0 0 8px 18px' }}>
                  {selectedEvaluation.strengths.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
                <h3 style={{ color: '#3c6382', margin: '18px 0 6px 0', fontSize: '1.1em' }}>Weaknesses</h3>
                <ul style={{ margin: '0 0 8px 18px' }}>
                  {selectedEvaluation.weaknesses.map((weakness, idx) => (
                    <li key={idx}>{weakness}</li>
                  ))}
                </ul>
                <h3 style={{ color: '#3c6382', margin: '18px 0 6px 0', fontSize: '1.1em' }}>Comments</h3>
                <p>{selectedEvaluation.comments}</p>
              </div>
              <button className="status-btn" style={{ width: '100%', height: '38px', marginTop: '5px' }} onClick={() => downloadEvaluationPDF(selectedEvaluation)}>
                <FaDownload /> Download Evaluation as PDF
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="filter-bar fade-in-delayed">
            <div className="icon-field">
              <FaSearch className="input-icon" />
              <input
                type="text"
                placeholder="Search by student, company, or title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="icon-field">
              <FaFilter className="input-icon" />
              <select value={filterMajor} onChange={(e) => setFilterMajor(e.target.value)}>
                <option value="">All Majors</option>
                <option value="CS">CS</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>
          <div className="internship-table-container animated fadeInUp">
            <table className="internship-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Submission Date</th>
                </tr>
              </thead>
              <tbody>
                {filterAndSortEvaluations(evaluations).map((evaluation, idx) => (
                  <tr key={idx} className="pop-in delay-0" onClick={() => setSelectedEvaluation(evaluation)} style={{ cursor: 'pointer' }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={evaluation.photo}
                          alt={evaluation.student}
                          style={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '1px solid #ccc'
                          }}
                        />
                        {evaluation.student}
                      </div>
                    </td>
                    <td>{evaluation.title}</td>
                    <td>{evaluation.company}</td>
                    <td>{evaluation.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
      case 'statistics':
        return (
          <div className="internship-section animated fadeInUp">
            <section className="hero-banner animated fadeSlideUp">
              <h2>Statistics</h2>
              
            </section>
            <button className="status-btn" onClick={downloadStatisticsPDF}>📄 Generate Statistics Report</button>
            <div className="statistics-grid">
              <div className="statistics-tile fade-in delay-1">
                <h3>Reports Status per Cycle</h3>
                <div className="chart-box">
                  <Bar
                    data={{
                      labels: ['Cycle 1', 'Cycle 2', 'Cycle 3'],
                      datasets: [
                        { label: 'Accepted', data: [10, 8, 12], backgroundColor: '#38ada9' },
                        { label: 'Rejected', data: [3, 4, 2], backgroundColor: '#e55039' },
                        { label: 'Flagged', data: [2, 1, 3], backgroundColor: '#f6b93b' }
                      ]
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                    style={{ height: '400px', maxWidth: '600px', margin: '0 auto' }}
                  />
                </div>
              </div>
              <div className="statistics-tile fade-in delay-2">
                <h3>Average Review Time (Days)</h3>
                <div className="chart-box">
                  <Bar
                    data={{
                      labels: ['Cycle 1', 'Cycle 2', 'Cycle 3'],
                      datasets: [{
                        label: 'Avg Time',
                        data: [3.2, 4.1, 3.5],
                        backgroundColor: '#3c6382'
                      }]
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                  />
                </div>
              </div>
              <div className="double-pie-row">
                <div className="statistics-tile fade-in delay-3">
                  <h3>Most Used Courses in Internships</h3>
                  <Pie
                    data={{
                      labels: ['Web Dev', 'AI', 'Data Science', 'Mobile Apps', 'UI/UX'],
                      datasets: [{
                        label: 'Course Usage',
                        data: [30, 25, 20, 10, 5],
                        backgroundColor: ['#60a3d9', '#38ada9', '#f6b93b', '#e55039', '#1e3799']
                      }]
                    }}
                    options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
                  />
                </div>
                <div className="statistics-tile fade-in delay-4">
                  <h3>Top Companies by Internship Count</h3>
                  <Pie
                    data={{
                      labels: ['InstaBug', 'Breadfast', 'Valeo'],
                      datasets: [{
                        label: 'Internship Count',
                        data: [15, 10, 8],
                        backgroundColor: ['#60a3d9', '#38ada9', '#f6b93b']
                      }]
                    }}
                    options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
                  />
                </div>
              </div>
              <div className="statistics-tile fade-in delay-5">
                <h3>Top Rated Companies (Student Evaluations)</h3>
                <div className="chart-box">
                  <Bar
                    data={{
                      labels: ['InstaBug', 'Breadfast', 'Valeo'],
                      datasets: [{
                        label: 'Avg Rating',
                        data: [4.5, 4.0, 3.8],
                        backgroundColor: '#38ada9'
                      }]
                    }}
                    options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <h2 className="animated fadeIn">Loading...</h2>;
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo">
          <img src="/images/guc-logo.png" alt="GUC Logo" className="logo-img" />
          <div className="logo-text">
            <span className="tagline"></span>
          </div>
        </div>
        <ul>
          <li className={activeSection === 'dashboard' ? 'active' : ''} onClick={() => setActiveSection('dashboard')}><FaTh /> Dashboard</li>
          <li className={activeSection === 'reports' ? 'active' : ''} onClick={() => setActiveSection('reports')}><FaFileAlt /> Internship Reports</li>
          <li className={activeSection === 'evaluations' ? 'active' : ''} onClick={() => setActiveSection('evaluations')}><FaClipboardList /> Evaluations</li>
          <li className={activeSection === 'statistics' ? 'active' : ''} onClick={() => setActiveSection('statistics')}><FaChartBar /> Statistics</li>
        </ul>
        <div className="sidebar-footer">
          <img src="/images/man1.png" alt="User" className="sidebar-footer-img" />
          <div className="sidebar-footer-info">
            <p className="sidebar-footer-name">Dr. Ahmed Salem</p>
            <p className="sidebar-footer-role">Faculty Member</p>
            <div className="sidebar-logout" onClick={handleLogout}>
              <FiLogOut className="logout-icon" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </aside>
      <main className="main-content">
       
   {statusMessage && (
  <div className="feedback-message">
    {statusMessage}
  </div>
)}
        <section className="content-area">{renderContent()}</section>
      </main>
    </div>
  );
}

export default FacultyMemberDashboard;

<style>
  {`
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `}
</style>