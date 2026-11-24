import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentService } from '../services/apiServices';
import { Sparkles, Search, CheckCircle, Clock, UserCheck, ChevronRight, User } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';

const StudentDashboard = () => {
  const { user, onboardingStatus, refreshOnboardingStatus } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [identitySummary, setIdentitySummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      try {
        const studentProfile = await studentService.fetchProfile();
        setProfile(studentProfile);

        const cachedIdentity = studentService.getCachedIdentity(user.id);
        if (cachedIdentity) {
          // Get first 180 characters of identity as summary
          setIdentitySummary(cachedIdentity.length > 180 ? `${cachedIdentity.substring(0, 180)}...` : cachedIdentity);
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  // Recalculate progress value (out of 100)
  const { profileCompleted, detailsCompleted, identityCompleted } = onboardingStatus;
  let progressVal = 0;
  if (profileCompleted) progressVal += 33;
  if (detailsCompleted) progressVal += 33;
  if (identityCompleted) progressVal += 34;

  const mockActivities = [
    { id: 1, title: 'AI Identity Profile generated', time: 'Just now', icon: Sparkles, color: 'text-primary bg-primary/5' },
    { id: 2, title: 'Conversational Questionnaire completed', time: '10 minutes ago', icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50' },
    { id: 3, title: 'Student Profile details logged', time: '20 minutes ago', icon: UserCheck, color: 'text-blue-500 bg-blue-50' },
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
          <div className="h-48 bg-slate-100 rounded-2xl animate-pulse" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-xs text-slate-400">
              {profile ? `${profile.degree} in ${profile.department} • Year ${profile.year_of_study}` : 'Setup your student details to find matches.'}
            </p>
          </div>
          <Link to="/student/matching">
            <Button variant="primary" icon={Search}>
              Find My Mentor
            </Button>
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main left content - Identity & Completion */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Identity Summary Card */}
            <Card className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <Sparkles size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">My AI Identity Summary</h3>
                </div>
                <Link to="/student/identity" className="text-xs font-bold text-primary hover:underline flex items-center">
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
                    <Badge variant="accent" size="sm">Technical Pivot</Badge>
                    <Badge variant="neutral" size="sm">Design Focus</Badge>
                    <Badge variant="success" size="sm">Resilient</Badge>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <p className="text-xs text-slate-400">You haven't generated your AI identity yet.</p>
                  <Link to="/student/identity">
                    <Button variant="secondary" size="sm">Generate Identity</Button>
                  </Link>
                </div>
              )}
            </Card>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card hoverEffect onClick={() => navigate('/student/profile')} className="p-4 flex items-center space-x-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <User size={18} />
                </div>
                <div className="text-left leading-normal">
                  <span className="text-xs font-bold block text-slate-700">Update Profile</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Academic settings</span>
                </div>
              </Card>

              <Card hoverEffect onClick={() => navigate('/student/matching')} className="p-4 flex items-center space-x-4">
                <div className="p-2.5 rounded-xl bg-primary/5 text-primary">
                  <Search size={18} />
                </div>
                <div className="text-left leading-normal">
                  <span className="text-xs font-bold block text-slate-700">Find Mentor</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Vector similarity match</span>
                </div>
              </Card>

              <Card hoverEffect onClick={() => navigate('/student/identity')} className="p-4 flex items-center space-x-4">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                  <Sparkles size={18} />
                </div>
                <div className="text-left leading-normal">
                  <span className="text-xs font-bold block text-slate-700">AI Identity</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">View narrative summary</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Right column - Completion & Activity */}
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
                  <span className="text-slate-500 font-medium">Basic Profile details</span>
                  {profileCompleted ? (
                    <span className="text-emerald-600 font-bold flex items-center"><CheckCircle size={12} className="mr-1" /> Done</span>
                  ) : (
                    <Link to="/student/profile" className="text-primary font-bold hover:underline">Complete</Link>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">AI Interview questionnaire</span>
                  {detailsCompleted ? (
                    <span className="text-emerald-600 font-bold flex items-center"><CheckCircle size={12} className="mr-1" /> Done</span>
                  ) : (
                    <Link to="/student/onboarding" className="text-primary font-bold hover:underline">Complete</Link>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Identity generated</span>
                  {identityCompleted ? (
                    <span className="text-emerald-600 font-bold flex items-center"><CheckCircle size={12} className="mr-1" /> Done</span>
                  ) : (
                    <Link to="/student/identity" className="text-primary font-bold hover:underline">Complete</Link>
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
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
