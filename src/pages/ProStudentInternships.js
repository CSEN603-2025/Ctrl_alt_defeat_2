import React, { useState } from 'react';
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
      ],
      internships: [
        {
          id: 5,
          title: 'AI/ML Intern',
          company: 'Tech Solutions Inc.',
          logo: '/images/tech-solutions.png',
          duration: '3 months',
          type: 'Full-time',
          salary: '$26/hour',
          compensation: 'Paid',
          industry: 'Technology',
          requirements: ['Python', 'Machine Learning', 'TensorFlow'],
          description: 'Work on cutting-edge AI and machine learning projects.',
          major: 'Computer Science',
          semester: 'Semester 5',
          date: '2024-03-20',
          social: {
            linkedin: 'https://linkedin.com/company/tech-solutions',
            website: 'https://tech-solutions.com'
          }
        }
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
      ],
      internships: [
        {
          id: 6,
          title: 'Data Science Intern',
          company: 'Data Analytics Co.',
          logo: '/images/data-analytics.png',
          duration: '4 months',
          type: 'Full-time',
          salary: '$25/hour',
          compensation: 'Paid',
          industry: 'Data Science',
          requirements: ['Python', 'R', 'SQL', 'Data Analysis'],
          description: 'Work on data analysis and machine learning projects.',
          major: 'Data Science',
          semester: 'Semester 6',
          date: '2024-03-18',
          social: {
            linkedin: 'https://linkedin.com/company/data-analytics',
            website: 'https://data-analytics.com'
          }
        }
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
      ],
      internships: [
        {
          id: 7,
          title: 'Cybersecurity Intern',
          company: 'Security First',
          logo: '/images/security-first.png',
          duration: '3 months',
          type: 'Full-time',
          salary: '$24/hour',
          compensation: 'Paid',
          industry: 'Cybersecurity',
          requirements: ['Network Security', 'Ethical Hacking', 'Security Tools'],
          description: 'Learn about cybersecurity and threat analysis.',
          major: 'Cybersecurity',
          semester: 'Semester 7',
          date: '2024-03-16',
          social: {
            linkedin: 'https://linkedin.com/company/security-first',
            website: 'https://security-first.com'
          }
        }
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
      ],
      internships: [
        {
          id: 8,
          title: 'Full Stack Developer Intern',
          company: 'Web Solutions',
          logo: '/images/web-solutions.png',
          duration: '3 months',
          type: 'Full-time',
          salary: '$23/hour',
          compensation: 'Paid',
          industry: 'Web Development',
          requirements: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
          description: 'Work on full-stack web development projects.',
          major: 'Computer Science',
          semester: 'Semester 8',
          date: '2024-03-14',
          social: {
            linkedin: 'https://linkedin.com/company/web-solutions',
            website: 'https://web-solutions.com'
          }
        }
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
    navigate(`/pro-student/internships/${internship.id}`);
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
        </div>

        {activeTab === 'all' ? (
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
                  {filterAndSort(internships).map((internship) => (
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
                              e.target.src = '/images/default-company.png';
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
        ) : (
          <div className="suggested-companies-section">
            <h2>Suggested Internships</h2>
            <p className="section-description">Internships recommended based on your interests and past experiences</p>
            
            <div className="search-filters">
              <div className="icon-field">
                <FaSearch className="input-icon" />
                <input
                  type="text"
                  placeholder="Search suggested internships..."
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
                  {filterAndSort(internships).map((internship) => (
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
                              e.target.src = '/images/default-company.png';
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
            </div>
          )}
      </div>
    </div>
  );
};

export default ProStudentInternships; 