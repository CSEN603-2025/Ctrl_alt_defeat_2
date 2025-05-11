import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaBuilding, FaClock, FaMoneyBillWave, FaGraduationCap, FaCalendarAlt, FaIndustry, FaLinkedin, FaTwitter, FaGlobe, FaFileAlt, FaDownload, FaFileDownload } from 'react-icons/fa';
import ProStudentSidebar from '../components/ProStudentSidebar';
import BackButton from '../components/BackButton';
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
                  {isCompleted ? (
                    <>
                      <span className="status-tag completed">Completed</span>
                      <span className="grade-tag">Grade: {internship.finalGrade}</span>
                    </>
                  ) : isCurrent ? (
                    <span className="status-tag current">In Progress</span>
                  ) : (
                    <span className="date-tag">📅 {internship.date}</span>
                  )}
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

              {isCompleted && (
                <div className="completed-info">
                  <div className="info-item">
                    <label>Start Date</label>
                    <p>{internship.startDate}</p>
                  </div>
                  <div className="info-item">
                    <label>End Date</label>
                    <p>{internship.endDate}</p>
                  </div>
                  <div className="info-item">
                    <label>Mentor</label>
                    <p>{internship.mentor}</p>
                  </div>
                  <div className="info-item">
                    <label>Certificate</label>
                    <button className="download-button" onClick={handleDownloadCertificate}>
                      <FaDownload /> Download Certificate
                    </button>
                  </div>
                </div>
              )}

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

              <div className="action-buttons-container">
                {isCompleted ? (
                  <>
                    <button className="action-button evaluate" onClick={handleEvaluation}>
                      <FaFileAlt /> Evaluation Form
                    </button>
                    <button className="action-button report" onClick={handleReport}>
                      <FaFileAlt /> Report Form
                    </button>
                  </>
                ) : !isCurrent && (
                  <button className="action-button apply" onClick={handleApply}>
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProStudentInternshipDetails; 