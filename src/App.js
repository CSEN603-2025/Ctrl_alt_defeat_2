import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import CompanyRegistration from './pages/CompanyRegistration';
import CompanyDashboard from './pages/CompanyDashboard'; // ✅ Add this line

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/company-signup" element={<CompanyRegistration />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} /> {/* ✅ Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
