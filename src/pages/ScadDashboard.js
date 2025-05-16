import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaTh, FaSearch, FaFileAlt, FaComments, FaChartBar, FaNewspaper, FaBell,
  FaFilter, FaSortAmountDown, FaUsers, FaClipboardList, FaBriefcase, FaEdit, FaTrash, 
  FaArrowLeft, FaArrowRight, FaSave, FaPen, FaCheck, FaDownload, FaPlus, FaClock, 
  FaMoneyBill, FaLinkedin, FaTwitter, FaGlobe, FaTimes, FaHome, FaBuilding, FaCog, FaSignOutAlt, 
  FaEnvelope, FaPhone, FaUserGraduate, FaRegCalendarAlt, FaCalendarCheck
} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import './ScadDashboard.css';
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

// Register ChartJS components only for this dashboard
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function ScadDashboard() {
  const [activeSection, setActiveSection] = useState('internships');
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [showFilter, setShowFilter] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [filterDuration, setFilterDuration] = useState('');
  const [filterCompensation, setFilterCompensation] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [clarification, setClarification] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [submittedClarification, setSubmittedClarification] = useState('');
  const [isClarificationVisible, setIsClarificationVisible] = useState(false);
  const [clarificationError, setClarificationError] = useState('');
  const [clarificationMessage, setClarificationMessage] = useState('');
  const clarificationRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Bosta',
      logo: '/images/bosta.png',
      industry: 'Logistics',
      location: 'Cairo, Egypt',
      applicationDate: '2024-03-15',
      status: 'Pending Review',
      description: 'Leading logistics company in Egypt',
      website: 'www.bosta.com',
      contactEmail: 'contact@bosta.com',
      contactPhone: '+20 123 456 7890'
    },
    {
      id: 2,
      name: 'Tech Solutions',
      logo: '/images/Tech Solutions.jpg',
      industry: 'Technology',
      location: 'Alexandria, Egypt',
      applicationDate: '2024-03-14',
      status: 'Accepted',
      description: 'Innovative technology solutions provider',
      website: 'www.techsolutions.com',
      contactEmail: 'info@techsolutions.com',
      contactPhone: '+20 234 567 8901'
    },
    {
      id: 3,
      name: 'Nile Bank',
      logo: '/images/Nile Bank.jpg',
      industry: 'Banking',
      location: 'Giza, Egypt',
      applicationDate: '2024-03-13',
      status: 'Rejected',
      description: 'Leading financial institution in Egypt',
      website: 'www.nilebank.com',
      contactEmail: 'careers@nilebank.com',
      contactPhone: '+20 345 678 9012'
    }
  ]);

  // Add new state for internship reports
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
      photo: '/images/user.png',
      company: 'Valeo',
      major: 'Finance',
      status: 'Rejected',
      date: '2025-03-15',
      document: 'report3.pdf',
      cycle: 'Cycle 3',
      reviewTime: 2
    }
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [reportSearchTerm, setReportSearchTerm] = useState('');
  const [reportCompanySearch, setReportCompanySearch] = useState('');
  const [reportTitleSearch, setReportTitleSearch] = useState('');
  const [reportMajorSearch, setReportMajorSearch] = useState('');
  const [reportFilterStatus, setReportFilterStatus] = useState('');
  const [reportSortOrder, setReportSortOrder] = useState('newest');
  const [reportStatusSearch, setReportStatusSearch] = useState('');

  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    } else {
      setActiveSection('dashboard');
    }
  }, [location.state]);

  // Internship Postings state
  const [allInternships, setAllInternships] = useState([
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'InstaBug',
      logo: '/images/instabug.png',
      status: 'Active',
      industry: 'Tech',
      duration: '3 months',
      compensation: 'Paid',
      salary: '$800/month',
      skills: ['React', 'JavaScript', 'CSS', 'Git'],
      description: 'We are looking for a passionate Frontend Developer Intern to join our team. You will work closely with our development team to create user-friendly web applications. The ideal candidate should have a strong understanding of JavaScript, React, and CSS. Knowledge of Git is a plus.',
      social: {
        linkedin: 'https://linkedin.com/company/instabug',
        twitter: 'https://twitter.com/instabug',
        website: 'https://instabug.com'
      },
      postedDate: '2024-03-15'
    },
    {
      id: 2,
      title: 'Marketing Intern',
      company: 'Breadfast',
      logo: '/images/breadfast.png',
      status: 'Active',
      industry: 'Marketing',
      duration: '2 months',
      compensation: 'Unpaid',
      skills: ['SEO', 'Content Creation', 'Google Analytics', 'Email Marketing', 'Social Media Management', 'Copywriting', 'Paid Advertising', 'CRM Tools', 'Market Research', 'Brand Strategy'],
      description: 'Join our marketing team as a Marketing Intern. You will assist in creating and implementing marketing strategies, managing social media accounts, and analyzing market trends. The ideal candidate should have strong communication skills and a passion for marketing.',
      social: {
        linkedin: 'https://www.linkedin.com/company/breadfast',
        twitter: 'https://twitter.com/breadfast',
        website: 'https://www.breadfast.com'
      },
      postedDate: '2024-03-10'
    },
    {
      id: 3,
      title: 'Finance Analyst Intern',
      company: 'Valeo',
      logo: '/images/valeo.png',
      status: 'Active',
      industry: 'Finance',
      duration: '4 months',
      compensation: 'Paid',
      salary: '$1000/month',
      skills: ['Excel', 'Financial Analysis', 'Accounting', 'Data Visualization'],
      description: 'Join our finance team as a Finance Analyst Intern. You will assist in financial analysis, budgeting, and forecasting. The ideal candidate should have strong analytical skills and proficiency in Excel. Knowledge of financial modeling is a plus.',
      social: {
        linkedin: 'https://www.linkedin.com/company/valeo',
        twitter: 'https://twitter.com/valeo',
        website: 'https://www.valeo.com'
      },
      postedDate: '2024-03-05'
    }
  ]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const downloadStatisticsPDF = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = '/reports/statistics.pdf';
    link.download = 'statistics_report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setStatusMessage('✔️ Statistics report generated successfully.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // Define status colors for buttons
  const getCompanyStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "#4caf50"; // Green
      case "Rejected":
        return "#e55039"; // Red
      default:
        return "#ccc"; // Default Gray
    }
  };

  // Handle company status update
  const handleCompanyStatusUpdate = (companyId, newStatus) => {
    setCompanies(prevCompanies => 
      prevCompanies.map(company => 
        company.id === companyId 
          ? { ...company, status: newStatus }
          : company
      )
    );
  };

  const handleViewDetails = (companyId) => {
    setSelectedCompanyId(companyId);
  };

  const handleCloseDetails = () => {
    setSelectedCompanyId(null);
  };

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing',
    'Logistics',
    'Banking'
  ];

  const filterAndSort = (internships) => {
    return internships
      .filter(internship => {
        const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            internship.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesIndustry = !filterIndustry || internship.industry === filterIndustry;
        const matchesDuration = !filterDuration || internship.duration === filterDuration;
        const matchesCompensation = !filterCompensation || internship.compensation === filterCompensation;
        
        return matchesSearch && matchesIndustry && matchesDuration && matchesCompensation;
      })
      .sort((a, b) => {
        if (sortOrder === 'newest') {
          return new Date(b.postedDate) - new Date(a.postedDate);
        } else {
          return new Date(a.postedDate) - new Date(b.postedDate);
        }
      });
  };

  const handleInternshipClick = (internship) => {
    navigate('/internship-details', { state: { internship } });
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseStudentDetails = () => {
    setSelectedStudent(null);
  };

  // Add filter and sort function for reports
  const filterAndSortReports = (list) => {
    return list
      .filter(r => {
        const generalSearch = reportSearchTerm.toLowerCase();
        const statusSearch = reportStatusSearch;
        const majorSearch = reportMajorSearch;

        const matchesGeneral = !generalSearch || 
          r.student.toLowerCase().includes(generalSearch) ||
          r.company.toLowerCase().includes(generalSearch) ||
          r.title.toLowerCase().includes(generalSearch);

        const matchesStatus = !statusSearch || 
          r.status === statusSearch;

        const matchesMajor = !majorSearch || 
          r.major === majorSearch;

        return matchesGeneral && matchesStatus && matchesMajor;
      })
      .sort((a, b) => reportSortOrder === 'newest'
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
    }, 3000);
  };

  const startEditing = () => {
    setClarification(submittedClarification);
    setIsEditing(true);
  };

  // Update the existing updateReportStatus function
  const updateReportStatus = (newStatus) => {
    if (selectedReport) {
      setInternshipReports(prevReports =>
        prevReports.map(report =>
          report.id === selectedReport.id
            ? { ...report, status: newStatus }
            : report
        )
      );

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

  // Add get status color function
  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return '#38ada9';
      case 'Rejected':
        return '#e55039';
      case 'Flagged':
        return '#f6b93b';
      case 'Pending':
        return '#ccc';
      default:
        return '#ccc';
    }
  };

  const handleDownload = (report) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = `/reports/${report.document}`;
    link.download = report.document; // This will force download instead of navigation
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setStatusMessage(`✔️ PDF for ${report.title} generated.`);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-overview">
            <div className="stats-grid">
              <div className="stat-card fade-in">
                <h3>Total Companies</h3>
                <p className="stat-number">24</p>
              </div>
              <div className="stat-card fade-in delay-1">
                <h3>Active Internships</h3>
                <p className="stat-number">48</p>
              </div>
              <div className="stat-card fade-in delay-2">
                <h3>Total Students</h3>
                <p className="stat-number">156</p>
              </div>
            </div>
            <div className="dashboard-charts">
              <div className="chart-section">
                <h4>Internship Distribution</h4>
                <Bar
                  data={{
                    labels: ['IT', 'Engineering', 'Business', 'Design', 'Marketing'],
                    datasets: [
                      { label: 'Active', data: [15, 12, 8, 6, 7], backgroundColor: '#38ada9' },
                      { label: 'Completed', data: [8, 6, 4, 3, 5], backgroundColor: '#e55039' }
                    ]
                  }}
                  options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
                />
              </div>
              <div className="chart-section">
                <h4>Student Distribution</h4>
                <Pie
                  data={{
                    labels: ['CS', 'Engineering', 'Business', 'Design', 'Other'],
                    datasets: [{
                      label: 'Student Distribution',
                      data: [45, 30, 15, 5, 5],
                      backgroundColor: ['#60a3d9', '#38ada9', '#f6b93b', '#e55039', '#1e3799']
                    }]
                  }}
                  options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
                />
              </div>
            </div>
          </div>
        );
      case 'companies':
        return (
          <div className="internship-section animated fadeInUp">
            {!selectedCompanyId ? (
              <>
                <div className="filter-tabs">
                  <button 
                    className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                  >
                    All Companies
                  </button>
                  <button 
                    className={`filter-tab ${activeTab === 'applying' ? 'active' : ''}`}
                    onClick={() => setActiveTab('applying')}
                  >
                    Applying Companies
                  </button>
                </div>

                <div className="filter-bar fade-in-delayed">
                  <div className="icon-field">
                    <FaSearch className="input-icon" style={{ color: '#0a3d62' }} />
                  <input 
                    type="text" 
                      placeholder="Search by company name or industry"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                  <div className="icon-field">
                    <FaFilter className="input-icon" style={{ color: '#0a3d62' }} />
                        <select 
                          value={selectedIndustry}
                          onChange={(e) => setSelectedIndustry(e.target.value)}
                        >
                          <option value="all">All Industries</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry.toLowerCase()}>{industry}</option>
                      ))}
                        </select>
                      </div>

                  <div className="icon-field">
                    <FaSortAmountDown className="input-icon" style={{ color: '#0a3d62' }} />
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
                    <th>Company Name</th>
                    <th>Industry</th>
                    <th>Location</th>
                    <th>Application Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                      {companies
                        .filter(company => {
                          const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                              company.industry.toLowerCase().includes(searchQuery.toLowerCase());
                          const matchesIndustry = selectedIndustry === 'all' || 
                                                company.industry.toLowerCase() === selectedIndustry.toLowerCase();
                          const matchesTab = activeTab === 'all' || 
                                           (activeTab === 'applying' && company.status === 'Pending Review');
                          return matchesSearch && matchesIndustry && matchesTab;
                        })
                        .sort((a, b) => {
                          if (sortOrder === 'newest') {
                            return new Date(b.applicationDate) - new Date(a.applicationDate);
                          } else {
                            return new Date(a.applicationDate) - new Date(b.applicationDate);
                          }
                        })
                        .map(company => (
                          <tr key={company.id} className="pop-in delay-0" onClick={() => handleViewDetails(company.id)} style={{ cursor: 'pointer' }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img 
                                  src={company.logo} 
                                  alt="logo" 
                                  style={{ 
                                    width: '30px', 
                                    height: '30px', 
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    padding: '0',
                                    backgroundColor: 'transparent'
                                  }} 
                                />
                                {company.name}
                      </div>
                    </td>
                            <td>{company.industry}</td>
                            <td>{company.location}</td>
                            <td>{company.applicationDate}</td>
                            <td>
                              <span className={`status-tag ${company.status.toLowerCase().replace(' ', '-')}`}>
                                {company.status}
                              </span>
                    </td>
                  </tr>
                        ))}
                </tbody>
              </table>
            </div>
              </>
            ) : (
              (() => {
                const selectedCompany = companies.find(c => c.id === selectedCompanyId);
                if (!selectedCompany) return null;
                return (
                  <div className="details-container">
                    <button className="back-btn" onClick={() => setSelectedCompanyId(null)}>
                      ← Back to Companies
                    </button>

                    <div className="details-card">
                      <div className="details-header">
                        <img 
                          src={selectedCompany.logo} 
                          alt={selectedCompany.name} 
                          className="company-logo"
                          style={{ 
                            width: '80px', 
                            height: '80px', 
                            borderRadius: '50%',
                            objectFit: 'cover',
                            padding: '0',
                            backgroundColor: 'transparent'
                          }} 
                        />
                        <div className="company-info">
                          <h3>{selectedCompany.name}</h3>
                          <p className="industry">{selectedCompany.industry}</p>
                          <span className={`status-tag ${selectedCompany.status.toLowerCase().replace(' ', '-')}`}>
                            {selectedCompany.status}
                          </span>
                        </div>
                      </div>

                      <div className="details-body">
                        <div className="details-section">
                          <h4>Company Information</h4>
                          <div className="info-grid">
                            <div className="info-item">
                              <label>Location</label>
                              <p>{selectedCompany.location}</p>
                            </div>
                            <div className="info-item">
                              <label>Application Date</label>
                              <p>{selectedCompany.applicationDate}</p>
                            </div>
                            <div className="info-item">
                              <label>Website</label>
                              <p>
                                <a href={`https://${selectedCompany.website}`} target="_blank" rel="noopener noreferrer">
                                  <FaGlobe /> {selectedCompany.website}
                                </a>
                              </p>
                            </div>
                            <div className="info-item">
                              <label>Contact Email</label>
                              <p>
                                <a href={`mailto:${selectedCompany.contactEmail}`}>
                                  <FaEnvelope /> {selectedCompany.contactEmail}
                                </a>
                              </p>
                            </div>
                            <div className="info-item">
                              <label>Contact Phone</label>
                              <p>
                                <a href={`tel:${selectedCompany.contactPhone}`}>
                                  <FaPhone /> {selectedCompany.contactPhone}
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="details-section">
                          <h4>Description</h4>
                          <p>{selectedCompany.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Update Application Status placed under the company info card */}
                    <div className="details-box" style={{ animation: 'slideInRight 0.5s ease-out 0.2s', marginTop: '30px' }}>
                      <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Update Application Status</h3>
                      <div className="status-buttons">
                        {['Accepted', 'Rejected'].map((option) => (
                          <button
                            key={option}
                            className={`status-btn-outline ${option.toLowerCase()} ${selectedCompany.status === option ? 'active' : ''}`}
                            onClick={() => handleCompanyStatusUpdate(selectedCompany.id, option)}
                            style={{ height: '36px' }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        );

      case 'internship-postings':
        return (
          <div className="internship-section animated fadeInUp">
            <div className="filter-bar fade-in-delayed">
              <div className="icon-field">
                <FaSearch className="input-icon" style={{ color: '#0a3d62' }} />
                <input
                  type="text"
                  placeholder="Search by job title or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>

              <div className="icon-field">
                <FaFilter className="input-icon" style={{ color: '#0a3d62' }} />
                <select 
                  value={filterIndustry} 
                  onChange={(e) => setFilterIndustry(e.target.value)}
                >
                  <option value="">All Industries</option>
                  {[...new Set(allInternships.map(i => i.industry))].map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div className="icon-field">
                <FaClock className="input-icon" style={{ color: '#0a3d62' }} />
                <select 
                  value={filterDuration} 
                  onChange={(e) => setFilterDuration(e.target.value)}
                >
                  <option value="">All Durations</option>
                  {[...new Set(allInternships.map(i => i.duration))].map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
            </div>

              <div className="icon-field">
                <FaMoneyBill className="input-icon" style={{ color: '#0a3d62' }} />
                <select 
                  value={filterCompensation} 
                  onChange={(e) => setFilterCompensation(e.target.value)}
                >
                  <option value="">All Compensation</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>

              <div className="icon-field">
                <FaSortAmountDown className="input-icon" style={{ color: '#0a3d62' }} />
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
                    {activeTab === 'all' ? (
                      <>
                        <th>Company</th>
                        <th>Job Title</th>
                        <th>Industry</th>
                        <th>Compensation</th>
                        <th>Duration</th>
                        <th>Posted Date</th>
                      </>
                    ) : (
                      <>
                        <th>Job Title</th>
                        <th>Industry</th>
                        <th>Compensation</th>
                        <th>Applications</th>
                    <th>Status</th>
                        <th>Posted Date</th>
                        <th></th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filterAndSort(allInternships).map((item, idx) => (
                    <tr key={idx} className="pop-in delay-0" onClick={() => handleInternshipClick(item)} style={{ cursor: 'pointer' }}>
                      {activeTab === 'all' ? (
                        <>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img src={item.logo} alt="logo" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                              {item.company}
                      </div>
                    </td>
                          <td>{item.title}</td>
                          <td>{item.industry}</td>
                          <td>{item.compensation}</td>
                          <td>{item.duration}</td>
                          <td>{item.postedDate}</td>
                        </>
                      ) : (
                        <>
                          <td>{item.title}</td>
                          <td>{item.industry}</td>
                          <td>{item.compensation}</td>
                          <td>{item.applications || 0}</td>
                          <td>
                            <span className={`status-tag ${item.status.toLowerCase()}`}>
                              {item.status}
                            </span>
                    </td>
                          <td>{item.postedDate}</td>
                          <td>
                            <button className="action-button" title="Edit">
                              <FaEdit />
                            </button>
                            <button className="action-button" title="Delete">
                              <FaTrash />
                            </button>
                            <button className="action-button" title="View Applications">
                              <FaUsers />
                            </button>
                          </td>
                        </>
                      )}
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'students':
        return (
          <div className="internship-section animated fadeInUp">
            {!selectedStudent ? (
              <>
                <div className="filter-bar fade-in-delayed">
                  <div className="icon-field">
                    <FaSearch className="input-icon" style={{ color: '#0a3d62' }} />
                <input
                  type="text"
                      placeholder="Search by student name or major"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

                  <div className="icon-field">
                    <FaFilter className="input-icon" style={{ color: '#0a3d62' }} />
                <select
                  value={filterIndustry}
                  onChange={(e) => setFilterIndustry(e.target.value)}
                >
                      <option value="">All Majors</option>
                      {[...new Set(allInternships.map(i => i.industry))].map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                </select>
                  </div>

                  <div className="icon-field">
                    <FaSortAmountDown className="input-icon" style={{ color: '#0a3d62' }} />
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                </select>
                  </div>

                  <div className="icon-field">
                    <FaClipboardList className="input-icon" style={{ color: '#0a3d62' }} />
                <select
                      value={filterStatus} 
                      onChange={(e) => setFilterStatus(e.target.value)}
                >
                      <option value="">All Status</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="pending">Pending (Flagged)</option>
                </select>
                  </div>
                </div>

                <div className="internship-table-container animated fadeInUp">
                  <table className="internship-table">
                    <thead>
                      <tr>
                        <th>Student Name</th>
                        <th>Major</th>
                        <th>Current Internship</th>
                        <th>Status</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="pop-in delay-0" onClick={() => handleStudentClick({
                        name: 'Sara Emad',
                        image: '/images/woman.png',
                        major: 'Computer Science',
                        currentInternship: 'Bosta',
                        status: 'Active',
                        progress: '75%',
                        email: 'sara.emad@guc.edu.eg',
                        semester: 'Semester 5',
                        gpa: '3.8',
                        position: 'Frontend Developer Intern',
                        duration: '3 months',
                        skills: ['React', 'JavaScript', 'HTML/CSS', 'Git'],
                        about: 'Computer Science student with a passion for web development and machine learning. Currently interning at Bosta as a Frontend Developer, working on creating responsive and user-friendly web applications.',
                        joinDate: '2024-03-15'
                      })} style={{ cursor: 'pointer' }}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src="/images/woman.png" alt="student" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                            Sara Emad
                          </div>
                        </td>
                        <td>Computer Science</td>
                        <td>Bosta</td>
                        <td>
                          <span className="status-tag active">Active</span>
                        </td>
                        <td>75%</td>
                      </tr>
                      <tr className="pop-in delay-1" onClick={() => handleStudentClick({
                        name: 'Ahmed Hassan',
                        image: 'images/man2.png',
                        major: 'Engineering',
                        currentInternship: 'Valeo',
                        status: 'Pending (Flagged)',
                        progress: '45%',
                        email: 'ahmed.hassan@guc.edu.eg',
                        semester: 'Semester 6',
                        gpa: '3.5',
                        position: 'Engineering Intern',
                        duration: '4 months',
                        skills: ['AutoCAD', 'MATLAB', 'SolidWorks', 'Python'],
                        about: 'Engineering student specializing in mechanical systems. Currently interning at Valeo, working on automotive component design and testing.',
                        joinDate: '2024-03-10'
                      })} style={{ cursor: 'pointer' }}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src="/images/man2.png" alt="student" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                            Ahmed Hassan
                          </div>
                        </td>
                        <td>Engineering</td>
                        <td>Valeo</td>
                        <td>
                          <span className="status-tag pending">Pending (Flagged)</span>
                        </td>
                        <td>45%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="internship-details-container fadeIn">
                <button onClick={() => setSelectedStudent(null)} className="back-btn">← Back to Students</button>
                <div className="details-card-grid">
                  <div className="details-box" style={{ animation: 'fadeInUpSubmitter 0.6s cubic-bezier(0.23, 1, 0.32, 1)', position: 'relative' }}>
                    <div className="details-header">
                      <img src={selectedStudent.image} alt={selectedStudent.name} />
                      <div>
                        <h3 style={{ color: '#0a3d62', margin: '0 0 8px 0', fontSize: '1.5em', fontWeight: 'bold' }}>{selectedStudent.name}</h3>
                        <p style={{ color: '#0a3d62', margin: '0 0 8px 0', fontSize: '1.2em', fontWeight: 'bold' }}>{selectedStudent.position}</p>
                        <p style={{ color: '#0a3d62', margin: '0 0 8px 0', fontSize: '1.1em' }}>{selectedStudent.currentInternship}</p>
                        <p style={{ color: '#000', margin: '0', fontSize: '1em' }}>
                          <span style={{ marginRight: '15px' }}><b>Major:</b> {selectedStudent.major}</span>
                          <span><b>Semester:</b> {selectedStudent.semester}</span>
                        </p>
                      </div>
                    </div>
                    <span style={{ position: 'absolute', top: '18px', right: '24px', color: '#0a3d62', fontWeight: 500, fontSize: '1em', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FaRegCalendarAlt style={{ fontSize: '1.1em', marginRight: '3px' }} />
                      {selectedStudent.joinDate}
                    </span>
                  </div>

                  <div className="details-card">
                    <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Student Information</h3>
                    <div style={{ minHeight: '80px', color: '#222', fontSize: '15px', marginBottom: '18px', fontFamily: 'Georgia, Times, "Times New Roman", serif', lineHeight: '1.7', background: '#fff', border: '1.5px solid #b0b0b0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '28px 24px', position: 'relative' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '0.98em' }}>
                        <span style={{ marginRight: '18px' }}><b>Email:</b> <span style={{ color: '#111' }}>{selectedStudent.email}</span></span>
                        <span><b>GPA:</b> <span style={{ color: '#111' }}>{selectedStudent.gpa}</span></span>
                      </div>
                      <h3 style={{ color: '#3c6382', margin: '18px 0 6px 0', fontSize: '1.1em' }}>Current Internship</h3>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '0.98em' }}>
                        <span style={{ marginRight: '18px' }}><b>Position:</b> <span style={{ color: '#111' }}>{selectedStudent.position}</span></span>
                        <span><b>Duration:</b> <span style={{ color: '#111' }}>{selectedStudent.duration}</span></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '0.98em' }}>
                        <span style={{ marginRight: '18px' }}><b>Progress:</b> <span style={{ color: '#111' }}>{selectedStudent.progress}</span></span>
                        <span><b>Status:</b> <span style={{ color: '#111' }}>{selectedStudent.status}</span></span>
                      </div>
                      <h3 style={{ color: '#3c6382', margin: '18px 0 6px 0', fontSize: '1.1em' }}>Skills & Expertise</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                        {selectedStudent.skills.map((skill, index) => (
                          <span key={index} style={{ backgroundColor: '#e8f4f8', color: '#0a3d62', padding: '5px 12px', borderRadius: '15px', fontSize: '0.9rem' }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                      <h3 style={{ color: '#3c6382', margin: '18px 0 6px 0', fontSize: '1.1em' }}>About</h3>
                      <p style={{ color: '#666', lineHeight: '1.6' }}>{selectedStudent.about}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'reports':
        return (
          <div className="internship-section animated fadeInUp">
            {selectedReport ? (
              <div className="internship-details-container fadeIn">
                <button onClick={() => setSelectedReport(null)} className="back-btn">← Back to Internship Reports</button>
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

                  <div className="details-box" style={{ animation: 'slideInRight 0.5s ease-out 0.2s' }}>
                    <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Report Preview</h3>
                    <div style={{ 
                      minHeight: '80px', 
                      color: '#222', 
                      fontSize: '15px', 
                      marginBottom: '18px', 
                      fontFamily: 'Georgia, Times, "Times New Roman", serif', 
                      lineHeight: '1.7', 
                      background: '#fff', 
                      border: '1.5px solid #b0b0b0', 
                      borderRadius: '8px', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', 
                      padding: '28px 24px', 
                      position: 'relative' 
                    }}>
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
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                      <button 
                        className="status-btn"
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px',
                          backgroundColor: 'white',
                          color: '#0a3d62',
                          padding: '10px 20px',
                          border: '1px solid #0a3d62',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          width: '100%',
                          height: '38px',
                          marginTop: '5px',
                          transform: 'scale(1)'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#0a3d62';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.color = '#0a3d62';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        onClick={() => handleDownload(selectedReport)}
                      >
                        📄 Download Report as PDF
                      </button>
                    </div>
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

                  {selectedReport.status === 'Rejected' || selectedReport.status === 'Flagged' ? (
                    <div
                      ref={clarificationRef}
                      className="details-box"
                      style={{
                        animation: 'slideInRight 0.5s ease-out 0.3s'
                      }}
                    >
                      <h3 style={{ marginBottom: '15px', color: '#0a3d62' }}>Clarification</h3>
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
                          {clarificationMessage && (
                            <p
                              className={`clarification-message ${clarificationMessage.includes('✔️') ? 'success' : 'error'}`}
                              style={{
                                fontSize: '12px',
                                margin: '8px 0',
                                padding: '10px',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                color: 'white'
                              }}
                            >
                              {clarificationMessage}
                            </p>
                          )}
                          <button type="submit" className="status-btn" style={{ width: '100%', height: '38px', marginTop: '5px' }}>
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
                  ) : null}
                </div>
              </div>
            ) : (
              <>
                <div className="filter-bar fade-in-delayed">
                  <div className="report-search-field">
                    <FaSearch className="input-icon" style={{ color: '#0a3d62' }} />
                    <input
                      type="text"
                      placeholder="Search by position, student, or company..."
                      value={reportSearchTerm}
                      onChange={(e) => setReportSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="report-search-field">
                    <FaFilter className="input-icon" style={{ color: '#0a3d62' }} />
                    <select
                      value={reportStatusSearch}
                      onChange={(e) => setReportStatusSearch(e.target.value)}
                      style={{ width: '100%', padding: '10px 10px 10px 35px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px', background: 'white' }}
                    >
                      <option value="">Status</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Pending (Flagged)">Pending (Flagged)</option>
                    </select>
                  </div>
                  <div className="report-search-field">
                    <FaFilter className="input-icon" style={{ color: '#0a3d62' }} />
                    <select
                      value={reportMajorSearch}
                      onChange={(e) => setReportMajorSearch(e.target.value)}
                      style={{ width: '100%', padding: '10px 10px 10px 35px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px', background: 'white' }}
                    >
                      <option value="">All Majors</option>
                      <option value="CS">Computer Science</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                </div>

                <div className="internship-table-container animated fadeInUp">
                  <table className="reports-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Submission Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterAndSortReports(internshipReports).map((report) => (
                        <tr 
                          key={report.id} 
                          onClick={() => setSelectedReport(report)}
                          className="pop-in delay-0"
                        >
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
                          <td>
                            <span className={`report-status-tag ${report.status.toLowerCase()}`}>
                              {report.status}
                            </span>
                          </td>
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
            <button className="status-btn" onClick={downloadStatisticsPDF}>📄 Generate Statistics Report</button>
            <div className="statistics-grid" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
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
        return null;
    }
  };

  return (
    <div className="scad-dashboard-layout">
      {statusMessage && (
        <div className="scad-status-message">
          {statusMessage}
        </div>
      )}
      <aside className="scad-sidebar">
        <div className="scad-logo">
          <img src="/images/guc-logo.png" alt="GUC Logo" className="scad-logo-img" />
          <div className="scad-logo-text">
            <span className="scad-tagline"></span>
          </div>
        </div>

        <ul>
          <li 
            className={activeSection === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveSection('dashboard')}
          >
            <FaHome /> Dashboard
          </li>
          <li 
            className={activeSection === 'companies' ? 'active' : ''}
            onClick={() => setActiveSection('companies')}
          >
            <FaBuilding /> Companies
          </li>
          <li 
            className={activeSection === 'students' ? 'active' : ''}
            onClick={() => setActiveSection('students')}
          >
            <FaUserGraduate /> Students
          </li>
          <li 
            className={activeSection === 'internship-postings' ? 'active' : ''}
            onClick={() => setActiveSection('internship-postings')}
          >
            <FaBriefcase /> Internship Postings
          </li>
          <li 
            className={activeSection === 'reports' ? 'active' : ''}
            onClick={() => setActiveSection('reports')}
          >
            <FaFileAlt /> Reports
          </li>
          <li 
            className={activeSection === 'statistics' ? 'active' : ''}
            onClick={() => setActiveSection('statistics')}
          >
            <FaChartBar /> Statistics
          </li>
          <li 
            className={activeSection === 'appointments' ? 'active' : ''}
            onClick={() => navigate('/pro-student/appointments')}
          >
            <FaCalendarCheck /> Career/Report Appointment
          </li>
        </ul>

        <div className="scad-sidebar-footer">
          <img src="/images/Scad Logo.jpg" alt="SCAD Logo" className="scad-sidebar-footer-img" />
          <div className="scad-sidebar-footer-info">
            <p className="scad-sidebar-footer-name">Amr Adel</p>
            <p className="scad-sidebar-footer-role">SCAD Office Admin</p>
            <div className="scad-sidebar-logout" onClick={handleLogout}>
              <FiLogOut className="scad-logout-icon" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="scad-main-content">
        <div className="scad-header-bar">
          <div className="scad-header-left">
            <button className="scad-nav-btn" onClick={() => navigate(-1)}>
              <FaArrowLeft />
            </button>
            <button className="scad-nav-btn" onClick={() => navigate(1)}>
              <FaArrowRight />
            </button>
          </div>
        </div>

        <div className="scad-floating-notif">
          <FaBell className="scad-wiggle-bell" />
        </div>

        <section className="scad-hero-banner scad-animated scad-fadeSlideUp">
          <h2>{activeSection === 'internship-postings' ? 'Internship Postings' : 
               activeSection === 'companies' && selectedCompanyId ? 'Company Details' :
               activeSection === 'companies' ? 'Companies' : 
               activeSection === 'students' && selectedStudent ? 'Student\'s Profile' :
               activeSection === 'students' ? 'Students' :
               activeSection === 'reports' ? 'Internship Reports' :
               activeSection === 'statistics' ? 'Statistics' :
               activeSection === 'appointments' ? 'Career/Report Appointments' :
               `Welcome back, Amr Adel 👋`}</h2>
          <p className="scad-subtext">
            Today is {new Date().toLocaleString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </section>

        <section className="scad-content-area" key={activeSection}>{renderContent()}</section>
      </main>
    </div>
  );
}

export default ScadDashboard;