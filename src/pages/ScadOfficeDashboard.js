import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaBuilding, FaCheck, FaTimes, FaSearch, FaSignOutAlt, FaTh, FaUsers, FaChartBar, FaCog, FaFilter, FaSortAmountDown, FaArrowLeft, FaBriefcase } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import './ScadOfficeDashboard.css';

const ScadOfficeDashboard = () => {
  const navigate = useNavigate();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [activeView, setActiveView] = useState('companies');
  const [durationFilter, setDurationFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Tech Corp',
      industry: 'Technology',
      status: 'pending',
      applicationDate: '2024-03-15',
      contactPerson: 'John Doe',
      email: 'john@techcorp.com',
      phone: '+1 234-567-8900',
      description: 'A leading technology company specializing in software development and digital solutions.',
      website: 'https://techcorp.com',
      location: 'Cairo, Egypt',
      size: '100-500 employees',
      founded: '2010',
      documents: ['Business License', 'Tax Certificate', 'Company Profile']
    },
    {
      id: 2,
      name: 'Data Analytics Co.',
      industry: 'Data Science',
      status: 'accepted',
      applicationDate: '2024-03-10',
      contactPerson: 'Jane Smith',
      email: 'jane@dataanalytics.com',
      phone: '+1 234-567-8901',
      description: 'Specializing in big data analytics and business intelligence solutions.',
      website: 'https://dataanalytics.com',
      location: 'Alexandria, Egypt',
      size: '50-200 employees',
      founded: '2015',
      documents: ['Business License', 'Tax Certificate', 'Company Profile']
    },
    {
      id: 3,
      name: 'Innovation Labs',
      industry: 'Research',
      status: 'pending',
      applicationDate: '2024-03-18',
      contactPerson: 'Mike Johnson',
      email: 'mike@innovationlabs.com',
      phone: '+1 234-567-8902',
      description: 'Research and development company focused on cutting-edge technologies.',
      website: 'https://innovationlabs.com',
      location: 'Giza, Egypt',
      size: '20-100 employees',
      founded: '2018',
      documents: ['Business License', 'Tax Certificate', 'Company Profile']
    },
    {
      id: 4,
      name: 'Global Solutions',
      industry: 'Consulting',
      status: 'rejected',
      applicationDate: '2024-03-05',
      contactPerson: 'Sarah Wilson',
      email: 'sarah@globalsolutions.com',
      phone: '+1 234-567-8903',
      description: 'International consulting firm providing business solutions worldwide.',
      website: 'https://globalsolutions.com',
      location: 'Cairo, Egypt',
      size: '500+ employees',
      founded: '2005',
      documents: ['Business License', 'Tax Certificate', 'Company Profile']
    }
  ]);
  const [internships, setInternships] = useState([
    {
      id: 1,
      companyName: 'Tech Corp',
      jobTitle: 'Software Development Intern',
      duration: '3 months',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      location: 'Cairo, Egypt',
      requirements: ['Python', 'React', 'SQL'],
      description: 'Join our development team to work on cutting-edge software solutions.',
      status: 'active',
      industry: 'Technology',
      isPaid: true,
      salary: '5000 EGP/month'
    },
    {
      id: 2,
      companyName: 'Data Analytics Co.',
      jobTitle: 'Data Science Intern',
      duration: '6 months',
      startDate: '2024-07-01',
      endDate: '2024-12-31',
      location: 'Alexandria, Egypt',
      requirements: ['Python', 'Machine Learning', 'Data Analysis'],
      description: 'Work with our data science team on real-world analytics projects.',
      status: 'active',
      industry: 'Data Science',
      isPaid: true,
      salary: '6000 EGP/month'
    },
    {
      id: 3,
      companyName: 'Innovation Labs',
      jobTitle: 'Research Intern',
      duration: '4 months',
      startDate: '2024-08-01',
      endDate: '2024-11-30',
      location: 'Giza, Egypt',
      requirements: ['Research Skills', 'Technical Writing', 'Data Analysis'],
      description: 'Contribute to ongoing research projects in emerging technologies.',
      status: 'active',
      industry: 'Research',
      isPaid: false,
      salary: 'Unpaid'
    },
    {
      id: 4,
      companyName: 'Global Solutions',
      jobTitle: 'Business Development Intern',
      duration: '3 months',
      startDate: '2024-09-01',
      endDate: '2024-11-30',
      location: 'Cairo, Egypt',
      requirements: ['Business Analysis', 'Market Research', 'Communication'],
      description: 'Learn about business development and market analysis.',
      status: 'active',
      industry: 'Business',
      isPaid: true,
      salary: '4500 EGP/month'
    }
  ]);

  const handleBellClick = () => {
    navigate('/scad-office/notifications');
  };

  const handleCompanyAction = (companyId, action) => {
    setCompanies(companies.map(company => 
      company.id === companyId 
        ? { ...company, status: action === 'accept' ? 'accepted' : 'rejected' }
        : company
    ));
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const handleBackToList = () => {
    setSelectedCompany(null);
    setSelectedInternship(null);
  };

  const handleInternshipClick = (internship) => {
    setSelectedInternship(internship);
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    const matchesIndustry = !industryFilter || company.industry === industryFilter;
    return matchesSearch && matchesStatus && matchesIndustry;
  }).sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.applicationDate) - new Date(a.applicationDate);
    } else if (sortOrder === 'oldest') {
      return new Date(a.applicationDate) - new Date(b.applicationDate);
    } else if (sortOrder === 'status') {
      // Sort by status: pending first, then accepted, then rejected
      const statusOrder = { pending: 0, accepted: 1, rejected: 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return 0;
  });

  const renderCompanyDetails = () => {
    if (!selectedCompany) return null;

    return (
      <div className="company-details-view">
        <button className="back-button" onClick={handleBackToList}>
          <FaArrowLeft className="back-icon" /> Back to List
        </button>
        
        <div className="company-details-card">
          <div className="company-header">
            <h2>{selectedCompany.name}</h2>
            <span className={`status-badge ${selectedCompany.status}`}>
              {selectedCompany.status}
            </span>
          </div>

          <div className="company-info-grid">
            <div className="info-section">
              <h3>Company Information</h3>
              <div className="info-item">
                <strong>Industry:</strong> {selectedCompany.industry}
              </div>
              <div className="info-item">
                <strong>Location:</strong> {selectedCompany.location}
              </div>
              <div className="info-item">
                <strong>Company Size:</strong> {selectedCompany.size}
              </div>
              <div className="info-item">
                <strong>Founded:</strong> {selectedCompany.founded}
              </div>
              <div className="info-item">
                <strong>Website:</strong> <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer">{selectedCompany.website}</a>
              </div>
            </div>

            <div className="info-section">
              <h3>Contact Information</h3>
              <div className="info-item">
                <strong>Contact Person:</strong> {selectedCompany.contactPerson}
              </div>
              <div className="info-item">
                <strong>Email:</strong> {selectedCompany.email}
              </div>
              <div className="info-item">
                <strong>Phone:</strong> {selectedCompany.phone}
              </div>
            </div>

            <div className="info-section full-width">
              <h3>Description</h3>
              <p>{selectedCompany.description}</p>
            </div>

            <div className="info-section full-width">
              <h3>Submitted Documents</h3>
              <div className="documents-list">
                {selectedCompany.documents.map((doc, index) => (
                  <div key={index} className="document-item">
                    <span className="document-icon">📄</span>
                    {doc}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {selectedCompany.status === 'pending' && (
            <div className="action-buttons-container">
              <button
                className="approve-btn"
                onClick={() => handleCompanyAction(selectedCompany.id, 'accept')}
              >
                <FaCheck /> Accept Company
              </button>
              <button
                className="reject-btn"
                onClick={() => handleCompanyAction(selectedCompany.id, 'reject')}
              >
                <FaTimes /> Reject Company
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderInternshipDetails = () => {
    if (!selectedInternship) return null;

    return (
      <div className="internship-details-view">
        <button className="back-button" onClick={handleBackToList}>
          <FaArrowLeft className="back-icon" /> Back to List
        </button>
        
        <div className="internship-details-card">
          <div className="internship-header">
            <div className="internship-title-section">
              <h2>{selectedInternship.jobTitle}</h2>
              <h3 className="company-name">{selectedInternship.companyName}</h3>
            </div>
            <div className="internship-badges">
              <span className={`status-badge ${selectedInternship.status}`}>
                {selectedInternship.status}
              </span>
              <span className={`payment-badge ${selectedInternship.isPaid ? 'paid' : 'unpaid'}`}>
                {selectedInternship.isPaid ? 'Paid' : 'Unpaid'}
              </span>
            </div>
          </div>

          <div className="internship-info-grid">
            <div className="info-section">
              <h3>Internship Details</h3>
              <div className="info-item">
                <strong>Duration:</strong> {selectedInternship.duration}
              </div>
              <div className="info-item">
                <strong>Start Date:</strong> {selectedInternship.startDate}
              </div>
              <div className="info-item">
                <strong>End Date:</strong> {selectedInternship.endDate}
              </div>
              <div className="info-item">
                <strong>Location:</strong> {selectedInternship.location}
              </div>
              <div className="info-item">
                <strong>Industry:</strong> {selectedInternship.industry}
              </div>
            </div>

            <div className="info-section">
              <h3>Compensation</h3>
              <div className="info-item">
                <strong>Payment Type:</strong> {selectedInternship.isPaid ? 'Paid' : 'Unpaid'}
              </div>
              {selectedInternship.isPaid && (
                <div className="info-item">
                  <strong>Expected Salary:</strong> {selectedInternship.salary}
                </div>
              )}
            </div>

            <div className="info-section full-width">
              <h3>Job Description</h3>
              <p className="job-description">{selectedInternship.description}</p>
            </div>

            <div className="info-section full-width">
              <h3>Required Skills</h3>
              <div className="skills-list">
                {selectedInternship.requirements.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span className="skill-icon">•</span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInternships = () => {
    const filteredInternships = internships.filter(internship => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        internship.companyName.toLowerCase().includes(searchLower) ||
        internship.jobTitle.toLowerCase().includes(searchLower);
      const matchesIndustry = !industryFilter || internship.industry === industryFilter;
      const matchesDuration = !durationFilter || internship.duration === durationFilter;
      const matchesPayment = !paymentFilter || 
        (paymentFilter === 'paid' && internship.isPaid) ||
        (paymentFilter === 'unpaid' && !internship.isPaid);
      
      return matchesSearch && matchesIndustry && matchesDuration && matchesPayment;
    });

    return (
      <div className="internships-list">
        <div className="list-header">
          <div className="filter-bar fade-in-delayed">
            <div className="icon-field">
              <FaSearch className="input-icon" />
              <input
                type="text"
                placeholder="Search by company name or job title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="icon-field">
              <FaFilter className="input-icon" />
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
              >
                <option value="">All Industries</option>
                {[...new Set(internships.map(internship => internship.industry))].map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div className="icon-field">
              <FaFilter className="input-icon" />
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
              >
                <option value="">All Durations</option>
                {[...new Set(internships.map(internship => internship.duration))].map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>

            <div className="icon-field">
              <FaFilter className="input-icon" />
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <option value="">All Payment Types</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
          </div>
        </div>

        <div className="internships-table">
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Job Title</th>
                <th>Industry</th>
                <th>Duration</th>
                <th>Payment</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInternships.map(internship => (
                <tr 
                  key={internship.id} 
                  onClick={() => handleInternshipClick(internship)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{internship.companyName}</td>
                  <td>{internship.jobTitle}</td>
                  <td>{internship.industry}</td>
                  <td>{internship.duration}</td>
                  <td>
                    <span className={`payment-badge ${internship.isPaid ? 'paid' : 'unpaid'}`}>
                      {internship.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td>{internship.startDate}</td>
                  <td>{internship.endDate}</td>
                  <td>{internship.location}</td>
                  <td>
                    <span className={`status-badge ${internship.status}`}>
                      {internship.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredInternships.length === 0 && (
            <div className="no-results">
              <p>No internships found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="scad-office-layout">
      <div className="sidebar">
        <div className="logo">
          <img src="/images/guc-logo.png" alt="GUC Logo" className="logo-img" />
        </div>
        <nav>
          <ul>
            <li className={activeView === 'dashboard' ? 'active' : ''} onClick={() => setActiveView('dashboard')}>
              <FaTh /> Dashboard
            </li>
            <li className={activeView === 'companies' ? 'active' : ''} onClick={() => setActiveView('companies')}>
              <FaBuilding /> Companies
            </li>
            <li className={activeView === 'internships' ? 'active' : ''} onClick={() => setActiveView('internships')}>
              <FaBriefcase /> Internships
            </li>
            <li className={activeView === 'students' ? 'active' : ''} onClick={() => setActiveView('students')}>
              <FaUsers /> Students
            </li>
            <li className={activeView === 'reports' ? 'active' : ''} onClick={() => setActiveView('reports')}>
              <FaChartBar /> Reports
            </li>
            <li className={activeView === 'settings' ? 'active' : ''} onClick={() => setActiveView('settings')}>
              <FaCog /> Settings
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <img src="/images/Scad Logo.png" alt="SCAD Logo" className="sidebar-footer-img" />
          <div className="sidebar-footer-info">
            <p className="sidebar-footer-name">SCAD Office</p>
            <p className="sidebar-footer-role">Student Career Affairs</p>
            <div className="sidebar-logout" onClick={handleLogout}>
              <FiLogOut className="logout-icon" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="scad-office-content">
        <div className="header">
          <h1>{activeView === 'internships' ? 'Available Internships' : 'Company Applications'}</h1>
          <div className="notification-bell" onClick={handleBellClick}>
            <FaBell />
            {unreadNotifications > 0 && (
              <span className="notification-badge">{unreadNotifications}</span>
            )}
          </div>
        </div>

        {activeView === 'internships' ? (
          selectedInternship ? renderInternshipDetails() : renderInternships()
        ) : selectedCompany ? (
          renderCompanyDetails()
        ) : (
          <div className="company-list">
            <div className="list-header">
              <div className="filter-bar fade-in-delayed">
                <div className="icon-field">
                  <FaSearch className="input-icon" />
                  <input
                    type="text"
                    placeholder="Search by company name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="icon-field">
                  <FaFilter className="input-icon" />
                  <select
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                  >
                    <option value="">All Industries</option>
                    {[...new Set(companies.map(company => company.industry))].map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div className="icon-field">
                  <FaSortAmountDown className="input-icon" />
                  <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="status">Sort by Status</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="companies-table">
              <table>
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Industry</th>
                    <th>Status</th>
                    <th>Application Date</th>
                    <th>Contact Person</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map(company => (
                    <tr key={company.id} onClick={() => handleCompanyClick(company)} style={{ cursor: 'pointer' }}>
                      <td>{company.name}</td>
                      <td>{company.industry}</td>
                      <td>
                        <span className={`status-badge ${company.status}`}>
                          {company.status}
                        </span>
                      </td>
                      <td>{company.applicationDate}</td>
                      <td>{company.contactPerson}</td>
                      <td className="action-buttons">
                        {company.status === 'pending' && (
                          <>
                            <button
                              className="approve-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompanyAction(company.id, 'accept');
                              }}
                            >
                              <FaCheck /> Accept
                            </button>
                            <button
                              className="reject-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompanyAction(company.id, 'reject');
                              }}
                            >
                              <FaTimes /> Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredCompanies.length === 0 && (
                <div className="no-results">
                  <p>No companies found matching your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScadOfficeDashboard; 