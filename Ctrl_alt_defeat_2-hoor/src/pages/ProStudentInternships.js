import React, { useState, useEffect } from 'react';
import { FaSearch, FaBuilding, FaClock, FaMoneyBillWave, FaGraduationCap, FaCalendarAlt, FaStar, FaUsers, FaIndustry, FaFilter, FaSortAmountDown, FaLinkedin, FaTwitter, FaGlobe, FaFileAlt } from 'react-icons/fa';
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
  const [activeTab, setActiveTab] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [filterDuration, setFilterDuration] = useState('');
  const [filterCompensation, setFilterCompensation] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedCompletedInternship, setSelectedCompletedInternship] = useState(null);
  const [applicationFiles, setApplicationFiles] = useState({
    cv: null,
    coverLetter: null,
    certificates: []
  });
  const [evaluationData, setEvaluationData] = useState({
    rating: 0,
    feedback: '',
    skillsGained: [],
    challenges: '',
    recommendations: ''
  });
  const [reportData, setReportData] = useState({
    title: '',
    content: '',
    achievements: [],
    learnings: [],
    attachments: []
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
    {
      id: 1,
      title: 'Software Development Intern',
      company: 'Instabug',
      logo: '/images/instabug.png',
      duration: '3 months',
      type: 'Full-time',
      salary: '$25/hour',
      compensation: 'Paid',
      industry: 'Technology',
      requirements: ['Python', 'JavaScript', 'React'],
      description: 'Join our development team to work on cutting-edge web applications.',
      major: 'Computer Science',
      semester: 'Semester 1',
      date: '2024-03-15',
      social: {
        linkedin: 'https://linkedin.com/company/instabug',
        twitter: 'https://twitter.com/instabug',
        website: 'https://instabug.com'
      }
    },
    {
      id: 2,
      title: 'Junior Developer Intern',
      company: 'Breadfast',
      logo: '/images/breadfast.png',
      duration: '3 months',
      type: 'Part-time',
      salary: '$20/hour',
      compensation: 'Paid',
      industry: 'E-commerce',
      requirements: ['Java', 'HTML', 'CSS'],
      description: 'Learn the basics of software development in a supportive environment.',
      major: 'Computer Science',
      semester: 'Semester 2',
      date: '2024-03-10',
      social: {
        linkedin: 'https://linkedin.com/company/breadfast',
        website: 'https://breadfast.com'
      }
    },
    {
      id: 3,
      title: 'Web Development Intern',
      company: 'Bosta',
      logo: '/images/bosta.png',
      duration: '4 months',
      type: 'Full-time',
      salary: '$22/hour',
      compensation: 'Paid',
      industry: 'Logistics',
      requirements: ['JavaScript', 'Node.js', 'MongoDB'],
      description: 'Work on full-stack web development projects.',
      major: 'Computer Science',
      semester: 'Semester 3',
      date: '2024-03-05',
      social: {
        linkedin: 'https://linkedin.com/company/bosta',
        website: 'https://bosta.co'
      }
    },
    {
      id: 4,
      title: 'Mobile App Development Intern',
      company: 'Valeo',
      logo: '/images/valeo.png',
      duration: '3 months',
      type: 'Full-time',
      salary: '$24/hour',
      compensation: 'Paid',
      industry: 'Automotive',
      requirements: ['React Native', 'JavaScript', 'Mobile Development'],
      description: 'Develop cross-platform mobile applications.',
      major: 'Computer Science',
      semester: 'Semester 4',
      date: '2024-03-01',
      social: {
        linkedin: 'https://linkedin.com/company/valeo',
        website: 'https://valeo.com'
      }
    }
  ];

  const suggestedCompanies = [
    {
      id: 1,
      name: 'Quantum Computing Corp',
      industry: 'Quantum Computing',
      rating: 4.9,
      pastInterns: 15,
      description: 'Leading quantum computing company developing next-generation quantum algorithms and software.',
      interests: ['Quantum Computing', 'Software Development', 'Research'],
      recommendations: [
        'Cutting-edge quantum projects',
        'Research-focused environment',
        'High compensation'
      ],
      internships: [
        {
          id: 15,
          title: 'Quantum Software Intern',
          company: 'Quantum Computing Corp',
          logo: '/images/quantum.png',
      duration: '3 months',
      type: 'Full-time',
          salary: '$4,000/month',
          compensation: 'Paid',
          industry: 'Quantum Computing',
          requirements: ['Python', 'Quantum Computing', 'Linear Algebra', 'C++'],
          description: 'Work on the cutting edge of quantum computing software development. Help develop algorithms and software for quantum computers.',
      major: 'Computer Science',
          semester: 'Summer 2024',
          date: '2024-07-01',
          social: {
            linkedin: 'https://linkedin.com/company/quantum-computing',
            website: 'https://quantum-computing.com'
          }
        }
      ]
    },
    {
      id: 2,
      name: 'RoboTech Industries',
      industry: 'Robotics',
      rating: 4.8,
      pastInterns: 28,
      description: 'Innovative robotics company developing autonomous systems and robotic solutions.',
      interests: ['Robotics', 'AI', 'Automation'],
      recommendations: [
        'Hands-on robotics experience',
        'Industry-leading projects',
        'Career growth opportunities'
      ],
      internships: [
        {
          id: 16,
          title: 'Robotics Software Intern',
          company: 'RoboTech Industries',
          logo: '/images/robotech.png',
      duration: '4 months',
      type: 'Full-time',
          salary: '$3,500/month',
          compensation: 'Paid',
          industry: 'Robotics',
          requirements: ['C++', 'ROS', 'Computer Vision', 'Control Systems'],
          description: 'Develop software for autonomous robots and robotic systems. Work on motion planning, computer vision, and control systems.',
      major: 'Computer Science',
          semester: 'Fall 2024',
          date: '2024-09-15',
          social: {
            linkedin: 'https://linkedin.com/company/robotech',
            website: 'https://robotech.com'
          }
        }
      ]
    },
    {
      id: 3,
      name: 'BioTech Innovations',
      industry: 'Biotechnology',
      rating: 4.7,
      pastInterns: 32,
      description: 'Pioneering biotech company combining computational biology with cutting-edge research.',
      interests: ['Bioinformatics', 'Computational Biology', 'Research'],
      recommendations: [
        'Interdisciplinary projects',
        'Research opportunities',
        'Healthcare impact'
      ],
      internships: [
        {
          id: 17,
          title: 'Bioinformatics Intern',
          company: 'BioTech Innovations',
          logo: '/images/biotech.png',
          duration: '6 months',
      type: 'Full-time',
          salary: '$3,200/month',
          compensation: 'Paid',
          industry: 'Biotechnology',
          requirements: ['Python', 'Bioinformatics', 'Machine Learning', 'Statistics'],
          description: 'Work on computational biology and bioinformatics projects. Analyze genetic data and develop algorithms for biological research.',
      major: 'Computer Science',
          semester: 'Spring 2024',
          date: '2024-03-15',
          social: {
            linkedin: 'https://linkedin.com/company/biotech-innovations',
            website: 'https://biotech-innovations.com'
          }
        }
      ]
    },
    {
      id: 4,
      name: 'GreenTech Solutions',
      industry: 'Clean Energy',
      rating: 4.8,
      pastInterns: 25,
      description: 'Leading clean energy technology company developing smart grid solutions.',
      interests: ['Clean Energy', 'Smart Grid', 'Sustainability'],
      recommendations: [
        'Environmental impact',
        'Innovative technology',
        'Growing industry'
      ],
      internships: [
    {
      id: 18,
          title: 'Smart Grid Software Intern',
          company: 'GreenTech Solutions',
          logo: '/images/greentech.png',
      duration: '3 months',
      type: 'Full-time',
          salary: '$3,300/month',
          compensation: 'Paid',
          industry: 'Clean Energy',
          requirements: ['Java', 'IoT', 'Energy Systems', 'Data Analytics'],
          description: 'Develop software for smart grid systems and renewable energy management. Work on energy optimization and grid management solutions.',
          major: 'Computer Science',
          semester: 'Summer 2024',
          date: '2024-06-15',
          social: {
            linkedin: 'https://linkedin.com/company/greentech',
            website: 'https://greentech.com'
          }
        }
      ]
    }
  ];

  const myInternships = {
    current: [
    {
        id: 101,
        title: 'Software Development Intern',
        company: 'Instabug',
        logo: '/images/instabug.png',
        startDate: '2024-01-15',
        endDate: '2024-04-15',
        status: 'In Progress',
        mentor: 'John Doe',
        progress: 60,
      duration: '3 months',
      type: 'Full-time',
        salary: '$25/hour',
        compensation: 'Paid',
        industry: 'Technology',
        requirements: ['Python', 'JavaScript', 'React'],
        description: 'Join our development team to work on cutting-edge web applications.',
        major: 'Computer Science',
        semester: 'Semester 1',
        social: {
          linkedin: 'https://linkedin.com/company/instabug',
          twitter: 'https://twitter.com/instabug',
          website: 'https://instabug.com'
        }
      }
    ],
    completed: [
    {
        id: 102,
        title: 'Web Development Intern',
        company: 'Bosta',
        logo: '/images/bosta.png',
        startDate: '2023-09-01',
        endDate: '2023-12-01',
        status: 'Completed',
        mentor: 'Jane Smith',
        finalGrade: 'A',
        certificate: '/certificates/bosta-internship.pdf',
      duration: '3 months',
      type: 'Full-time',
      salary: '$22/hour',
        compensation: 'Paid',
        industry: 'Logistics',
        requirements: ['JavaScript', 'Node.js', 'MongoDB'],
        description: 'Worked on full-stack web development projects and implemented new features.',
        major: 'Computer Science',
        semester: 'Semester 3',
        social: {
          linkedin: 'https://linkedin.com/company/bosta',
          website: 'https://bosta.co'
        }
      }
      ]
  };

  const suggestedInternships = [
    {
      id: 's1',
      company: 'Quantum Computing Corp',
      logo: '/images/instabug.png',
      title: 'Quantum Software Intern',
      industry: 'Quantum Computing',
      type: 'Summer',
      date: '2024-07-01',
      duration: '3 months',
      compensation: 'Paid',
      salary: '$4,000/month',
      major: 'Computer Science',
      semester: 'Summer 2024',
      description: 'Work on the cutting edge of quantum computing software development. Help develop algorithms and software for quantum computers.',
      requirements: ['Python', 'Quantum Computing', 'Linear Algebra', 'C++'],
      social: {
        linkedin: 'https://linkedin.com/company/quantum-computing',
        twitter: 'https://twitter.com/quantum-computing',
        website: 'https://quantum-computing.com'
      }
    },
    {
      id: 's2',
      company: 'RoboTech Industries',
      logo: '/images/breadfast.png',
      title: 'Robotics Software Intern',
      industry: 'Robotics',
      type: 'Fall',
      date: '2024-09-15',
      duration: '4 months',
      compensation: 'Paid',
      salary: '$3,500/month',
      major: 'Computer Science',
      semester: 'Fall 2024',
      description: 'Develop software for autonomous robots and robotic systems. Work on motion planning, computer vision, and control systems.',
      requirements: ['C++', 'ROS', 'Computer Vision', 'Control Systems'],
      social: {
        linkedin: 'https://linkedin.com/company/robotech',
        twitter: 'https://twitter.com/robotech',
        website: 'https://robotech.com'
      }
    },
    {
      id: 's3',
      company: 'BioTech Innovations',
      logo: '/images/bosta.png',
      title: 'Bioinformatics Intern',
      industry: 'Biotechnology',
      type: 'Spring',
      date: '2024-03-15',
      duration: '6 months',
      compensation: 'Paid',
      salary: '$3,200/month',
      major: 'Computer Science',
      semester: 'Spring 2024',
      description: 'Work on computational biology and bioinformatics projects. Analyze genetic data and develop algorithms for biological research.',
      requirements: ['Python', 'Bioinformatics', 'Machine Learning', 'Statistics'],
      social: {
        linkedin: 'https://linkedin.com/company/biotech-innovations',
        twitter: 'https://twitter.com/biotech-innovations',
        website: 'https://biotech-innovations.com'
      }
    },
    {
      id: 's4',
      company: 'GreenTech Solutions',
      logo: '/images/valeo.png',
      title: 'Smart Grid Software Intern',
      industry: 'Clean Energy',
      type: 'Summer',
      date: '2024-06-15',
      duration: '3 months',
      compensation: 'Paid',
      salary: '$3,300/month',
      major: 'Computer Science',
      semester: 'Summer 2024',
      description: 'Develop software for smart grid systems and renewable energy management. Work on energy optimization and grid management solutions.',
      requirements: ['Java', 'IoT', 'Energy Systems', 'Data Analytics'],
      social: {
        linkedin: 'https://linkedin.com/company/greentech',
        twitter: 'https://twitter.com/greentech',
        website: 'https://greentech.com'
      }
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
    if (activeTab === 'my') {
      if (internship.status === 'Completed') {
        setSelectedCompletedInternship(internship);
        navigate(`/pro-student/internships/${internship.id}`, {
          state: {
            internship,
            isCompleted: true,
            showEvaluation: true,
            showReport: true
          }
        });
      } else {
        navigate(`/pro-student/internships/${internship.id}`, {
          state: {
            internship,
            isCurrent: true
          }
        });
      }
    } else {
      navigate(`/pro-student/internships/${internship.id}`, {
        state: { internship }
      });
    }
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
    navigate(`/pro-student/internships/${selectedInternship.id}/apply`);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setShowApplicationForm(false);
  };

  const handleViewCompanyInternships = (company) => {
    if (company.internships && company.internships.length > 0) {
      navigate(`/pro-student/internships/${company.internships[0].id}`);
    }
  };

  const filterAndSort = (data) => {
    let filtered = [...data];
    
    // Apply filters
    if (activeTab === 'my') {
      return [...myInternships.current, ...myInternships.completed];
    }
    
    if (activeTab === 'suggested') {
      return suggestedInternships;
    }
    
    if (filterIndustry) {
      filtered = filtered.filter(item => item.industry === filterIndustry);
    }
    if (filterDuration) {
      filtered = filtered.filter(item => item.duration === filterDuration);
    }
    if (filterCompensation) {
      filtered = filtered.filter(item => item.compensation === filterCompensation);
    }
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedMajor) {
      filtered = filtered.filter(item => item.major === selectedMajor);
    }
    if (selectedSemester) {
      filtered = filtered.filter(item => item.semester === selectedSemester);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

    return filtered;
  };

  const handleEvaluationSubmit = (data) => {
    console.log('Evaluation submitted:', data);
    // Here you would implement the API call to save the evaluation
  };

  const handleReportSubmit = (data) => {
    console.log('Report submitted:', data);
    // Here you would implement the API call to save the report
  };

  const EvaluationModal = ({ isOpen, onClose, internship, onSubmit }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Internship Evaluation</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(evaluationData);
            onClose();
          }}>
            <div className="form-group">
              <label>Overall Rating</label>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= evaluationData.rating ? 'filled' : ''}`}
                    onClick={() => setEvaluationData({...evaluationData, rating: star})}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Feedback</label>
              <textarea
                value={evaluationData.feedback}
                onChange={(e) => setEvaluationData({...evaluationData, feedback: e.target.value})}
                placeholder="Share your experience..."
                required
              />
            </div>
            <div className="form-group">
              <label>Skills Gained</label>
              <input
                type="text"
                value={evaluationData.skillsGained.join(', ')}
                onChange={(e) => setEvaluationData({
                  ...evaluationData,
                  skillsGained: e.target.value.split(',').map(skill => skill.trim())
                })}
                placeholder="Enter skills separated by commas"
              />
            </div>
            <div className="form-group">
              <label>Challenges</label>
              <textarea
                value={evaluationData.challenges}
                onChange={(e) => setEvaluationData({...evaluationData, challenges: e.target.value})}
                placeholder="Describe the challenges you faced..."
              />
            </div>
            <div className="form-group">
              <label>Recommendations</label>
              <textarea
                value={evaluationData.recommendations}
                onChange={(e) => setEvaluationData({...evaluationData, recommendations: e.target.value})}
                placeholder="Share your recommendations..."
              />
            </div>
            <div className="modal-actions">
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit">Submit Evaluation</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ReportModal = ({ isOpen, onClose, internship, onSubmit }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Internship Report</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(reportData);
            onClose();
          }}>
            <div className="form-group">
              <label>Report Title</label>
              <input
                type="text"
                value={reportData.title}
                onChange={(e) => setReportData({...reportData, title: e.target.value})}
                placeholder="Enter report title"
                required
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                value={reportData.content}
                onChange={(e) => setReportData({...reportData, content: e.target.value})}
                placeholder="Write your report content..."
                required
              />
            </div>
            <div className="form-group">
              <label>Achievements</label>
              <input
                type="text"
                value={reportData.achievements.join(', ')}
                onChange={(e) => setReportData({
                  ...reportData,
                  achievements: e.target.value.split(',').map(achievement => achievement.trim())
                })}
                placeholder="Enter achievements separated by commas"
              />
            </div>
            <div className="form-group">
              <label>Key Learnings</label>
              <input
                type="text"
                value={reportData.learnings.join(', ')}
                onChange={(e) => setReportData({
                  ...reportData,
                  learnings: e.target.value.split(',').map(learning => learning.trim())
                })}
                placeholder="Enter key learnings separated by commas"
              />
            </div>
            <div className="form-group">
              <label>Attachments</label>
              <input
                type="file"
                multiple
                onChange={(e) => setReportData({
                  ...reportData,
                  attachments: [...e.target.files]
                })}
              />
            </div>
            <div className="modal-actions">
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit">Submit Report</button>
              <button type="button" onClick={() => {
                // Convert report to PDF and download
                const pdfContent = {
                  title: reportData.title,
                  content: reportData.content,
                  achievements: reportData.achievements,
                  learnings: reportData.learnings
                };
                // Here you would implement the PDF conversion and download
                console.log('Downloading PDF:', pdfContent);
              }}>Download Report</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <BackButton />
        <h1>Internships</h1>

        {/* Tab Navigation */}
        <div className="internship-tabs">
                <button 
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Internships
          </button>
          <button
            className={`tab-button ${activeTab === 'suggested' ? 'active' : ''}`}
            onClick={() => setActiveTab('suggested')}
          >
            Suggested Internships
          </button>
          <button
            className={`tab-button ${activeTab === 'my' ? 'active' : ''}`}
            onClick={() => setActiveTab('my')}
                >
            My Internships
                </button>
              </div>

        {activeTab === 'my' ? (
          <div className="my-internships-section">
            <h2>Current Internships</h2>
            <div className="internship-table-container">
              <table className="internship-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {myInternships.current.map((internship) => (
                    <tr 
                      key={internship.id}
                      onClick={() => handleInternshipSelect(internship)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img 
                            src={internship.logo} 
                            alt={internship.company}
                            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                          />
                          {internship.company}
          </div>
                      </td>
                      <td>{internship.title}</td>
                      <td>{internship.startDate}</td>
                      <td>{internship.endDate}</td>
                      <td>{internship.status}</td>
                      <td>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${internship.progress}%` }}
                          />
                          <span>{internship.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
        </div>

            <h2>Completed Internships</h2>
            <div className="internship-table-container">
              <table className="internship-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Final Grade</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myInternships.completed.map((internship) => (
                    <tr 
                      key={internship.id}
                      onClick={() => handleInternshipSelect(internship)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img 
                            src={internship.logo} 
                            alt={internship.company}
                            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                          />
                          {internship.company}
                        </div>
                      </td>
                      <td>{internship.title}</td>
                      <td>{internship.duration}</td>
                      <td>{internship.status}</td>
                      <td>{internship.finalGrade}</td>
                      <td>
                        <div className="action-buttons">
              <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCompletedInternship(internship);
                              setShowEvaluationModal(true);
                            }}
              >
                            Evaluation
              </button>
              <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCompletedInternship(internship);
                              setShowReportModal(true);
                            }}
              >
                            Report
              </button>
                        </div>
                      </td>
                    </tr>
            ))}
                </tbody>
              </table>
          </div>
        </div>
        ) : (
          <>
        <div className="search-filters">
          <div className="icon-field">
            <FaSearch className="input-icon" />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

          <div className="icon-field">
            <FaGraduationCap className="input-icon" />
            <select value={selectedMajor || ''} onChange={(e) => setSelectedMajor(e.target.value || null)}>
              <option value="">All Majors</option>
              {majors.map(major => (
                <option key={major} value={major}>{major}</option>
              ))}
            </select>
                </div>

          <div className="icon-field">
            <FaCalendarAlt className="input-icon" />
            <select value={selectedSemester || ''} onChange={(e) => setSelectedSemester(e.target.value || null)}>
              <option value="">All Semesters</option>
              {semesters.map(semester => (
                <option key={semester} value={semester}>{semester}</option>
            ))}
            </select>
          </div>

          <div className="icon-field">
            <FaFilter className="input-icon" />
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="all">All Internships</option>
              <option value="my">My Internships</option>
              <option value="suggested">Suggested Internships</option>
            </select>
                  </div>

          <div className="icon-field">
            <FaSortAmountDown className="input-icon" />
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
                  </div>
                      </div>

            <div className="internship-table-container animated fadeInUp">
              <table className="internship-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Job Title</th>
                    <th>Major</th>
                    <th>Semester</th>
                    <th>Duration</th>
                    <th>Posted Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filterAndSort(activeTab === 'suggested' ? suggestedInternships : internships).map((internship) => (
                    <tr 
                      key={internship.id} 
                      className="pop-in delay-0"
                      onClick={() => handleInternshipSelect(internship)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img 
                            src={internship.logo} 
                            alt={internship.company} 
                            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/images/company-logo.png';
                            }}
                          />
                          {internship.company}
                      </div>
                      </td>
                      <td>{internship.title}</td>
                      <td>{internship.major}</td>
                      <td>{internship.semester}</td>
                      <td>{internship.duration}</td>
                      <td>{internship.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
                    </div>
          </>
        )}

        <EvaluationModal
          isOpen={showEvaluationModal}
          onClose={() => setShowEvaluationModal(false)}
          internship={selectedCompletedInternship}
          onSubmit={handleEvaluationSubmit}
        />

        <ReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          internship={selectedCompletedInternship}
          onSubmit={handleReportSubmit}
        />
      </div>
    </div>
  );
};

export default ProStudentInternships; 