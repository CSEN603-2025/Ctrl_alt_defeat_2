// CompanyDashboard.js
import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import {
  FaTh, FaSearch, FaFileAlt, FaComments, FaChartBar, FaNewspaper, FaBell,
  FaFilter, FaSortAmountDown, FaUsers, FaClipboardList, FaBriefcase, FaEdit, FaTrash, FaArrowLeft, FaArrowRight, FaSave, FaPen, FaCheck,FaPlus, FaDownload, FaTimes
} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import './CompanyDashboard.css';
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

function CompanyDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored data
    localStorage.clear();
    // Redirect to sign in page
    navigate('/');
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [filterDuration, setFilterDuration] = useState('');
  const [filterCompensation, setFilterCompensation] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedInternship, setSelectedInternship] = useState(null);


  const filterAndSort = (list) => {
    return list
      .filter(i =>
        i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.company.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(i =>
        (!filterIndustry || i.industry === filterIndustry) &&
        (!filterDuration || i.duration === filterDuration) &&
        (!filterCompensation || i.compensation === filterCompensation)
      )
      .sort((a, b) => sortOrder === 'newest'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
      );
  };
  const [internshipErrors, setInternshipErrors] = useState({}); // New state for internship form errors


  const handleSearch = (data) => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
const handleTagInput = (e, type) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !evaluationForm[type].includes(value)) {
        setEvaluationForm(prev => ({
          ...prev,
          [type]: [...prev[type], value]
        }));
      }
      e.target.value = '';
    }
  };
const removeTag = (type, tag) => {
    setEvaluationForm({ ...evaluationForm, [type]: evaluationForm[type].filter(t => t !== tag) });
  };
  const handleFilter = (data) => {
    return data.filter((item) => {
      const industryMatch = filterIndustry ? item.industry === filterIndustry : true;
      const durationMatch = filterDuration ? item.duration === filterDuration : true;
      const compensationMatch = filterCompensation ? item.compensation === filterCompensation : true;
      return industryMatch && durationMatch && compensationMatch;
    });
  };

  const handleSort = (data) => {
    return data.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });
  };

  const getProcessedData = (data) => {
    let processedData = [...data];
    processedData = handleSearch(processedData);
    processedData = handleFilter(processedData);
    processedData = handleSort(processedData);
    return processedData;
  };
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationFilter, setApplicationFilter] = useState('');


  const allInternships = [
    {
      id: 1, title: 'Frontend Developer Intern', company: 'InstaBug', logo: "/images/instabug.png",
      majors: 'CS', date: '2025-05-01', duration: '3 months', status: 'Active',
      industry: 'Tech', compensation: 'Paid', skills: ['React', 'JavaScript', 'CSS', 'Git'], salary: '$800/month', social: {
        linkedin: 'https://linkedin.com/company/instabug',
        twitter: 'https://twitter.com/instabug',
        website: 'https://instabug.com'
      },
      description: "We are looking for a passionate Frontend Developer Intern to join our team. You will work closely with our development team to create user-friendly web applications. The ideal candidate should have a strong understanding of JavaScript, React, and CSS. Knowledge of Git is a plus."
    },
    {
      id: 2, title: 'Marketing Intern', company: 'Breadfast', logo: "/images/breadfast.png",
      majors: 'Marketing', date: '2025-04-20', duration: '2 months', status: 'Closed',
      industry: 'Marketing', compensation: 'Unpaid', skills: ['SEO', 'Content Creation', 'Google Analytics', 'Email Marketing', 'Social Media Management', 'Copywriting', 'Paid Advertising', 'CRM Tools', 'Market Research', 'Brand Strategy']
      , social: {
        linkedin: 'https://www.linkedin.com/company/breadfast',
        twitter: 'https://twitter.com/breadfast',
        website: 'https://www.breadfast.com'
      }, description: "Join our marketing team as a Marketing Intern. You will assist in creating and implementing marketing strategies, managing social media accounts, and analyzing market trends. The ideal candidate should have strong communication skills and a passion for marketing."
    },
    {
      id: 3, title: 'Finance Analyst Intern', company: 'Valeo', logo: "/images/valeo.png",
      majors: 'Finance', date: '2025-03-15', duration: '4 months', status: 'Active',
      industry: 'Finance', compensation: 'Paid', salary: '$1000/month', skills: ['Excel', 'Financial Analysis', 'Accounting', 'Data Visualization'], social: {
        linkedin: 'https://www.linkedin.com/company/valeo',
        twitter: 'https://twitter.com/valeo',
        website: 'https://www.valeo.com'
      }, description: "Join our finance team as a Finance Analyst Intern. You will assist in financial analysis, budgeting, and forecasting. The ideal candidate should have strong analytical skills and proficiency in Excel. Knowledge of financial modeling is a plus."
    }
  ];


  const [myInternships, setMyInternships]= useState([
    {
      id: 1,
      title: 'Backend Developer Intern',
      company: 'Bosta',
      logo: '/images/bosta.png',
      majors: 'Software Engineering',
      date: '2025-03-10',
      duration: '4 months',
      status: 'Closed',
      industry: 'Technology',
      compensation: 'Paid',
      salary: '$500/month',
      skills: ['Node.js', 'Express', 'MongoDB'],
      social: {
        linkedin: 'https://linkedin.com/company/techcorp',
        twitter: 'https://twitter.com/techcorp',
        website: 'https://techcorp.com'
      },
      description: 'Join our team as a Backend Developer Intern. You will work on building and maintaining our backend systems. The ideal candidate should have experience with Node.js and MongoDB.',
      applications: 10,
      newApps: 2,
    },
    {
      id: 2,
      title: 'Data Analyst Intern',
      company: 'Bosta',
      logo: '/images/bosta.png',
      majors: 'MET, BI',
      date: '2025-03-10',
      duration: '4 months',
      status: 'Active',
      industry: 'Technology',
      compensation: 'Unpaid',
      skills: ['Python', 'SQL', 'Data Visualization'],
      social: {
        linkedin: 'https://linkedin.com/company/techcorp',
        twitter: 'https://twitter.com/techcorp',
        website: 'https://techcorp.com'
      },
      description: 'Join our team as a Data Analyst Intern. You will work on analyzing data and creating reports. The ideal candidate should have experience with Python and SQL.',
      applications: 8,
      newApps: 5,
    },
    // Add more entries as needed
  ]);
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "John Doe",
      internshipTitle: "Frontend Developer Intern",
      email: "john@example.com",
      phone: "123456789",
      resumeLink: "#",
      status: "Finalized",
      photo: "/images/man1.png"
    },
    {
      id: 2,
      name: "Sarah Smith",
      internshipTitle: "Marketing Intern",
      email: "sarah@example.com",
      phone: "987654321",
      resumeLink: "#",
      status: "Accepted",
      photo: "/images/woman.png"
    },
    {
      id: 3,
      name: "Ali Mostafa",
      internshipTitle: "Backend Developer Intern",
      email: "ali@example.com",
      phone: "8888555666",
      resumeLink: "#",
      status: "Rejected",
      photo: "/images/man2.png"
    }
  ]);
  // 🧠 Interns Section States
  const [interns, setInterns] = useState([
    {
      id: 1,
      name: "Fatima Khaled",
      title: "UI/UX Designer Intern",
      photo: "/images/woman.png",
      status: "Current Intern"
    },
    {
      id: 2,
      name: "Youssef Adel",
      title: "Full Stack Developer Intern",
      photo: "/images/man1.png",
      status: "Internship Complete"
    },
    {
      id: 3,
      name: "Omar Nasser",
      title: "Data Science Intern",
      photo: "/images/man2.png",
      status: "Accepted Applicant"
    }
  ]);
