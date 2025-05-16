import React, { useState } from 'react';
import './CompanyRegistration.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CompanyRegistration() {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [logo, setLogo] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleLogoUpload = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleDocumentUpload = (e) => {
    setDocuments([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!companyName || !industry || !companySize || !logo || documents.length === 0) {
      setError('Please fill in all required fields and upload files.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess('Registration submitted successfully!');
    }, 1500);
  };

  return (
    <>
      <Header showBack />
      <div className="reg-container">
        <form className="reg-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Company Registration</h2>
            <p>Please provide your company details to create your account</p>
          </div>

          <label>Company Name *</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
            required
          />

          <label>Industry *</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          >
            <option value="">Select an industry</option>
            <option value="Tech">Technology</option>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
          </select>

          <label>Company Size *</label>
          <div className="radio-container">
            <label>
              <input
                type="radio"
                value="small"
                checked={companySize === 'small'}
                onChange={() => setCompanySize('small')}
              />
              <span className="size-label">Small</span> <span className="employee-count">Less than 50 employees</span>
            </label>
            <label>
              <input
                type="radio"
                value="medium"
                checked={companySize === 'medium'}
                onChange={() => setCompanySize('medium')}
              />
              <span className="size-label">Medium</span> <span className="employee-count">50–100 employees</span>
            </label>
            <label>
              <input
                type="radio"
                value="large"
                checked={companySize === 'large'}
                onChange={() => setCompanySize('large')}
              />
              <span className="size-label">Large</span> <span className="employee-count">100-500 employees</span>
            </label>
            <label>
              <input
                type="radio"
                value="enterprise"
                checked={companySize === 'enterprise'}
                onChange={() => setCompanySize('enterprise')}
              />
              <span className="size-label">Corporate</span> <span className="employee-count">More than 500 employees</span>
            </label>
          </div>

          <div className="upload-section">
            <label>Company Logo *</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleLogoUpload}
              required
            />
            {logo && <p className="upload-info">{logo.name}</p>}

            <label>Verification Documents *</label>
            <input
              type="file"
              multiple
              accept=".pdf, .doc, .docx"
              onChange={handleDocumentUpload}
              required
            />
            {documents.length > 0 && (
              <ul className="upload-info">
                {documents.map((doc, index) => (
                  <li key={index}>{doc.name}</li>
                ))}
              </ul>
            )}
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          {loading && <p className="loading-message">Submitting...</p>}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>

      </div>

      <Footer />
    </>
  );
}

export default CompanyRegistration;
