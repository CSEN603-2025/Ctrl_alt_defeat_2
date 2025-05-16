import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaVideo, FaBuilding, FaArrowLeft, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import './ScheduleInterviewForm.css';

const ScheduleInterviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    interviewType: 'online',
    date: '',
    time: '',
    duration: '60',
    interviewerName: '',
    interviewerEmail: '',
    interviewerPhone: '',
    meetingLink: '',
    location: '',
    notes: ''
  });

  // Mock data for available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  // Mock data for available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split('T')[0];
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API call to schedule interview
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate back to applications page
      navigate('/pro-student/applications');
    }, 1500);
  };

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <BackButton />
        <h1>Schedule Interview</h1>

        <div className="schedule-interview-form-container">
          <form onSubmit={handleSubmit} className="schedule-form">
            <div className="form-section">
              <h3>Interview Type</h3>
              <div className="interview-type-options">
                <label className={`interview-type-option ${formData.interviewType === 'online' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="interviewType"
                    value="online"
                    checked={formData.interviewType === 'online'}
                    onChange={handleInputChange}
                  />
                  <FaVideo />
                  <span>Online Interview</span>
                </label>
                <label className={`interview-type-option ${formData.interviewType === 'onsite' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="interviewType"
                    value="onsite"
                    checked={formData.interviewType === 'onsite'}
                    onChange={handleInputChange}
                  />
                  <FaBuilding />
                  <span>On-site Interview</span>
                </label>
              </div>
            </div>

            <div className="form-section">
              <h3>Interview Date & Time</h3>
              <div className="date-time-section">
                <div className="date-picker">
                  <label>Select Date</label>
                  <div className="date-options">
                    {availableDates.map(date => (
                      <label
                        key={date}
                        className={`date-option ${formData.date === date ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="date"
                          value={date}
                          checked={formData.date === date}
                          onChange={handleInputChange}
                        />
                        <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="time-picker">
                  <label>Select Time</label>
                  <div className="time-options">
                    {timeSlots.map(time => (
                      <label
                        key={time}
                        className={`time-option ${formData.time === time ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="time"
                          value={time}
                          checked={formData.time === time}
                          onChange={handleInputChange}
                        />
                        <span>{time}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="duration-picker">
                  <label>Duration (minutes)</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="duration-select"
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Interviewer Information</h3>
              <div className="interviewer-info">
                <div className="form-group">
                  <label>
                    <FaUser /> Interviewer Name
                  </label>
                  <input
                    type="text"
                    name="interviewerName"
                    value={formData.interviewerName}
                    onChange={handleInputChange}
                    placeholder="Enter interviewer's name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    <FaEnvelope /> Interviewer Email
                  </label>
                  <input
                    type="email"
                    name="interviewerEmail"
                    value={formData.interviewerEmail}
                    onChange={handleInputChange}
                    placeholder="Enter interviewer's email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    <FaPhone /> Interviewer Phone
                  </label>
                  <input
                    type="tel"
                    name="interviewerPhone"
                    value={formData.interviewerPhone}
                    onChange={handleInputChange}
                    placeholder="Enter interviewer's phone number"
                    required
                  />
                </div>
              </div>
            </div>

            {formData.interviewType === 'online' ? (
              <div className="form-section">
                <h3>Meeting Details</h3>
                <div className="form-group">
                  <label>Meeting Link</label>
                  <input
                    type="url"
                    name="meetingLink"
                    value={formData.meetingLink}
                    onChange={handleInputChange}
                    placeholder="Enter meeting link (Zoom, Teams, etc.)"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="form-section">
                <h3>Location Details</h3>
                <div className="form-group">
                  <label>Interview Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter interview location"
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-section">
              <h3>Additional Notes</h3>
              <div className="form-group">
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add any additional notes or requirements for the interview"
                  rows="4"
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft /> Back
              </button>
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting || !formData.date || !formData.time}
              >
                {isSubmitting ? 'Scheduling...' : 'Schedule Interview'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterviewForm; 