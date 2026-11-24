import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../services/apiServices';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Search, 
  UserCheck, 
  Linkedin, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  Target,
  Brain,
  X,
  Send,
  Loader
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import EmptyState from '../components/EmptyState';

// Mock Alumni catalog to enrich the backend matching results
const ALUMNI_CATALOG = {
  2: { name: 'Anjali Gupta', industry: 'SaaS / Product Management', college: 'BITS Pilani', degree: 'B.E. Computer Science', gradYear: 2021, avatar: 'AG', linkedin: 'https://linkedin.com/in/anjali' },
  3: { name: 'Rohan Verma', industry: 'Hardware & Artificial Intelligence', college: 'VIT Pune', degree: 'B.Tech Electronics', gradYear: 2019, avatar: 'RV', linkedin: 'https://linkedin.com/in/rohan' },
  4: { name: 'Priya Nair', industry: 'HealthTech / UI/UX Design', college: 'IIT Bombay', degree: 'B.Des Industrial Design', gradYear: 2020, avatar: 'PN', linkedin: 'https://linkedin.com/in/priya' },
  5: { name: 'Vikram Malhotra', industry: 'Quantitative Finance & Web3', college: 'COEP Pune', degree: 'B.Tech Metallurgy', gradYear: 2018, avatar: 'VM', linkedin: 'https://linkedin.com/in/vikram' },
  default: { name: 'Senior Advisor', industry: 'Information Technology', college: 'MirrorPath Partner College', degree: 'B.Tech Computer Science', gradYear: 2017, avatar: 'SA', linkedin: 'https://linkedin.com' }
};

