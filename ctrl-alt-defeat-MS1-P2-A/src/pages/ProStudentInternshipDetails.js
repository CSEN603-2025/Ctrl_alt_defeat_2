import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaBuilding, FaBell,FaClock, FaMoneyBillWave, FaGraduationCap, FaCalendarAlt, FaIndustry, FaLinkedin, FaTwitter, FaGlobe, FaFileAlt, FaDownload, FaFileDownload } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import './ProStudentInternships.css';

// Import html2pdf
import html2pdf from 'html2pdf.js';

const ProStudentInternshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [internship, setInternship] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    // Get internship data from navigation state
    if (location.state?.internship) {
      setInternship(location.state.internship);
      setIsCompleted(location.state.isCompleted || false);
      setIsCurrent(location.state.isCurrent || false);
    } else {
      // If no state is passed, redirect back to internships page
      navigate('/pro-student/internships');
    }
  }, [location.state, navigate]);

  const handleApply = () => {
    navigate(`/pro-student/internships/${id}/apply`);
  };

  const handleDownloadCertificate = () => {
    // Create a sample certificate content
    const certificateContent = {
      studentName: "John Doe",
      internshipTitle: internship.title,
      company: internship.company,
      startDate: internship.startDate,
      endDate: internship.endDate,
      grade: internship.finalGrade,
      mentor: internship.mentor,
      certificateId: "CERT-" + Math.random().toString(36).substr(2, 9),
      issueDate: new Date().toLocaleDateString()
    };

    // Create a more professional certificate with HTML and CSS
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500&display=swap');
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
            background: #f5f5f5;
          }
          
          .certificate {
            width: 800px;
            height: 600px;
            margin: 20px auto;
            padding: 40px;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            position: relative;
            border: 2px solid #0a3d62;
          }
          
          .certificate::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border: 1px solid #0a3d62;
            pointer-events: none;
          }
          
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .logo {
            width: 120px;
            height: 120px;
            margin: 0 auto 20px;
            background: #0a3d62;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
          }
          
          .title {
            font-family: 'Playfair Display', serif;
            font-size: 36px;
            color: #0a3d62;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          
          .subtitle {
            font-size: 18px;
            color: #666;
            margin: 10px 0;
          }
          
          .content {
            text-align: center;
            margin: 40px 0;
          }
          
          .student-name {
            font-family: 'Playfair Display', serif;
            font-size: 32px;
            color: #0a3d62;
            margin: 20px 0;
            font-weight: bold;
          }
          
          .details {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
            margin: 20px 0;
          }
          
          .footer {
            position: absolute;
            bottom: 40px;
            left: 40px;
            right: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .signature {
            text-align: center;
          }
          
          .signature-line {
            width: 200px;
            border-top: 1px solid #0a3d62;
            margin: 10px auto;
          }
          
          .certificate-id {
            font-size: 14px;
            color: #666;
            text-align: right;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <div class="logo">${internship.company.charAt(0)}</div>
            <h1 class="title">Certificate of Completion</h1>
            <p class="subtitle">This is to certify that</p>
          </div>
          
          <div class="content">
            <div class="student-name">${certificateContent.studentName}</div>
            <div class="details">
              has successfully completed the internship program at<br>
              <strong>${certificateContent.company}</strong><br><br>
              Position: ${certificateContent.internshipTitle}<br>
              Duration: ${certificateContent.startDate} to ${certificateContent.endDate}<br>
              Grade: ${certificateContent.grade}<br>
              Mentor: ${certificateContent.mentor}
            </div>
          </div>
          
          <div class="footer">
            <div class="signature">
              <div class="signature-line"></div>
              <p>Mentor's Signature</p>
            </div>
            <div class="certificate-id">
              Certificate ID: ${certificateContent.certificateId}<br>
              Issue Date: ${certificateContent.issueDate}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Convert HTML to PDF using html2pdf.js
    const element = document.createElement('div');
    element.innerHTML = certificateHTML;
    document.body.appendChild(element);

    // Use html2pdf to generate PDF
    const opt = {
      margin: 1,
      filename: `certificate_${internship.company}_${internship.title}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    // Generate PDF
    html2pdf().set(opt).from(element).save().then(() => {
      document.body.removeChild(element);
    });
  };

  const handleEvaluation = () => {
    navigate(`/pro-student/internships/${id}/evaluation`, {
      state: { internship }
    });
  };

  const handleReport = () => {
    navigate(`/pro-student/internships/${id}/report`, {
      state: { internship }
    });
  };

  if (!internship) {
    return (
      <div className="pro-student-layout">
        <ProStudentSidebar />
        <div className="pro-student-content">
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
        <div className="hero-banner">
          <h1>Internship Details</h1>
          
        </div>

        <div className="internship-details-container fadeIn">
<button
  onClick={() =>
    navigate('/pro-student/internships', {
      state: { from: 'completed' }
    })
  }
  className="back-btn"
>
  ← Back to My Internships
</button>
          {/* Box 1: Summary */}
          <div className="details-card" style={{ marginBottom: '20px' }}>
            <div className="details-header" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ flex: '0 0 120px' }}>
                <img
                  src={internship.logo}
                  alt="logo"
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '15px' }}>
                  <h2 style={{
                    margin: '0 0 5px 0',
                    color: '#2c3e50',
                    fontSize: '24px'
                  }}>
                    {internship.company}
                  </h2>
                  <p style={{
                    fontWeight: 'bold',
                    color: '#0a3d62',
                    margin: '0 0 10px 0',
                    fontSize: '18px'
                  }}>
                    {internship.title}
                  </p>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '15px' }}>
  <div style={{ 
  display: 'flex', 
  gap: '10px',
  marginBottom: '15px'
}}>
  {/* Industry Badge */}
  <span style={{
    backgroundColor: '#3c6382',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    color: 'white'
  }}>
    {internship.industry}
  </span>
  
  {/* Job Type Badge */}
  <span style={{
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    backgroundColor: '#0a3d62',
    color: 'white'
  }}>
    {internship.type}
  </span>
</div>
  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#666', fontSize: '14px' }}>
    <FaClock style={{ color: '#0a3d62' }} />
    <span>Posted on {internship.date}</span>
  </div>
</div>
</div>
              </div>
              {isCompleted && (
                <div style={{
                  flex: '0 0 60px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: '#666',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    width: '50px',
                    textAlign: 'center'
                  }}>
                    Grade
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>

  <div className="grade-circle" style={{
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    background: 'white',
    color: '#0a3d62',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '500',

    border: '2px solid #1f995a',
    position: 'relative'
  }}>
    {internship.finalGrade}
    <div style={{
      position: 'absolute',
      top: '-2px',
      left: '-2px',
      right: '-2px',
      bottom: '-2px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(46, 213, 115, 0.2) 0%, rgba(46, 213, 115, 0.1) 100%)',
      filter: 'blur(4px)',
      zIndex: -1
    }} />
  </div>
  <style>
    {`
      .action-button {
        border: 2px solid #1f995a !important;
      }
    `}
  </style>
  {isCompleted && (
    <button
      className="action-button"
      onClick={handleDownloadCertificate}
      style={{
        marginTop: '10px',
        fontSize: '13px',
        padding: '6px 12px',
        backgroundColor: '#1f995a',
        color: '#ffffff',
        // border: '2px solidrgb(32, 144, 79)',
        borderRadius: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
    >
      <FaDownload /> Certificate
    </button>
  )}
</div>

                </div>
              )}
            </div>
          </div>

          {/* Box 2: Internship Details and Skills */}
          <div className="details-card" style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Internship Details</h3>
            <div>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Compensation:</strong> {internship.compensation}</p>
              {internship.compensation === 'Paid' && (
                <p><strong>Salary:</strong> {internship.salary}</p>
              )}
              <p><strong>Major:</strong> {internship.major}</p>
              <p><strong>Semester:</strong> {internship.semester}</p>
              <p style={{ marginTop: '15px' }}><strong>Skills Required:</strong></p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                {internship.requirements.map((skill, index) => (
                  <span key={index} style={{
                    backgroundColor: '#e8f4f8',
                    color: '#0a3d62',
                    padding: '5px 12px',
                    borderRadius: '15px',
                    fontSize: '0.9rem'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="description" style={{ marginTop: '20px' }}>
              <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Description</h4>
              <p style={{ color: '#666', lineHeight: '1.6' }}>{internship.description}</p>
            </div>
          </div>

          {/* Box 3: Required Documents - Only show for non-completed internships */}
          {!isCompleted && (
            <div className="details-card" style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Required Documents</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaFileAlt style={{ color: '#0a3d62' }} />
                      <span>CV/Resume</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaFileAlt style={{ color: '#0a3d62' }} />
                      <span>Cover Letter</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaFileAlt style={{ color: '#0a3d62' }} />
                      <span>Academic Transcript</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaFileAlt style={{ color: '#0a3d62' }} />
                      <span>Portfolio (if applicable)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaFileAlt style={{ color: '#0a3d62' }} />
                      <span>Certifications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Box 4: Connect */}
          <div className="details-card">
            <h3 style={{ color: '#0a3d62', marginBottom: '15px' }}>Connect</h3>
            <div style={{ display: 'flex', gap: '20px', fontSize: '22px', marginTop: '10px' }}>
              {internship.social?.linkedin && (
                <a href={internship.social.linkedin} target="_blank" rel="noreferrer" style={{ color: '#0077B5' }}>
                  <FaLinkedin />
                </a>
              )}
              {internship.social?.twitter && (
                <a href={internship.social.twitter} target="_blank" rel="noreferrer" style={{ color: '#1DA1F2' }}>
                  <FaTwitter />
                </a>
              )}
              {internship.social?.website && (
                <a href={internship.social.website} target="_blank" rel="noreferrer" style={{ color: '#0a3d62' }}>
                  <FaGlobe />
                </a>
              )}
            </div>
          </div>

          {/* Action Buttons for Completed Internships */}
          {isCompleted && (
            <div style={{
              marginTop: '20px',
              display: 'flex',
              gap: '15px',
              justifyContent: 'center'
            }}>
              <button
                onClick={handleEvaluation}
                className="quick-start-button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <FaFileAlt /> Evaluation Form
              </button>
              <button
                onClick={handleReport}
                className="quick-start-button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <FaFileDownload /> Report Form
              </button>
            </div>
          )}

          {/* Apply Button */}
          {!isCurrent && !isCompleted && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button
                className="action-button"
                onClick={handleApply}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  margin: '0 auto',
                  animation: 'pulse 2s infinite',
                  position: 'relative'
                }}
              >
                Apply Now
              </button>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(10, 61, 98, 0.4);
            }
            70% {
              transform: scale(1.02);
              box-shadow: 0 0 0 10px rgba(10, 61, 98, 0);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(10, 61, 98, 0);
            }
          }
        `}
      </style>
      <div
  className="floating-notif"
  onClick={() => navigate('/pro-student/notifications')}
  title="View Notifications"
>
  <FaBell className="wiggle-bell" />
  <div className="notification-badge">3</div>
</div>
    </div>
  );
};

export default ProStudentInternshipDetails; 