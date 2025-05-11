import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import './ProStudentWorkshopRegistration.css';

const ProStudentWorkshopRegistration = () => {
  const navigate = useNavigate();
  const { workshopId } = useParams();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    semester: '',
    interests: '',
    questions: ''
  });

  // Mock workshop data - in a real app, this would be fetched from an API
  const workshop = {
    id: workshopId,
    title: 'Career Development in Tech Industry',
    date: '2024-04-15',
    time: '14:00',
    duration: '2 hours',
    speaker: 'John Smith',
    description: 'Learn about career paths and opportunities in the tech industry.',
    topics: ['Career Planning', 'Industry Trends', 'Skill Development']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the registration data to your backend
    console.log('Registration data:', formData);
    // Navigate back to workshops page after successful registration
    navigate('/pro-student/workshops');
  };

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <button className="back-button" onClick={() => navigate('/pro-student/workshops')}>
          <FaArrowLeft /> Back to Workshops
        </button>

        <div className="registration-container">
          <div className="workshop-info">
            <h1>{workshop.title}</h1>
            <div className="workshop-meta">
              <div className="meta-item">
                <FaCalendarAlt />
                <span>{workshop.date}</span>
              </div>
              <div className="meta-item">
                <FaClock />
                <span>{workshop.time} ({workshop.duration})</span>
              </div>
              <div className="meta-item">
                <FaUser />
                <span>Speaker: {workshop.speaker}</span>
              </div>
            </div>
            <p className="workshop-description">{workshop.description}</p>
            <div className="workshop-topics">
              {workshop.topics.map(topic => (
                <span key={topic} className="topic-tag">{topic}</span>
              ))}
            </div>
          </div>

          <form className="registration-form" onSubmit={handleSubmit}>
            <h2>Registration Form</h2>
            
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="university">University</label>
              <input
                type="text"
                id="university"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="major">Major</label>
              <input
                type="text"
                id="major"
                name="major"
                value={formData.major}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="semester">Current Semester</label>
              <input
                type="text"
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="interests">What are your career interests?</label>
              <textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="questions">Do you have any specific questions for the speaker?</label>
              <textarea
                id="questions"
                name="questions"
                value={formData.questions}
                onChange={handleInputChange}
                rows="3"
              />
            </div>

            <button type="submit" className="submit-button">Register for Workshop</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProStudentWorkshopRegistration; 