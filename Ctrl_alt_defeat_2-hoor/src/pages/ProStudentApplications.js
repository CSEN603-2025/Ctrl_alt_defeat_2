import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBuilding, FaClock, FaMoneyBillWave, FaGraduationCap, FaCalendarAlt, FaCheck, FaTimes, FaFilter } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import './ProStudentApplications.css';

const ProStudentApplications = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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
      semester: 'Semester 5'
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
      semester: 'Semester 6'
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
      semester: 'Semester 7'
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
      semester: 'Semester 4'
    },
    {
      id: 5,
      company: 'Server Systems',
      position: 'DevOps Intern',
      status: 'pending',
      appliedDate: '2024-03-18',
      requirements: ['CI/CD', 'Docker', 'Jenkins'],
      description: 'Learn DevOps practices and tools.',
      major: 'Software Engineering',
      semester: 'Semester 5'
    },
    {
      id: 6,
      company: 'Tech Hardware',
      position: 'Hardware Engineering Intern',
      status: 'finalized',
      appliedDate: '2024-03-12',
      requirements: ['C++', 'Embedded Systems', 'PCB Design'],
      description: 'Work on hardware design and embedded systems.',
      major: 'Computer Engineering',
      semester: 'Semester 6'
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

  const handleViewDetails = (id) => {
    navigate(`/pro-student/application/${id}`);
  };

  const handleScheduleInterview = (applicationId) => {
    navigate(`/pro-student/schedule-interview/${applicationId}`);
  };

  const filteredApplications = applications.filter(application => {
    const matchesStatus = selectedStatus === 'all' || application.status === selectedStatus;
    const matchesSearch = application.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         application.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <BackButton />
        <h1>My Applications</h1>

        <div className="search-section">
          <div className="search-bar">
            <div className="icon-field">
              <FaSearch className="input-icon" />
              <input
                type="text"
                placeholder="Search by company or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={() => setSearchQuery('')}>
              <FaSearch /> Clear
            </button>
          </div>
        </div>

        <div className="filter-buttons">
          <button
            className={selectedStatus === 'all' ? 'selected' : ''}
            onClick={() => setSelectedStatus('all')}
          >
            All
          </button>
          <button
            className={selectedStatus === 'pending' ? 'selected' : ''}
            onClick={() => setSelectedStatus('pending')}
          >
            Pending Review
          </button>
          <button
            className={selectedStatus === 'finalized' ? 'selected' : ''}
            onClick={() => setSelectedStatus('finalized')}
          >
            Finalized
          </button>
          <button
            className={selectedStatus === 'accepted' ? 'selected' : ''}
            onClick={() => setSelectedStatus('accepted')}
          >
            Accepted
          </button>
          <button
            className={selectedStatus === 'rejected' ? 'selected' : ''}
            onClick={() => setSelectedStatus('rejected')}
          >
            Rejected
          </button>
        </div>

        <div className="applications-list">
          {filteredApplications.map(application => (
            <div key={application.id} className="application-card">
              <div className="application-header">
                <div className="company-info">
                  <FaBuilding className="company-icon" />
                  <div>
                    <h3>{application.position}</h3>
                    <p className="company-name">{application.company}</p>
                  </div>
                </div>
                <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>
                  {getStatusText(application.status)}
                </span>
              </div>
              <div className="application-details">
                <p><strong>Applied on:</strong> {application.appliedDate}</p>
                <div className="requirements">
                  <strong>Requirements:</strong>
                  <div className="requirement-tags">
                    {application.requirements.map(req => (
                      <span key={req} className="requirement-tag">{req}</span>
                    ))}
                  </div>
                </div>
                <p className="description">{application.description}</p>
                <div className="application-actions">
                  <button 
                    className="view-details-button"
                    onClick={() => handleViewDetails(application.id)}
                  >
                    View Details
                  </button>
                  {application.status === 'pending' && (
                    <button 
                      className="schedule-interview-button"
                      onClick={() => handleScheduleInterview(application.id)}
                    >
                      <FaCalendarAlt /> Schedule Interview
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProStudentApplications; 