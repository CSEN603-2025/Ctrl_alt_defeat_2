import React, { useState } from 'react';
import { FaSearch, FaBuilding, FaClock, FaMoneyBillWave, FaGraduationCap, FaCalendarAlt, FaStar, FaUsers, FaIndustry } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import './ProStudentInternships.css';
import { useNavigate } from 'react-router-dom';

const ProStudentInternships = () => {
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationFiles, setApplicationFiles] = useState({
    cv: null,
    coverLetter: null,
    certificates: []
  });

  const navigate = useNavigate();

  const majors = [
    'Computer Science',
    'Information Technology',
    'Software Engineering',
    'Computer Engineering',
    'Data Science',
    'Cybersecurity'
  ];

  const semesters = [
    'Semester 1',
    'Semester 2',
    'Semester 3',
    'Semester 4',
    'Semester 5',
    'Semester 6',
    'Semester 7',
    'Semester 8'
  ];

  const internships = [
    // Computer Science Internships
    {
      id: 1,
      title: 'Software Development Intern',
      company: 'Tech Solutions Inc.',
      duration: '3 months',
      type: 'Full-time',
      salary: '$25/hour',
      requirements: ['Python', 'JavaScript', 'React'],
      description: 'Join our development team to work on cutting-edge web applications.',
      major: 'Computer Science',
      semester: 'Semester 1'
    },
    {
      id: 2,
      title: 'Junior Developer Intern',
      company: 'Code Masters',
      duration: '3 months',
      type: 'Part-time',
      salary: '$20/hour',
      requirements: ['Java', 'HTML', 'CSS'],
      description: 'Learn the basics of software development in a supportive environment.',
      major: 'Computer Science',
      semester: 'Semester 2'
    },
    {
      id: 3,
      title: 'Web Development Intern',
      company: 'Digital Creations',
      duration: '4 months',
      type: 'Full-time',
      salary: '$22/hour',
      requirements: ['JavaScript', 'Node.js', 'MongoDB'],
      description: 'Work on full-stack web development projects.',
      major: 'Computer Science',
      semester: 'Semester 3'
    },
    {
      id: 4,
      title: 'Mobile App Development Intern',
      company: 'App Innovators',
      duration: '3 months',
      type: 'Full-time',
      salary: '$24/hour',
      requirements: ['React Native', 'JavaScript', 'Mobile Development'],
      description: 'Develop cross-platform mobile applications.',
      major: 'Computer Science',
      semester: 'Semester 4'
    },
    {
      id: 5,
      title: 'Software Engineering Intern',
      company: 'Tech Solutions Inc.',
      duration: '4 months',
      type: 'Full-time',
      salary: '$26/hour',
      requirements: ['Python', 'Java', 'System Design'],
      description: 'Work on large-scale software systems and architecture.',
      major: 'Computer Science',
      semester: 'Semester 5'
    },
    {
      id: 6,
      title: 'Cloud Computing Intern',
      company: 'Cloud Systems',
      duration: '3 months',
      type: 'Full-time',
      salary: '$28/hour',
      requirements: ['AWS', 'Docker', 'Kubernetes'],
      description: 'Learn cloud infrastructure and deployment.',
      major: 'Computer Science',
      semester: 'Semester 6'
    },
    {
      id: 7,
      title: 'AI Development Intern',
      company: 'AI Innovations',
      duration: '4 months',
      type: 'Full-time',
      salary: '$30/hour',
      requirements: ['Python', 'Machine Learning', 'TensorFlow'],
      description: 'Work on AI and machine learning projects.',
      major: 'Computer Science',
      semester: 'Semester 7'
    },
    {
      id: 8,
      title: 'Senior Software Intern',
      company: 'Tech Leaders',
      duration: '3 months',
      type: 'Full-time',
      salary: '$32/hour',
      requirements: ['System Architecture', 'Leadership', 'Project Management'],
      description: 'Lead development teams and manage projects.',
      major: 'Computer Science',
      semester: 'Semester 8'
    },

    // Information Technology Internships
    {
      id: 9,
      title: 'IT Support Intern',
      company: 'Tech Support Co.',
      duration: '3 months',
      type: 'Part-time',
      salary: '$18/hour',
      requirements: ['Technical Support', 'Windows', 'Networking'],
      description: 'Provide technical support and troubleshoot issues.',
      major: 'Information Technology',
      semester: 'Semester 1'
    },
    {
      id: 10,
      title: 'Network Administration Intern',
      company: 'Network Solutions',
      duration: '3 months',
      type: 'Full-time',
      salary: '$20/hour',
      requirements: ['Networking', 'Cisco', 'Security'],
      description: 'Learn network administration and security.',
      major: 'Information Technology',
      semester: 'Semester 2'
    },
    {
      id: 11,
      title: 'Database Management Intern',
      company: 'Data Systems',
      duration: '4 months',
      type: 'Full-time',
      salary: '$22/hour',
      requirements: ['SQL', 'Database Design', 'Data Management'],
      description: 'Work with database systems and management.',
      major: 'Information Technology',
      semester: 'Semester 3'
    },
    {
      id: 12,
      title: 'Frontend Development Intern',
      company: 'Web Solutions',
      duration: '3 months',
      type: 'Full-time',
      salary: '$24/hour',
      requirements: ['HTML', 'CSS', 'JavaScript', 'React'],
      description: 'Build modern and responsive user interfaces.',
      major: 'Information Technology',
      semester: 'Semester 4'
    },
    {
      id: 13,
      title: 'IT Security Intern',
      company: 'Security First',
      duration: '4 months',
      type: 'Full-time',
      salary: '$26/hour',
      requirements: ['Cybersecurity', 'Network Security', 'Risk Assessment'],
      description: 'Learn about IT security and risk management.',
      major: 'Information Technology',
      semester: 'Semester 5'
    },
    {
      id: 14,
      title: 'System Administration Intern',
      company: 'System Solutions',
      duration: '3 months',
      type: 'Full-time',
      salary: '$28/hour',
      requirements: ['Linux', 'System Administration', 'Automation'],
      description: 'Manage and maintain IT systems.',
      major: 'Information Technology',
      semester: 'Semester 6'
    },
    {
      id: 15,
      title: 'IT Project Management Intern',
      company: 'Project Leaders',
      duration: '4 months',
      type: 'Full-time',
      salary: '$30/hour',
      requirements: ['Project Management', 'Agile', 'Leadership'],
      description: 'Learn IT project management methodologies.',
      major: 'Information Technology',
      semester: 'Semester 7'
    },
    {
      id: 16,
      title: 'IT Strategy Intern',
      company: 'Strategic IT',
      duration: '3 months',
      type: 'Full-time',
      salary: '$32/hour',
      requirements: ['IT Strategy', 'Business Analysis', 'Leadership'],
      description: 'Develop IT strategies and solutions.',
      major: 'Information Technology',
      semester: 'Semester 8'
    },

    // Software Engineering Internships
    {
      id: 17,
      title: 'Junior Software Engineer Intern',
      company: 'Code Crafters',
      duration: '3 months',
      type: 'Part-time',
      salary: '$20/hour',
      requirements: ['Java', 'OOP', 'Basic Algorithms'],
      description: 'Learn software engineering fundamentals.',
      major: 'Software Engineering',
      semester: 'Semester 1'
    },
    {
      id: 18,
      title: 'Software Testing Intern',
      company: 'Quality Assurance Co.',
      duration: '3 months',
      type: 'Full-time',
      salary: '$22/hour',
      requirements: ['Testing', 'JUnit', 'Selenium'],
      description: 'Learn software testing methodologies.',
      major: 'Software Engineering',
      semester: 'Semester 2'
    },
    {
      id: 19,
      title: 'Backend Development Intern',
      company: 'Server Systems',
      duration: '4 months',
      type: 'Full-time',
      salary: '$24/hour',
      requirements: ['Java', 'Spring Boot', 'SQL'],
      description: 'Develop robust backend systems and APIs.',
      major: 'Software Engineering',
      semester: 'Semester 3'
    },
    {
      id: 20,
      title: 'DevOps Intern',
      company: 'DevOps Solutions',
      duration: '3 months',
      type: 'Full-time',
      salary: '$26/hour',
      requirements: ['CI/CD', 'Docker', 'Jenkins'],
      description: 'Learn DevOps practices and tools.',
      major: 'Software Engineering',
      semester: 'Semester 4'
    },
    {
      id: 21,
      title: 'Software Architecture Intern',
      company: 'Architecture Experts',
      duration: '4 months',
      type: 'Full-time',
      salary: '$28/hour',
      requirements: ['System Design', 'Architecture Patterns', 'UML'],
      description: 'Learn software architecture and design patterns.',
      major: 'Software Engineering',
      semester: 'Semester 5'
    },
    {
      id: 22,
      title: 'Full Stack Development Intern',
      company: 'Full Stack Co.',
      duration: '3 months',
      type: 'Full-time',
      salary: '$30/hour',
      requirements: ['React', 'Node.js', 'MongoDB'],
      description: 'Work on full-stack development projects.',
      major: 'Software Engineering',
      semester: 'Semester 6'
    },
    {
      id: 23,
      title: 'Software Quality Intern',
      company: 'Quality First',
      duration: '4 months',
      type: 'Full-time',
      salary: '$32/hour',
      requirements: ['Quality Assurance', 'Testing', 'Automation'],
      description: 'Focus on software quality and testing.',
      major: 'Software Engineering',
      semester: 'Semester 7'
    },
    {
      id: 24,
      title: 'Senior Software Engineer Intern',
      company: 'Tech Leaders',
      duration: '3 months',
      type: 'Full-time',
      salary: '$34/hour',
      requirements: ['System Design', 'Leadership', 'Mentoring'],
      description: 'Lead development teams and mentor junior developers.',
      major: 'Software Engineering',
      semester: 'Semester 8'
    },

    // Computer Engineering Internships
    {
      id: 25,
      title: 'Hardware Design Intern',
      company: 'Hardware Solutions',
      duration: '3 months',
      type: 'Part-time',
      salary: '$20/hour',
      requirements: ['Digital Design', 'VHDL', 'Basic Electronics'],
      description: 'Learn hardware design fundamentals.',
      major: 'Computer Engineering',
      semester: 'Semester 1'
    },
    {
      id: 26,
      title: 'Circuit Design Intern',
      company: 'Circuit Masters',
      duration: '3 months',
      type: 'Full-time',
      salary: '$22/hour',
      requirements: ['Circuit Design', 'PCB Design', 'Electronics'],
      description: 'Work on circuit design and PCB layout.',
      major: 'Computer Engineering',
      semester: 'Semester 2'
    },
    {
      id: 27,
      title: 'Embedded Systems Intern',
      company: 'Embedded Solutions',
      duration: '4 months',
      type: 'Full-time',
      salary: '$24/hour',
      requirements: ['C++', 'Microcontrollers', 'Embedded Systems'],
      description: 'Develop embedded systems and firmware.',
      major: 'Computer Engineering',
      semester: 'Semester 3'
    },
    {
      id: 28,
      title: 'Hardware Engineering Intern',
      company: 'Tech Hardware',
      duration: '3 months',
      type: 'Part-time',
      salary: '$23/hour',
      requirements: ['C++', 'Embedded Systems', 'PCB Design'],
      description: 'Work on hardware design and embedded systems.',
      major: 'Computer Engineering',
      semester: 'Semester 4'
    },
    {
      id: 29,
      title: 'VLSI Design Intern',
      company: 'VLSI Solutions',
      duration: '4 months',
      type: 'Full-time',
      salary: '$26/hour',
      requirements: ['VLSI', 'Verilog', 'ASIC Design'],
      description: 'Learn VLSI design and verification.',
      major: 'Computer Engineering',
      semester: 'Semester 5'
    },
    {
      id: 30,
      title: 'Robotics Intern',
      company: 'Robotics Co.',
      duration: '3 months',
      type: 'Full-time',
      salary: '$28/hour',
      requirements: ['Robotics', 'Control Systems', 'C++'],
      description: 'Work on robotics and control systems.',
      major: 'Computer Engineering',
      semester: 'Semester 6'
    },
    {
      id: 31,
      title: 'IoT Development Intern',
      company: 'IoT Solutions',
      duration: '4 months',
      type: 'Full-time',
      salary: '$30/hour',
      requirements: ['IoT', 'Embedded Systems', 'Wireless Protocols'],
      description: 'Develop IoT solutions and systems.',
      major: 'Computer Engineering',
      semester: 'Semester 7'
    },
    {
      id: 32,
      title: 'Hardware Architecture Intern',
      company: 'Architecture Experts',
      duration: '3 months',
      type: 'Full-time',
      salary: '$32/hour',
      requirements: ['Hardware Architecture', 'System Design', 'Leadership'],
      description: 'Design and optimize hardware systems.',
      major: 'Computer Engineering',
      semester: 'Semester 8'
    },

    // Data Science Internships
    {
      id: 33,
      title: 'Data Analysis Intern',
      company: 'Data Analytics Co.',
      duration: '3 months',
      type: 'Part-time',
      salary: '$20/hour',
      requirements: ['Python', 'Data Analysis', 'Statistics'],
      description: 'Learn data analysis and visualization.',
      major: 'Data Science',
      semester: 'Semester 1'
    },
    {
      id: 34,
      title: 'Data Visualization Intern',
      company: 'Visual Data',
      duration: '3 months',
      type: 'Full-time',
      salary: '$22/hour',
      requirements: ['Python', 'Data Visualization', 'Tableau'],
      description: 'Create data visualizations and dashboards.',
      major: 'Data Science',
      semester: 'Semester 2'
    },
    {
      id: 35,
      title: 'Machine Learning Intern',
      company: 'ML Solutions',
      duration: '4 months',
      type: 'Full-time',
      salary: '$24/hour',
      requirements: ['Python', 'Machine Learning', 'Scikit-learn'],
      description: 'Work on machine learning models and algorithms.',
      major: 'Data Science',
      semester: 'Semester 3'
    },
    {
      id: 36,
      title: 'Data Engineering Intern',
      company: 'Data Systems',
      duration: '3 months',
      type: 'Full-time',
      salary: '$26/hour',
      requirements: ['Python', 'SQL', 'ETL'],
      description: 'Build data pipelines and ETL processes.',
      major: 'Data Science',
      semester: 'Semester 4'
    },
    {
      id: 37,
      title: 'Data Science Intern',
      company: 'Data Analytics Co.',
      duration: '4 months',
      type: 'Full-time',
      salary: '$28/hour',
      requirements: ['Python', 'R', 'Machine Learning'],
      description: 'Work on data analysis and machine learning projects.',
      major: 'Data Science',
      semester: 'Semester 5'
    },
    {
      id: 38,
      title: 'Big Data Intern',
      company: 'Big Data Solutions',
      duration: '3 months',
      type: 'Full-time',
      salary: '$30/hour',
      requirements: ['Hadoop', 'Spark', 'Big Data'],
      description: 'Work with big data technologies and platforms.',
      major: 'Data Science',
      semester: 'Semester 6'
    },
    {
      id: 39,
      title: 'AI Research Intern',
      company: 'AI Research Lab',
      duration: '4 months',
      type: 'Full-time',
      salary: '$32/hour',
      requirements: ['Deep Learning', 'TensorFlow', 'Research'],
      description: 'Conduct research in AI and deep learning.',
      major: 'Data Science',
      semester: 'Semester 7'
    },
    {
      id: 40,
      title: 'Senior Data Scientist Intern',
      company: 'Data Leaders',
      duration: '3 months',
      type: 'Full-time',
      salary: '$34/hour',
      requirements: ['Advanced ML', 'Leadership', 'Project Management'],
      description: 'Lead data science projects and mentor junior data scientists.',
      major: 'Data Science',
      semester: 'Semester 8'
    },

    // Cybersecurity Internships
    {
      id: 41,
      title: 'Security Analyst Intern',
      company: 'Security First',
      duration: '3 months',
      type: 'Part-time',
      salary: '$20/hour',
      requirements: ['Security Basics', 'Network Security', 'Windows'],
      description: 'Learn security analysis and monitoring.',
      major: 'Cybersecurity',
      semester: 'Semester 1'
    },
    {
      id: 42,
      title: 'Network Security Intern',
      company: 'Network Security Co.',
      duration: '3 months',
      type: 'Full-time',
      salary: '$22/hour',
      requirements: ['Network Security', 'Firewalls', 'VPN'],
      description: 'Work on network security and protection.',
      major: 'Cybersecurity',
      semester: 'Semester 2'
    },
    {
      id: 43,
      title: 'Security Operations Intern',
      company: 'Security Ops',
      duration: '4 months',
      type: 'Full-time',
      salary: '$24/hour',
      requirements: ['SIEM', 'Incident Response', 'Security Tools'],
      description: 'Monitor and respond to security incidents.',
      major: 'Cybersecurity',
      semester: 'Semester 3'
    },
    {
      id: 44,
      title: 'Penetration Testing Intern',
      company: 'Security Testing',
      duration: '3 months',
      type: 'Full-time',
      salary: '$26/hour',
      requirements: ['Penetration Testing', 'Ethical Hacking', 'Security Tools'],
      description: 'Learn penetration testing and security assessment.',
      major: 'Cybersecurity',
      semester: 'Semester 4'
    },
    {
      id: 45,
      title: 'Security Engineering Intern',
      company: 'Security Engineering',
      duration: '4 months',
      type: 'Full-time',
      salary: '$28/hour',
      requirements: ['Security Architecture', 'System Design', 'Security Tools'],
      description: 'Design and implement security solutions.',
      major: 'Cybersecurity',
      semester: 'Semester 5'
    },
    {
      id: 46,
      title: 'Threat Intelligence Intern',
      company: 'Threat Intel',
      duration: '3 months',
      type: 'Full-time',
      salary: '$30/hour',
      requirements: ['Threat Analysis', 'Intelligence', 'Security Research'],
      description: 'Analyze and track security threats.',
      major: 'Cybersecurity',
      semester: 'Semester 6'
    },
    {
      id: 47,
      title: 'Security Research Intern',
      company: 'Security Research Lab',
      duration: '4 months',
      type: 'Full-time',
      salary: '$32/hour',
      requirements: ['Security Research', 'Vulnerability Analysis', 'Exploitation'],
      description: 'Conduct security research and analysis.',
      major: 'Cybersecurity',
      semester: 'Semester 7'
    },
    {
      id: 48,
      title: 'Security Leadership Intern',
      company: 'Security Leaders',
      duration: '3 months',
      type: 'Full-time',
      salary: '$34/hour',
      requirements: ['Security Leadership', 'Risk Management', 'Strategy'],
      description: 'Lead security initiatives and manage security programs.',
      major: 'Cybersecurity',
      semester: 'Semester 8'
    }
  ];

  const suggestedCompanies = [
    {
      id: 1,
      name: 'Tech Solutions Inc.',
      industry: 'Technology',
      rating: 4.8,
      pastInterns: 45,
      description: 'Leading technology company with excellent internship programs and mentorship opportunities.',
      interests: ['Software Development', 'AI/ML', 'Cloud Computing'],
      recommendations: [
        'Great learning environment',
        'Strong mentorship program',
        'Competitive compensation'
      ]
    },
    {
      id: 2,
      name: 'Data Analytics Co.',
      industry: 'Data Science',
      rating: 4.6,
      pastInterns: 32,
      description: 'Innovative data analytics company focused on machine learning and big data solutions.',
      interests: ['Data Science', 'Machine Learning', 'Big Data'],
      recommendations: [
        'Cutting-edge projects',
        'Flexible work environment',
        'Career growth opportunities'
      ]
    },
    {
      id: 3,
      name: 'Security First',
      industry: 'Cybersecurity',
      rating: 4.7,
      pastInterns: 28,
      description: 'Leading cybersecurity firm providing advanced security solutions.',
      interests: ['Cybersecurity', 'Network Security', 'Ethical Hacking'],
      recommendations: [
        'Hands-on security projects',
        'Industry certifications',
        'Professional development'
      ]
    },
    {
      id: 4,
      name: 'Web Solutions',
      industry: 'Web Development',
      rating: 4.5,
      pastInterns: 38,
      description: 'Modern web development company specializing in full-stack solutions.',
      interests: ['Web Development', 'Frontend', 'Backend'],
      recommendations: [
        'Modern tech stack',
        'Collaborative environment',
        'Real-world projects'
      ]
    },
    {
      id: 5,
      name: 'Server Systems',
      industry: 'Cloud Computing',
      rating: 4.9,
      pastInterns: 42,
      description: 'Enterprise cloud solutions provider with focus on scalable systems.',
      interests: ['Cloud Computing', 'DevOps', 'System Architecture'],
      recommendations: [
        'Enterprise-level experience',
        'Cloud certifications',
        'Competitive benefits'
      ]
    },
    {
      id: 6,
      name: 'Tech Hardware',
      industry: 'Hardware',
      rating: 4.4,
      pastInterns: 25,
      description: 'Innovative hardware company developing cutting-edge technology solutions.',
      interests: ['Hardware Engineering', 'Embedded Systems', 'IoT'],
      recommendations: [
        'Hardware design experience',
        'Research opportunities',
        'Innovation-focused'
      ]
    }
  ];

  const handleMajorSelect = (major) => {
    setSelectedMajor(major === selectedMajor ? null : major);
  };

  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester === selectedSemester ? null : semester);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInternshipSelect = (internship) => {
    setSelectedInternship(internship);
    setShowApplicationForm(false);
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (type === 'certificates') {
      setApplicationFiles(prev => ({
        ...prev,
        certificates: [...prev.certificates, file]
      }));
    } else {
      setApplicationFiles(prev => ({
        ...prev,
        [type]: file
      }));
    }
  };

  const handleApply = () => {
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    // Handle application submission
    setShowApplicationForm(false);
  };

  const handleViewCompanyInternships = (company) => {
    console.log('Selected company:', company);
    const companyInternships = internships.filter(internship => 
      internship.company.toLowerCase() === company.name.toLowerCase()
    );
    console.log('Found internships:', companyInternships);
    
    if (companyInternships.length > 0) {
      // Navigate to the first internship's details page
      navigate(`/pro-student/internships/${companyInternships[0].id}`);
    }
  };

  const filteredInternships = internships.filter(internship => {
    const matchesMajor = !selectedMajor || internship.major === selectedMajor;
    const matchesSemester = !selectedSemester || internship.semester === selectedSemester;
    const matchesSearch = !searchQuery || 
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMajor && matchesSemester && matchesSearch;
  });

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <BackButton />
        <h1>Available Internships</h1>

        {/* Suggested Companies Section */}
        <div className="suggested-companies-section">
          <h2>Suggested Companies</h2>
          <p className="section-description">Companies recommended based on your interests and past intern experiences</p>
          
          <div className="suggested-companies-grid">
            {suggestedCompanies.map(company => (
              <div key={company.id} className="company-card">
                <div className="company-header">
                  <h3>{company.name}</h3>
                  <div className="company-rating">
                    <FaStar className="star-icon" />
                    <span>{company.rating}</span>
                  </div>
                </div>
                
                <div className="company-industry">
                  <FaIndustry />
                  <span>{company.industry}</span>
                </div>
                
                <div className="company-stats">
                  <div className="stat-item">
                    <FaUsers />
                    <span>{company.pastInterns} Past Interns</span>
                  </div>
                </div>
                
                <p className="company-description">{company.description}</p>
                
                <div className="company-interests">
                  <h4>Matching Interests:</h4>
                  <div className="interest-tags">
                    {company.interests.map(interest => (
                      <span key={interest} className="interest-tag">{interest}</span>
                    ))}
                  </div>
                </div>
                
                <div className="company-recommendations">
                  <h4>Past Intern Recommendations:</h4>
                  <ul>
                    {company.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  type="button"
                  className="view-internships-button"
                  onClick={() => handleViewCompanyInternships(company)}
                >
                  View Internships
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="major-selection">
          <h3>Select Your Major</h3>
          <div className="major-buttons">
            {majors.map(major => (
              <button
                key={major}
                className={selectedMajor === major ? 'selected' : ''}
                onClick={() => handleMajorSelect(major)}
              >
                {major}
              </button>
            ))}
          </div>
        </div>

        <div className="semester-selection">
          <h3>Select Semester</h3>
          <div className="semester-buttons">
            {semesters.map(semester => (
              <button
                key={semester}
                className={selectedSemester === semester ? 'selected' : ''}
                onClick={() => handleSemesterSelect(semester)}
              >
                {semester}
              </button>
            ))}
          </div>
        </div>

        <div className="search-filters">
          <div className="icon-field">
            <FaSearch className="input-icon" />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="internships-container">
          <div className="internships-list">
            {filteredInternships.map(internship => (
              <div
                key={internship.id}
                className={`internship-card ${selectedInternship?.id === internship.id ? 'selected' : ''}`}
                onClick={() => handleInternshipSelect(internship)}
              >
                <div className="internship-header">
                  <h3>{internship.title}</h3>
                  <p className="company-name">{internship.company}</p>
                </div>
                <div className="internship-details">
                  <div className="detail-item">
                    <FaClock />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="detail-item">
                    <FaMoneyBillWave />
                    <span>{internship.salary}</span>
                  </div>
                  <div className="detail-item">
                    <FaGraduationCap />
                    <span>{internship.major}</span>
                  </div>
                  <div className="detail-item">
                    <FaCalendarAlt />
                    <span>{internship.semester}</span>
                  </div>
                </div>
                <div className="internship-skills">
                  {internship.requirements.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedInternship && (
            <div className="internship-details-view">
              {!showApplicationForm ? (
                <>
                  <div className="details-header">
                    <h2>{selectedInternship.title}</h2>
                    <p className="company-name">{selectedInternship.company}</p>
                  </div>
                  <div className="details-section">
                    <h3>Description</h3>
                    <p>{selectedInternship.description}</p>
                  </div>
                  <div className="details-section">
                    <h3>Details</h3>
                    <div className="details-grid">
                      <div className="detail-item">
                        <label>Duration</label>
                        <p>{selectedInternship.duration}</p>
                      </div>
                      <div className="detail-item">
                        <label>Type</label>
                        <p>{selectedInternship.type}</p>
                      </div>
                      <div className="detail-item">
                        <label>Salary</label>
                        <p>{selectedInternship.salary}</p>
                      </div>
                      <div className="detail-item">
                        <label>Major</label>
                        <p>{selectedInternship.major}</p>
                      </div>
                      <div className="detail-item">
                        <label>Semester</label>
                        <p>{selectedInternship.semester}</p>
                      </div>
                    </div>
                  </div>
                  <div className="details-section">
                    <h3>Requirements</h3>
                    <div className="internship-skills">
                      {selectedInternship.requirements.map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <button className="apply-button" onClick={handleApply}>
                    Apply Now
                  </button>
                </>
              ) : (
                <form className="application-form" onSubmit={handleSubmitApplication}>
                  <h3>Submit Application</h3>
                  <div className="form-group">
                    <label>Resume</label>
                    <input type="file" accept=".pdf,.doc,.docx" required />
                  </div>
                  <div className="form-group">
                    <label>Cover Letter</label>
                    <input type="file" accept=".pdf,.doc,.docx" required />
                  </div>
                  <div className="form-group">
                    <label>Upload Certificates (Optional)</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, 'certificates')}
                      multiple
                    />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={() => setShowApplicationForm(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="submit-button">
                      Submit Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProStudentInternships; 