const [evaluationErrors, setEvaluationErrors] = useState({});
  const [internSearch, setInternSearch] = useState("");
  const [internFilterStatus, setInternFilterStatus] = useState("");
  const [evaluationForm, setEvaluationForm] = useState({
    rating: 0,
    strengths: [],
    weaknesses: [],
    comments: '',
    editable: true,
  });
  const [selectedInternForEval, setSelectedInternForEval] = useState(null);
  const [evaluations, setEvaluations] = useState({});
  const updateInternStatus = (id, newStatus) => {
    setInterns(prev => prev.map(intern => intern.id === id ? { ...intern, status: newStatus } : intern));
  };

  const handleEvaluationOpen = (intern) => {
    const existing = evaluations[intern.id];
    setSelectedInternForEval(intern);
    if (existing) {
      setEvaluationForm({ ...existing, editable: false });
    } else {
      setEvaluationForm({
        rating: 0,
        strengths: [],
        weaknesses: [],
        comments: '',
        editable: true
      });
    }
  };


const submitEvaluation = (e) => {
  e.preventDefault();

  const { rating, strengths, weaknesses, comments } = evaluationForm;

  const errors = {};
  if (rating === 0) errors.rating = "Please provide a rating.";
  if (strengths.length === 0) errors.strengths = "Add at least one strength.";
  if (weaknesses.length === 0) errors.weaknesses = "Add at least one weakness.";
  if (!comments.trim()) errors.comments = "Comments are required.";

  setEvaluationErrors(errors);

  if (Object.keys(errors).length > 0) return;

  const { id } = selectedInternForEval;
  const formCopy = {
    rating,
    strengths: [...strengths],
    weaknesses: [...weaknesses],
    comments,
    editable: false
  };

  setEvaluations(prev => ({ ...prev, [id]: formCopy }));
  setSelectedInternForEval(null);
  setStatusMessage(`Evaluation for ${selectedInternForEval.name} saved`);
  setTimeout(() => setStatusMessage(''), 3000);
};

const getHeroTitle = () => {
  switch (activeSection) {
    case 'dashboard':
      return 'Welcome back, Bosta 👋';
    case 'search':
      return 'Internship Postings';
    case 'applications':
      return 'Applicants';
    case 'interns':
      return 'Current Interns';
      case 'notifications':
      return 'Notifications';
      case 'statistics':
      return 'Statistics';
    default:
      return 'Company Dashboard';
  }
};
const getHeroSubtitle = () => {
  switch (activeSection) {
    case 'dashboard': {
      const now = new Date();
      const weekday = now.toLocaleDateString(undefined, { weekday: 'long' });
      const date = now.toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      const time = now.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      return `Today is ${weekday}, ${date} at ${time}`;
    }
    case 'search':
      return 'Manage your company listings';
    case 'applications':
      return 'Review applications submitted to your postings';
    case 'interns':
      return "Track your current interns' progress";
      case 'notifications':
      return "View your recent alerts and messages";
    case 'statistics':
      return "Insights and performance metrics";
    default:
      return '';
  }
};
const [notifications, setNotifications] = useState([
  {
    id: 1,
    type: 'Application',
    title: 'New Internship Application',
    message: 'You received a new application for "Frontend Developer Intern".',
    timestamp: 'May 16, 2025 at 1:45 AM',
    unread: true
  }
]);


  // 🎯 Status Color Helper
  const getStatusColor = (status) => {
    switch (status) {
      case "Current Intern": return "#f6b93b";
      case "Internship Complete": return "#1e3799";
      case "Accepted Applicant": return "#60a3d9";
      default: return "#ccc";
    }
  };
//added this
  const [statusMessage, setStatusMessage] = useState('');
const handleDeleteInternship = (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this internship?');
  if (confirmed) {
    setMyInternships(prev => prev.filter(item => item.id !== id));
    setStatusMessage('Internship deleted successfully!');
    setTimeout(() => setStatusMessage(''), 3000);
  }
};

const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
const [internshipToDelete, setInternshipToDelete] = useState(null);
const [editMode, setEditMode] = useState(false);
const [addingInternship, setAddingInternship] = useState(false);
const [newInternship, setNewInternship] = useState({
  id: null,
  title: '',
  company: 'Bosta', // Or empty if you want it editable
  logo: '/images/bosta.png',
  majors: '',
  date: '',
  duration: '',
  status: 'Active',
  industry: '',
  compensation: '',
  salary: '',
  skills: [],
  description: '',
  social: {
    linkedin: '',
    twitter: '',
    website: ''
  },
  applications: 0,
  newApps: 0
});



