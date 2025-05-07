import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyDashboard.css';
import {
  FaTh, FaSearch, FaFileAlt, FaComments, FaChartBar, FaNewspaper, FaBell
} from 'react-icons/fa';
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
  const navigate = useNavigate(); // Initialize navigate

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
  return (
    <div className="dashboard-overview">
      <h2 className="animated-title">Company Dashboard</h2>
      <p className="dashboard-subtext">Here's a quick look at your current internship activity.</p>

      {/* Stat Cards */}
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

      {/* Chart Sections */}
      <div className="dashboard-charts">
        <div className="chart-section">
          <h4>Reports Status per Cycle</h4>
          <Bar
            data={{
              labels: ['Cycle 1', 'Cycle 2', 'Cycle 3'],
              datasets: [
                {
                  label: 'Accepted',
                  data: [12, 19, 14],
                  backgroundColor: '#38ada9'
                },
                {
                  label: 'Rejected',
                  data: [5, 3, 6],
                  backgroundColor: '#e55039'
                },
                {
                  label: 'Flagged',
                  data: [2, 1, 3],
                  backgroundColor: '#f6b93b'
                }
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

      case 'search': return <h2 className="animated fadeIn"></h2>;
      case 'applications': return <h2 className="animated fadeIn"></h2>;
      case 'messages': return <h2 className="animated fadeIn"></h2>;
      case 'statistics': return <h2 className="animated fadeIn"></h2>;
      case 'news': return <h2 className="animated fadeIn"></h2>;
      default: return null;
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
         {/* Navigation Buttons */}
      </main>
      
    </div>
    
  );
}

export default CompanyDashboard;
