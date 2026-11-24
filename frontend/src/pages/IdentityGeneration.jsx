import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentService, alumniService } from '../services/apiServices';
import { Sparkles, Copy, RefreshCw, Download, ArrowRight, Check } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';

const STATUS_MESSAGES = [
  'Reading profile and credentials...',
  'Analyzing responses and narrative reflections...',
  'Extracting core motivations and struggle patterns...',
  'Constructing 1536-dimensional semantic vector embedding...',
  'Aligning career aspirations with matching coordinate spaces...',
  'Generating final identity narrative summary...'
];

const MOCK_TAGS = {
  student: ['Resilient Learner', 'Pivot Mentality', 'Product Strategy', 'Java Architect', 'User-Centric'],
  alumni: ['Empathetic Advisor', 'Tech Lead', 'Startup Veteran', 'Design Thinking', 'Career Pivoter']
};

const IdentityGeneration = () => {
  const { user, setIdentityCached, refreshOnboardingStatus } = useAuth();
  const navigate = useNavigate();

  const [generating, setGenerating] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [identityText, setIdentityText] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Cycle status messages during generation
  useEffect(() => {
    let interval;
    if (generating) {
      interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [generating]);

  // Load existing cached identity if they just want to view it (or generate it)
  useEffect(() => {
    if (user) {
      const cached = user.role === 'student'
        ? studentService.getCachedIdentity(user.id)
        : alumniService.getCachedIdentity(user.id);
      
      if (cached) {
        setIdentityText(cached);
      }
    }
  }, [user]);

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');
    setIdentityText('');
    setCurrentMessageIndex(0);

    try {
      let result;
      if (user.role === 'student') {
        result = await studentService.generateIdentity(user.id);
      } else {
        result = await alumniService.generateIdentity(user.id);
      }

      if (result && result.identity) {
        setIdentityText(result.identity);
        setIdentityCached(result.identity);
        await refreshOnboardingStatus();
      } else {
        throw new Error('Identity text empty');
      }
    } catch (err) {
      console.error(err);
      setError('AI generation service was unable to construct your identity. Please make sure the backend is active, or try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (identityText) {
      navigator.clipboard.writeText(identityText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (identityText) {
      const element = document.createElement('a');
      const file = new Blob([identityText], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${user.name.replace(/\s+/g, '_')}_MirrorPath_Identity.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleFinish = () => {
    if (user.role === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/alumni/dashboard');
    }
  };

  const tags = user?.role === 'student' ? MOCK_TAGS.student : MOCK_TAGS.alumni;

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Onboarding progress */}
        {!studentService.getCachedIdentity(user?.id) && !alumniService.getCachedIdentity(user?.id) && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>Identity Profile Setup</span>
              <span className="text-primary">Step 3 of 3: AI Embedding</span>
            </div>
            <ProgressBar value={66} showLabel={false} />
          </div>
        )}

        {/* Action / State Panel */}
        {!generating && !identityText && (
          <Card className="text-center p-8 md:p-12 space-y-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center animate-bounce-subtle">
              <Sparkles size={32} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                Generate Your AI Identity
              </h2>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                MirrorPathAI will compile your profile parameters and conversational responses into a multi-dimensional semantic text profile.
              </p>
            </div>

            {error && (
              <p className="text-xs text-red-500 font-semibold bg-red-50 border border-red-100 p-3 rounded-xl max-w-md leading-normal">
                {error}
              </p>
            )}

            <Button size="lg" onClick={handleGenerate} icon={Sparkles}>
              Generate My AI Identity
            </Button>
          </Card>
        )}

        {/* Generating Anim State */}
        {generating && (
          <Card className="text-center p-8 md:p-12 space-y-8 flex flex-col items-center justify-center min-h-[350px]">
            {/* Glowing Orb Animation */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              <div className="absolute w-20 h-20 rounded-full bg-primary/15 animate-pulse" />
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 text-white">
                <Sparkles size={24} className="animate-spin-slow" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-slate-700 shimmer-text">
                Synthesizing Identity...
              </h3>
              <p className="text-xs text-slate-400 font-medium transition-all duration-300">
                {STATUS_MESSAGES[currentMessageIndex]}
              </p>
            </div>
          </Card>
        )}

        {/* Reveal Generated Identity Card */}
        {!generating && identityText && (
          <div className="space-y-6">
            <Card className="space-y-6 border-primary/20 ring-1 ring-primary/5 shadow-2xl">
              <div className="flex justify-between items-start border-b border-slate-100 pb-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Generated Profile Narrative</span>
                  <h2 className="text-xl font-bold tracking-tight text-slate-800">
                    Your MirrorPath Identity
                  </h2>
                </div>
                <Badge variant="success" icon={Sparkles}>Generated</Badge>
              </div>

              {/* Identity Content */}
              <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap select-text">
                {identityText}
              </div>

              {/* Tags Section */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Extracted Traits</span>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="accent" size="sm">{tag}</Badge>
                  ))}
                </div>
              </div>

              {/* Actions row */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100 justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="secondary" size="sm" onClick={handleCopy} icon={copied ? Check : Copy}>
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleDownload} icon={Download}>
                    Download
                  </Button>
                </div>
                <Button variant="ghost" size="sm" onClick={handleGenerate} icon={RefreshCw}>
                  Regenerate
                </Button>
              </div>
            </Card>

            <div className="flex justify-end pt-2">
              <Button size="lg" onClick={handleFinish} icon={ArrowRight}>
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default IdentityGeneration;
