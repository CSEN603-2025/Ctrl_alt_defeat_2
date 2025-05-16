import React, { useState } from 'react';
import { FaSearch, FaBuilding, FaClock, FaMoneyBillWave, FaGraduationCap, FaCalendarAlt, FaIndustry, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import StudentSidebar from '../components/StudentSidebar';
import './ProStudentInternships.css';
import { useNavigate, useLocation } from 'react-router-dom';

const internships = [
  {
    id: 1,
    title: 'Software Development Intern',
    company: 'Instabug',
    logo: '/images/instabug.png',
    duration: '3 months',
    type: 'Full-time',
    salary: '$25/hour',
    compensation: 'Paid',
    industry: 'Technology',
    requirements: ['Python', 'JavaScript', 'React'],
    description: 'Join our development team to work on cutting-edge web applications.',
    major: 'Computer Science',
    semester: 'Semester 1',
    date: '2024-03-15',
    social: {
      linkedin: 'https://linkedin.com/company/instabug',
      twitter: 'https://twitter.com/instabug',
      website: 'https://instabug.com'
    },
    requiredDocuments: [
      'CV/Resume',
      'Cover Letter',
      'Academic Transcript',
      'ID/Passport Copy'
    ]
  },
  {
    id: 2,
    title: 'Junior Developer Intern',
    company: 'Breadfast',
    logo: '/images/breadfast.png',
    duration: '3 months',
    type: 'Part-time',
    salary: '$20/hour',
    compensation: 'Paid',
    industry: 'E-commerce',
    requirements: ['Java', 'HTML', 'CSS'],
    description: 'Learn the basics of software development in a supportive environment.',
    major: 'Computer Science',
    semester: 'Semester 2',
    date: '2024-03-10',
    social: {
      linkedin: 'https://linkedin.com/company/breadfast',
      twitter: '',
      website: 'https://breadfast.com'
    },
    requiredDocuments: [
      'CV/Resume',
      'Cover Letter',
      'Academic Transcript',
      'ID/Passport Copy'
    ]
  },
  {
    id: 3,
    title: 'Web Development Intern',
    company: 'Bosta',
    logo: '/images/bosta.png',
    duration: '4 months',
    type: 'Full-time',
    salary: '$22/hour',
    compensation: 'Paid',
    industry: 'Logistics',
    requirements: ['JavaScript', 'Node.js', 'MongoDB'],
    description: 'Work on full-stack web development projects.',
    major: 'Computer Science',
    semester: 'Semester 3',
    date: '2024-03-05',
    social: {
      linkedin: 'https://linkedin.com/company/bosta',
      twitter: '',
      website: 'https://bosta.co'
    },
    requiredDocuments: [
      'CV/Resume',
      'Cover Letter',
      'Academic Transcript',
      'ID/Passport Copy'
    ]
  },
  {
    id: 4,
    title: 'Mobile App Development Intern',
    company: 'Valeo',
    logo: '/images/valeo.png',
    duration: '3 months',
    type: 'Full-time',
    salary: '$24/hour',
    compensation: 'Paid',
    industry: 'Automotive',
    requirements: ['React Native', 'JavaScript', 'Mobile Development'],
    description: 'Develop cross-platform mobile applications.',
    major: 'Computer Science',
    semester: 'Semester 4',
    date: '2024-03-01',
    social: {
      linkedin: 'https://linkedin.com/company/valeo',
      twitter: '',
      website: 'https://valeo.com'
    },
    requiredDocuments: [
      'CV/Resume',
      'Cover Letter',
      'Academic Transcript',
      'ID/Passport Copy'
    ]
  },
];

const industries = ['Technology', 'E-commerce', 'Logistics', 'Automotive'];
const durations = ['3 months', '4 months'];
const compensations = ['Paid', 'Unpaid'];

const StudentInternships = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [filterDuration, setFilterDuration] = useState('');
  const [filterCompensation, setFilterCompensation] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const filterAndSort = () => {
    return internships.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = filterIndustry ? item.industry === filterIndustry : true;
      const matchesDuration = filterDuration ? item.duration === filterDuration : true;
      const matchesComp = filterCompensation ? item.compensation === filterCompensation : true;
      return matchesSearch && matchesIndustry && matchesDuration && matchesComp;
    });
  };

  const handleInternshipSelect = (internship) => {
    navigate(`/student/internships/${internship.id}`, { state: { internship } });
  };

  return (
    <div className="pro-student-layout">
      <StudentSidebar />
      <div className="pro-student-content">
        <div className="hero-banner">
          <h2> Internships</h2>
        </div>

        {/* Tab Navigation */}
        <div className="internship-tabs">
          <button
            className={`tab-button ${isActive('/student/internships') ? 'active' : ''}`}
            onClick={() => navigate('/student/internships')}
          >
            All Internships
          </button>
         
          <button
            className={`tab-button ${isActive('/student/my-internships') ? 'active' : ''}`}
            onClick={() => navigate('/student/my-internships')}
          >
            My Internships
          </button>
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <div className="icon-field">
            <FaSearch className="input-icon" />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="icon-field">
            <FaIndustry className="input-icon" />
            <select value={filterIndustry} onChange={e => setFilterIndustry(e.target.value)}>
              <option value="">All Industries</option>
              {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </div>
          <div className="icon-field">
            <FaClock className="input-icon" />
            <select value={filterDuration} onChange={e => setFilterDuration(e.target.value)}>
              <option value="">All Durations</option>
              {durations.map(dur => <option key={dur} value={dur}>{dur}</option>)}
            </select>
          </div>
          <div className="icon-field">
            <FaMoneyBillWave className="input-icon" />
            <select value={filterCompensation} onChange={e => setFilterCompensation(e.target.value)}>
              <option value="">All Compensation</option>
              {compensations.map(comp => <option key={comp} value={comp}>{comp}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="internship-table-container animated fadeInUp">
          <table className="internship-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Industry</th>
                <th>Compensation</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {filterAndSort().map((internship) => (
                <tr
                  key={internship.id}
                  className="pop-in delay-0"
                  onClick={() => handleInternshipSelect(internship)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={internship.logo}
                        alt={internship.company}
                        style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/company-logo.png';
                        }}
                      />
                      {internship.company}
                    </div>
                  </td>
                  <td>{internship.title}</td>
                  <td>{internship.industry}</td>
                  <td>{internship.compensation} {internship.salary}</td>
                  <td>{internship.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentInternships;