const StudentMatching = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [matchingState, setMatchingState] = useState('idle'); // idle, loading_1, loading_2, loading_3, results
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [connectingId, setConnectingId] = useState(null);

  const startMatchingSequence = async () => {
    // Phase 1: Search network
    setMatchingState('loading_1');
    
    // Fetch matches from API in the background
    let fetchedMatches = [];
    try {
      const response = await studentService.fetchMatches();
      fetchedMatches = response.matches || [];
    } catch (error) {
      console.warn('API matches call failed, falling back to design mocks:', error);
      // Fallback mocks if database has no matches/Groq API key fails
      fetchedMatches = [
        {
          user_id: 2,
          company: 'Stripe',
          designation: 'Product Lead',
          score: 0.963,
          reason: 'Both share a common turning point: transitioning from heavy technical programming to human-centric design. Overcame early imposter syndrome in design reviews.'
        },
        {
          user_id: 3,
          company: 'NVIDIA',
          designation: 'Senior AI Engineer',
          score: 0.892,
          reason: 'Matched due to joint interest in high-performance hardware and deep learning frameworks, following similar academic projects in computer vision.'
        },
        {
          user_id: 4,
          company: 'Medtronic',
          designation: 'Product Designer',
          score: 0.841,
          reason: 'Shared background of navigating a career transition into user interface designs from mechanical engineering department streams.'
        }
      ];
    }

    // Phase 2: Running analysis (after 1.5s)
    setTimeout(() => {
      setMatchingState('loading_2');
      
      // Phase 3: Calculating compatibility (after 1.5s)
      setTimeout(() => {
        setMatchingState('loading_3');
        
        // Final: Reveal results (after 1.5s)
        setTimeout(() => {
          // Enrich matches with local catalog names and details
          const enriched = fetchedMatches.map(match => {
            const catalogItem = ALUMNI_CATALOG[match.user_id] || ALUMNI_CATALOG.default;
            return {
              ...match,
              ...catalogItem,
              scorePercentage: Math.round(match.score * 100)
            };
          });
          
          setMatches(enriched);
          setMatchingState('results');
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const handleConnect = (matchId, name) => {
    setConnectingId(matchId);
    setTimeout(() => {
      setConnectingId(null);
      setToastType('success');
      setToastMessage(`Connection request sent to ${name}!`);
    }, 1000);
  };

  const openDetailsModal = (match) => {
    setSelectedMatch(match);
    setModalOpen(true);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'stroke-emerald-500 text-emerald-600 bg-emerald-50 border-emerald-100';
    if (score >= 80) return 'stroke-blue-500 text-blue-600 bg-blue-50 border-blue-100';
    return 'stroke-slate-400 text-slate-600 bg-slate-50 border-slate-200';
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Header Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Semantic Vector Matching
          </h1>
          <p className="text-xs text-slate-400">
            Find alumni whose identities and obstacles match closely with yours using AI projection models.
          </p>
        </div>

        {/* --- IDLE STATE --- */}
        {matchingState === 'idle' && (
          <Card className="text-center p-12 max-w-xl mx-auto space-y-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center animate-pulse-subtle">
              <Brain size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-800">Ready to query the database?</h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                We will project your AI Identity summary against our alumni profiles in a high-dimensional vector space, checking compatibility angles.
              </p>
            </div>
            <Button size="lg" onClick={startMatchingSequence} icon={Sparkles}>
              Find My Mentor
            </Button>
          </Card>
        )}

        {/* --- SEQUENCED LOADING STATE --- */}
        {matchingState.startsWith('loading_') && (
          <Card className="text-center p-12 max-w-xl mx-auto space-y-8 flex flex-col items-center min-h-[350px] justify-center">
            {/* Spinning ring loader */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <Brain className="text-primary w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-4 w-full max-w-xs">
              <div className="flex flex-col items-center space-y-2">
                <span className="text-sm font-bold text-slate-800 shimmer-text">
                  Searching Network Coordinates...
                </span>
                
                {/* Visual sub-statuses */}
                <div className="flex flex-col items-center space-y-1">
                  <p className={`text-xs font-semibold ${matchingState === 'loading_1' ? 'text-primary' : 'text-slate-400'}`}>
                    1. Searching alumni network...
                  </p>
                  <p className={`text-xs font-semibold ${matchingState === 'loading_2' ? 'text-primary' : 'text-slate-400'}`}>
                    2. Running semantic vector analysis...
                  </p>
                  <p className={`text-xs font-semibold ${matchingState === 'loading_3' ? 'text-primary' : 'text-slate-400'}`}>
                    3. Calculating compatibility ratings...
                  </p>
                </div>
              </div>

              {/* Fake progress bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{
                    width: matchingState === 'loading_1' ? '33%' : matchingState === 'loading_2' ? '66%' : '95%'
                  }}
                />
              </div>
            </div>
          </Card>
        )}

        {/* --- RESULTS STATE --- */}
        {matchingState === 'results' && (
          <>
            {matches.length === 0 ? (
              <EmptyState
                title="No mentors matched"
                description="We couldn't find any alumni matches for your profile at the moment. Try updating your onboarding details."
                actionLabel="Update Onboarding"
                onActionClick={() => navigate('/student/profile')}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((match) => {
                  const scoreColor = getScoreColor(match.scorePercentage);
                  return (
                    <Card key={match.user_id} hoverEffect className="flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-4">
                        {/* Profile Header */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                              {match.avatar}
                            </div>
                            <div className="text-left">
                              <h3 className="text-sm font-bold text-slate-800">{match.name}</h3>
                              <p className="text-[10px] text-slate-400 font-semibold">{match.designation} @ {match.company}</p>
                            </div>
                          </div>

                          {/* Match Score Indicator */}
                          <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${scoreColor.split(' ')[1]} ${scoreColor.split(' ')[2]} ${scoreColor.split(' ')[3]}`}>
                            {match.scorePercentage}%
                          </div>
                        </div>

                        {/* Industry and College detail */}
                        <div className="text-[10px] text-slate-400 space-y-1 text-left font-semibold">
                          <p>Industry: <span className="text-slate-600">{match.industry}</span></p>
                          <p>Alma Mater: <span className="text-slate-600">{match.college} ({match.gradYear})</span></p>
                        </div>

                        {/* Compatibility Badges */}
                        <div className="flex flex-wrap gap-1.5">
                          <Badge variant="accent" size="sm">Career Pivot</Badge>
                          {match.scorePercentage >= 90 && <Badge variant="success" size="sm">High Harmony</Badge>}
                        </div>

                        {/* Match Snippet */}
                        <p className="text-xs text-slate-500 italic leading-relaxed text-left">
                          "{match.reason.length > 130 ? `${match.reason.substring(0, 130)}...` : match.reason}"
                        </p>
                      </div>

                      {/* Connect, View & Goals Buttons */}
                      <div className="flex flex-col space-y-2 pt-3 border-t border-slate-50">
                        <div className="flex space-x-2">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="flex-1" 
                            onClick={() => openDetailsModal(match)}
                          >
                            View Details
                          </Button>
                          <Button 
                            variant="primary" 
                            size="sm"
                            loading={connectingId === match.user_id}
                            onClick={() => handleConnect(match.user_id, match.name)}
                          >
                            Connect
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          icon={Target}
                          className="w-full"
                          onClick={() => navigate('/student/goals', { state: { alumniId: match.user_id } })}
                        >
                          Set Goals
                        </Button>
                      </div>

                    </Card>
                  );
                })}
              </div>
            )}
            
            <div className="flex justify-center pt-4">
              <Button variant="ghost" onClick={() => setMatchingState('idle')} icon={RefreshCw}>
                Clear and Research
              </Button>
            </div>
          </>
        )}

        {/* --- AI MATCH EXPLANATION MODAL --- */}
        {selectedMatch && (
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="AI Match Vector Compatibility"
            size="lg"
          >
            <div className="space-y-6">
              {/* Profile Card Summary */}
              <div className="flex items-center space-x-4 pb-4 border-b border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {selectedMatch.avatar}
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-lg font-bold text-slate-800">{selectedMatch.name}</h3>
                  <p className="text-xs text-slate-500 font-semibold">{selectedMatch.designation} • {selectedMatch.company}</p>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{selectedMatch.degree} • {selectedMatch.college} (Graduated {selectedMatch.gradYear})</span>
                </div>
                <div className="text-center p-3 border border-primary/20 bg-primary/5 rounded-2xl">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Similarity</p>
                  <p className="text-2xl font-black text-primary">{selectedMatch.scorePercentage}%</p>
                </div>
              </div>

              {/* Semantic Analysis Text */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-slate-800">
                  <Sparkles size={16} className="text-primary animate-pulse" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Match Reason</h4>
                </div>
                <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl text-xs sm:text-sm text-slate-600 leading-relaxed text-left whitespace-pre-line">
                  {selectedMatch.reason}
                </div>
              </div>

              {/* Overlapping theme tags */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-left">Overlapping Vectors</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" icon={TrendingUp}>Role Transition</Badge>
                  <Badge variant="success" icon={Brain}>Software design</Badge>
                  <Badge variant="accent">Placement drive hurdles</Badge>
                  <Badge variant="neutral">Bengaluru Tech Hub</Badge>
                </div>
              </div>

              {/* Footer action buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                {selectedMatch.linkedin && (
                  <a href={selectedMatch.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" icon={Linkedin}>
                      LinkedIn
                    </Button>
                  </a>
                )}
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setModalOpen(false);
                    handleConnect(selectedMatch.user_id, selectedMatch.name);
                  }}
                  icon={Send}
                >
                  Send Invite
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* --- TOASTS --- */}
        {toastMessage && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setToastMessage('')}
          />
        )}

      </div>
    </DashboardLayout>
  );
};

// Auxiliary refresh icon import helper
const RefreshCw = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={props.className} {...props}>
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);

export default StudentMatching;
