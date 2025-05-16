import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBuilding, FaClock, FaMoneyBillWave, FaGraduationCap, FaCalendarAlt, FaCheck, FaTimes, FaFilter, FaSortAmountDown, FaLinkedin, FaTwitter, FaGlobe ,FaBell} from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import './ProStudentApplications.css';

const ProStudentApplications = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedApplication, setSelectedApplication] = useState(null);
    const [unreadNotifications, setUnreadNotifications] = useState(3); // Mock unread notifications count
     const [isBellAnimating, setIsBellAnimating] = useState(false);
    const handleBellClick = () => {
      setIsBellAnimating(true);
      setTimeout(() => {
        setIsBellAnimating(false);
        navigate('/pro-student/notifications');
      }, 500);
    };

  const applications = [
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      position: 'Software Development Intern',
      status: 'pending',
      appliedDate: '2024-03-15',
      requirements: ['Python', 'JavaScript', 'React'],
      description: 'Join our development team to work on cutting-edge web applications.',
      major: 'Computer Science',
      semester: 'Semester 5',
      logo: '/images/instabug.png',
      industry: 'Technology',
      compensation: 'Paid',
      salary: '$800/month',
      duration: '3 months',
      social: {
        linkedin: 'https://linkedin.com/company/tech-solutions',
        twitter: 'https://twitter.com/tech-solutions',
        website: 'https://tech-solutions.com'
      }
    },
    {
      id: 2,
      company: 'Data Analytics Co.',
      position: 'Data Science Intern',
      status: 'finalized',
      appliedDate: '2024-03-10',
      requirements: ['Python', 'R', 'Machine Learning'],
      description: 'Work on data analysis and machine learning projects.',
      major: 'Data Science',
      semester: 'Semester 6',
      logo: '/images/breadfast.png',
      industry: 'Data Science',
      compensation: 'Paid',
      salary: '$900/month',
      duration: '4 months',
      social: {
        linkedin: 'https://linkedin.com/company/data-analytics',
        twitter: 'https://twitter.com/data-analytics',
        website: 'https://data-analytics.com'
      }
    },
    {
      id: 3,
      company: 'Secure Systems Ltd.',
      position: 'Cybersecurity Intern',
      status: 'accepted',
      appliedDate: '2024-03-05',
      requirements: ['Network Security', 'Ethical Hacking', 'Security Tools'],
      description: 'Learn about cybersecurity and threat analysis.',
      major: 'Cybersecurity',
      semester: 'Semester 7',
      logo: '/images/valeo.png',
      industry: 'Cybersecurity',
      compensation: 'Paid',
      salary: '$1000/month',
      duration: '3 months',
      social: {
        linkedin: 'https://linkedin.com/company/secure-systems',
        twitter: 'https://twitter.com/secure-systems',
        website: 'https://secure-systems.com'
      }
    },
    {
      id: 4,
      company: 'Web Solutions',
      position: 'Frontend Development Intern',
      status: 'rejected',
      appliedDate: '2024-03-01',
      requirements: ['HTML', 'CSS', 'JavaScript', 'React'],
      description: 'Build modern and responsive user interfaces.',
      major: 'Information Technology',
      semester: 'Semester 4',
      logo: '/images/bosta.png',
      industry: 'Web Development',
      compensation: 'Paid',
      salary: '$750/month',
      duration: '3 months',
      social: {
        linkedin: 'https://linkedin.com/company/web-solutions',
        twitter: 'https://twitter.com/web-solutions',
        website: 'https://web-solutions.com'
      }
    }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-badge-pending';
      case 'finalized':
        return 'status-badge-finalized';
      case 'accepted':
        return 'status-badge-accepted';
      case 'rejected':
        return 'status-badge-rejected';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending Review';
      case 'finalized':
        return 'Finalized';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const handleScheduleInterview = (applicationId) => {
    navigate(`/pro-student/schedule-interview/${applicationId}`);
  };

  const filteredApplications = applications
    .filter(application => {
      const matchesStatus = selectedStatus === 'all' || application.status === selectedStatus;
      const matchesSearch = application.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.company.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.appliedDate) - new Date(a.appliedDate);
      } else {
        return new Date(a.appliedDate) - new Date(b.appliedDate);
      }
    });

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <div className="hero-banner">
          <h1>My Applications</h1>
         
        </div>
        <div className="floating-notif" onClick={handleBellClick}>
                  <FaBell className="wiggle-bell" />
                  {unreadNotifications > 0 && (
                    <span className="notification-badge">{unreadNotifications}</span>
                  )}
                </div>

        {!selectedApplication && (
          <div className="search-bar" style={{ background: 'none', boxShadow: 'none', padding: '0' }}>
            <div className="icon-field">
              <FaSearch className="input-icon" />
              <input
                type="text"
                placeholder="Search by company or position..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="icon-field">
              <FaFilter className="input-icon" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="status-filter"
                style={{ color: selectedStatus === 'all' ? '#7f8c8d' : '#2c3e50' }}
              >
                <option value="all" style={{ color: '#7f8c8d' }}>Filter by Status</option>
                <option value="pending" style={{ color: '#2c3e50' }}>Pending Review</option>
                <option value="finalized" style={{ color: '#2c3e50' }}>Finalized</option>
                <option value="accepted" style={{ color: '#2c3e50' }}>Accepted</option>
                <option value="rejected" style={{ color: '#2c3e50' }}>Rejected</option>
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
        )}

        {selectedApplication ? (
          <div className="internship-details-container fadeIn">
            <button onClick={() => setSelectedApplication(null)} className="back-btn">← Back to Applications</button>

            {/* Box 1: Summary */}
            <div className="details-card" style={{ marginBottom: '20px' }}>
              <div className="details-header" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ flex: '0 0 120px' }}>
                  <img
                    src={selectedApplication.logo}
                    alt="logo"
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '15px' }}>
                    <h2 style={{
                      margin: '0 0 5px 0',
                      color: '#2c3e50',
                      fontSize: '24px'
                    }}>
                      {selectedApplication.company}
                    </h2>
                    <p style={{
                      fontWeight: 'bold',
                      color: '#0a3d62',
                      margin: '0 0 10px 0',
                      fontSize: '18px'
                    }}>
                      {selectedApplication.position}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <span className="badge" style={{
                      backgroundColor: '#3c6382',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      color: 'white'
                    }}>
                      {selectedApplication.industry}
                    </span>
                    <span className={`status-badge ${getStatusBadgeClass(selectedApplication.status)}`} style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '14px'
                    }}>
                      {getStatusText(selectedApplication.status)}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FaClock style={{ color: '#0a3d62' }} />
                      <span>Applied on {selectedApplication.appliedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Application Details and Skills */}
            <div className="details-card" style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Application Details</h3>
              <div>
                <p><strong>Duration:</strong> {selectedApplication.duration}</p>
                <p><strong>Compensation:</strong> {selectedApplication.compensation}</p>
                {selectedApplication.compensation === 'Paid' && (
                  <p><strong>Salary:</strong> {selectedApplication.salary}</p>
                )}
                <p><strong>Major:</strong> {selectedApplication.major}</p>
                <p><strong>Semester:</strong> {selectedApplication.semester}</p>
                <p style={{ marginTop: '15px' }}><strong>Skills Required:</strong></p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                  {selectedApplication.requirements.map((skill, index) => (
                    <span key={index} style={{
                      backgroundColor: '#e8f4f8',
                      color: '#0a3d62',
                      padding: '5px 12px',
                      borderRadius: '15px',
                      fontSize: '0.9rem'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="description" style={{ marginTop: '20px' }}>
                <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Description</h4>
                <p style={{ color: '#666', lineHeight: '1.6' }}>{selectedApplication.description}</p>
              </div>
            </div>

            {/* Box 3: Submitted Documents */}
            <div className="details-card" style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Submitted Documents</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaCheck style={{ color: '#27ae60' }} />
                      <span>Resume/CV</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaCheck style={{ color: '#27ae60' }} />
                      <span>Cover Letter</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaCheck style={{ color: '#27ae60' }} />
                      <span>Academic Transcript</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaCheck style={{ color: '#27ae60' }} />
                      <span>Portfolio (if applicable)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaCheck style={{ color: '#27ae60' }} />
                      <span>Certifications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Box 4: Connect */}
            <div className="details-card">
              <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Connect</h3>
              <div style={{ display: 'flex', gap: '20px', fontSize: '22px', marginTop: '10px' }}>
                {selectedApplication.social?.linkedin && (
                  <a href={selectedApplication.social.linkedin} target="_blank" rel="noreferrer" style={{ color: '#0077B5' }}>
                    <FaLinkedin />
                  </a>
                )}
                {selectedApplication.social?.twitter && (
                  <a href={selectedApplication.social.twitter} target="_blank" rel="noreferrer" style={{ color: '#1DA1F2' }}>
                    <FaTwitter />
                  </a>
                )}
                {selectedApplication.social?.website && (
                  <a href={selectedApplication.social.website} target="_blank" rel="noreferrer" style={{ color: '#0a3d62' }}>
                    <FaGlobe />
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="internship-table-container animated fadeInUp">
            <table className="internship-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Industry</th>
                  <th>Compensation</th>
                  <th>Duration</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map(application => (
                  <tr
                    key={application.id}
                    className="pop-in delay-0"
                    onClick={() => setSelectedApplication(application)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={application.logo} alt="logo" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                        {application.company}
                      </div>
                    </td>
                    <td>{application.position}</td>
                    <td>{application.industry}</td>
                    <td>{application.compensation}</td>
                    <td>{application.duration}</td>
                    <td>{application.appliedDate}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>
                        {getStatusText(application.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProStudentApplications; 