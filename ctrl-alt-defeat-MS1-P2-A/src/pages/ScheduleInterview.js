import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaVideo, FaBuilding, FaArrowLeft } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import './ScheduleInterview.css';

const ScheduleInterview = ({ applicationId }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [interviewType, setInterviewType] = useState('online');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API call to schedule interview
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate back to applications page
      window.history.back();
    }, 1500);
  };

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <BackButton />
        <h1>Schedule Interview</h1>

        <div className="schedule-interview-container">
          <div className="application-info">
            <h2>Software Development Intern</h2>
            <p className="company-name">Tech Solutions Inc.</p>
          </div>

          <form onSubmit={handleSubmit} className="schedule-form">
            <div className="form-section">
              <h3>Select Interview Type</h3>
              <div className="interview-type-options">
                <label className={`interview-type-option ${interviewType === 'online' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="interviewType"
                    value="online"
                    checked={interviewType === 'online'}
                    onChange={(e) => setInterviewType(e.target.value)}
                  />
                  <FaVideo />
                  <span>Online Interview</span>
                </label>
                <label className={`interview-type-option ${interviewType === 'onsite' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="interviewType"
                    value="onsite"
                    checked={interviewType === 'onsite'}
                    onChange={(e) => setInterviewType(e.target.value)}
                  />
                  <FaBuilding />
                  <span>On-site Interview</span>
                </label>
              </div>
            </div>

            <div className="form-section">
              <h3>Select Date</h3>
              <div className="date-picker">
                {availableDates.map(date => (
                  <label
                    key={date}
                    className={`date-option ${selectedDate === date ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="date"
                      value={date}
                      checked={selectedDate === date}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h3>Select Time</h3>
              <div className="time-slots">
                {timeSlots.map(time => (
                  <label
                    key={time}
                    className={`time-option ${selectedTime === time ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="time"
                      value={time}
                      checked={selectedTime === time}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                    <span>{time}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => window.history.back()}
              >
                <FaArrowLeft /> Back
              </button>
              <button
                type="submit"
                className="submit-button"
                disabled={!selectedDate || !selectedTime || isSubmitting}
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

export default ScheduleInterview; 