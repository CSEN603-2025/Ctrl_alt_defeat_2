import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBuilding, FaClock, FaMoneyBillWave, FaGraduationCap, FaCalendarAlt, FaCheck, FaTimes, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import './ProStudentApplications.css';

const ProStudentApplications = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedApplication, setSelectedApplication] = useState(null);

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
        <BackButton />
        <h1>My Applications</h1>

        {!selectedApplication && (
        <div className="search-section">
          <div className="search-bar">
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
                >
                  <option value="all">All Applications</option>
                  <option value="pending">Pending Review</option>
                  <option value="finalized">Finalized</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FaMoneyBillWave style={{ color: '#0a3d62' }} />
                      <span>{selectedApplication.compensation}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FaCalendarAlt style={{ color: '#0a3d62' }} />
                      <span>{selectedApplication.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Application Details */}
            <div className="details-card" style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Application Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div>
                  <p><strong>Duration:</strong> {selectedApplication.duration}</p>
                  <p><strong>Compensation:</strong> {selectedApplication.compensation}</p>
                  {selectedApplication.compensation === 'Paid' && (
                    <p><strong>Salary:</strong> {selectedApplication.salary}</p>
                  )}
                  <p><strong>Major:</strong> {selectedApplication.major}</p>
                  <p><strong>Semester:</strong> {selectedApplication.semester}</p>
                </div>
                <div>
                  <p><strong>Application Status:</strong> {getStatusText(selectedApplication.status)}</p>
                  <p><strong>Applied Date:</strong> {selectedApplication.appliedDate}</p>
                  <p><strong>Last Updated:</strong> {selectedApplication.appliedDate}</p>
                </div>
              </div>
            </div>

            {/* Box 3: Skills and Description */}
            <div className="details-card" style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Skills and Description</h3>
              <div className="skills-section" style={{ marginBottom: '20px' }}>
                <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Required Skills</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
              <div className="description">
                <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Description</h4>
                <p style={{ color: '#666', lineHeight: '1.6' }}>{selectedApplication.description}</p>
              </div>
            </div>

            {/* Box 4: Supported Documents */}
            <div className="details-card" style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Supported Documents</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div>
                  <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Required Documents</h4>
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
                  <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Additional Documents</h4>
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

            {/* Box 5: Connect */}
            <div className="details-card">
              <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Connect</h3>
              <div style={{ display: 'flex', gap: '20px', fontSize: '22px', marginTop: '10px' }}>
                {selectedApplication.social?.linkedin && (
                  <a href={selectedApplication.social.linkedin} target="_blank" rel="noreferrer" style={{ color: '#0077B5' }}>
                    <i className="fab fa-linkedin"></i>
                  </a>
                )}
                {selectedApplication.social?.twitter && (
                  <a href={selectedApplication.social.twitter} target="_blank" rel="noreferrer" style={{ color: '#1DA1F2' }}>
                    <i className="fab fa-twitter"></i>
                  </a>
                )}
                {selectedApplication.social?.website && (
                  <a href={selectedApplication.social.website} target="_blank" rel="noreferrer" style={{ color: '#0a3d62' }}>
                    <i className="fas fa-globe"></i>
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
                  <th>Actions</th>
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
                    <td>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        width: '100%',
                        padding: '0.5rem'
                      }}>
                        <button 
                          className={`schedule-interview-button ${application.status !== 'pending' ? 'disabled' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (application.status === 'pending') {
                              handleScheduleInterview(application.id);
                            }
                          }}
                          disabled={application.status !== 'pending'}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            width: '100%',
                            maxWidth: '200px',
                            padding: '0.5rem 1rem',
                            backgroundColor: application.status === 'pending' ? '#27ae60' : '#95a5a6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: application.status === 'pending' ? 'pointer' : 'not-allowed',
                            opacity: application.status === 'pending' ? 1 : 0.7
                          }}
                        >
                          <FaCalendarAlt /> Schedule Meeting
                        </button>
                      </div>
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