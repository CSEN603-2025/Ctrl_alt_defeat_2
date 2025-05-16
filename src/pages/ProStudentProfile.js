import React, { useState, useContext } from 'react';
import { FaBuilding, FaEye, FaEdit, FaPlus, FaTrash, FaTimes,FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProStudentSidebar from '../components/ProStudentSidebar';
import { AssessmentsContext } from './AssessmentsContext'; // Updated import path
import './ProStudentProfile.css';

// Rest of the file remains unchanged
const ProStudentProfile = () => {
  const { assessments, postedScores, setPostedScores } = useContext(AssessmentsContext);
  const [selectedTab, setSelectedTab] = useState('main-profile');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Mock unread notifications count
   const [isBellAnimating, setIsBellAnimating] = useState(false);
  const handleBellClick = () => {
    setIsBellAnimating(true);
    setTimeout(() => {
      setIsBellAnimating(false);
      navigate('/pro-student/notifications');
    }, 500);
  };
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
      }
    ]
  });

  const profileViews = [
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      viewedDate: '2024-03-15',
      viewedTime: '14:30',
      status: 'viewed',
      imagePath: '/images/instabug.png'
    },
    {
      id: 2,
      company: 'Data Analytics Co.',
      viewedDate: '2024-03-14',
      viewedTime: '10:15',
      status: 'viewed',
      imagePath: '/images/breadfast.png'
    },
    {
      id: 3,
      company: 'Secure Systems Ltd.',
      viewedDate: '2024-03-13',
      viewedTime: '16:45',
      status: 'viewed',
      imagePath: '/images/valeo.png'
    }
  ];

  const handlePersonalInfoChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleJobInterestChange = (index, value) => {
    const newInterests = [...profileData.jobInterests];
    newInterests[index] = value;
    setProfileData(prev => ({
      ...prev,
      jobInterests: newInterests
    }));
  };

  const handleAddJobInterest = () => {
    setProfileData(prev => ({
      ...prev,
      jobInterests: [...prev.jobInterests, '']
    }));
  };

  const handleRemoveJobInterest = (index) => {
    setProfileData(prev => ({
      ...prev,
      jobInterests: prev.jobInterests.filter((_, i) => i !== index)
    }));
  };

  const handleInternshipChange = (id, field, value) => {
    setProfileData(prev => ({
      ...prev,
      previousInternships: prev.previousInternships.map(internship =>
        internship.id === id ? { ...internship, [field]: value } : internship
      )
    }));
  };

  const handleAddInternship = () => {
    const newInternship = {
      id: Date.now(),
      company: '',
      position: '',
      duration: '',
      responsibilities: [''],
      startDate: '',
      endDate: ''
    };
    setProfileData(prev => ({
      ...prev,
      previousInternships: [...prev.previousInternships, newInternship]
    }));
  };

  const handleRemoveInternship = (id) => {
    setProfileData(prev => ({
      ...prev,
      previousInternships: prev.previousInternships.filter(internship => internship.id !== id)
    }));
  };

  const handlePartTimeJobChange = (id, field, value) => {
    setProfileData(prev => ({
      ...prev,
      partTimeJobs: prev.partTimeJobs.map(job =>
        job.id === id ? { ...job, [field]: value } : job
      )
    }));
  };

  const handleAddPartTimeJob = () => {
    const newJob = {
      id: Date.now(),
      company: '',
      position: '',
      duration: '',
      responsibilities: [''],
      startDate: '',
      endDate: ''
    };
    setProfileData(prev => ({
      ...prev,
      partTimeJobs: [...prev.partTimeJobs, newJob]
    }));
  };

  const handleRemovePartTimeJob = (id) => {
    setProfileData(prev => ({
      ...prev,
      partTimeJobs: prev.partTimeJobs.filter(job => job.id !== id)
    }));
  };

  const handleCollegeActivityChange = (id, field, value) => {
    setProfileData(prev => ({
      ...prev,
      collegeActivities: prev.collegeActivities.map(activity =>
        activity.id === id ? { ...activity, [field]: value } : activity
      )
    }));
  };

  const handleAddCollegeActivity = () => {
    const newActivity = {
      id: Date.now(),
      name: '',
      role: '',
      duration: '',
      description: '',
      startDate: '',
      endDate: 'Present'
    };
    setProfileData(prev => ({
      ...prev,
      collegeActivities: [...prev.collegeActivities, newActivity]
    }));
  };

  const handleRemoveCollegeActivity = (id) => {
    setProfileData(prev => ({
      ...prev,
      collegeActivities: prev.collegeActivities.filter(activity => activity.id !== id)
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving profile data:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData(profileData);
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
        <div className="floating-notif" onClick={handleBellClick}>
                    <FaBell className="wiggle-bell" />
                    {unreadNotifications > 0 && (
                      <span className="notification-badge">{unreadNotifications}</span>
                    )}
                  </div>
        <h2>Main Profile</h2>
        {!isEditing ? (
          <button className="save-button" onClick={handleEdit}>
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="edit-actions">
            <button className="save-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="save-button" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="profile-sections">
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.personalInfo.name}
                  onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                />
              ) : (
                <p>{profileData.personalInfo.name}</p>
              )}
            </div>
            <div className="info-item">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                />
              ) : (
                <p>{profileData.personalInfo.email}</p>
              )}
            </div>
            <div className="info-item">
              <label>Major</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.personalInfo.major}
                  onChange={(e) => handlePersonalInfoChange('major', e.target.value)}
                />
              ) : (
                <p>{profileData.personalInfo.major}</p>
              )}
            </div>
            <div className="info-item">
              <label>Semester</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.personalInfo.semester}
                  onChange={(e) => handlePersonalInfoChange('semester', e.target.value)}
                />
              ) : (
                <p>{profileData.personalInfo.semester}</p>
              )}
            </div>
            <div className="info-item">
              <label>GPA</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.personalInfo.gpa}
                  onChange={(e) => handlePersonalInfoChange('gpa', e.target.value)}
                />
              ) : (
                <p>{profileData.personalInfo.gpa}</p>
              )}
            </div>
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h3>Job Interests</h3>
            {isEditing && (
              <button className="add-button" onClick={handleAddJobInterest}>
                <FaPlus /> Add Interest
              </button>
            )}
          </div>
          <div className="interests-grid">
            {profileData.jobInterests.map((interest, index) => (
              <div key={index} className="interest-item">
                {isEditing ? (
                  <div className="editable-interest">
                    <input
                      type="text"
                      value={interest}
                      onChange={(e) => handleJobInterestChange(index, e.target.value)}
                    />
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveJobInterest(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ) : (
                  <span className="interest-tag">{interest}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h3>Previous Internships</h3>
            {isEditing && (
              <button className="add-button" onClick={handleAddInternship}>
                <FaPlus /> Add Internship
              </button>
            )}
          </div>
          <div className="experience-list">
            {profileData.previousInternships.map(internship => (
              <div key={internship.id} className="experience-card">
                {isEditing && (
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveInternship(internship.id)}
                  >
                    <FaTrash />
                  </button>
                )}
                <div className="experience-header">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={internship.position}
                        onChange={(e) => handleInternshipChange(internship.id, 'position', e.target.value)}
                        placeholder="Position"
                      />
                      <input
                        type="text"
                        value={internship.company}
                        onChange={(e) => handleInternshipChange(internship.id, 'company', e.target.value)}
                        placeholder="Company"
                      />
                      <input
                        type="text"
                        value={internship.duration}
                        onChange={(e) => handleInternshipChange(internship.id, 'duration', e.target.value)}
                        placeholder="Duration"
                      />
                    </>
                  ) : (
                    <>
                      <h4>{internship.position}</h4>
                      <p className="company-name">{internship.company}</p>
                      <p className="duration">{internship.duration}</p>
                    </>
                  )}
                </div>
                <div className="experience-details">
                  {isEditing ? (
                    <>
                      <input
                        type="date"
                        value={internship.startDate}
                        onChange={(e) => handleInternshipChange(internship.id, 'startDate', e.target.value)}
                      />
                      <input
                        type="date"
                        value={internship.endDate}
                        onChange={(e) => handleInternshipChange(internship.id, 'endDate', e.target.value)}
                      />
                      <div className="responsibilities">
                        <h5>Responsibilities:</h5>
                        {internship.responsibilities.map((resp, index) => (
                          <input
                            key={index}
                            type="text"
                            value={resp}
                            onChange={(e) => {
                              const newResponsibilities = [...internship.responsibilities];
                              newResponsibilities[index] = e.target.value;
                              handleInternshipChange(internship.id, 'responsibilities', newResponsibilities);
                            }}
                            placeholder={`Responsibility ${index + 1}`}
                          />
                        ))}
                        <button
                          className="add-responsibility"
                          onClick={() => {
                            const newResponsibilities = [...internship.responsibilities, ''];
                            handleInternshipChange(internship.id, 'responsibilities', newResponsibilities);
                          }}
                        >
                          Add Responsibility
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="date-range">
                        {new Date(internship.startDate).toLocaleDateString()} - {new Date(internship.endDate).toLocaleDateString()}
                      </p>
                      <h5>Responsibilities:</h5>
                      <ul>
                        {internship.responsibilities.map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h3>Part-Time Jobs</h3>
            {isEditing && (
              <button className="add-button" onClick={handleAddPartTimeJob}>
                <FaPlus /> Add Job
              </button>
            )}
          </div>
          <div className="experience-list">
            {profileData.partTimeJobs.map(job => (
              <div key={job.id} className="experience-card">
                {isEditing && (
                  <button
                    className="remove-button"
                    onClick={() => handleRemovePartTimeJob(job.id)}
                  >
                    <FaTrash />
                  </button>
                )}
                <div className="experience-header">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={job.position}
                        onChange={(e) => handlePartTimeJobChange(job.id, 'position', e.target.value)}
                        placeholder="Position"
                      />
                      <input
                        type="text"
                        value={job.company}
                        onChange={(e) => handlePartTimeJobChange(job.id, 'company', e.target.value)}
                        placeholder="Company"
                      />
                      <input
                        type="text"
                        value={job.duration}
                        onChange={(e) => handlePartTimeJobChange(job.id, 'duration', e.target.value)}
                        placeholder="Duration"
                      />
                    </>
                  ) : (
                    <>
                      <h4>{job.position}</h4>
                      <p className="company-name">{job.company}</p>
                      <p className="duration">{job.duration}</p>
                    </>
                  )}
                </div>
                <div className="experience-details">
                  {isEditing ? (
                    <>
                      <input
                        type="date"
                        value={job.startDate}
                        onChange={(e) => handlePartTimeJobChange(job.id, 'startDate', e.target.value)}
                      />
                      <input
                        type="date"
                        value={job.endDate}
                        onChange={(e) => handlePartTimeJobChange(job.id, 'endDate', e.target.value)}
                      />
                      <div className="responsibilities">
                        <h5>Responsibilities:</h5>
                        {job.responsibilities.map((resp, index) => (
                          <input
                            key={index}
                            type="text"
                            value={resp}
                            onChange={(e) => {
                              const newResponsibilities = [...job.responsibilities];
                              newResponsibilities[index] = e.target.value;
                              handlePartTimeJobChange(job.id, 'responsibilities', newResponsibilities);
                            }}
                            placeholder={`Responsibility ${index + 1}`}
                          />
                        ))}
                        <button
                          className="add-responsibility"
                          onClick={() => {
                            const newResponsibilities = [...job.responsibilities, ''];
                            handlePartTimeJobChange(job.id, 'responsibilities', newResponsibilities);
                          }}
                        >
                          Add Responsibility
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="date-range">
                        {new Date(job.startDate).toLocaleDateString()} - {new Date(job.endDate).toLocaleDateString()}
                      </p>
                      <h5>Responsibilities:</h5>
                      <ul>
                        {job.responsibilities.map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h3>College Activities</h3>
            {isEditing && (
              <button className="add-button" onClick={handleAddCollegeActivity}>
                <FaPlus /> Add Activity
              </button>
            )}
          </div>
          <div className="experience-list">
            {profileData.collegeActivities.map(activity => (
              <div key={activity.id} className="experience-card">
                {isEditing && (
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveCollegeActivity(activity.id)}
                  >
                    <FaTrash />
                  </button>
                )}
                <div className="experience-header">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={activity.name}
                        onChange={(e) => handleCollegeActivityChange(activity.id, 'name', e.target.value)}
                        placeholder="Activity Name"
                      />
                      <input
                        type="text"
                        value={activity.role}
                        onChange={(e) => handleCollegeActivityChange(activity.id, 'role', e.target.value)}
                        placeholder="Role"
                      />
                      <input
                        type="text"
                        value={activity.duration}
                        onChange={(e) => handleCollegeActivityChange(activity.id, 'duration', e.target.value)}
                        placeholder="Duration"
                      />
                    </>
                  ) : (
                    <>
                      <h4>{activity.name}</h4>
                      <p className="role">{activity.role}</p>
                      <p className="duration">{activity.duration}</p>
                    </>
                  )}
                </div>
                <div className="experience-details">
                  {isEditing ? (
                    <>
                      <input
                        type="date"
                        value={activity.startDate}
                        onChange={(e) => handleCollegeActivityChange(activity.id, 'startDate', e.target.value)}
                      />
                      <input
                        type="text"
                        value={activity.endDate}
                        onChange={(e) => handleCollegeActivityChange(activity.id, 'endDate', e.target.value)}
                        placeholder="End Date (or 'Present')"
                      />
                      <textarea
                        value={activity.description}
                        onChange={(e) => handleCollegeActivityChange(activity.id, 'description', e.target.value)}
                        placeholder="Activity Description"
                      />
                    </>
                  ) : (
                    <>
                      <p className="date-range">
                        {new Date(activity.startDate).toLocaleDateString()} - {activity.endDate}
                      </p>
                      <p className="description">{activity.description}</p>
                    </>
                  )}
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
      <div className="floating-notif" onClick={handleBellClick}>
                    <FaBell className="wiggle-bell" />
                    {unreadNotifications > 0 && (
                      <span className="notification-badge">{unreadNotifications}</span>
                    )}
                  </div>
      <h2>Companies That Viewed Your Profile</h2>
      <div className="views-list">
        {profileViews.map(view => (
          <div key={view.id} className="view-card">
            <div className="view-header">
              <img src={view.imagePath} alt={`${view.company} logo`} className="company-logo" />
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

  return (
    <div className="pro-student-layout">
      <ProStudentSidebar />
      <div className="pro-student-content">
        <div className="hero-banner">
          <h2>My Profile</h2>
          <p className="subtext">
            Today is {new Date().toLocaleString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>

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
        </div>

        {selectedTab === 'main-profile' ? renderMainProfile() : renderProfileViews()}
      </div>
    </div>
  );
};

export default ProStudentProfile;