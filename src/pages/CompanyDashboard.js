// CompanyDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaTh, FaSearch, FaFileAlt, FaComments, FaChartBar, FaNewspaper, FaBell,
  FaFilter, FaSortAmountDown
} from 'react-icons/fa';

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
  const navigate = useNavigate();
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


const handleSearch = (data) => {
  return data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
    industry: 'Tech', compensation: 'Paid',skills: ['React', 'JavaScript', 'CSS', 'Git'],salary: '$800/month',social: {
      linkedin: 'https://linkedin.com/company/instabug',
      twitter: 'https://twitter.com/instabug',
      website: 'https://instabug.com'
    },
    description:"We are looking for a passionate Frontend Developer Intern to join our team. You will work closely with our development team to create user-friendly web applications. The ideal candidate should have a strong understanding of JavaScript, React, and CSS. Knowledge of Git is a plus."
  },
  {
    id: 2, title: 'Marketing Intern', company: 'Breadfast', logo: "/images/breadfast.png",
    majors: 'Marketing', date: '2025-04-20', duration: '2 months', status: 'Closed',
    industry: 'Marketing', compensation: 'Unpaid',skills: ['SEO', 'Content Creation', 'Google Analytics', 'Email Marketing', 'Social Media Management', 'Copywriting', 'Paid Advertising', 'CRM Tools', 'Market Research', 'Brand Strategy']
,    social: {
      linkedin: 'https://www.linkedin.com/company/breadfast',
      twitter: 'https://twitter.com/breadfast',
      website: 'https://www.breadfast.com'
    },description:"Join our marketing team as a Marketing Intern. You will assist in creating and implementing marketing strategies, managing social media accounts, and analyzing market trends. The ideal candidate should have strong communication skills and a passion for marketing."
  },
  {
    id: 3, title: 'Finance Analyst Intern', company: 'Valeo', logo: "/images/valeo.png",
    majors: 'Finance', date: '2025-03-15', duration: '4 months', status: 'Active',
    industry: 'Finance', compensation: 'Paid',salary: '$1000/month',skills: ['Excel', 'Financial Analysis', 'Accounting', 'Data Visualization'],social: {
      linkedin: 'https://www.linkedin.com/company/valeo',
      twitter: 'https://twitter.com/valeo',
      website: 'https://www.valeo.com'
    },description:"Join our finance team as a Finance Analyst Intern. You will assist in financial analysis, budgeting, and forecasting. The ideal candidate should have strong analytical skills and proficiency in Excel. Knowledge of financial modeling is a plus."
  }
];


  const myInternships = [
    {
      id: 3,
      title: 'Backend Developer Intern',
      company: 'TechCorp',
      logo: 'https://via.placeholder.com/50',
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
      id: 3,
      title: 'Data Analyst Intern',
      company: 'TechCorp',
      logo: 'https://via.placeholder.com/50',
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
  ];
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
  
  const [statusMessage, setStatusMessage] = useState('');
  
  
  
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-overview">
            <h2 className="animated-title">Company Dashboard</h2>
            <p className="dashboard-subtext">Here's a quick look at your current internship activity.</p>
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
          <button onClick={() => setSelectedInternship(null)} className="back-btn">← Back to Listings</button>

          {/* Box 1: Summary */}
          <div className="details-card" style={{ marginBottom: '20px' }}>
            <div className="details-header">
              <img src={selectedInternship.logo} alt="logo" />
              <div>
                <h2>{selectedInternship.company}</h2>
                <p style={{ fontWeight: 'bold', color: '#0a3d62', margin: '5px 0' }}>{selectedInternship.title}</p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span className="badge" style={{ backgroundColor: '#3c6382' }}>{selectedInternship.industry}</span>
                  <span className={`status-tag ${selectedInternship.status.toLowerCase()}`}>{selectedInternship.status}</span>
                  <span style={{ fontSize: '12px', color: '#555' }}>📅 {selectedInternship.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: Skills and Description */}
          <div className="details-card" style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Internship Details</h3>
            <p><strong>Duration:</strong> {selectedInternship.duration}</p>
            <p><strong>Compensation:</strong> {selectedInternship.compensation}</p>
            {selectedInternship.compensation === 'Paid' && (
              <p><strong>Expected Salary:</strong> {selectedInternship.salary}</p>
            )}
            <p><strong>Majors:</strong> {selectedInternship.majors}</p>
            <p><strong>Skills Required:</strong> {selectedInternship.skills?.join(', ')}</p>
            <div className="description" style={{ marginTop: '15px' }}>
              <h4>Description</h4>
              <p>{selectedInternship.description}</p>
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
              <FaSearch className="input-icon" />
              <input
                type="text"
                placeholder="Search by job title or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="icon-field">
              <FaFilter className="input-icon" />
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
                        <td>{item.applications} {item.newApps ? <span className="badge">({item.newApps} new)</span> : null}</td>
                        <td><span className={`status-tag ${item.status.toLowerCase()}`}>{item.status}</span></td>
                        <td>{item.date}</td>
                        <td>
                          <button
                            style={{
                              border: '2px solid #ccc',
                              borderRadius: '50%',
                              padding: '5px',
                              transition: 'transform 0.2s, border-color 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'scale(1.2)';
                              e.target.style.borderColor = '#0077B5';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'scale(1)';
                              e.target.style.borderColor = '#ccc';
                            }}
                          >
                            ✏️
                          </button>
                          <button
                            style={{
                              border: '2px solid #ccc',
                              borderRadius: '50%',
                              padding: '5px',
                              transition: 'transform 0.2s, border-color 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'scale(1.2)';
                              e.target.style.borderColor = '#e55039';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'scale(1)';
                              e.target.style.borderColor = '#ccc';
                            }}
                          >
                            🗑️
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              <FaSearch className="input-icon" />
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
          <button className="back-btn" onClick={() => setSelectedApplication(null)}>← Back to Applications</button>

          <div className="details-card" style={{ marginBottom: '20px' }}>
          <div className="details-header">
  <img src={selectedApplication.photo} alt="profile" />
  <h2>{selectedApplication.name}</h2>
</div>
            <div style={{ marginBottom: '20px' }}></div>
            <p><strong>Email:</strong> {selectedApplication.email}</p>
            <p><strong>Phone:</strong> {selectedApplication.phone}</p>
            <p><strong>Internship:</strong> {selectedApplication.internshipTitle}</p>
            
            <p>
              <strong>Status:</strong> 
              <span>
                {selectedApplication.status}
              </span>
            </p>
            <a href={selectedApplication.resumeLink} target="_blank" rel="noreferrer">📄 View Resume</a>
          </div>

          <div className="details-card">
            <h3>Update Application Status</h3>
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
          <li className={activeSection === 'search' ? 'active' : ''} onClick={() => setActiveSection('search')}><FaSearch /> Search Internships</li>
          <li className={activeSection === 'applications' ? 'active' : ''} onClick={() => setActiveSection('applications')}><FaFileAlt /> Applications</li>
          <li className={activeSection === 'messages' ? 'active' : ''} onClick={() => setActiveSection('messages')}><FaComments /> Messages</li>
          <li className={activeSection === 'statistics' ? 'active' : ''} onClick={() => setActiveSection('statistics')}><FaChartBar /> Statistics</li>
          <li className={activeSection === 'news' ? 'active' : ''} onClick={() => setActiveSection('news')}><FaNewspaper /> News</li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="floating-notif">
          <FaBell className="wiggle-bell" />
        </div>
        <section className="hero-banner animated fadeSlideUp">
          <h2>Welcome back, TechCorp 👋</h2>
          <p className="subtext">
            Today is {new Date().toLocaleString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </section>

        <section className="content-area">{renderContent()}</section>
      </main>
    </div>
  );
}

export default CompanyDashboard;
