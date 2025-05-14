import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header({ showBack }) {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      {showBack && (
        <button className="header-back" onClick={() => navigate(-1)}>← Back</button>
      )}
    </header>
  );
}

export default Header;