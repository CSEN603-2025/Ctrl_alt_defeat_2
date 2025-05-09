import React, { useState } from 'react';
import { FaBuilding, FaEye, FaCheck, FaTimes, FaChartBar, FaLock, FaUnlock, FaFilter, FaEdit, FaPlus } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
import AssessmentQuestions from './AssessmentQuestions';
import './ProStudentProfile.css';

const ProStudentProfile = () => {
  const [selectedTab, setSelectedTab] = useState('main-profile');
  const [showScore, setShowScore] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [assessmentFilter, setAssessmentFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [postedScores, setPostedScores] = useState([]);

  // Mock data for student profile
  const [profileData, setProfileData] = useState({
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@guc.edu.eg',
      major: 'Computer Science',
      semester: 'Semester 5',
      gpa: '3.8'
    },
    jobInterests: [
      'Software Development',
      'Web Development',
      'Mobile App Development',
      'UI/UX Design'
    ],
    previousInternships: [
      {
        id: 1,
        company: 'Tech Solutions Inc.',
        position: 'Software Development Intern',
        duration: '3 months',
        responsibilities: [
          'Developed and maintained web applications',
          'Collaborated with team members on project features',
          'Participated in code reviews and testing'
        ],
        startDate: '2023-06-01',
        endDate: '2023-08-31'
      }
    ],
    partTimeJobs: [
      {
        id: 1,
        company: 'Freelance Platform',
        position: 'Web Developer',
        duration: '6 months',
        responsibilities: [
          'Created responsive websites for clients',
          'Implemented frontend features using React',
          'Optimized website performance'
        ],
        startDate: '2023-01-01',
        endDate: '2023-06-30'
      }
    ],
    collegeActivities: [
      {
        id: 1,
        name: 'Computer Science Club',
        role: 'Vice President',
        duration: '1 year',
        description: 'Organized workshops and coding competitions',
        startDate: '2023-09-01',
        endDate: 'Present'
      },
      {
        id: 2,
        name: 'Hackathon Team',
        role: 'Team Lead',
        duration: '6 months',
        description: 'Led team to win regional hackathon',
        startDate: '2023-03-01',
        endDate: '2023-08-31'
      }
    ]
  });

  // Mock data for profile views
  const profileViews = [
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      viewedDate: '2024-03-15',
      viewedTime: '14:30',
      status: 'viewed'
    },
    {
      id: 2,
      company: 'Data Analytics Co.',
      viewedDate: '2024-03-14',
      viewedTime: '10:15',
      status: 'viewed'
    },
    {
      id: 3,
      company: 'Secure Systems Ltd.',
      viewedDate: '2024-03-13',
      viewedTime: '16:45',
      status: 'viewed'
    }
  ];

  // Mock data for online assessments
  const assessments = [
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
    }
  ];

  const handleStartAssessment = (assessmentId) => {
    setCurrentAssessment(assessmentId);
  };

  const handleAssessmentComplete = (score) => {
    // Update the assessment status and score
    const updatedAssessments = assessments.map(assessment => {
      if (assessment.id === currentAssessment) {
        return {
          ...assessment,
          status: 'completed',
          score: score
        };
      }
      return assessment;
    });
    
    // Reset current assessment
    setCurrentAssessment(null);
  };

  const handleToggleScoreVisibility = () => {
    setShowScore(!showScore);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to a backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
  };

  const handlePostScore = (assessment) => {
    if (!postedScores.includes(assessment.id)) {
      setPostedScores([...postedScores, assessment.id]);
    } else {
      setPostedScores(postedScores.filter(id => id !== assessment.id));
    }
  };

  const renderMainProfile = () => (
    <div className="main-profile-section">
      <div className="profile-header">
        <h2>Main Profile</h2>
        {!isEditing ? (
          <button className="edit-button" onClick={handleEdit}>
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="edit-actions">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="save-button" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="profile-sections">
        {/* Personal Information */}
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Name</label>
              {isEditing ? (
                <input type="text" value={profileData.personalInfo.name} />
              ) : (
                <p>{profileData.personalInfo.name}</p>
              )}
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{profileData.personalInfo.email}</p>
            </div>
            <div className="info-item">
              <label>Major</label>
              <p>{profileData.personalInfo.major}</p>
            </div>
            <div className="info-item">
              <label>Semester</label>
              <p>{profileData.personalInfo.semester}</p>
            </div>
            <div className="info-item">
              <label>GPA</label>
              <p>{profileData.personalInfo.gpa}</p>
            </div>
          </div>
        </div>

        {/* Job Interests */}
        <div className="profile-section">
          <div className="section-header">
            <h3>Job Interests</h3>
            {isEditing && (
              <button className="add-button">
                <FaPlus /> Add Interest
              </button>
            )}
          </div>
          <div className="interests-grid">
            {profileData.jobInterests.map((interest, index) => (
              <div key={index} className="interest-item">
                {isEditing ? (
                  <input type="text" value={interest} />
                ) : (
                  <span className="interest-tag">{interest}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Previous Internships */}
        <div className="profile-section">
          <div className="section-header">
            <h3>Previous Internships</h3>
            {isEditing && (
              <button className="add-button">
                <FaPlus /> Add Internship
              </button>
            )}
          </div>
          <div className="experience-list">
            {profileData.previousInternships.map(internship => (
              <div key={internship.id} className="experience-card">
                <div className="experience-header">
                  <h4>{internship.position}</h4>
                  <p className="company-name">{internship.company}</p>
                  <p className="duration">{internship.duration}</p>
                </div>
                <div className="experience-details">
                  <p className="date-range">
                    {new Date(internship.startDate).toLocaleDateString()} - {new Date(internship.endDate).toLocaleDateString()}
                  </p>
                  <h5>Responsibilities:</h5>
                  <ul>
                    {internship.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part-Time Jobs */}
        <div className="profile-section">
          <div className="section-header">
            <h3>Part-Time Jobs</h3>
            {isEditing && (
              <button className="add-button">
                <FaPlus /> Add Job
              </button>
            )}
          </div>
          <div className="experience-list">
            {profileData.partTimeJobs.map(job => (
              <div key={job.id} className="experience-card">
                <div className="experience-header">
                  <h4>{job.position}</h4>
                  <p className="company-name">{job.company}</p>
                  <p className="duration">{job.duration}</p>
                </div>
                <div className="experience-details">
                  <p className="date-range">
                    {new Date(job.startDate).toLocaleDateString()} - {new Date(job.endDate).toLocaleDateString()}
                  </p>
                  <h5>Responsibilities:</h5>
                  <ul>
                    {job.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* College Activities */}
        <div className="profile-section">
          <div className="section-header">
            <h3>College Activities</h3>
            {isEditing && (
              <button className="add-button">
                <FaPlus /> Add Activity
              </button>
            )}
          </div>
          <div className="experience-list">
            {profileData.collegeActivities.map(activity => (
              <div key={activity.id} className="experience-card">
                <div className="experience-header">
                  <h4>{activity.name}</h4>
                  <p className="role">{activity.role}</p>
                  <p className="duration">{activity.duration}</p>
                </div>
                <div className="experience-details">
                  <p className="date-range">
                    {new Date(activity.startDate).toLocaleDateString()} - {activity.endDate}
                  </p>
                  <p className="description">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Posted Assessment Scores */}
        <div className="profile-section">
          <div className="section-header">
            <h3>Posted Assessment Scores</h3>
          </div>
          <div className="posted-scores-grid">
            {assessments
              .filter(assessment => postedScores.includes(assessment.id))
              .map(assessment => (
                <div key={assessment.id} className="posted-score-card">
                  <div className="score-header">
                    <h4>{assessment.title}</h4>
                    <button 
                      className="remove-score-button"
                      onClick={() => handlePostScore(assessment)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <div className="score-value">{assessment.score}%</div>
                  <div className="score-topics">
                    {assessment.topics.map(topic => (
                      <span key={topic} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfileViews = () => (
    <div className="profile-views-section">
      <h2>Companies That Viewed Your Profile</h2>
      <div className="views-list">
        {profileViews.map(view => (
          <div key={view.id} className="view-card">
            <div className="view-header">
              <FaBuilding className="company-icon" />
              <h3>{view.company}</h3>
              <span className={`view-status ${view.status}`}>
                <FaEye />
                Viewed
              </span>
            </div>
            <div className="view-details">
              <p>Viewed on: {view.viewedDate}</p>
              <p>Time: {view.viewedTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAssessments = () => {
    if (currentAssessment) {
      return (
        <AssessmentQuestions
          assessmentId={currentAssessment}
          onComplete={handleAssessmentComplete}
        />
      );
    }

    const filteredAssessments = assessments.filter(assessment => {
      if (assessmentFilter === 'all') return true;
      return assessment.status === assessmentFilter;
    });

    return (
      <div className="assessments-section">
        <div className="assessments-header">
          <h2>Online Assessments</h2>
          <div className="assessment-filters">
            <button
              className={`filter-button ${assessmentFilter === 'all' ? 'active' : ''}`}
              onClick={() => setAssessmentFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-button ${assessmentFilter === 'available' ? 'active' : ''}`}
              onClick={() => setAssessmentFilter('available')}
            >
              Available
            </button>
            <button
              className={`filter-button ${assessmentFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setAssessmentFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>
        <div className="assessments-list">
          {filteredAssessments.map(assessment => (
            <div key={assessment.id} className="assessment-card">
              <div className="assessment-header">
                <h3>{assessment.title}</h3>
                <span className={`assessment-status ${assessment.status}`}>
                  {assessment.status === 'completed' ? 'Completed' : 'Available'}
                </span>
              </div>
              <div className="assessment-details">
                <p><strong>Duration:</strong> {assessment.duration}</p>
                <p><strong>Questions:</strong> {assessment.questions}</p>
                <div className="assessment-topics">
                  <strong>Topics:</strong>
                  <div className="topic-tags">
                    {assessment.topics.map(topic => (
                      <span key={topic} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                </div>
                {assessment.status === 'completed' && (
                  <div className="assessment-score">
                    <div className="score-header">
                      <FaChartBar />
                      <h4>Your Score</h4>
                      <button 
                        className="visibility-toggle"
                        onClick={handleToggleScoreVisibility}
                      >
                        {showScore ? <FaUnlock /> : <FaLock />}
                      </button>
                    </div>
                    {showScore ? (
                      <div className="score-display">
                        <span className="score-value">{assessment.score}%</span>
                        <button 
                          className={`post-score-button ${postedScores.includes(assessment.id) ? 'posted' : ''}`}
                          onClick={() => handlePostScore(assessment)}
                        >
                          {postedScores.includes(assessment.id) ? 'Posted on Profile' : 'Post on Profile'}
                        </button>
                      </div>
                    ) : (
                      <div className="score-hidden">
                        <span>Score Hidden</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {assessment.status === 'available' && (
                <button 
                  className="start-assessment-button"
                  onClick={() => handleStartAssessment(assessment.id)}
                >
                  Start Assessment
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <BackButton />
        <h1>My Profile</h1>

        <div className="profile-tabs">
          <button
            className={selectedTab === 'main-profile' ? 'active' : ''}
            onClick={() => setSelectedTab('main-profile')}
          >
            Main Profile
          </button>
          <button
            className={selectedTab === 'profile-views' ? 'active' : ''}
            onClick={() => setSelectedTab('profile-views')}
          >
            Profile Views
          </button>
          <button
            className={selectedTab === 'assessments' ? 'active' : ''}
            onClick={() => setSelectedTab('assessments')}
          >
            Online Assessments
          </button>
        </div>

        {selectedTab === 'main-profile' ? renderMainProfile() : 
         selectedTab === 'profile-views' ? renderProfileViews() : 
         renderAssessments()}
      </div>
    </div>
  );
};

export default ProStudentProfile; 