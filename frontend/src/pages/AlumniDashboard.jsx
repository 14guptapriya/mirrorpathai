import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { alumniService } from '../services/apiServices';
import { 
  Sparkles, 
  Users, 
  CheckCircle, 
  Clock, 
  UserCheck, 
  MapPin,
  ChevronRight,
  History,
  Send,
  Linkedin,
  MessageSquare
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import Toast from '../components/Toast';

const AlumniDashboard = () => {
  const { user, onboardingStatus } = useAuth();
  
  const [profile, setProfile] = useState(null);
  const [journey, setJourney] = useState(null);
  const [identitySummary, setIdentitySummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [connectedIds, setConnectedIds] = useState(new Set());

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      try {
        const alumniProfile = await alumniService.fetchProfile();
        setProfile(alumniProfile);

        const alumniJourney = await alumniService.fetchJourney();
        setJourney(alumniJourney);

        const cachedIdentity = alumniService.getCachedIdentity(user.id);
        if (cachedIdentity) {
          setIdentitySummary(cachedIdentity.length > 200 ? `${cachedIdentity.substring(0, 200)}...` : cachedIdentity);
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, [user]);

  const { profileCompleted, detailsCompleted, identityCompleted } = onboardingStatus;
  let progressVal = 0;
  if (profileCompleted) progressVal += 33;
  if (detailsCompleted) progressVal += 33;
  if (identityCompleted) progressVal += 34;

  const mockMatchedStudents = [
    {
      id: 101,
      name: 'Siddharth Kumar',
      college: 'BITS Pilani',
      degree: 'B.E. Computer Science',
      year: 3,
      avatar: 'SK',
      score: 96,
      reason: 'Both shared a major turning point: transitioning from heavy technical programming backends to customer-centric product strategy. सिद्धार्थ is experiencing placement anxieties identical to what you faced in 2021.'
    },
    {
      id: 102,
      name: 'Kabir Mehta',
      college: 'COEP Pune',
      degree: 'B.Tech Mechanical',
      year: 4,
      avatar: 'KM',
      score: 88,
      reason: 'Kabir is aiming to pivot into software technology from a mechanical stream. He wants to know how to build side-projects to balance out academic gaps.'
    }
  ];

  const handleConnect = (id, name) => {
    setConnectedIds(prev => new Set([...prev, id]));
    setToastMessage(`Accepted connection request and sent calendar invite to ${name}!`);
  };

  const mockActivities = [
    { id: 1, title: 'Alumni Profile verified', time: '1 hour ago', icon: UserCheck, color: 'text-blue-500 bg-blue-50' },
    { id: 2, title: 'AI Identity Profile generated', time: '2 hours ago', icon: Sparkles, color: 'text-primary bg-primary/5' },
    { id: 3, title: 'Reflection details saved', time: '3 hours ago', icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50' },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="h-6 bg-slate-100 rounded w-1/3 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-40 bg-slate-100 rounded-2xl animate-pulse col-span-2" />
            <div className="h-40 bg-slate-100 rounded-2xl animate-pulse" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Welcome Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xs text-slate-400">
            {profile ? `${profile.current_designation} @ ${profile.current_company} • ${profile.years_of_experience} years of experience` : 'Share your career journey to help students.'}
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Left Columns */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Identity Narrative Card */}
            <Card className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <Sparkles size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">My AI Career Identity</h3>
                </div>
                <Link to="/alumni/identity" className="text-xs font-bold text-primary hover:underline flex items-center">
                  <span>View Full Profile</span>
                  <ChevronRight size={14} />
                </Link>
              </div>

              {identitySummary ? (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed italic">
                    "{identitySummary}"
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="accent" size="sm">Empathetic Mentor</Badge>
                    <Badge variant="neutral" size="sm">Design Expert</Badge>
                    <Badge variant="success" size="sm">Tech Leader</Badge>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <p className="text-xs text-slate-400">You haven't generated your AI identity yet.</p>
                  <Link to="/alumni/identity">
                    <Button variant="secondary" size="sm">Generate Identity</Button>
                  </Link>
                </div>
              )}
            </Card>

            {/* Matched Students List */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Users className="text-slate-400" size={20} />
                <h3 className="text-sm font-bold text-slate-800">Compatible Student Requests</h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {mockMatchedStudents.map((stud) => {
                  const isConnected = connectedIds.has(stud.id);
                  return (
                    <Card key={stud.id} className="p-5 flex flex-col justify-between space-y-4 text-left border border-slate-100 shadow-sm">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                              {stud.avatar}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-800">{stud.name}</h4>
                              <p className="text-[10px] text-slate-400 font-semibold">{stud.degree} • {stud.college} (Year {stud.year})</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold">
                            {stud.score}%
                          </div>
                        </div>

                        {/* Semantic compatibility note */}
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-slate-500 leading-relaxed">
                          <span className="font-bold text-slate-700 block mb-1">Semantic Match Reason:</span>
                          "{stud.reason}"
                        </div>
                      </div>

                      {/* Connect controls */}
                      <div className="flex justify-end space-x-2 pt-2 border-t border-slate-50">
                        <Button 
                          variant={isConnected ? "secondary" : "primary"} 
                          size="sm"
                          onClick={() => handleConnect(stud.id, stud.name)}
                          disabled={isConnected}
                          icon={isConnected ? CheckCircle : MessageSquare}
                        >
                          {isConnected ? 'Accepted' : 'Accept & Connect'}
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Completion Widget */}
            <Card className="flex flex-col items-center justify-center p-6 text-center space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 self-start">
                Profile Completion
              </h3>
              
              <ProgressBar
                variant="circular"
                value={progressVal}
                size="lg"
                label={progressVal === 100 ? 'All steps complete!' : 'Finish onboarding steps'}
              />
              
              <div className="w-full text-left space-y-2.5 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Academic & Career history</span>
                  {profileCompleted ? (
                    <span className="text-emerald-600 font-bold flex items-center"><CheckCircle size={12} className="mr-1" /> Done</span>
                  ) : (
                    <Link to="/alumni/profile" className="text-primary font-bold hover:underline">Complete</Link>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Reflective Journey cards</span>
                  {detailsCompleted ? (
                    <span className="text-emerald-600 font-bold flex items-center"><CheckCircle size={12} className="mr-1" /> Done</span>
                  ) : (
                    <Link to="/alumni/journey" className="text-primary font-bold hover:underline">Complete</Link>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">AI Identity generated</span>
                  {identityCompleted ? (
                    <span className="text-emerald-600 font-bold flex items-center"><CheckCircle size={12} className="mr-1" /> Done</span>
                  ) : (
                    <Link to="/alumni/identity" className="text-primary font-bold hover:underline">Complete</Link>
                  )}
                </div>
              </div>
            </Card>

            {/* Activity Feed */}
            <Card className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                {mockActivities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <div key={act.id} className="flex items-start space-x-3 text-left">
                      <div className={`p-1.5 rounded-lg ${act.color} mt-0.5`}>
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-700 leading-snug">{act.title}</p>
                        <span className="text-[9px] text-slate-400 flex items-center mt-1">
                          <Clock size={10} className="mr-1" />
                          {act.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

          </div>

        </div>

        {/* --- TOASTS --- */}
        {toastMessage && (
          <Toast
            message={toastMessage}
            type="success"
            onClose={() => setToastMessage('')}
          />
        )}

      </div>
    </DashboardLayout>
  );
};

export default AlumniDashboard;
