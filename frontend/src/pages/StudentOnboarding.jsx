import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentService } from '../services/apiServices';
import { ChevronLeft, ChevronRight, Check, Send } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

const QUESTIONS = [
  {
    number: 1,
    question: "Tell us about yourself.",
    placeholder:
      "Share your interests, activities, projects, clubs, hobbies, achievements, and the career paths you are currently exploring.",
    helper:
      "Think of this as your story. Help us understand who you are beyond academics."
  },
  {
    number: 2,
    question: "What genuinely excites you?",
    placeholder:
      "What topics, technologies, industries, ideas, or experiences make you feel energized and curious?",
    helper:
      "Tell us what naturally captures your attention and keeps you motivated to learn more."
  },
  {
    number: 3,
    question: "What kind of problems would you love to solve?",
    placeholder:
      "Think about challenges in technology, healthcare, education, business, society, or everyday life that you find meaningful.",
    helper:
      "There are no right answers. We want to understand what matters most to you."
  },
  {
    number: 4,
    question: "What kind of impact would make you proud of your career?",
    placeholder:
      "Describe the difference you would like your work to make for people, organizations, or communities.",
    helper:
      "Imagine looking back at your career years from now. What achievements would make you feel fulfilled?"
  },
  {
    number: 5,
    question: "What have you explored so far?",
    placeholder:
      "Mention projects, internships, hackathons, leadership roles, certifications, courses, research, or personal initiatives.",
    helper:
      "Share experiences that helped shape your interests, skills, and career direction."
  },
  {
    number: 6,
    question: "What are you currently struggling with?",
    placeholder:
      "Career clarity, placements, confidence, technical skills, networking, internships, higher studies, or something else.",
    helper:
      "Being honest helps us connect you with alumni who have overcome similar challenges."
  },
  {
    number: 7,
    question: "Imagine yourself 5 years from now. What kind of work would you love to be doing?",
    placeholder:
      "Describe your ideal role, industry, company, work environment, and the problems you would like to work on.",
    helper:
      "Focus on your aspirations rather than what seems realistic today."
  }
];
const StudentOnboarding = () => {
  const { setOnboardingSubmitted, refreshOnboardingStatus } = useAuth();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentQuestion = QUESTIONS[currentIndex];

  const handleSelectOption = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.number]: value
    }));
    setError('');
  };

  const handleTextChange = (e) => {
    const { value } = e.target;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.number]: value
    }));
    setError('');
  };

  const isCurrentValid = () => {
    const ans = answers[currentQuestion.number];
    if (!ans) return false;
    if (currentQuestion.type === 'long_text' && ans.trim().length < 10) return false;
    return true;
  };

  const handleNext = () => {
    if (!isCurrentValid()) {
      if (currentQuestion.type === 'long_text') {
        setError('Please provide a slightly longer response (at least 10 characters) to help the AI matching.');
      } else {
        setError('Please select an option to continue.');
      }
      return;
    }
    
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setError('');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!isCurrentValid()) return;

    setLoading(true);
    setError('');
    try {
      // Map state responses to StudentAnswer backend format
      const submissionAnswers = QUESTIONS.map((q) => ({
        questionNumber: q.number,
        question: q.question,
        answer: answers[q.number] || ''
      }));

      await studentService.submitOnboarding(submissionAnswers);
      setOnboardingSubmitted(true);
      await refreshOnboardingStatus();
      
      // Navigate to identity generation
      navigate('/student/identity');
    } catch (err) {
      console.error(err);
      setError('Failed to submit onboarding answers. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = Math.round((currentIndex / QUESTIONS.length) * 100);

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Stepper progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Student Questionnaire</span>
            <span className="text-primary">
              Question {currentIndex + 1} of {QUESTIONS.length}
            </span>
          </div>
          <ProgressBar value={33 + (progressPercentage * 0.33)} showLabel={false} />
        </div>

        {/* Question Card Container */}
        <Card className="min-h-[400px] flex flex-col justify-between space-y-6 relative overflow-hidden transition-all duration-300">
          <div className="space-y-6">
            {/* Header info */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/5 text-primary border border-primary/10">
              Q.0{currentQuestion.number} / Conversational Interview
            </span>

            {/* Question Text */}
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-snug">
              {currentQuestion.question}
            </h2>

            {/* Error Message */}
            {error && (
              <p className="text-xs text-red-500 font-semibold bg-red-50 p-3 rounded-xl border border-red-100 leading-normal animate-shake">
                {error}
              </p>
            )}

            {/* Input Selection Block */}
            <div className="pt-2">
              {currentQuestion.type === 'choice' ? (
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = answers[currentQuestion.number] === opt.value;
                    return (
                      <div
                        key={opt.value}
                        onClick={() => handleSelectOption(opt.value)}
                        className={`border p-4 rounded-2xl cursor-pointer transition-all duration-200 flex items-center justify-between group ${
                          isSelected
                            ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/10'
                            : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50 text-slate-700'
                        }`}
                      >
                        <div className="text-left">
                          <span className={`text-xs font-bold block ${isSelected ? 'text-primary' : 'text-slate-700 group-hover:text-slate-950'}`}>
                            {opt.label}
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5 block leading-normal">
                            {opt.desc}
                          </span>
                        </div>
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                          isSelected ? 'bg-primary border-primary text-white' : 'border-slate-200 bg-white'
                        }`}>
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  <textarea
                    className="w-full p-4 rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/15 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none resize-none min-h-[140px] leading-relaxed transition-all duration-200"
                    placeholder={currentQuestion.placeholder}
                    value={answers[currentQuestion.number] || ''}
                    onChange={handleTextChange}
                    rows={5}
                  />
                  {currentQuestion.helper && (
                    <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                      {currentQuestion.helper}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex justify-between items-center border-t border-slate-100 pt-6">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentIndex === 0 || loading}
              icon={ChevronLeft}
            >
              Previous
            </Button>

            {currentIndex === QUESTIONS.length - 1 ? (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!isCurrentValid() || loading}
                loading={loading}
                icon={Send}
              >
                Submit Answers
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!isCurrentValid()}
                icon={ChevronRight}
              >
                Next Question
              </Button>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentOnboarding;