const renderContent = () => {
 
  switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-overview">
            <div className="stats-grid">
              <div className="stat-card fade-in">
                <h3>Total Internships</h3>
                <p className="stat-number">12</p>
              </div>
              <div className="stat-card fade-in delay-1">
                <h3>New Applications</h3>
                <p className="stat-number">36</p>
              </div>
              <div className="stat-card fade-in delay-2">
                <h3>Active Interns</h3>
                <p className="stat-number">4</p>
              </div>
            </div>
            <div className="dashboard-charts">
              <div className="chart-section">
                <h4>Reports Status per Cycle</h4>
                <Bar
                  data={{
                    labels: ['Cycle 1', 'Cycle 2', 'Cycle 3'],
                    datasets: [
                      { label: 'Accepted', data: [12, 19, 14], backgroundColor: '#38ada9' },
                      { label: 'Rejected', data: [5, 3, 6], backgroundColor: '#e55039' },
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
                    labels: ['Web Dev', 'AI', 'Mobile Dev', 'Data Science', 'UI/UX'],
                    datasets: [{
                      label: 'Course Usage',
                      data: [25, 30, 10, 20, 15],
                      backgroundColor: ['#60a3d9', '#38ada9', '#f6b93b', '#e55039', '#1e3799']
                    }]
                  }}
                  options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
                />
              </div>
            </div>
          </div>
        );

      case 'search':

        return (
          <div className="internship-section animated fadeInUp">
           

            {selectedInternship ? (
              <div className="internship-details-container fadeIn">
                  <button
    onClick={() => setSelectedInternship(null)}
    className="back-btn"
  >
    ← Back to Internships
  </button>

                {/* Box 1: Summary */}
                <div className="details-card" style={{ marginBottom: '20px' }}>
                  <div className="details-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    <img src={selectedInternship.logo} alt="logo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>{selectedInternship.company}</h2>
{editMode ? (
  <input
    className="evaluation-input"
    value={selectedInternship.title}
    onChange={(e) =>
      setSelectedInternship({ ...selectedInternship, title: e.target.value })
    }
    style={{
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#0a3d62',
      border: '1px solid #ccc',
      borderRadius: '6px',
      padding: '8px',
      width: '100%',
      boxSizing: 'border-box',
      marginBottom: '10px'
    }}
  />
) : (
  <p
    style={{
      fontWeight: 'bold',
      color: '#0a3d62',
      margin: '0 0 12px 0',
      fontSize: '18px'
    }}
  >
    {selectedInternship.title}
  </p>
)}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
    <span style={{ fontSize: '13px', color: '#555' }}>📅 {selectedInternship.date}</span>
    <span className="badge" style={{ backgroundColor: '#3c6382' }}>{selectedInternship.industry}</span>
    <span className={`status-tag ${selectedInternship.status.toLowerCase()}`}>
      {selectedInternship.status}
    </span>
  </div>
</div>
                  </div>
                </div>

                {/* Box 2: Skills and Description */}
                <div className="details-card" style={{ marginBottom: '20px' }}>
  <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Internship Details</h3>

  <p><strong>Title:</strong></p>
  {editMode ? (
    <input
      className="evaluation-input"
      value={selectedInternship.title}
      onChange={(e) =>
        setSelectedInternship({ ...selectedInternship, title: e.target.value })
      }
    />
  ) : (
    <p>{selectedInternship.title}</p>
  )}

  <p><strong>Duration:</strong></p>
  {editMode ? (
    <input
      className="evaluation-input"
      value={selectedInternship.duration}
      onChange={(e) =>
        setSelectedInternship({ ...selectedInternship, duration: e.target.value })
      }
    />
  ) : (
    <p>{selectedInternship.duration}</p>
  )}

  <p><strong>Compensation:</strong></p>
  {editMode ? (
    <select
      className="evaluation-input"
      value={selectedInternship.compensation}
      onChange={(e) =>
        setSelectedInternship({ ...selectedInternship, compensation: e.target.value })
      }
    >
      <option value="Paid">Paid</option>
      <option value="Unpaid">Unpaid</option>
    </select>
  ) : (
    <p>{selectedInternship.compensation}</p>
  )}

  {selectedInternship.compensation === 'Paid' && (
    <>
      <p><strong>Expected Salary:</strong></p>
      {editMode ? (
        <input
          className="evaluation-input"
          value={selectedInternship.salary}
          onChange={(e) =>
            setSelectedInternship({ ...selectedInternship, salary: e.target.value })
          }
        />
      ) : (
        <p>{selectedInternship.salary}</p>
      )}
    </>
  )}

  <p><strong>Majors:</strong></p>
  {editMode ? (
    <input
      className="evaluation-input"
      value={selectedInternship.majors}
      onChange={(e) =>
        setSelectedInternship({ ...selectedInternship, majors: e.target.value })
      }
    />
  ) : (
    <p>{selectedInternship.majors}</p>
  )}

  <div className="description" style={{ marginTop: '15px' }}>
    <p><strong>Description:</strong></p>
    {editMode ? (
      <textarea
        rows="4"
        className="evaluation-textarea"
        value={selectedInternship.description}
        onChange={(e) =>
          setSelectedInternship({ ...selectedInternship, description: e.target.value })
        }
      />
    ) : (
      <p>{selectedInternship.description}</p>
    )}
  </div>

  <div style={{ marginTop: '15px' }}>
    <p><strong>Skills:</strong></p>
    {editMode ? (
      <input
        className="evaluation-input"
        value={selectedInternship.skills.join(', ')}
        onChange={(e) =>
          setSelectedInternship({
            ...selectedInternship,
            skills: e.target.value.split(',').map(s => s.trim())
          })
        }
      />
    ) : (
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
        {selectedInternship.skills?.map((skill, idx) => (
          <span className="skill-pill" key={idx}>{skill}</span>
        ))}
      </div>
    )}
  </div>
</div>

                {/* Box 3: Social Media */}
                <div className="details-card">
                  <h3 style={{ color: '#0a3d62' }}>Connect</h3>
                  <div style={{ display: 'flex', gap: '20px', fontSize: '22px', marginTop: '10px' }}>
                    {selectedInternship.social?.linkedin && (
                      <a href={selectedInternship.social.linkedin} target="_blank" rel="noreferrer">
                        <i className="fab fa-linkedin" style={{ color: '#0077B5' }}></i>
                      </a>
                    )}
                    {selectedInternship.social?.twitter && (
                      <a href={selectedInternship.social.twitter} target="_blank" rel="noreferrer">
                        <i className="fab fa-twitter" style={{ color: '#1DA1F2' }}></i>
                      </a>
                    )}
                    {selectedInternship.social?.website && (
                      <a href={selectedInternship.social.website} target="_blank" rel="noreferrer">
                        <i className="fas fa-globe" style={{ color: '#0a3d62' }}></i>
                      </a>
                    )}
                  </div>
                </div>
 {editMode && (
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
    <button
      className="status-btn"
      style={{ backgroundColor: '#ffffff', color: '#0a3d62' }}
      onClick={() => {
        // Validation
        if (!selectedInternship.title.trim()) {
          setStatusMessage('❌ Please provide a title.');
          setTimeout(() => setStatusMessage(''), 3000);
          return;
        }
        if (!selectedInternship.industry.trim()) {
          setStatusMessage('❌ Please provide an industry.');
          setTimeout(() => setStatusMessage(''), 3000);
          return;
        }
        if (!selectedInternship.date) {
          setStatusMessage('❌ Please provide a date.');
          setTimeout(() => setStatusMessage(''), 3000);
          return;
        }
        if (!selectedInternship.duration.trim()) {
          setStatusMessage('❌ Please provide a duration.');
          setTimeout(() => setStatusMessage(''), 3000);
          return;
        }
        if (!selectedInternship.compensation) {
          setStatusMessage('❌ Please select a compensation type.');
          setTimeout(() => setStatusMessage(''), 3000);
          return;
        }
        if (selectedInternship.compensation === 'Paid' && !selectedInternship.salary.trim()) {
          setStatusMessage('❌ Please provide a salary for paid internship.');
          setTimeout(() => setStatusMessage(''), 3000);
          return;
        }
        if (!selectedInternship.description.trim()) {
          setStatusMessage('❌ Please provide a description.');
          setTimeout(() => setStatusMessage(''), 3000);
          return;
        }
        if (!selectedInternship.majors.trim()) {
          setStatusMessage('❌ Please provide majors.');
          setTimeout(() => setStatusMessage(''), 3000);
          return;
        }
        if (selectedInternship.skills.length === 0) {
          setStatusMessage('❌ Please provide at least one skill.');
          setTimeout(() => setStatusMessage(''), 3000);
          return;
        }

        const updatedList = myInternships.map(i =>
          i.id === selectedInternship.id ? selectedInternship : i
        );
        setMyInternships(updatedList);
        setEditMode(false);
        setStatusMessage('✔️ Internship updated successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.backgroundColor = '#0a3d62';
        e.target.style.color = '#ffffff';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.backgroundColor = '#ffffff';
        e.target.style.color = '#0a3d62';
      }}
    >
      <FaSave /> Save
    </button>
  </div>
)}

              </div>
            ) : (
              <>
                <div className="tab-buttons slide-in-left">
 
  

  <button
    className={activeTab === 'my' ? 'active' : ''}
    onClick={() => setActiveTab('my')}
  >
    My Internship Postings
  </button>
                  <button
                    className={activeTab === 'all' ? 'active' : ''}
                    onClick={() => setActiveTab('all')}
                  >
                    All Internship Postings
                  </button>
                </div>

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
                    <select onChange={(e) => {
                      const value = e.target.value;
                      setFilterIndustry('');
                      setFilterDuration('');
                      setFilterCompensation('');
                      if (value.startsWith('Industry:')) setFilterIndustry(value.replace('Industry:', '').trim());
                      else if (value.startsWith('Duration:')) setFilterDuration(value.replace('Duration:', '').trim());
                      else if (value.startsWith('Compensation:')) setFilterCompensation(value.replace('Compensation:', '').trim());
                    }}>
                      <option value="">Filter Options</option>
                      {[...new Set([...allInternships, ...myInternships].map(i => `Industry: ${i.industry}`))].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {[...new Set([...allInternships, ...myInternships].map(i => `Duration: ${i.duration}`))].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      {[...new Set([...allInternships, ...myInternships].map(i => `Compensation: ${i.compensation}`))].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
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
                      {(activeTab === 'all' ? filterAndSort(allInternships) : filterAndSort(myInternships)).map((item, idx) => (
                        <tr key={idx} className="pop-in delay-0" onClick={() => setSelectedInternship(item)} style={{ cursor: 'pointer' }}>
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
                              <td>{item.date}</td>
                              
                            </>
                          ) : (
                            <>
                              <td>{item.title}</td>
                              <td>{item.industry}</td>
                              <td>{item.compensation}</td>
                              <td>{item.applications}</td>
                              <td><span className={`status-tag ${item.status.toLowerCase()}`}>{item.status}</span></td>
                              <td>{item.date}</td>
                              <td>
                                <button
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: '5px',
                                    marginRight: '8px',
                                    color: '#0a3d62',
                                    transition: 'transform 0.2s, color 0.2s',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.1)';
                                    e.target.style.color = '#0077B5';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.color = '#0a3d62';
                                  }}
                                  onClick={(e) => {
  e.stopPropagation();
  setSelectedInternship(item);
  setEditMode(true); // enable edit mode
}}

                                >
                                  <FaEdit size={16} />
                                </button>
                                <button
                                onClick={(e) => {
    e.stopPropagation(); // Prevent row click
    setInternshipToDelete(item);
    setShowDeleteConfirm(true);
    handleDeleteInternship(item.id);
  }}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: '5px',
                                    color: '#e55039',
                                    transition: 'transform 0.2s, color 0.2s',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.1)';
                                    e.target.style.color = '#e55039';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.color = '#e55039';
                                  }}
                                >
                                  <FaTrash size={16} />
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {activeTab === 'my' && !addingInternship && (
                  
  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '20px',width: '100%'}}>
    <button
      className="status-btn"
style={{
                        backgroundColor: '#ffffff',
                        color: '#0a3d62',
                        border: '1.5px solid #0a3d62',
                        borderRadius: '8px',
                        padding: '10px 22px',
                        fontWeight: 600,
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background 0.2s, color 0.2s, border 0.2s, transform 0.2s',
                        boxShadow: '0 2px 8px rgba(10,61,98,0.04)',
                        width: 'auto',
                        minWidth: '200px'
                      }}
                      onMouseEnter={e => {
                        e.target.style.backgroundColor = '#0a3d62';
                        e.target.style.color = '#fff';
                        e.target.style.border = '1.5px solid #0a3d62';
                        e.target.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={e => {
                        e.target.style.backgroundColor = '#ffffff';
                        e.target.style.color = '#0a3d62';
                        e.target.style.border = '1.5px solid #0a3d62';
                        e.target.style.transform = 'scale(1)';
                      }}
      onClick={() => {
        setAddingInternship(true);
        setEditMode(false);
        setSelectedInternship(null);
      }}
    >
      <FaPlus />
      Add Internship
    </button>
  </div>
)}
{addingInternship && (
  <div className="internship-details-container fadeIn">
    <button
      className="close-eval-btn"
      onClick={() => setAddingInternship(false)}
      title="Close"
      style={{
        position: 'absolute',
        top: '30px',
        right: '30px',
        background: 'transparent',
        border: 'none',
        color: '#999',
        cursor: 'pointer',
        fontSize: '22px'
      }}
    >
      <FaTimes />
    </button>

    <div className="details-card" style={{ marginBottom: '20px' }}>
      <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>New Internship Details</h3>

      <p><strong>Title:</strong></p>
      <input
        className="evaluation-input"
        value={newInternship.title}
        onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })}
      />

      <p><strong>Industry:</strong></p>
      <input
        className="evaluation-input"
        value={newInternship.industry}
        onChange={(e) => setNewInternship({ ...newInternship, industry: e.target.value })}
      />

      <p><strong>Date:</strong></p>
      <input
        type="date"
        className="evaluation-input"
        value={newInternship.date}
        onChange={(e) => setNewInternship({ ...newInternship, date: e.target.value })}
      />

      <p><strong>Duration:</strong></p>
      <input
        className="evaluation-input"
        value={newInternship.duration}
        onChange={(e) => setNewInternship({ ...newInternship, duration: e.target.value })}
      />

      <p><strong>Compensation:</strong></p>
      <select
        className="evaluation-input"
        value={newInternship.compensation}
        onChange={(e) => setNewInternship({ ...newInternship, compensation: e.target.value })}
      >
        <option value="">Select</option>
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
      </select>

      {newInternship.compensation === 'Paid' && (
        <>
          <p><strong>Salary:</strong></p>
          <input
            className="evaluation-input"
            value={newInternship.salary}
            onChange={(e) => setNewInternship({ ...newInternship, salary: e.target.value })}
          />
        </>
      )}

      <p><strong>Description:</strong></p>
      <textarea
        rows="4"
        className="evaluation-textarea"
        value={newInternship.description}
        onChange={(e) => setNewInternship({ ...newInternship, description: e.target.value })}
      />

      {/* Feedback message rendered within the form, matching evaluation form */}
      {statusMessage && (
        <div className="feedback-message" style={{ marginTop: '15px', width: '100%', textAlign: 'center' }}>
          {statusMessage}
        </div>
      )}
    </div>

    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '20px', width: '100%' }}>
      <button
        className="status-btn"
        style={{
          backgroundColor: '#ffffff',
          color: '#0a3d62',
          border: '1.5px solid #0a3d62',
          borderRadius: '8px',
          padding: '10px 22px',
          fontWeight: 600,
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s, border 0.2s, transform 0.2s',
          boxShadow: '0 2px 8px rgba(10,61,98,0.04)',
          width: 'auto',
          minWidth: '200px'
        }}
        onClick={() => {
          // Validation
          if (!newInternship.title.trim()) {
            setStatusMessage('❌ Please provide a title.');
            setTimeout(() => setStatusMessage(''), 3000);
            return;
          }
          if (!newInternship.industry.trim()) {
            setStatusMessage('❌ Please provide an industry.');
            setTimeout(() => setStatusMessage(''), 3000);
            return;
          }
          if (!newInternship.date) {
            setStatusMessage('❌ Please provide a date.');
            setTimeout(() => setStatusMessage(''), 3000);
            return;
          }
          if (!newInternship.duration.trim()) {
            setStatusMessage('❌ Please provide a duration.');
            setTimeout(() => setStatusMessage(''), 3000);
            return;
          }
          if (!newInternship.compensation) {
            setStatusMessage('❌ Please select a compensation type.');
            setTimeout(() => setStatusMessage(''), 3000);
            return;
          }
          if (newInternship.compensation === 'Paid' && !newInternship.salary.trim()) {
            setStatusMessage('❌ Please provide a salary.');
            setTimeout(() => setStatusMessage(''), 3000);
            return;
          }
          if (!newInternship.description.trim()) {
            setStatusMessage('❌ Please provide a description.');
            setTimeout(() => setStatusMessage(''), 3000);
            return;
          }

          const internshipWithId = {
            ...newInternship,
            id: Date.now(), // unique ID
            company: 'Your Company', // Placeholder; adjust if dynamic
            skills: newInternship.skills || [],
            applications: 0,
            newApps: 0
          };
          setMyInternships(prev => [...prev, internshipWithId]);
          setAddingInternship(false);
          setStatusMessage(`✔️ Internship ${newInternship.title} added`);
          setTimeout(() => setStatusMessage(''), 3000);
        }}
        onMouseEnter={e => {
          e.target.style.backgroundColor = '#0a3d62';
          e.target.style.color = '#fff';
          e.target.style.border = '1.5px solid #0a3d62';
          e.target.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={e => {
          e.target.style.backgroundColor = '#ffffff';
          e.target.style.color = '#0a3d62';
          e.target.style.border = '1.5px solid #0a3d62';
          e.target.style.transform = 'scale(1)';
        }}
      >
        <FaSave /> Save
      </button>
    </div>
  </div>
)}
              </>
            )}
          </div>
        );
      case 'applications':
        
        return (
          <div className="internship-section animated fadeInUp">
            {!selectedApplication ? (
              <>
                <div className="tab-buttons slide-in-left">
                  <div className="icon-field">
                    <FaSearch className="input-icon" style={{ color: '#0a3d62' }} />
                    <input
                      type="text"
                      placeholder="Filter by Internship Title"
                      value={applicationFilter}
                      onChange={(e) => setApplicationFilter(e.target.value)}
                    />
                  </div>
                </div>

                <div className="internship-table-container fade-in-delayed">
                  <table className="internship-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Internship</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications
                        .filter(app => app.internshipTitle.toLowerCase().includes(applicationFilter.toLowerCase()))
                        .map((app, idx) => (
                          <tr key={idx} className="pop-in delay-0" style={{ cursor: 'pointer' }} onClick={() => setSelectedApplication(app)}>

                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={app.photo} alt="profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                                {app.name}
                              </div>
                            </td>

                            <td>{app.internshipTitle}</td>
                            <td>{app.email}</td>
                            <td>
                              <span
                                className={`status-tag ${app.status.toLowerCase().replace(' ', '-')}`}
                                style={{
                                  padding: '5px 10px',
                                  borderRadius: '15px',
                                  color: '#fff',
                                  backgroundColor: getStatusColor(app.status),
                                }}
                              >
                                {app.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="internship-details-container fadeIn">
                <button
  onClick={() => setSelectedApplication(null)}
  className="back-btn"
  style={{
    marginBottom: '20px',
    backgroundColor: 'none',
    color: '#0a3d62',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }}
>
  ← Back to Applicants
</button>

                <div className="details-card" style={{ marginBottom: '20px' }}>
                  <div className="details-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    <img src={selectedApplication.photo} alt="profile" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>{selectedApplication.name}</h2>
                      <p style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#0a3d62' }}><strong>Internship:</strong> {selectedApplication.internshipTitle}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <p style={{ margin: '8px 0' }}><strong>Email:</strong> {selectedApplication.email}</p>
                    <p style={{ margin: '8px 0' }}><strong>Phone:</strong> {selectedApplication.phone}</p>
                    <p style={{ margin: '8px 0' }}><strong>Status:</strong> {selectedApplication.status}</p>
                    <a
                      href={selectedApplication.resumeLink}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '12px',
                        color: '#0a3d62',
                        textDecoration: 'underline',
                        fontWeight: '500',
                        fontSize: '14px'
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaDownload /> Download Resume
                    </a>
                  </div>
                </div>

                <div className="details-card">
                  <h3>Update Application Status</h3>
                  <div className="status-btn-group">
                    {["Finalized", "Accepted", "Rejected"].map(status => {
                      const isSelected = selectedApplication.status === status;
                      const color = getStatusColor(status);
                      return (
                        <button
                          key={status}
                          className={`status-btn ${isSelected ? 'selected' : ''}`}
                          style={{
                            '--btn-color': color,
                            ...(isSelected ? { backgroundColor: color, borderColor: color, color: 'white' } : {})
                          }}
                          onClick={() => {
                            setSelectedApplication(prev => ({ ...prev, status }));
                            const updatedApps = applications.map(app =>
                              app.id === selectedApplication.id ? { ...app, status } : app
                            );
                            setApplications(updatedApps);
                            setStatusMessage(`✔️ Status updated to "${status}" successfully!`);
                            setTimeout(() => setStatusMessage(''), 3000);
                          }}
                        >
                          {status}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

        function getStatusColor(status) {
          switch (status) {
            case "Finalized":
              return "#38ada9"; // Green
            case "Accepted":
              return "#60a3d9"; // Blue
            case "Rejected":
              return "#e55039"; // Red
            case "Current Intern":
              return "#f6b93b"; // Yellow
            case "Internship Complete":
              return "#1e3799"; // Dark Blue
            default:
              return "#ccc"; // Default Gray
          }
        }
  case 'interns':
  // Manage timeout globally to clear previous messages
  let messageTimeout = null;

  const clearMessageTimeout = () => {
    if (messageTimeout) {
      clearTimeout(messageTimeout);
      messageTimeout = null;
    }
  };

  return (
    <div className="internship-section animated fadeInUp">
      <div className="tab-buttons slide-in-left">
        <div className="icon-field">
          <FaSearch className="input-icon" style={{ color: '#0a3d62' }} />
          <input
            type="text"
            placeholder="Search by name or job title"
            value={internSearch}
            onChange={(e) => setInternSearch(e.target.value)}
          />
        </div>
        <div className="icon-field">
          <FaFilter className="input-icon" style={{ color: '#0a3d62' }} />
          <select value={internFilterStatus} onChange={(e) => setInternFilterStatus(e.target.value)}>
            <option value="">All</option>
            <option value="Accepted Applicant">Accepted Applicant</option>
            <option value="Current Intern">Current Intern</option>
            <option value="Internship Complete">Internship Complete</option>
          </select>
        </div>
      </div>

      <div className="internship-table-container fade-in-delayed">
        <table className="internship-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Internship</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {interns
              .filter(i =>
                (i.name.toLowerCase().includes(internSearch.toLowerCase()) ||
                  i.title.toLowerCase().includes(internSearch.toLowerCase())) &&
                (!internFilterStatus || i.status === internFilterStatus)
              )
              .map((i, idx) => (
                <tr key={idx} className="pop-in delay-0">
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={i.photo} alt="profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                      {i.name}
                    </div>
                  </td>
                  <td>{i.title}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '240px' }}>
                      <select
                        value={i.status}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          updateInternStatus(i.id, newStatus);
                          if (newStatus === "Internship Complete") {
                            setSelectedInternForEval(null);
                          }
                        }}
                        className="status-dropdown"
                      >
                        <option value="Current Intern">Current Intern</option>
                        <option value="Internship Complete">Internship Complete</option>
                      </select>

                      <div style={{ width: '100px' }}>
                        {i.status === "Internship Complete" && (
                          <button
                            className="evaluate-btn"
                            style={{
                              backgroundColor: '#f4f7f9',
                              borderRadius: '8px',
                              border: '1px solid #0a3d62',
                              transition: 'transform 0.2s, color 0.2s',
                              cursor: 'pointer',
                              fontSize: '16px'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'scale(1.1)';
                              e.target.style.color = '#0077B5';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'scale(1)';
                              e.target.style.color = '#0a3d62';
                            }}
                            onClick={() => handleEvaluationOpen(i)}
                          >
                            <FaPen /> <span>Evaluate</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {selectedInternForEval && (
        <div className="details-card animated fadeInUp" style={{ marginTop: '30px' }}>
          <div className="details-header" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
              <img src={selectedInternForEval.photo} alt="profile" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
              <h3 style={{ margin: 0, fontSize: '22px', color: '#0a3d62', fontWeight: '700' }}>Evaluation for {selectedInternForEval.name}</h3>
            </div>
            <button
              className="close-eval-btn"
              onClick={() => {
                const card = document.querySelector('.details-card');
                card.classList.add('fade-out-message');
                setTimeout(() => setSelectedInternForEval(null), 600);
              }}
            >
              ✖
            </button>
          </div>

          {evaluationForm.editable ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!e.target.checkValidity()) {
                  e.target.reportValidity();
                  return;
                }
                const { rating, strengths, weaknesses, comments } = evaluationForm;

                const errors = {};
                if (rating === 0) errors.rating = "Please provide a rating.";
                if (strengths.length === 0) errors.strengths = "Add at least one strength.";
                if (weaknesses.length === 0) errors.weaknesses = "Add at least one weakness.";
                if (!comments.trim()) errors.comments = "Comments are required.";

                setEvaluationErrors(errors);

                if (Object.keys(errors).length > 0) return;

                const { id } = selectedInternForEval;
                const formCopy = {
                  rating,
                  strengths: [...strengths],
                  weaknesses: [...weaknesses],
                  comments,
                  editable: false
                };

                setEvaluations(prev => ({ ...prev, [id]: formCopy }));
                setSelectedInternForEval(null);
                clearMessageTimeout();
                setStatusMessage(`✔️ Evaluation for ${selectedInternForEval.name} saved`);
                messageTimeout = setTimeout(() => setStatusMessage(''), 3000);
              }}
              noValidate
            >
              <p><strong>Rating:</strong></p>
              <div style={{ fontSize: '24px', color: '#f6b93b' }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <span
                    key={n}
                    onClick={() => setEvaluationForm({ ...evaluationForm, rating: n })}
                    style={{ cursor: 'pointer', marginRight: '5px' }}
                  >
                    {evaluationForm.rating >= n ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <input
                type="number"
                name="rating"
                value={evaluationForm.rating || ''}
                required
                onChange={() => {}}
                style={{ display: 'none' }}
              />
              {evaluationErrors.rating && (
                <p style={{ color: 'red', fontSize: '12px', margin: '4px 0 8px' }}>
                  {evaluationErrors.rating}
                </p>
              )}

              <p><strong>Strengths:</strong></p>
              <p style={{ fontSize: '13px', color: '#000', marginTop: '0px', marginBottom: '10px' }}>
                Add each strength and press Enter
              </p>
              <div className="tag-input" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                {evaluationForm.strengths.map((tag, i) => (
                  <span key={i} style={{
                    background: '#d1ecf1',
                    padding: '5px 10px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: '#0a3d62'
                  }}>
                    {tag}
                    <span style={{ marginLeft: '6px', cursor: 'pointer' }} onClick={() => removeTag('strengths', tag)}>✕</span>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add a strength..."
                className="evaluation-input"
                onKeyDown={(e) => handleTagInput(e, 'strengths')}
                required={evaluationForm.strengths.length === 0}
              />
              {evaluationErrors.strengths && (
                <p style={{ color: 'red', fontSize: '12px', margin: '4px 0 8px' }}>
                  {evaluationErrors.strengths}
                </p>
              )}

              <p><strong>Weaknesses:</strong></p>
              <p style={{ fontSize: '13px', color: '#000', marginTop: '0px', marginBottom: '10px' }}>
                Add each weakness and press Enter
              </p>
              <div className="tag-input" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                {evaluationForm.weaknesses.map((tag, i) => (
                  <span key={i} style={{
                    background: '#f8d7da',
                    padding: '5px 10px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: '#721c24'
                  }}>
                    {tag}
                    <span style={{ marginLeft: '6px', cursor: 'pointer' }} onClick={() => removeTag('weaknesses', tag)}>✕</span>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add a weakness..."
                className="evaluation-input"
                onKeyDown={(e) => handleTagInput(e, 'weaknesses')}
                required={evaluationForm.weaknesses.length === 0}
              />
              {evaluationErrors.weaknesses && (
                <p style={{ color: 'red', fontSize: '12px', margin: '4px 0 8px' }}>
                  {evaluationErrors.weaknesses}
                </p>
              )}

              <p><strong>Comments:</strong></p>
              <textarea
                rows="3"
                className="evaluation-textarea"
                value={evaluationForm.comments || ''}
                onChange={(e) =>
                  setEvaluationForm({ ...evaluationForm, comments: e.target.value })
                }
                required
              />
              {evaluationErrors.comments && (
                <p style={{ color: 'red', fontSize: '12px', margin: '4px 0 8px' }}>
                  {evaluationErrors.comments}
                </p>
              )}
              <div className="status-btn-group">
                <button type="submit" className="status-btn"><FaSave /> Save Evaluation</button>
              </div>
            </form>
          ) : (
            <div>
              <p><strong>Rating:</strong></p>
              <div style={{ fontSize: '24px', color: '#f6b93b' }}>
                {'★'.repeat(evaluationForm.rating)}{'☆'.repeat(5 - evaluationForm.rating)}
              </div>

              <p><strong>Strengths:</strong></p>
              <textarea
                rows="2"
                className="evaluation-textarea"
                value={evaluationForm.strengths.join(', ')}
                readOnly
                style={{
                  backgroundColor: '#f8f9fa',
                  resize: 'none',
                  minHeight: '60px'
                }}
              />

              <p><strong>Weaknesses:</strong></p>
              <textarea
                rows="2"
                className="evaluation-textarea"
                value={evaluationForm.weaknesses.join(', ')}
                readOnly
                style={{
                  backgroundColor: '#f8f9fa',
                  resize: 'none',
                  minHeight: '60px'
                }}
              />

              <p><strong>Comments:</strong></p>
              <textarea
                rows="3"
                className="evaluation-textarea"
                value={evaluationForm.comments || ''}
                readOnly
                style={{
                  backgroundColor: '#f8f9fa',
                  resize: 'none',
                  minHeight: '80px'
                }}
              />

              <div className="status-btn-group">
                <button
                  className="status-btn"
                  onClick={() => {
                    clearMessageTimeout();
                    setEvaluationForm({ ...evaluationForm, editable: true });
                    setStatusMessage('✏️ Evaluation opened for editing');
                    messageTimeout = setTimeout(() => setStatusMessage(''), 3000);
                  }}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="status-btn"
                  onClick={() => {
                    const id = selectedInternForEval.id;
                    const newEvals = { ...evaluations };
                    delete newEvals[id];
                    setEvaluations(newEvals);
                    const card = document.querySelector('.details-card');
                    if (card) {
                      card.classList.add('fade-out-message');
                      setTimeout(() => setSelectedInternForEval(null), 600);
                    }
                    clearMessageTimeout();
                    setStatusMessage('🗑️ Evaluation deleted');
                    messageTimeout = setTimeout(() => setStatusMessage(''), 3000);
                  }}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
          </div>
        );

      case 'statistics':
        return (
          <div className="dashboard-overview">
            <div className="stats-grid">
              <div className="stat-card fade-in">
                <h3>Total Applications</h3>
                <p className="stat-number">156</p>
              </div>
              <div className="stat-card fade-in delay-1">
                <h3>Active Interns</h3>
                <p className="stat-number">8</p>
              </div>
              <div className="stat-card fade-in delay-2">
                <h3>Completion Rate</h3>
                <p className="stat-number">92%</p>
              </div>
              <div className="stat-card fade-in delay-3">
                <h3>Avg. Rating</h3>
                <p className="stat-number">4.2/5</p>
              </div>
            </div>

            <div className="dashboard-charts">
              <div className="chart-section">
                <h4>Applications by Department</h4>
                <Bar
                  data={{
                    labels: ['CS', 'MET', 'BI', 'ME', 'ECE'],
                    datasets: [{
                      label: 'Applications',
                      data: [45, 30, 25, 20, 15],
                      backgroundColor: '#60a3d9'
                    }]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'bottom' },
                      title: {
                        display: true,
                        text: 'Distribution of Applications'
                      }
                    }
                  }}
                />
              </div>

              <div className="chart-section">
                <h4>Internship Status Distribution</h4>
                <Pie
                  data={{
                    labels: ['Active', 'Completed', 'Upcoming'],
                    datasets: [{
                      data: [8, 12, 5],
                      backgroundColor: ['#38ada9', '#60a3d9', '#f6b93b']
                    }]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'bottom' }
                    }
                  }}
                />
              </div>

              <div className="chart-section">
                <h4>Monthly Application Trends</h4>
                <Bar
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                      label: 'Applications',
                      data: [25, 30, 35, 28, 32, 40],
                      backgroundColor: '#3c6382'
                    }]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'bottom' }
                    }
                  }}
                />
              </div>

              <div className="chart-section">
                <h4>Skills Distribution</h4>
                <Pie
                  data={{
                    labels: ['Web Dev', 'Mobile Dev', 'Data Science', 'AI/ML', 'UI/UX'],
                    datasets: [{
                      data: [35, 25, 20, 15, 5],
                      backgroundColor: ['#60a3d9', '#38ada9', '#f6b93b', '#e55039', '#1e3799']
                    }]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'bottom' }
                    }
                  }}
                />
              </div>

              <div className="chart-section">
                <h4>Intern Performance Ratings</h4>
                <Bar
                  data={{
                    labels: ['Technical Skills', 'Communication', 'Teamwork', 'Problem Solving', 'Initiative'],
                    datasets: [{
                      label: 'Average Rating',
                      data: [4.5, 4.2, 4.3, 4.1, 4.4],
                      backgroundColor: '#38ada9'
                    }]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'bottom' }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 5
                      }
                    }
                  }}
                />
              </div>

              <div className="chart-section">
                <h4>Retention Rate by Department</h4>
                <Bar
                  data={{
                    labels: ['CS', 'MET', 'BI', 'ME', 'ECE'],
                    datasets: [{
                      label: 'Retention Rate (%)',
                      data: [85, 90, 88, 92, 87],
                      backgroundColor: '#60a3d9'
                    }]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'bottom' }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 'notifications':
  return (
    <div className="internship-section animated fadeInUp">
      <div className="notifications-content">
        <div className={`notifications-list ${selectedNotification ? 'compressed' : ''}`}>
          <div className="notification-card unread" onClick={() => setSelectedNotification({
            type: 'system',
            time: '1 day ago',
            title: 'GUC Internship System Access Granted',
            message: 'Your application to join the GUC Internship System has been accepted',
            details: {
              status: 'Accepted',
              nextSteps: 'Check your email for acceptance verification',
              accessLevel: 'Company Admin',
              verificationRequired: 'Yes'
            }
          })}>
            <div className="notification-header">
              <span className="notification-type application">✅</span>
              <span className="notification-time">1 day ago</span>
            </div>
            <h3>GUC Internship System Access Granted</h3>
            <p>Your application to join the GUC Internship System has been accepted</p>
            <div className="unread-indicator" />
          </div>
          <div className="notification-card unread" onClick={() => setSelectedNotification({
            type: 'application',
            time: '2 hours ago',
            title: 'New Internship Application',
            message: 'Jane Smith applied to your "Backend Developer Intern" posting.',
            details: {
              applicantName: 'Jane Smith',
              internshipTitle: 'Backend Developer Intern',
              applicationDate: 'May 16, 2025',
              nextSteps: 'Review the application in the Applicants section'
            }
          })}>
            <div className="notification-header">
              <span className="notification-type application">📄</span>
              <span className="notification-time">2 hours ago</span>
            </div>
            <h3>New Internship Application</h3>
            <p>Jane Smith applied to your "Backend Developer Intern" posting.</p>
            <div className="unread-indicator" />
          </div>
        </div>

        {selectedNotification && (
          <div className="notification-details">
            <div className="details-header">
              <div className="header-left">
                <span className={`notification-type ${selectedNotification.type}`}>
                  {selectedNotification.type === 'system' && '✅'}
                  {selectedNotification.type === 'application' && '📄'}
                </span>
                <span className="notification-time">{selectedNotification.time}</span>
              </div>
              <button className="close-button" onClick={() => setSelectedNotification(null)}>×</button>
            </div>
            <h2>{selectedNotification.title}</h2>
            <p className="details-message">{selectedNotification.message}</p>
            <div className="details-content">
              <p>Details:</p>
              <ul>
                {Object.entries(selectedNotification.details).map(([key, value]) => (
                  <li key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</li>
                ))}
              </ul>
              <div className="details-actions">
                {selectedNotification.type === 'system' && (
                  <button className="status-btn">View Email</button>
                )}
                {selectedNotification.type === 'application' && (
                  <button className="status-btn" onClick={() => setActiveSection('applications')}>
                    View Application
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
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
          <li className={activeSection === 'search' ? 'active' : ''} onClick={() => setActiveSection('search')}><FaBriefcase /> Internship  Postings</li>
          <li className={activeSection === 'applications' ? 'active' : ''} onClick={() => setActiveSection('applications')}><FaFileAlt /> Applicants</li>
          <li className={activeSection === 'interns' ? 'active' : ''} onClick={() => setActiveSection('interns')}><FaUsers /> Current Interns</li>
          <li className={activeSection === 'statistics' ? 'active' : ''} onClick={() => setActiveSection('statistics')}><FaChartBar /> Statistics</li>
          <li className={activeSection === 'notifications' ? 'active' : ''} onClick={() => setActiveSection('notifications')}><FaBell /> Notifications</li>
        </ul>
        <div className="sidebar-footer">
          <img src="/images/bosta.png" alt="User" className="sidebar-footer-img" />
          <div className="sidebar-footer-info">
            <p className="sidebar-footer-name">Bosta</p>
            <p className="sidebar-footer-role">Company Admin</p>
            <div className="sidebar-logout" onClick={handleLogout}>
              <FiLogOut className="logout-icon" />
              <span>Logout</span>
            </div>
          </div>
        </div>

      </aside>
           {statusMessage && (
  <div className="feedback-message">
    {statusMessage}
  </div>
)}
      <main className="main-content">
        

        <div className="floating-notif" onClick={() => setActiveSection('notifications')}>
  <FaBell className="wiggle-bell" />
  {notifications.filter(n => n.unread).length > 0 && (
    <span className="notification-badge">
      {notifications.filter(n => n.unread).length}
    </span>
  )}
</div>
        <section className="hero-banner animated fadeSlideUp">
          <h2>{getHeroTitle()}</h2>
            <p className="subtext">{getHeroSubtitle()}</p>
        </section>

        <section className="content-area">{renderContent()}</section>
      </main>
    </div>
  );
}

export default CompanyDashboard;
