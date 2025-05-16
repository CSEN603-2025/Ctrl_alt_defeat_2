import React, { useEffect, useState } from 'react';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import StudentSidebar from '../components/StudentSidebar';
import './ProStudentInternships.css';
import { useNavigate, useLocation } from 'react-router-dom';

const StudentMyInternships = () => {
  const [internships, setInternships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem('studentApplications') || '[]');
    const studentInternships = apps.filter(app => app.status === 'accepted' || app.status === 'finalized');

    const dummyInternships = [
      {
        internship: {
          id: 1,
          title: 'Software Development Intern',
          company: 'Instabug',
          logo: '/images/instabug.png',
          startDate: '2024-01-15',
          endDate: '2024-04-15',
          duration: '3 months',
          status: 'finalized',
          finalGrade: 'A+',
          type: 'Full-time',
          salary: '$25/hour',
          compensation: 'Paid',
          industry: 'Technology',
          requirements: ['Python', 'JavaScript', 'React'],
          description: 'Join our development team to work on cutting-edge web applications.',
          major: 'Computer Science',
          semester: 'Semester 1'
        },
        status: 'finalized',
        appliedAt: '2023-12-01'
      },
      {
        internship: {
          id: 2,
          title: 'Junior Developer Intern',
          company: 'Breadfast',
          logo: '/images/breadfast.png',
          startDate: '2024-02-01',
          endDate: '2024-05-01',
          duration: '3 months',
          status: 'finalized',
          finalGrade: 'A',
          type: 'Part-time',
          salary: '$20/hour',
          compensation: 'Paid',
          industry: 'E-commerce',
          requirements: ['Java', 'HTML', 'CSS'],
          description: 'Learn the basics of software development in a supportive environment.',
          major: 'Computer Science',
          semester: 'Semester 2'
        },
        status: 'finalized',
        appliedAt: '2023-12-15'
      },
      {
        internship: {
          id: 3,
          title: 'Web Development Intern',
          company: 'Bosta',
          logo: '/images/bosta.png',
          startDate: '2024-03-01',
          endDate: '2024-06-01',
          duration: '4 months',
          status: 'accepted',
          progress: '50',
          type: 'Full-time',
          salary: '$22/hour',
          compensation: 'Paid',
          industry: 'Logistics',
          requirements: ['JavaScript', 'Node.js', 'MongoDB'],
          description: 'Work on full-stack web development projects.',
          major: 'Computer Science',
          semester: 'Semester 3'
        },
        status: 'accepted',
        appliedAt: '2024-01-01'
      },
      {
        internship: {
          id: 4,
          title: 'Mobile App Development Intern',
          company: 'Valeo',
          logo: '/images/valeo.png',
          startDate: '2024-04-01',
          endDate: '2024-07-01',
          duration: '3 months',
          status: 'accepted',
          progress: '25',
          type: 'Full-time',
          salary: '$24/hour',
          compensation: 'Paid',
          industry: 'Automotive',
          requirements: ['React Native', 'JavaScript', 'Mobile Development'],
          description: 'Develop cross-platform mobile applications.',
          major: 'Computer Science',
          semester: 'Semester 4'
        },
        status: 'accepted',
        appliedAt: '2024-01-15'
      }
    ];

    const combinedInternships = [...studentInternships, ...dummyInternships];
    setInternships(combinedInternships);
  }, []);

  const currentInternships = internships.filter(app => app.status === 'accepted');
  const completedInternships = internships.filter(app => app.status === 'finalized');

  const filterFn = app => {
    const matchesSearch =
      app.internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.internship.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate =
      !dateFilter || new Date(app.appliedAt).toISOString().slice(0, 10) === dateFilter;
    return matchesSearch && matchesDate;
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="pro-student-layout">
      <StudentSidebar />
      <div className="pro-student-content">
        <div className="hero-banner">
          <h2>Internships</h2>
        </div>

        {/* Tabs */}
        <div className="internship-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            className={`tab-button ${isActive('/student/internships') ? 'active' : ''}`}
            style={{ flex: 1, background: isActive('/student/internships') ? '#0a3d62' : 'white', color: isActive('/student/internships') ? 'white' : 'inherit' }}
            onClick={() => navigate('/student/internships')}
          >
            All Internships
          </button>
          
          <button 
            className={`tab-button ${isActive('/student/my-internships') ? 'active' : ''}`}
            style={{ flex: 1, background: isActive('/student/my-internships') ? '#0a3d62' : 'white', color: isActive('/student/my-internships') ? 'white' : 'inherit' }}
            onClick={() => navigate('/student/my-internships')}
          >
            My Internships
          </button>
        </div>

        {/* Search and filter */}
        <div className="search-section" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="icon-field">
            <FaSearch className="input-icon" />
            <input
              type="text"
              placeholder="Search by company or job title..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="icon-field">
            <FaCalendarAlt className="input-icon" />
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Current Internships */}
        <h3 style={{ marginTop: '2rem' }}>Current Internships</h3>
        <div className="internship-table-container animated fadeInUp">
          <table className="internship-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {currentInternships.filter(filterFn).length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center' }}>No current internships found.</td></tr>
              ) : (
                currentInternships.filter(filterFn).map((app, idx) => (
                  <tr
                    key={idx}
                    onClick={() => navigate(`/student/internship/${app.internship.id}`, { state: { internship: app.internship } })}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {app.internship.logo && (
                          <img src={app.internship.logo} alt={app.internship.company} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                        )}
                        {app.internship.company}
                      </div>
                    </td>
                    <td>{app.internship.title}</td>
                    <td>{app.internship.startDate || '-'}</td>
                    <td>{app.internship.endDate || '-'}</td>
                    <td>In Progress</td>
                    <td>{app.internship.progress ? `${app.internship.progress}%` : '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Completed Internships */}
        <h3 style={{ marginTop: '2rem' }}>Completed Internships</h3>
        <div className="internship-table-container animated fadeInUp">
          <table className="internship-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Final Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedInternships.filter(filterFn).length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center' }}>No completed internships found.</td></tr>
              ) : (
                completedInternships.filter(filterFn).map((app, idx) => (
                  <tr
                    key={idx}
                    onClick={() => navigate(`/student/internship/${app.internship.id}`, { state: { internship: app.internship } })}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {app.internship.logo && (
                          <img src={app.internship.logo} alt={app.internship.company} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                        )}
                        {app.internship.company}
                      </div>
                    </td>
                    <td>{app.internship.title}</td>
                    <td>{app.internship.duration || '-'}</td>
                    <td>Completed</td>
                    <td>{app.internship.finalGrade || 'A'}</td>
                    <td>
                      <span style={{ color: '#0a3d62', cursor: 'pointer', marginRight: '1rem' }}>Evaluation</span>
                      <span style={{ color: '#0a3d62', cursor: 'pointer' }}>Report</span>
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

export default StudentMyInternships;
