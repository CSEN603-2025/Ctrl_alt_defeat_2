const notifications = [
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
  },
  {
    id: 4,
    type: 'appointment-accepted',
    title: 'Appointment Accepted by SCAD',
    message: 'Your appointment request with SCAD has been accepted.',
    details: 'Meeting with Academic Advisor at SCAD, scheduled for May 16, 2025, at 10:00 AM in Room 204, Building A. Please arrive 10 minutes early and bring any relevant documents.',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: 5,
    type: 'appointment-confirmed',
    title: 'Appointment Confirmed',
    message: 'You have confirmed your appointment with SCAD.',
    details: 'Meeting with Academic Advisor at SCAD, scheduled for May 16, 2025, at 10:00 AM in Room 204, Building A. A confirmation email has been sent to your inbox.',
    timestamp: '45 minutes ago',
    read: false
  },
  {
    id: 6,
    type: 'chat-message',
    title: 'New Live Chat Message',
    message: 'Alex sent you a message in the workshop live chat.',
    details: 'Hey, I had a quick question about the workshop project! Can we discuss it after the session?',
    timestamp: '30 minutes ago',
    read: false
  },
  {
    id: 7,
    type: 'workshop-reminder',
    title: 'Workshop Starting Soon',
    message: 'The upcoming workshop you registered for is about to start.',
    details: 'Introduction to React, starting in 30 minutes on May 15, 2025, at 12:25 PM. Join the session 5 minutes early to ensure a smooth start.',
    timestamp: '25 minutes ago',
    read: false
  },
  {
    id: 8,
    type: 'internship-start',
    title: 'Internship Cycle Begins',
    message: 'Your internship cycle with Web Solutions Inc. is scheduled to start soon.',
    details: 'The internship cycle will begin on June 1, 2025, at 9:00 AM EEST. Prepare your materials and confirm your availability by May 25, 2025.',
    timestamp: '1 week ago',
    read: false
  },
  {
    id: 9,
    type: 'internship-reminder',
    title: 'Internship Starting Soon',
    message: 'Your internship cycle is about to begin!',
    details: 'The internship with Web Solutions Inc. starts on June 1, 2025, at 9:00 AM EEST. Please log in to the portal and complete the pre-start checklist by May 31, 2025.',
    timestamp: '3 days ago',
    read: false
  },
  {
    id: 10,
    type: 'call-ended',
    title: 'Call Ended',
    message: 'Dr. Emily Carter has left the call.',
    details: 'The call with Dr. Emily Carter regarding your career guidance session has ended. Please follow up via email if you have additional questions.',
    timestamp: 'Just now',
    read: false
  }
];

export default notifications;