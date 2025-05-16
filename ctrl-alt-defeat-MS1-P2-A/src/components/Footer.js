import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>&copy; 2025 GUC Internship System. All rights reserved.</p>
        <span className="footer-links">
          <a href="#">Privacy</a> | <a href="#">Terms</a> | <a href="#">Contact</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
