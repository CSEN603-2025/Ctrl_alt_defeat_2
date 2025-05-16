import React, { useEffect, useState } from 'react';
import { FaSearch, FaClock, FaMoneyBillWave, FaCalendarAlt, FaCheck, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import StudentSidebar from '../components/StudentSidebar';
import './StudentApplications.css';

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

const StudentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    // Get applications from localStorage
    let apps = JSON.parse(localStorage.getItem('studentApplications') || '[]');
    
    // If no applications exist, add some sample data
    if (apps.length === 0) {
      apps = [
        {
          id: 1,
          internship: {
            company: "Tech Corp",
            title: "Software Engineering Intern",
            industry: "Technology",
            compensation: "$25",
            salary: "per hour",
            duration: "3 months",
            logo: "https://via.placeholder.com/30"
          },
          status: "pending",
          appliedAt: new Date().toISOString()
        },
        {
          id: 2,
          internship: {
            company: "Data Systems",
            title: "Data Science Intern",
            industry: "Data Analytics",
            compensation: "$30",
            salary: "per hour",
            duration: "6 months",
            logo: "https://via.placeholder.com/30"
          },
          status: "accepted",
          appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      localStorage.setItem('studentApplications', JSON.stringify(apps));
    }
    
    console.log('Loaded applications:', apps);
    setApplications(apps);
  }, []);

  const filteredApplications = applications
    .filter(app => {
      const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
      const matchesSearch = app.internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.internship.company.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.appliedAt) - new Date(a.appliedAt);
      } else {
        return new Date(a.appliedAt) - new Date(b.appliedAt);
      }
    });

  return (
    <div className="pro-student-layout">
      <StudentSidebar />
      <div className="pro-student-content">
        <div className="hero-banner">
          <h2>My Internship Applications</h2>
        </div>
        {!selectedApplication && (
          <div className="search-section">
            <div className="search-bar">
              <div className="icon-field">
                <FaSearch className="input-icon" />
                <input
                  type="text"
                  placeholder="Search by company or position..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="icon-field">
                <FaFilter className="input-icon" />
                <select 
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value)}
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
                <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        )}

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
              {filteredApplications.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center' }}>No applications yet.</td></tr>
              ) : (
                filteredApplications.map((app, idx) => (
                  <tr 
                    key={idx} 
                    className="pop-in delay-0"
                    onClick={() => setSelectedApplication(app)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img 
                          src={app.internship.logo} 
                          alt={app.internship.company}
                          style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/company-logo.png';
                          }}
                        />
                        {app.internship.company}
                      </div>
                    </td>
                    <td>{app.internship.title}</td>
                    <td>{app.internship.industry}</td>
                    <td>{app.internship.compensation} {app.internship.salary}</td>
                    <td>{app.internship.duration}</td>
                    <td>{new Date(app.appliedAt).toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(app.status)}`}>
                        {getStatusText(app.status)}
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
                          className={`schedule-interview-button ${app.status !== 'pending' ? 'disabled' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (app.status === 'pending') {
                              // Handle schedule interview
                            }
                          }}
                          disabled={app.status !== 'pending'}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            width: '100%',
                            maxWidth: '200px',
                            padding: '0.5rem 1rem',
                            backgroundColor: app.status === 'pending' ? '#27ae60' : '#95a5a6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: app.status === 'pending' ? 'pointer' : 'not-allowed',
                            opacity: app.status === 'pending' ? 1 : 0.7
                          }}
                        >
                          <FaCalendarAlt /> Schedule Meeting
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentApplications; 