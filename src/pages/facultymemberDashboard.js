import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaTh, FaSearch, FaFileAlt, FaChartBar, FaBell, FaFilter, FaSortAmountDown, FaClipboardList
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
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();


  const handleLogout = () => {
    navigate('/SignIn');
  };

  const internshipReports = [
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
      reviewTime: 3 // days
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
      photo: '/images/user.png',
      company: 'Valeo',
      major: 'Finance',
      status: 'Rejected',
      date: '2025-03-15',
      document: 'report3.pdf',
      cycle: 'Cycle 3',
      reviewTime: 2
    }
  ];

  const evaluations = [
    {
      id: 1,
      student: 'John Doe',
      company: 'InstaBug',
      title: 'Frontend Developer Intern',
      supervisor: 'Jane Smith',
      startDate: '2025-01-01',
      endDate: '2025-04-01',
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
      company: 'Breadfast',
      title: 'Marketing Intern',
      supervisor: 'Mark Johnson',
      startDate: '2025-02-01',
      endDate: '2025-04-01',
      rating: 3,
      strengths: ['Creativity', 'Communication'],
      weaknesses: ['Analytical Skills'],
      comments: 'Creative ideas but needs to work on data analysis.',
      recommendation: 'No',
      major: 'Marketing',
      cycle: 'Cycle 2'
    }
  ];

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
    // Simulate PDF generation (in a real app, this would involve a backend service)
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
    setStatusMessage(`✔️ PDF for ${report.title} generated.`);
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
    setStatusMessage(`✔️ PDF for ${evaluation.student}'s evaluation generated.`);
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

  const submitClarification = (reportId) => {
    if (!clarification) {
      setStatusMessage('⚠️ Please provide a clarification.');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }
    setStatusMessage(`✔️ Clarification for report ${reportId} submitted.`);
    setClarification('');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const updateReportStatus = (newStatus) => {
    if (selectedReport) {
      setSelectedReport({ ...selectedReport, status: newStatus });
      setStatusMessage(`✔️ Report status updated to ${newStatus}.`);
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return '#38ada9';
      case 'Rejected': return '#e55039';
      case 'Flagged': return '#f6b93b';
      case 'Pending': return '#ccc';
      default: return '#ccc';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-overview">
            <h2 className="animated-title">Faculty Dashboard</h2>
            <p className="dashboard-subtext">Monitor and manage internship reports and evaluations.</p>
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
            <div className="dashboard-charts">
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
            {selectedReport ? (
              <div className="internship-details-container fadeIn">
                <button onClick={() => setSelectedReport(null)} className="back-btn">← Back to Reports</button>
                <div className="details-card-grid">
                  {/* 📸 Box 1: Student Profile */}
                  <div className="details-box">
                    <div className="details-header">
                      <img src={selectedReport.photo} alt={selectedReport.student} />
                      <div>
                        <h3>{selectedReport.student}</h3>
                        <p>{selectedReport.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* 📂 Box 2: Report Content */}
                  <div className="details-box">
                    <h3>Intern Details & Submissions</h3>
                    <p><strong>Company:</strong> {selectedReport.company}</p>
                    <p><strong>Major:</strong> {selectedReport.major}</p>
                    <p><strong>Submitted On:</strong> {selectedReport.date}</p>
                    <p><strong>Cycle:</strong> {selectedReport.cycle}</p>
                    <p><strong>Document:</strong> <a href={selectedReport.document} target="_blank" rel="noreferrer">{selectedReport.document}</a></p>
                    <button className="status-btn" onClick={() => downloadReportPDF(selectedReport)}>📄 Download PDF</button>
                  </div>

                  {/* 🛠 Box 3: Status Control */}
                  <div className="details-box">
                    <h3>Update Report Status</h3>
                    <div className="status-buttons">
                      {['Accepted', 'Rejected', 'Flagged'].map((option) => (
                        <button
                          key={option}
                          className={`status-btn-outline ${option.toLowerCase()} ${selectedReport.status === option ? 'active' : ''}`} onClick={() => updateReportStatus(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                  </div>

                  {/* 📝 Box 4: Clarification (only for rejected/flagged) */}
                  {(selectedReport.status === 'Rejected' || selectedReport.status === 'Flagged') && (
                    <div className="details-box">
                      <h3>Submit Clarification</h3>
                      <textarea
                        className="evaluation-textarea"
                        value={clarification}
                        onChange={(e) => setClarification(e.target.value)}
                        placeholder="Explain why this report was flagged or rejected..."
                      />
                      <button className="status-btn" onClick={() => submitClarification(selectedReport.id)}>Submit Clarification</button>
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
                    <select value={filterMajor} onChange={(e) => setFilterMajor(e.target.value)}>
                      {/* <option value="">All Majors</option> */}
                      <option value="CS">CS</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                    </select>
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
                    <FaSortAmountDown className="input-icon" />
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
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
            {selectedEvaluation ? (
              <div className="internship-details-container fadeIn">
                <button onClick={() => setSelectedEvaluation(null)} className="back-btn">← Back to Evaluations</button>
                <div className="details-card">
                  <div className="details-header">
                    <h2>Evaluation for {selectedEvaluation.student}</h2>
                  </div>
                  <p><strong>Company:</strong> {selectedEvaluation.company}</p>
                  <p><strong>Title:</strong> {selectedEvaluation.title}</p>
                  <p><strong>Supervisor:</strong> {selectedEvaluation.supervisor}</p>
                  <p><strong>Start Date:</strong> {selectedEvaluation.startDate}</p>
                  <p><strong>End Date:</strong> {selectedEvaluation.endDate}</p>
                  <p><strong>Rating:</strong> {'★'.repeat(selectedEvaluation.rating)}{'☆'.repeat(5 - selectedEvaluation.rating)}</p>
                  <p><strong>Strengths:</strong> {selectedEvaluation.strengths.join(', ')}</p>
                  <p><strong>Weaknesses:</strong> {selectedEvaluation.weaknesses.join(', ')}</p>
                  <p><strong>Comments:</strong> {selectedEvaluation.comments}</p>
                  <p><strong>Recommendation:</strong> {selectedEvaluation.recommendation}</p>
                  <p><strong>Major:</strong> {selectedEvaluation.major}</p>
                  <p><strong>Cycle:</strong> {selectedEvaluation.cycle}</p>
                  <button className="status-btn" onClick={() => downloadEvaluationPDF(selectedEvaluation)}>📄 Download PDF</button>
                </div>
              </div>
            ) : (
              <>
                <div className="filter-bar fade-in-delayed">
                  <div className="icon-field">
                    <FaSearch className="input-icon" />
                    <input
                      type="text"
                      placeholder="Search by student or company"
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
                        <th>Company</th>
                        <th>Title</th>
                        <th>Major</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {evaluations
                        .filter(e =>
                          (e.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            e.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
                          (!filterMajor || e.major === filterMajor)
                        )
                        .map((evaluation, idx) => (
                          <tr key={idx} className="pop-in delay-0" onClick={() => setSelectedEvaluation(evaluation)} style={{ cursor: 'pointer' }}>
                            <td>{evaluation.student}</td>
                            <td>{evaluation.company}</td>
                            <td>{evaluation.title}</td>
                            <td>{evaluation.major}</td>
                            <td>{'★'.repeat(evaluation.rating)}{'☆'.repeat(5 - evaluation.rating)}</td>
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
            <h2 className="animated-title">Internship Statistics</h2>
            <p className="dashboard-subtext">Insights into internship reports, review activity, and company rankings.</p>

            <button className="status-btn" onClick={downloadStatisticsPDF}>📄 Generate Statistics Report</button>

            <div className="statistics-grid">
              {/* Chart 1 */}
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

              {/* Chart 2 */}
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

              {/* Row of 2 Pie Charts */}
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

              {/* Chart 5 */}
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
        <div className="floating-notif">
          <FaBell className="wiggle-bell" />
        </div>
        <section className="hero-banner animated fadeSlideUp">
          <h2>Welcome back, Dr. Salem 👋</h2>
          <p className="subtext">
            Today is {new Date().toLocaleString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </section>
        {statusMessage && (
          <div className="fade-out-message" style={{
            background: '#38ada9',
            padding: '10px 20px',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '15px',
            fontWeight: 'bold',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'opacity 0.6s ease'
          }}>
            {statusMessage}
          </div>
        )}
        <section className="content-area">{renderContent()}</section>
      </main>
    </div>
  );
}

export default FacultyMemberDashboard;