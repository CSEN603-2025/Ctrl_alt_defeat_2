import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignIn.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@guc\.edu\.eg$/;
    if (!emailRegex.test(email)) {
      setError('Please use your GUC email address.');
      return;
    }

    // In a real application, this would be an API call to authenticate
    // For now, we'll use a simple check
    if (email === 'student@guc.edu.eg' && password === 'password123') {
      navigate('/student-dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <>
      <Header />
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2>Student Login</h2>

          <label>GUC Email</label>
          <input
            type="email"
            placeholder="example@guc.edu.eg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="options-row">
            <label className="remember-label">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>
            <a href="#" className="forgot-link">Forgot your password?</a>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="signin-button">Sign in</button>

          <div className="divider">
            <span>New to the platform?</span>
          </div>

          <Link to="/pro-student/registration" className="alt-button">
            Register as Pro Student
          </Link>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default StudentLogin; 