import React, { useState } from 'react';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import './ProStudentSuggestedCompanies.css';

const ProStudentSuggestedCompanies = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Mock data for industries
  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Manufacturing',
    'Retail',
    'Consulting'
  ];

  // Mock data for suggested companies
  const suggestedCompanies = [
    {
      id: 1,
      name: 'Quantum Computing Corp',
      logo: '/images/instabug.png',
      industry: 'Quantum Computing',
      matchScore: 95,
      reason: 'Matches your interest in cutting-edge technology and strong programming skills',
      pastInterns: 15,
      rating: 4.9,
      location: 'Cairo, Egypt',
      description: 'Leading quantum computing company developing next-generation quantum algorithms and software. We focus on creating innovative solutions that push the boundaries of computational capabilities.',
      recommendedBy: ['Industry experts', 'Research partners']
    },
    {
      id: 2,
      name: 'RoboTech Industries',
      logo: '/images/breadfast.png',
      industry: 'Robotics',
      matchScore: 92,
      reason: 'Based on your robotics projects and automation experience',
      pastInterns: 28,
      rating: 4.8,
      location: 'Alexandria, Egypt',
      description: 'Innovative robotics company developing autonomous systems and robotic solutions. We create cutting-edge robots for industrial, commercial, and research applications.',
      recommendedBy: ['Career center', 'Industry leaders']
    },
    {
      id: 3,
      name: 'BioTech Innovations',
      logo: '/images/bosta.png',
      industry: 'Biotechnology',
      matchScore: 88,
      reason: 'Matches your computational biology background and data analysis skills',
      pastInterns: 32,
      rating: 4.7,
      location: 'Giza, Egypt',
      description: 'Pioneering biotech company combining computational biology with cutting-edge research. We develop innovative solutions for healthcare and biological research.',
      recommendedBy: ['Research partners', 'Healthcare experts']
    },
    {
      id: 4,
      name: 'GreenTech Solutions',
      logo: '/images/valeo.png',
      industry: 'Clean Energy',
      matchScore: 90,
      reason: 'Based on your interest in sustainable technology and software development',
      pastInterns: 25,
      rating: 4.8,
      location: 'Cairo, Egypt',
      description: 'Leading clean energy technology company developing smart grid solutions. We create innovative software for managing renewable energy systems and optimizing power distribution.',
      recommendedBy: ['Environmental experts', 'Energy sector leaders']
    }
  ];

  const filteredCompanies = suggestedCompanies.filter(company => {
    const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;
    const matchesSearch = !searchQuery || 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
  };

  const handleBackToList = () => {
    setSelectedCompany(null);
  };

  if (selectedCompany) {
    return (
      <div className="pro-student-layout">
        <ProStudentSidebar />
        <div className="pro-student-content">
          <BackButton />
          <div className="company-details-view">
            <div className="company-header">
              <h1>{selectedCompany.name}</h1>
              <div className="match-score">
                <span className="score">{selectedCompany.matchScore}%</span>
                <span className="label">Match</span>
              </div>
            </div>

            <div className="company-info">
              <div className="info-section">
                <h2>Company Overview</h2>
                <p className="industry">Industry: {selectedCompany.industry}</p>
                <p className="location">Location: {selectedCompany.location}</p>
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-value">{selectedCompany.rating}</span>
                  <span className="interns">({selectedCompany.pastInterns} past interns)</span>
                </div>
              </div>

              <div className="info-section">
                <h2>Why This Company?</h2>
                <p>{selectedCompany.reason}</p>
              </div>

              <div className="info-section">
                <h2>Recommended By</h2>
                <ul className="recommendations-list">
                  {selectedCompany.recommendedBy.map((source, index) => (
                    <li key={index}>{source}</li>
                  ))}
                </ul>
              </div>

              <div className="info-section">
                <h2>About the Company</h2>
                <p>{selectedCompany.description}</p>
              </div>

              <div className="action-buttons">
                <button className="back-to-list" onClick={handleBackToList}>
                  Back to List
                </button>
                <button className="apply-button">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <BackButton />
        <h1>Suggested Companies</h1>
        
        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="industry-filter">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option value="">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="companies-grid">
          {filteredCompanies.map(company => (
            <div key={company.id} className="company-card">
              <div className="company-header">
                <h3>{company.name}</h3>
                <div className="match-score">
                  <span className="score">{company.matchScore}%</span>
                  <span className="label">Match</span>
                </div>
              </div>

              <div className="company-details">
                <p className="industry">{company.industry}</p>
                <p className="location">{company.location}</p>
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-value">{company.rating}</span>
                  <span className="interns">({company.pastInterns} past interns)</span>
                </div>
              </div>

              <div className="match-reason">
                <h4>Why this company?</h4>
                <p>{company.reason}</p>
              </div>

              <div className="recommendations">
                <h4>Recommended by:</h4>
                <ul>
                  {company.recommendedBy.map((source, index) => (
                    <li key={index}>{source}</li>
                  ))}
                </ul>
              </div>

              <div className="company-description">
                <p>{company.description}</p>
              </div>

              <button 
                className="view-details-btn"
                onClick={() => handleViewDetails(company)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProStudentSuggestedCompanies; 