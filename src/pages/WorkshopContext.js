import React, { createContext, useState } from 'react';

export const WorkshopContext = createContext();

export const WorkshopProvider = ({ children }) => {
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      title: 'Career Planning Workshop',
      date: '2025-06-10',
      time: '10:00 AM',
      duration: '2 hours',
      type: 'live', // Changed to live
      description: 'Learn how to plan your career effectively with expert guidance.',
      topics: ['Goal Setting', 'Resume Building', 'Networking Strategies'],
      speaker: {
        name: 'John Doe',
        title: 'Career Coach',
        company: 'CareerWorks',
      },
      isRegistered: false,
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Leadership Skills Development',
      date: '2025-06-15',
      time: '1:00 PM',
      duration: '1.5 hours',
      type: 'recorded',
      description: 'Develop essential leadership skills to excel in your career.',
      topics: ['Team Management', 'Decision Making', 'Conflict Resolution'],
      speaker: {
        name: 'Jane Smith',
        title: 'Leadership Consultant',
        company: 'LeadNow',
      },
      isRegistered: true,
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Effective Communication Skills',
      date: '2025-05-01',
      time: '9:00 AM',
      duration: '2 hours',
      type: 'recorded',
      description: 'Master the art of communication in professional settings.',
      topics: ['Public Speaking', 'Active Listening', 'Nonverbal Communication'],
      speaker: {
        name: 'Emily Johnson',
        title: 'Communication Expert',
        company: 'SpeakEasy',
      },
      isRegistered: true,
      isCompleted: true,
    },
  ]);

  return (
    <WorkshopContext.Provider value={{ workshops, setWorkshops }}>
      {children}
    </WorkshopContext.Provider>
  );
};