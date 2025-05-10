import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBuilding, FaClock, FaMoneyBillWave, FaGraduationCap, FaCalendarAlt, FaIndustry, FaLinkedin, FaTwitter, FaGlobe, FaFileAlt } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import './ProStudentInternships.css';

const ProStudentInternshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);

  useEffect(() => {
    // In a real application, this would be an API call
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
        description: 'Join our development team to work on cutting-edge web applications. You will be responsible for developing and maintaining web applications, working with modern technologies, and collaborating with a team of experienced developers.',
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
      },
      {
        id: 5,
        title: 'Software Engineering Intern',
        company: 'Instabug',
        logo: '/images/instabug.png',
        duration: '4 months',
        type: 'Full-time',
        salary: '$26/hour',
        compensation: 'Paid',
        industry: 'Technology',
        requirements: ['Python', 'Java', 'System Design'],
        description: 'Work on large-scale software systems and architecture.',
        major: 'Computer Science',
        semester: 'Semester 5',
        date: '2024-02-28',
        social: {
          linkedin: 'https://linkedin.com/company/instabug',
          twitter: 'https://twitter.com/instabug',
          website: 'https://instabug.com'
        }
      },
      {
        id: 6,
        title: 'Cloud Computing Intern',
        company: 'Breadfast',
        logo: '/images/breadfast.png',
        duration: '3 months',
        type: 'Full-time',
        salary: '$28/hour',
        compensation: 'Paid',
        industry: 'E-commerce',
        requirements: ['AWS', 'Docker', 'Kubernetes'],
        description: 'Learn cloud infrastructure and deployment.',
        major: 'Computer Science',
        semester: 'Semester 6',
        date: '2024-02-25',
        social: {
          linkedin: 'https://linkedin.com/company/breadfast',
          website: 'https://breadfast.com'
        }
      },
      {
        id: 7,
        title: 'AI Development Intern',
        company: 'Valeo',
        logo: '/images/valeo.png',
        duration: '4 months',
        type: 'Full-time',
        salary: '$30/hour',
        compensation: 'Paid',
        industry: 'Automotive',
        requirements: ['Python', 'Machine Learning', 'TensorFlow'],
        description: 'Work on AI and machine learning projects.',
        major: 'Computer Science',
        semester: 'Semester 7',
        date: '2024-02-20',
        social: {
          linkedin: 'https://linkedin.com/company/valeo',
          website: 'https://valeo.com'
        }
      },
      {
        id: 8,
        title: 'Senior Software Intern',
        company: 'Bosta',
        logo: '/images/bosta.png',
        duration: '3 months',
        type: 'Full-time',
        salary: '$32/hour',
        compensation: 'Paid',
        industry: 'Logistics',
        requirements: ['System Architecture', 'Leadership', 'Project Management'],
        description: 'Lead development teams and manage projects.',
        major: 'Computer Science',
        semester: 'Semester 8',
        date: '2024-02-15',
        social: {
          linkedin: 'https://linkedin.com/company/bosta',
          website: 'https://bosta.co'
        }
      }
    ];

    const foundInternship = internships.find(i => i.id === parseInt(id));
    if (foundInternship) {
      setInternship(foundInternship);
    } else {
      navigate('/pro-student/internships');
    }
  }, [id, navigate]);

  const handleApply = () => {
    navigate(`/pro-student/internships/${id}/apply`);
  };

  if (!internship) {
    return (
      <div className="pro-student-layout">
        <ProStudentSidebar />
        <div className="pro-student-content">
          <BackButton />
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading internship details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <BackButton />
        <div className="internship-details-container">
          <div className="details-card">
            <div className="details-header">
              <div className="logo-container">
                <img 
                  src={internship.logo} 
                  alt={internship.company} 
                  className="company-logo-large"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/default-company.png';
                  }}
                />
              </div>
              <div className="company-info">
                <h2>{internship.company}</h2>
                <p className="internship-title">{internship.title}</p>
                <div className="tags-container">
                  <span className="badge">{internship.industry}</span>
                  <span className="status-tag">{internship.type}</span>
                  <span className="date-tag">📅 {internship.date}</span>
                </div>
              </div>
            </div>

            <div className="details-content">
              <div className="info-grid">
                <div className="info-item">
                  <FaClock />
                  <div>
                    <label>Duration</label>
                    <p>{internship.duration}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaMoneyBillWave />
                  <div>
                    <label>Compensation</label>
                    <p>{internship.compensation} {internship.salary}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaGraduationCap />
                  <div>
                    <label>Major</label>
                    <p>{internship.major}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaCalendarAlt />
                  <div>
                    <label>Semester</label>
                    <p>{internship.semester}</p>
                  </div>
                </div>
              </div>

              <div className="description-documents-container">
                <div className="description">
                  <h4>Description</h4>
                  <p className="description-text">{internship.description}</p>
                </div>

                <div className="documents-section">
                  <h4>Required Documents</h4>
                  <ul className="documents-list">
                    <li>
                      <FaFileAlt />
                      <span>CV/Resume</span>
                    </li>
                    <li>
                      <FaFileAlt />
                      <span>Cover Letter</span>
                    </li>
                    <li>
                      <FaFileAlt />
                      <span>Academic Transcript</span>
                    </li>
                    <li>
                      <FaFileAlt />
                      <span>ID/Passport Copy</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="requirements-section">
                <h4>Required Skills</h4>
                <div className="skills-list">
                  {internship.requirements.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="social-links">
                {internship.social.linkedin && (
                  <a href={internship.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                )}
                {internship.social.twitter && (
                  <a href={internship.social.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                )}
                {internship.social.website && (
                  <a href={internship.social.website} target="_blank" rel="noopener noreferrer">
                    <FaGlobe />
                  </a>
                )}
              </div>

              <div className="apply-button-container">
                <button className="apply-button" onClick={handleApply}>
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProStudentInternshipDetails; 