import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaUser ,FaBell} from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import { WorkshopContext } from './WorkshopContext';
import './ProStudentWorkshopRegistration.css';

const ProStudentWorkshopRegistration = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { workshops, setWorkshops } = useContext(WorkshopContext);
   const [unreadNotifications, setUnreadNotifications] = useState(3);
    const [isBellAnimating, setIsBellAnimating] = useState(false);
     const handleBellClick = () => {
    setIsBellAnimating(true);
    setTimeout(() => {
      setIsBellAnimating(false);
      navigate('/pro-student/notifications');
    }, 500);
  };


  const workshop = workshops.find(w => w.id === parseInt(id));

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

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    semester: '',
    interests: ''
  });

  const [showFeedback, setShowFeedback] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.university.trim()) newErrors.university = 'University is required';
    if (!formData.major.trim()) newErrors.major = 'Major is required';
    if (!formData.semester.trim()) newErrors.semester = 'Current semester is required';
    if (!formData.interests.trim()) newErrors.interests = 'Career interests are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Update workshop registration status
    setWorkshops(prevWorkshops =>
      prevWorkshops.map(w =>
        w.id === parseInt(id) ? {
          ...w,
          isRegistered: true,
          registrationDetails: {
            ...formData,
            registrationDate: new Date().toISOString()
          }
        } : w
      )
    );

    // Show feedback message
    setShowFeedback(true);

    // Hide feedback after 3 seconds and navigate
    setTimeout(() => {
      setShowFeedback(false);
      navigate('/pro-student/workshops');
    }, 3000);
  };

  if (!workshop) {
    return <div className="pro-student-content">Workshop not found</div>;
  }

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        {showFeedback && (
          <div
            className="feedback-message"
            role="alert"
            aria-live="polite"
          >
            Registration submitted successfully!
          </div>
        )}
        <div className="floating-notif" onClick={handleBellClick}>
                    <FaBell className={`wiggle-bell ${isBellAnimating ? 'animating' : ''}`} />
                    {unreadNotifications > 0 && (
                      <span className="notification-badge">{unreadNotifications}</span>
                    )}
                  </div>
        <button className="back-btn" onClick={() => navigate('/pro-student/workshops')} aria-label="Back to workshops">
          ← Back to Workshops
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
                <span>Speaker: {workshop.speaker.name}</span>
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
            {[
              { id: 'fullName', label: 'Full Name', type: 'text', required: true },
              { id: 'email', label: 'Email', type: 'email', required: true },
              { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
              { id: 'university', label: 'University', type: 'text', required: true },
              { id: 'major', label: 'Major', type: 'text', required: true },
              { id: 'semester', label: 'Current Semester', type: 'text', required: true },
              { id: 'interests', label: 'What are your career interests?', type: 'textarea', required: true },
              { id: 'questions', label: 'Do you have any specific questions for the speaker?', type: 'textarea', required: false }
            ].map(field => (
              <div className="form-group" key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleInputChange}
                    rows="3"
                    required={field.required}
                    className={errors[field.id] ? 'input-error' : ''}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleInputChange}
                    required={field.required}
                    className={errors[field.id] ? 'input-error' : ''}
                  />
                )}
                {errors[field.id] && <span className="error-message">{errors[field.id]}</span>}
              </div>
            ))}
            <button type="submit" className="submit-button">Register for Workshop</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProStudentWorkshopRegistration;