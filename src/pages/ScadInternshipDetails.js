import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaArrowLeft, FaLinkedin, FaTwitter, FaGlobe, FaHome, FaBuilding, 
  FaUserGraduate, FaBriefcase, FaFileAlt, FaChartBar, FaBell 
} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import './ScadDashboard.css';

function ScadInternshipDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const internship = location.state?.internship;
  const [activeSection, setActiveSection] = useState('internship-postings');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!internship) {
    return (
      <div className="scad-dashboard-layout">
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
              onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'dashboard' } })}
            >
              <FaHome /> Dashboard
            </li>
            <li 
              className={activeSection === 'companies' ? 'active' : ''}
              onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'companies' } })}
            >
              <FaBuilding /> Companies
            </li>
            <li 
              className={activeSection === 'students' ? 'active' : ''}
              onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'students' } })}
            >
              <FaUserGraduate /> Students
            </li>
            <li 
              className={activeSection === 'internship-postings' ? 'active' : ''}
              onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'internship-postings' } })}
            >
              <FaBriefcase /> Internship Postings
            </li>
            <li 
              className={activeSection === 'reports' ? 'active' : ''}
              onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'reports' } })}
            >
              <FaFileAlt /> Reports
            </li>
            <li 
              className={activeSection === 'statistics' ? 'active' : ''}
              onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'statistics' } })}
            >
              <FaChartBar /> Statistics
            </li>
          </ul>

          <div className="scad-sidebar-footer">
            <img src="/images/Scad Logo.png" alt="SCAD Logo" className="scad-sidebar-footer-img" />
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
            </div>
          </div>

          <div className="scad-floating-notif">
            <FaBell className="scad-wiggle-bell" />
          </div>

          <section className="scad-hero-banner scad-animated scad-fadeSlideUp">
            <h2>Internship Details</h2>
            <p className="scad-subtext">
              Today is {new Date().toLocaleString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
              })}
            </p>
          </section>

          <section className="scad-content-area">
            <div className="internship-section">
              <button className="back-btn" onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'internship-postings' } })}>
                <span className="scad-arrow-icon">←</span> Back to Internship Postings
              </button>
              <div className="details-card">
                <h3>No internship details found</h3>
                <p>Please select an internship from the dashboard to view its details.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="scad-dashboard-layout">
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
            onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'dashboard' } })}
          >
            <FaHome /> Dashboard
          </li>
          <li 
            className={activeSection === 'companies' ? 'active' : ''}
            onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'companies' } })}
          >
            <FaBuilding /> Companies
          </li>
          <li 
            className={activeSection === 'students' ? 'active' : ''}
            onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'students' } })}
          >
            <FaUserGraduate /> Students
          </li>
          <li 
            className={activeSection === 'internship-postings' ? 'active' : ''}
            onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'internship-postings' } })}
          >
            <FaBriefcase /> Internship Postings
          </li>
          <li 
            className={activeSection === 'reports' ? 'active' : ''}
            onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'reports' } })}
          >
            <FaFileAlt /> Reports
          </li>
          <li 
            className={activeSection === 'statistics' ? 'active' : ''}
            onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'statistics' } })}
          >
            <FaChartBar /> Statistics
          </li>
        </ul>

        <div className="scad-sidebar-footer">
          <img src="/images/Scad Logo.png" alt="SCAD Logo" className="scad-sidebar-footer-img" />
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
          </div>
        </div>

        <div className="scad-floating-notif">
          <FaBell className="scad-wiggle-bell" />
        </div>

        <section className="scad-hero-banner scad-animated scad-fadeSlideUp">
          <h2>Internship Details</h2>
          <p className="scad-subtext">
            Today is {new Date().toLocaleString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </section>

        <section className="scad-content-area">
          <div className="internship-section">
            <button className="back-btn" onClick={() => navigate('/scad-dashboard', { state: { activeSection: 'internship-postings' } })}>
              <span className="scad-arrow-icon">←</span> Back to Internship Postings
            </button>

            <div className="details-container">
              <div className="details-card">
                <div className="details-header">
                  <img src={internship.logo} alt={internship.company} className="company-logo" />
                  <div className="company-info">
                    <h3>{internship.title}</h3>
                    <p className="industry">{internship.company}</p>
                    <span className={`status-tag ${internship.status.toLowerCase()}`}>
                      {internship.status}
                    </span>
                  </div>
                </div>

                <div className="details-body">
                  <div className="details-section">
                    <h4>Internship Information</h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Industry</label>
                        <p>{internship.industry}</p>
                      </div>
                      <div className="info-item">
                        <label>Duration</label>
                        <p>{internship.duration}</p>
                      </div>
                      <div className="info-item">
                        <label>Compensation</label>
                        <p>{internship.compensation} {internship.salary && `(${internship.salary})`}</p>
                      </div>
                      <div className="info-item">
                        <label>Posted Date</label>
                        <p>{internship.postedDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="details-section">
                    <h4>Description</h4>
                    <p>{internship.description}</p>
                  </div>

                  <div className="details-section">
                    <h4>Required Skills</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                      {internship.skills.map((skill, index) => (
                        <span key={index} style={{ backgroundColor: '#e8f4f8', color: '#0a3d62', padding: '5px 12px', borderRadius: '15px', fontSize: '0.9rem' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="details-section">
                    <h4>Company Social Links</h4>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                      {internship.social.linkedin && (
                        <a href={internship.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                          <FaLinkedin /> LinkedIn
                        </a>
                      )}
                      {internship.social.twitter && (
                        <a href={internship.social.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                          <FaTwitter /> Twitter
                        </a>
                      )}
                      {internship.social.website && (
                        <a href={internship.social.website} target="_blank" rel="noopener noreferrer" className="social-link">
                          <FaGlobe /> Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ScadInternshipDetails; 