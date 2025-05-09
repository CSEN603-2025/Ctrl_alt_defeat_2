import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/signIn';
import CompanyRegistration from './pages/CompanyRegistration';
import CompanyDashboard from './pages/CompanyDashboard'; // ✅ Add this line
import FacultyMemberDashboard from './pages/facultymemberDashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/company-signup" element={<CompanyRegistration />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} /> {/* ✅ Add this route */}
        <Route path="/faculty-dashboard" element={<FacultyMemberDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
