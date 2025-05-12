import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/signin';
import CompanyRegistration from './pages/CompanyRegistration';
import CompanyDashboard from './pages/CompanyDashboard';
import FacultyMemberDashboard from './pages/facultymemberDashboard';
import ProStudentDashboard from './pages/ProStudentDashboard';
import ProStudentProfile from './pages/ProStudentProfile';
import ProStudentApplications from './pages/ProStudentApplications';
import ProStudentNotifications from './pages/ProStudentNotifications';
import ProStudentRegistration from './pages/ProStudentRegistration';
import ProStudentInternships from './pages/ProStudentInternships';
import ProStudentInternshipDetails from './pages/ProStudentInternshipDetails';
import ProStudentInternshipApplication from './pages/ProStudentInternshipApplication';
import ProStudentApplicationDetails from './pages/ProStudentApplicationDetails';
import ScheduleInterviewForm from './pages/ScheduleInterviewForm';
import ProStudentInternshipManagement from './pages/ProStudentInternshipManagement';
import ProStudentWorkshops from './pages/ProStudentWorkshops';
import ProStudentWorkshopRegistration from './pages/ProStudentWorkshopRegistration';
import ProStudentWorkshopDetails from './pages/ProStudentWorkshopDetails';
import ProStudentInternshipEvaluation from './pages/ProStudentInternshipEvaluation';
import ProStudentInternshipReport from './pages/ProStudentInternshipReport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/company-registration" element={<CompanyRegistration />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyMemberDashboard />} />
        <Route path="/pro-student/dashboard" element={<ProStudentDashboard />} />
        <Route path="/pro-student/profile" element={<ProStudentProfile />} />
        <Route path="/pro-student/applications" element={<ProStudentApplications />} />
        <Route path="/pro-student/notifications" element={<ProStudentNotifications />} />
        <Route path="/pro-student/registration" element={<ProStudentRegistration />} />
        <Route path="/pro-student/internships" element={<ProStudentInternships />} />
        <Route path="/pro-student/internships/:id" element={<ProStudentInternshipDetails />} />
        <Route path="/pro-student/internships/:id/apply" element={<ProStudentInternshipApplication />} />
        <Route path="/pro-student/application/:id" element={<ProStudentApplicationDetails />} />
        <Route path="/pro-student/schedule-interview/:id" element={<ScheduleInterviewForm />} />
        <Route path="/pro-student/internship-management" element={<ProStudentInternshipManagement />} />
        <Route path="/pro-student/workshops" element={<ProStudentWorkshops />} />
        <Route path="/pro-student/workshops/:id" element={<ProStudentWorkshopDetails />} />
        <Route path="/pro-student/workshops/:id/register" element={<ProStudentWorkshopRegistration />} />
        <Route path="/pro-student/internships/:id/evaluation" element={<ProStudentInternshipEvaluation />} />
        <Route path="/pro-student/internships/:id/report" element={<ProStudentInternshipReport />} />
      </Routes>
    </Router>
  );
}

export default App;
