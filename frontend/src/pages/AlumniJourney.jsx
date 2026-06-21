import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { alumniService } from '../services/apiServices';
import { 
  Sparkles, 
  HelpCircle, 
  Lightbulb, 
  Zap, 
  MessageSquareHeart, 
  Heart,
  ChevronRight,
  ChevronLeft,
  GraduationCap
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

const AlumniJourney = () => {
  const { user, refreshOnboardingStatus } = useAuth();
  const navigate = useNavigate();

  const [journeyData, setJourneyData] = useState({
    studentIdentity: '',
    motivations: '',
    challenges: '',
    keyExperiences: '',
    turningPoint: '',
    adviceToYoungerSelf: '',
    careerReflection: '',
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  // Timeline experiences mapped from profile step
  useEffect(() => {
    const loadJourneyAndPrior = async () => {
      try {
        const journey = await alumniService.fetchJourney();
        const cachedPrior = localStorage.getItem(`prior_roles_${user.id}`);
        
        let priorStr = '';
        if (cachedPrior) {
          const roles = JSON.parse(cachedPrior);
          priorStr = roles
            .map(r => `${r.designation} at ${r.company} (${r.years} years)`)
            .join('; ');
        }

        if (journey) {
          setJourneyData({
            studentIdentity: journey.student_identity || '',
            motivations: journey.motivations || '',
            challenges: journey.challenges || '',
            keyExperiences: journey.key_experiences || priorStr,
            turningPoint: journey.turning_point || '',
            adviceToYoungerSelf: journey.advice_to_younger_self || '',
            careerReflection: journey.career_reflection || '',
          });
        } else {
          setJourneyData(prev => ({
            ...prev,
            keyExperiences: priorStr
          }));
        }
      } catch (err) {
        console.error('Failed to load journey:', err);
      } finally {
        setFetching(false);
      }
    };
    loadJourneyAndPrior();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJourneyData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const steps = [
    {
      field: 'studentIdentity',
      title: '1. Student Identity',
      label: 'What kind of student were you back in college?',
      placeholder: 'e.g. "I was heavily focused on competitive programming, spent most evenings coding, but struggled with public speaking..." or "I spent more time organizing college events than attending theory lectures..."',
      icon: GraduationCap,
      color: 'text-indigo-500 bg-indigo-50'
    },
    {
      field: 'motivations',
      title: '2. Motivations',
      label: 'Why did you choose your career path and specialty?',
      placeholder: 'What led you into this field? Did a particular project, mentor, or technology spark your curiosity?',
      icon: Lightbulb,
      color: 'text-amber-500 bg-amber-50'
    },
    {
      field: 'challenges',
      title: '3. Obstacles Faced',
      label: 'What were the biggest challenges you overcame?',
      placeholder: 'Describe early hurdles: struggles finding your first role, imposter syndrome, dealing with career pivots, or work-life balance...',
      icon: Zap,
      color: 'text-rose-500 bg-rose-50'
    },
    {
      field: 'turningPoint',
      title: '4. Pivotal Turning Point',
      label: 'What was a major turning point in your journey?',
      placeholder: 'A specific promotion, a layout change, starting a company, or a realization that redefined how you viewed your work...',
      icon: Sparkles,
      color: 'text-primary bg-primary/5'
    },
    {
      field: 'adviceToYoungerSelf',
      title: '5. Career Advice',
      label: 'What advice would you give to someone starting out today?',
      placeholder: 'What do you wish you knew back when you were in college? e.g. "Do not sweat over GPA too much, focus on core networking and side products..."',
      icon: MessageSquareHeart,
      color: 'text-emerald-500 bg-emerald-50'
    },
    {
      field: 'careerReflection',
      title: '6. Current Reflection',
      label: 'How do you view your professional journey now?',
      placeholder: 'Reflect on your satisfaction. Are you working on projects you enjoy? What are your future learning goals?',
      icon: Heart,
      color: 'text-purple-500 bg-purple-50'
    }
  ];

  const currentStep = steps[currentIndex];

  const isCurrentValid = () => {
    const val = journeyData[currentStep.field];
    return val && val.trim().length >= 10;
  };

  const handleNext = () => {
    if (!isCurrentValid()) {
      setError('Please provide a slightly more descriptive answer (at least 10 characters) for the AI model.');
      return;
    }
    if (currentIndex < steps.length - 1) {
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
    try {
      // Structure fields in backend expected casing
      const payload = {
        studentIdentity: journeyData.studentIdentity,
        motivations: journeyData.motivations,
        challenges: journeyData.challenges,
        keyExperiences: journeyData.keyExperiences,
        turningPoint: journeyData.turningPoint,
        adviceToYoungerSelf: journeyData.adviceToYoungerSelf,
        careerReflection: journeyData.careerReflection
      };
      
      await alumniService.saveJourney(payload);
      await refreshOnboardingStatus();
      navigate('/alumni/identity'); // Step 3
    } catch (err) {
      console.error(err);
      setError('Failed to save journey. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse space-y-4 w-full max-w-lg">
            <div className="h-4 bg-slate-100 rounded w-1/4" />
            <div className="h-10 bg-slate-100 rounded w-full" />
            <div className="h-10 bg-slate-100 rounded w-full" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const StepIcon = currentStep.icon;
  const progressPercentage = Math.round((currentIndex / steps.length) * 100);

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Alumni Reflections</span>
            <span className="text-primary">
              Section {currentIndex + 1} of {steps.length}
            </span>
          </div>
          <ProgressBar value={33 + (progressPercentage * 0.33)} showLabel={false} />
        </div>

        {/* Narrative Card */}
        <Card className="min-h-[400px] flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* Header info */}
            <div className="flex items-center space-x-2">
              <div className={`p-1.5 rounded-lg ${currentStep.color}`}>
                <StepIcon size={16} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {currentStep.title}
              </span>
            </div>

            {/* Label Question */}
            <h2 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight leading-snug">
              {currentStep.label}
            </h2>

            {/* Error Message */}
            {error && (
              <p className="text-xs text-red-500 font-semibold bg-red-50 border border-red-100 p-3 rounded-xl">
                {error}
              </p>
            )}

            {/* Textarea Input */}
            <div className="pt-2 text-left">
              <textarea
                name={currentStep.field}
                className="w-full p-4 rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/15 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none resize-none min-h-[160px] leading-relaxed transition-all duration-200"
                placeholder={currentStep.placeholder}
                value={journeyData[currentStep.field] || ''}
                onChange={handleChange}
                rows={6}
              />
              <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-2">
                This narrative feeds the similarity generator. Avoid shorthand or resume bullets. Talk about feelings, lessons, and values.
              </p>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="flex justify-between items-center border-t border-slate-100 pt-6">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentIndex === 0 || loading}
              icon={ChevronLeft}
            >
              Previous
            </Button>

            {currentIndex === steps.length - 1 ? (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!isCurrentValid() || loading}
                loading={loading}
                icon={ChevronRight}
              >
                Submit Journey
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!isCurrentValid()}
                icon={ChevronRight}
              >
                Next Section
              </Button>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AlumniJourney;
