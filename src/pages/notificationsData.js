const notifications = [
  {
    id: 1,
    type: 'incoming-call',
    title: 'Incoming Call from John Smith',
    message: 'You have an incoming call from a student.',
    details: 'John Smith is trying to call you regarding the Career Guidance appointment scheduled for May 16, 2025, at 10:00 AM. Please accept or reject the call.',
    timestamp: 'Just now',
    read: false
  },
  {
    id: 2,
    type: 'student-appointment-accepted',
    title: 'Appointment accepted by John Smith',
    message: 'A student has accepted your appointment request.',
    details: 'The student has accepted your appointment request for May 16, 2025, at 10:00 AM. The appointment will be held in Room 204, Building A. Purpose: Career Guidance (career). Please prepare any necessary materials.',
    timestamp: 'Just now',
    read: false
  },
  {
    id: 3,
    type: 'workshop-reminder',
    title: 'Workshop Starting Soon',
    message: 'The upcoming workshop you registered for is about to start.',
    details: 'Introduction to React, starting in 30 minutes on May 15, 2025, at 12:25 PM. Join the session 5 minutes early to ensure a smooth start.',
    timestamp: '25 minutes ago',
    read: false
  },
  {
    id: 4,
    type: 'internship-start',
    title: 'Internship Cycle Begins',
    message: 'Your internship cycle with Web Solutions Inc. is scheduled to start soon.',
    details: 'The internship cycle will begin on June 1, 2025, at 9:00 AM EEST. Prepare your materials and confirm your availability by May 25, 2025.',
    timestamp: '1 week ago',
    read: false
  },
  {
    id: 5,
    type: 'internship-reminder',
    title: 'Internship Starting Soon',
    message: 'Your internship cycle is about to begin!',
    details: 'The internship with Web Solutions Inc. starts on June 1, 2025, at 9:00 AM EEST. Please log in to the portal and complete the pre-start checklist by May 31, 2025.',
    timestamp: '3 days ago',
    read: false
  },
  {
    id: 6,
    type: 'call-ended',
    title: 'Call Ended',
    message: 'Dr. Emily Carter has left the call.',
    details: 'The call with Dr. Emily Carter regarding your career guidance session has ended. Please follow up via email if you have additional questions.',
    timestamp: 'Just now',
    read: false
  }
];

export default notifications;