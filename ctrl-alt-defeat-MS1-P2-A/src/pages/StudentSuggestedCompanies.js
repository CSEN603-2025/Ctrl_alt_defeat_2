import React from 'react';
import StudentSidebar from '../components/StudentSidebar';
import './ProStudentDashboard.css';

// Mock student job interests (in a real app, get from profile or context)
const studentJobInterests = [
  'Software Development',
  'Web Development',
  'Mobile App Development',
  'UI/UX Design'
];

// Mock companies (structure similar to CompanyDashboard.js)
const companies = [
  {
    id: 1,
    name: 'InstaBug',
    logo: '/images/instabug.png',
    industry: 'Tech',
    jobFields: ['Software Development', 'Web Development'],
    description: 'A leading software bug tracking company.',
    recommendedBy: ['Ahmed Mostafa (2023 Intern)'],
    website: 'https://instabug.com'
  },
  {
    id: 2,
    name: 'Breadfast',
    logo: '/images/breadfast.png',
    industry: 'Marketing',
    jobFields: ['Marketing', 'UI/UX Design'],
    description: 'A fast-growing food delivery startup.',
    recommendedBy: ['Sara Emad (2022 Intern)'],
    website: 'https://breadfast.com'
  },
  {
    id: 3,
    name: 'Valeo',
    logo: '/images/valeo.png',
    industry: 'Tech',
    jobFields: ['Software Development', 'Mobile App Development'],
    description: 'A global automotive supplier.',
    recommendedBy: ['Mohamed Ali (2024 Intern)'],
    website: 'https://valeo.com'
  },
  {
    id: 4,
    name: 'Bosta',
    logo: '/images/bosta.png',
    industry: 'Technology',
    jobFields: ['Web Development', 'Software Development'],
    description: 'A logistics and delivery company.',
    recommendedBy: ['Laila Hassan (2023 Intern)'],
    website: 'https://bosta.co'
  }
];

// Filter companies by student job interests and industry
const suggestedCompanies = companies.filter(company =>
  company.jobFields.some(field => studentJobInterests.includes(field))
);

const StudentSuggestedCompanies = () => {
  return (
    <div className="pro-student-layout">
      <StudentSidebar />
      <div className="pro-student-content">
        <div className="hero-banner">
          <h2>Suggested Companies</h2>
          <p className="subtext">Based on your job interests and recommendations from past interns</p>
        </div>
        <div className="dashboard-sections">
          <div className="section-card">
            <h2>Recommended for You</h2>
            <div className="internship-table-container">
              <table className="internship-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Industry</th>
                    <th>Description</th>
                    <th>Recommended By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {suggestedCompanies.map(company => (
                    <tr key={company.id} className="pop-in delay-0">
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={company.logo}
                            alt={company.name}
                            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/images/company-logo.png';
                            }}
                          />
                          {company.name}
                        </div>
                      </td>
                      <td>{company.industry}</td>
                      <td>{company.description}</td>
                      <td>{company.recommendedBy.join(', ')}</td>
                      <td>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="company-link"
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#0a3d62',
                            color: 'white',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            display: 'inline-block'
                          }}
                        >
                          Visit Website
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSuggestedCompanies; 