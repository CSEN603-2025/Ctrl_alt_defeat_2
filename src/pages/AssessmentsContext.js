import React, { createContext, useContext , useState } from 'react';


export const AssessmentsContext = createContext();

export const AssessmentsProvider = ({ children }) => {
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      title: 'Software Development Assessment',
      duration: '60 minutes',
      questions: 30,
      topics: ['Algorithms', 'Data Structures', 'Problem Solving'],
      status: 'available'
    },
    {
      id: 2,
      title: 'Data Science Assessment',
      duration: '90 minutes',
      questions: 40,
      topics: ['Statistics', 'Machine Learning', 'Data Analysis'],
      status: 'completed',
      score: 85
    },
    {
      id: 3,
      title: 'Web Development Assessment',
      duration: '45 minutes',
      questions: 25,
      topics: ['HTML/CSS', 'JavaScript', 'React'],
      status: 'available'
    },
    {
      id: 4,
      title: 'Mobile App Development',
      duration: '75 minutes',
      questions: 35,
      topics: ['iOS Development', 'Android Development', 'React Native'],
      status: 'available'
    },
    {
      id: 5,
      title: 'Database Management',
      duration: '50 minutes',
      questions: 30,
      topics: ['SQL', 'NoSQL', 'Database Design'],
      status: 'available'
    },
    {
      id: 6,
      title: 'Cloud Computing',
      duration: '65 minutes',
      questions: 35,
      topics: ['AWS', 'Azure', 'Cloud Architecture'],
      status: 'available'
    },
    {
      id: 7,
      title: 'Cybersecurity Fundamentals',
      duration: '55 minutes',
      questions: 30,
      topics: ['Network Security', 'Cryptography', 'Security Best Practices'],
      status: 'available'
    },
    {
      id: 8,
      title: 'DevOps Practices',
      duration: '70 minutes',
      questions: 40,
      topics: ['CI/CD', 'Containerization', 'Infrastructure as Code'],
      status: 'available'
    }
  ]);

  const [postedScores, setPostedScores] = useState([]);

  const updateAssessment = (updatedAssessment) => {
    setAssessments((prev) =>
      prev.map((assessment) =>
        assessment.id === updatedAssessment.id ? updatedAssessment : assessment
      )
    );
  };

  return (
    <AssessmentsContext.Provider
      value={{ assessments, setAssessments, postedScores, setPostedScores, updateAssessment }}
    >
      {children}
    </AssessmentsContext.Provider>
  );
};
export default AssessmentsProvider;
export const useAssessmentsContext = () => useContext(AssessmentsContext);