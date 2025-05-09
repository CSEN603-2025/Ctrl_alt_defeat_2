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
      name: 'Tech Solutions Inc.',
      industry: 'Technology',
      matchScore: 95,
      reason: 'Matches your interest in software development and previous internship experience',
      pastInterns: 12,
      rating: 4.8,
      location: 'Cairo, Egypt',
      description: 'Leading technology company specializing in enterprise software solutions...',
      recommendedBy: ['Previous interns', 'Industry experts']
    },
    {
      id: 2,
      name: 'Global Finance Group',
      industry: 'Finance',
      matchScore: 88,
      reason: 'Based on your finance courses and business analysis skills',
      pastInterns: 8,
      rating: 4.6,
      location: 'Alexandria, Egypt',
      description: 'International financial services company with focus on investment banking...',
      recommendedBy: ['Career center', 'Faculty members']
    },
    // Add more mock companies as needed
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