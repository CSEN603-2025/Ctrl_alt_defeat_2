import React, { createContext, useState, useEffect } from 'react';

export const WorkshopContext = createContext();

export const WorkshopProvider = ({ children }) => {
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      title: 'Advanced Web Development Workshop',
      description: 'Learn advanced web development techniques.',
      date: '2025-05-15', // Tomorrow
      time: '10:00 AM',
      duration: '2 hours',
      mainTopic: 'React and Node.js',
      topics: ['React Hooks', 'Node.js APIs', 'Deployment'],
      speaker: {
        name: 'Dr. Jane Smith',
        title: 'Senior Developer',
        company: 'Tech Corp'
      },
      isRegistered: true,
      isCompleted: false
    },
    {
      id: 2,
      title: 'Data Science Basics',
      description: 'Introduction to data science concepts.',
      date: '2025-05-20',
      time: '1:00 PM',
      duration: '3 hours',
      mainTopic: 'Python for Data Science',
      topics: ['Pandas', 'NumPy', 'Data Visualization'],
      speaker: {
        name: 'Prof. John Brown',
        title: 'Data Scientist',
        company: 'Data Analytics Co.'
      },
      isRegistered: false,
      isCompleted: false
    },
    {
      id: 3,
      title: 'Introduction to Machine Learning',
      description: 'Explore the fundamentals of machine learning.',
      date: '2025-05-01', // Past date
      time: '9:00 AM',
      duration: '2.5 hours',
      mainTopic: 'Machine Learning',
      topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'],
      speaker: {
        name: 'Dr. Emily White',
        title: 'AI Researcher',
        company: 'AI Innovations'
      },
      isRegistered: true,
      isCompleted: true,
      completionDate: '2025-05-01'
    },
    {
      id: 4,
      title: 'Cybersecurity Essentials',
      description: 'Learn the basics of cybersecurity and protecting digital assets.',
      date: '2025-05-10', // Past date
      time: '2:00 PM',
      duration: '2 hours',
      mainTopic: 'Cybersecurity',
      topics: ['Network Security', 'Threat Detection', 'Encryption Basics'],
      speaker: {
        name: 'Mark Johnson',
        title: 'Security Analyst',
        company: 'SecureTech'
      },
      isRegistered: true,
      isCompleted: true,
      completionDate: '2025-05-10'
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'application',
      title: 'Application Status Update',
      message: 'Your application for Software Developer Intern at Tech Corp has been reviewed.',
      details: 'The company has reviewed your application and would like to schedule an interview. Please check your email for the interview details.',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'New interview scheduled with Data Analytics Co.',
      details: 'Your interview has been scheduled for next Monday at 2:00 PM. The interview will be conducted via Zoom. Please prepare your portfolio and be ready to discuss your previous projects.',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'offer',
      title: 'New Job Offer',
      message: 'Congratulations! You have received a job offer.',
      details: 'Web Solutions Inc. has offered you a position as a Frontend Developer Intern. The internship will start on June 1st and last for 3 months. Please review the offer details and respond within 5 business days.',
      timestamp: '3 days ago',
      read: false
    }
  ]);

  const addChatNotification = (workshopTitle, sender, message) => {
    const newNotification = {
      id: Date.now(),
      type: 'chat',
      title: 'New Chat Message',
      message: `New message in ${workshopTitle} live chat from ${sender}.`,
      details: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  return (
    <WorkshopContext.Provider value={{ workshops, setWorkshops, notifications, setNotifications, addChatNotification }}>
      {children}
    </WorkshopContext.Provider>
  );
};