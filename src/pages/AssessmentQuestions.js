import React, { useState, useEffect } from 'react';
import { FaClock, FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';
import './AssessmentQuestions.css';

const AssessmentQuestions = ({ assessmentId, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Mock questions data - replace with actual API call
  const questions = [
    {
      id: 1,
      question: "What is the time complexity of binary search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "Which data structure follows LIFO principle?",
      options: ["Queue", "Stack", "Tree", "Graph"],
      correctAnswer: 1
    },
    // Add more questions here
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    const unanswered = questions.some(question => answers[question.id] === undefined);
    if (unanswered) {
      setStatusMessage('⚠️ Please answer all questions before submitting.');
      setTimeout(() => setStatusMessage(''), 3000); // Clear after 3 seconds
      return;
    }
    setIsSubmitting(true);
    const score = questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);
    const percentage = (score / questions.length) * 100;
    onComplete(percentage);
    setIsSubmitting(false);
   setStatusMessage('✔️ Assessment submitted successfully.');
console.log('Success message set');
setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="assessment-questions">
      {statusMessage && (
        <div className="fade-out-message">
          {statusMessage}
        </div>
      )}
      <div className="assessment-header">
        <div className="timer">
          <FaClock />
          <span>{formatTime(timeLeft)}</span>
        </div>
        <h2>Question {currentQuestion + 1} of {questions.length}</h2>
      </div>

      <div className="question-container">
        <div className="question">
          <h3>{questions[currentQuestion].question}</h3>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`option ${answers[questions[currentQuestion].id] === index ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(questions[currentQuestion].id, index)}
              >
                <span className="option-marker">
                  {answers[questions[currentQuestion].id] === index ? <FaCheck /> : String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          className="nav-button"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <FaArrowLeft /> Previous
        </button>
        
        {currentQuestion === questions.length - 1 ? (
          <button
            className="nav-button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Submit Assessment
          </button>
        ) : (
          <button
            className="nav-button"
            onClick={handleNext}
          >
            Next <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default AssessmentQuestions;