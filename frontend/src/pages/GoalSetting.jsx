import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Target, Calendar, CheckCircle, ArrowLeft, RefreshCw, Clock } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Input from '../components/Input';
import { goalService } from '../services/goalService';

// Cycling status messages for the AI loading experience
const STATUS_MESSAGES = [
  'Analyzing your profile...',
  'Understanding your matched mentor...',
  'Comparing career journeys...',
  'Identifying skill gaps...',
  'Generating personalized goals...'
];

const GoalSetting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const alumniId = location.state?.alumniId;

  // --- Recommendation state ---
  const [recommendations, setRecommendations] = useState([]);
  const [recLoading, setRecLoading] = useState(false);
  const [recError, setRecError] = useState('');
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);

  // --- Form state ---
  const [formData, setFormData] = useState({
    goal_title: '',
    goal_description: '',
    target_date: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // --- Cycle loading messages ---
  useEffect(() => {
    let interval;
    if (recLoading) {
      interval = setInterval(() => {
        setCurrentMsgIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [recLoading]);

  // --- Fetch recommendations on mount ---
  const fetchRecommendations = useCallback(async () => {
    if (!alumniId) return;
    setRecLoading(true);
    setRecError('');
    setRecommendations([]);
    setCurrentMsgIndex(0);

    try {
      const data = await goalService.fetchRecommendations(alumniId);
      setRecommendations(data.recommended_goals || []);
    } catch (err) {
      console.error('Recommendation fetch failed:', err);
      setRecError('Unable to generate AI recommendations. Please try again.');
    } finally {
      setRecLoading(false);
    }
  }, [alumniId]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  // --- Use a recommendation ---
  const handleUseGoal = (rec) => {
    setFormData({
      goal_title: rec.title,
      goal_description: rec.description,
      target_date: '' // left blank for student to choose
    });
    setFormErrors({});
    setSaveError('');
    setSaveSuccess(false);

    // Scroll the form into view
    setTimeout(() => {
      document.getElementById('goal-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // --- Form handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on edit
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.goal_title.trim()) errors.goal_title = 'Goal title is required.';
    if (!formData.goal_description.trim()) errors.goal_description = 'Goal description is required.';
    if (!formData.target_date) errors.target_date = 'Target date is required.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setSaving(true);
    setSaveError('');

    try {
      await goalService.saveGoal({
        goal_title: formData.goal_title.trim(),
        goal_description: formData.goal_description.trim(),
        target_date: formData.target_date
      });
      setSaveSuccess(true);
      // Auto-redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/student/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Goal save failed:', err);
      setSaveError('Failed to save your goal. Please check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Set Your Growth Goal
          </h1>
          <p className="text-xs text-slate-400">
            Get AI-powered goal recommendations based on your matched mentor, or create your own.
          </p>
        </div>

        {/* ================================================ */}
        {/* SECTION 1 — AI Loading State                     */}
        {/* ================================================ */}
        {recLoading && (
          <Card className="text-center p-8 md:p-12 space-y-8 flex flex-col items-center justify-center min-h-[350px]">
            {/* Glowing orb animation — matches IdentityGeneration */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              <div className="absolute w-20 h-20 rounded-full bg-primary/15 animate-pulse" />
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 text-white">
                <Sparkles size={24} className="animate-spin-slow" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-slate-700 shimmer-text">
                Generating Recommendations...
              </h3>
              <p className="text-xs text-slate-400 font-medium transition-all duration-300">
                {STATUS_MESSAGES[currentMsgIndex]}
              </p>
            </div>
          </Card>
        )}

        {/* ================================================ */}
        {/* SECTION 1b — Recommendation Error State          */}
        {/* ================================================ */}
        {!recLoading && recError && (
          <Card className="text-center p-8 space-y-5 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
              <RefreshCw size={28} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-slate-800">Recommendations Unavailable</h3>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                {recError}
              </p>
            </div>
            <Button variant="secondary" onClick={fetchRecommendations} icon={RefreshCw}>
              Retry
            </Button>
          </Card>
        )}

        {/* ================================================ */}
        {/* SECTION 2 — Recommended Goals                    */}
        {/* ================================================ */}
        {!recLoading && recommendations.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles size={16} className="text-primary animate-pulse" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                AI Recommended Goals
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <Card key={index} hoverEffect className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Icon + Title */}
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Target size={20} />
                      </div>
                      <div className="space-y-1 flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-slate-800 leading-snug">
                          {rec.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {rec.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline badge */}
                    {rec.timeline && (
                      <Badge variant="accent" size="sm" icon={Clock}>
                        {rec.timeline}
                      </Badge>
                    )}
                  </div>

                  {/* Use button */}
                  <div className="pt-3 border-t border-slate-50">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      onClick={() => handleUseGoal(rec)}
                    >
                      Use This Goal
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ================================================ */}
        {/* SECTION 3 — Goal Form                            */}
        {/* ================================================ */}
        {!saveSuccess && (
          <div id="goal-form-section" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Target size={16} className="text-primary" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {recommendations.length > 0 ? 'Customize & Save Goal' : 'Create Your Goal'}
              </h2>
            </div>

            <Card className="space-y-5">
              <Input
                label="Goal Title"
                name="goal_title"
                value={formData.goal_title}
                onChange={handleChange}
                placeholder="e.g. Build a Full Stack Project"
                required
                error={formErrors.goal_title}
                icon={Target}
              />

              <Input
                label="Goal Description"
                name="goal_description"
                value={formData.goal_description}
                onChange={handleChange}
                placeholder="Describe what you want to achieve and why..."
                required
                multiline
                rows={4}
                error={formErrors.goal_description}
              />

              <Input
                label="Target Date"
                name="target_date"
                type="date"
                value={formData.target_date}
                onChange={handleChange}
                required
                error={formErrors.target_date}
                icon={Calendar}
              />

              {/* Save error message */}
              {saveError && (
                <p className="text-xs text-red-500 font-semibold bg-red-50 border border-red-100 p-3 rounded-xl leading-normal">
                  {saveError}
                </p>
              )}

              {/* Buttons */}
              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <Button
                  variant="secondary"
                  onClick={() => navigate(-1)}
                  icon={ArrowLeft}
                >
                  Back
                </Button>

                <Button
                  variant="primary"
                  onClick={handleSave}
                  loading={saving}
                  disabled={saving}
                >
                  Save Goal
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* ================================================ */}
        {/* SUCCESS STATE                                    */}
        {/* ================================================ */}
        {saveSuccess && (
          <Card className="text-center p-8 md:p-12 space-y-5 flex flex-col items-center border-emerald-100 ring-1 ring-emerald-50">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tight text-slate-800">
                🎉 Goal Successfully Added
              </h2>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Your personalized growth goal has been saved. You can now start working toward it.
              </p>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              Redirecting to dashboard...
            </p>
          </Card>
        )}

      </div>
    </DashboardLayout>
  );
};

export default GoalSetting;
