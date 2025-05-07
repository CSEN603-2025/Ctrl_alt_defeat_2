import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
    } else {
      setError('');
      console.log({ email, password, remember });
    }

    //  Hardcoded credentials
    if (email === 'company@guc.edu.eg' && password === 'company123') {
      navigate('/company-dashboard');
    } else if (email === 'student@guc.edu.eg' && password === 'student123') {
      alert('Redirect to student dashboard coming soon!');
    } else if (email === 'admin@guc.edu.eg' && password === 'admin123') {
      alert('Redirect to admin dashboard coming soon!');
    } else {
      setError('Invalid email or password.');}
    };
  
return (
    <>
      <Header />
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2>Sign in to your account</h2>

          <label>Username</label>
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

          <a href="/company-signup" className="alt-button">
            <i className="fas fa-building"></i> Register as Company
          </a>
        </form>
      </div>
      <Footer />
    </>
    
  );

}



export default SignIn;
