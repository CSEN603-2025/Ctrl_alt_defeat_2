import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './ProStudentRegistration.css';

function ProStudentRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate email format
    const emailRegex = /^[^\s@]+@guc\.edu\.eg$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please use your GUC email address.');
      return;
    }

    // Validate password
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // If validation passes, redirect to dashboard
    navigate('/pro-student/dashboard');
  };

  return (
    <div className="pro-student-registration">
      <Header showBack={true} />
      
      <div className="registration-container">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>Register as Pro Student</h2>
          
          <div className="form-group">
            <label>GUC Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@guc.edu.eg"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="register-button">Register</button>

          <div className="login-link">
            Already have an account? <a href="/">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProStudentRegistration; 