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
import ProStudentAppointments from './pages/ProStudentAppointments';
import AcceptedAppointments from './pages/AcceptedAppointments';
import VideoCall from './pages/VideoCall';
import ProStudentWorkshopDescription from './pages/ProStudentWorkshopDescription';
import ProStudentWorkshopJoin from './pages/ProStudentWorkshopJoin';
import ScadDashboard from './pages/ScadDashboard';
import ScadInternshipDetails from './pages/ScadInternshipDetails';
import ProStudentAssessments from './pages/ProStudentAssessments';
import ScadAcceptedAppointments from './pages/ScadAcceptedAppointments';
import ScadVideoCall from './pages/ScadVideoCall';
import ScadNotifications from './pages/ScadNotifications';
import ScadVoiceCall from './pages/ScadVoiceCall';
import ScadAppointments from './pages/ScadAppointments';
import StudentSuggestedCompanies from './pages/StudentSuggestedCompanies';
import ProStudentSuggestedCompanies from './pages/ProStudentSuggestedCompanies';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';


import StudentApp2 from './pages/studentapp2';
import StudentNotifications from './pages/StudentNotifications';
import StudentInternshipApplication2 from './pages/StudentInternshipApplication2';
import StudentInternshipDetails2 from './pages/StudentInternshipDetails2';
import StudentInternshipEvaluation2 from './pages/StudentInternshipEvaluation2';
import StudentInternshipManagement2 from './pages/StudentInternshipManagement2';
import StudentInternshipReport2 from './pages/StudentInternshipReport2';
import StudentInternships2 from './pages/StudentInternships2';
import { WorkshopProvider } from './pages/WorkshopContext';
import { AssessmentsProvider } from './pages/AssessmentsContext';

function App() {
  return (
    <WorkshopProvider>
      <AssessmentsProvider>
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
            <Route path="/pro-student/appointments" element={<ProStudentAppointments />} />
            <Route path="/pro-student/accepted-appointments" element={<AcceptedAppointments />} />
            <Route path="/pro-student/video-call" element={<VideoCall />} />
            <Route path="/pro-student/workshops/:id/description" element={<ProStudentWorkshopDescription />} />
            <Route path="/pro-student/workshops/:id/join" element={<ProStudentWorkshopJoin />} />
            <Route path="/scad-dashboard" element={<ScadDashboard />} />
            <Route path="/scad/internships/:id" element={<ScadInternshipDetails />} />
            <Route path="/pro-student/assessments" element={<ProStudentAssessments />} />
            <Route path="/scad/accepted-appointments" element={<ScadAcceptedAppointments />} />
            <Route path="/scad/video-call" element={<ScadVideoCall />} />
            <Route path="/scad/voice-call" element={<ScadVoiceCall />} />
            <Route path="/scad/notifications" element={<ScadNotifications />} />
            <Route path="/scad/appointments" element={<ScadAppointments />} />
            <Route path="/student/suggested-companies" element={<StudentSuggestedCompanies />} />
            <Route path="/pro-student/suggested-companies" element={<ProStudentSuggestedCompanies />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/internships" element={<StudentInternships2 />} />
            <Route path="/student/internships/:id" element={<StudentInternshipDetails2 />} />
            <Route path="/student/internships/:id/apply" element={<StudentInternshipApplication2 />} />
            <Route path="/student/internship-management" element={<StudentInternshipManagement2 />} />
            <Route path="/student/internships/:id/evaluation" element={<StudentInternshipEvaluation2 />} />
            <Route path="/student/internships/:id/report" element={<StudentInternshipReport2 />} />
            <Route path="/student/applications" element={<StudentApp2 />} />
            <Route path="/student/notifications" element={<StudentNotifications />} />
        
          </Routes>
        </Router>
      </AssessmentsProvider>
    </WorkshopProvider>
  );
}

export default App;