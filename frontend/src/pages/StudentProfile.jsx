import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentService } from '../services/apiServices';
import { School, Award, Library, Calendar, Linkedin, Github, ChevronRight } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

const StudentProfile = () => {
  const { user, refreshOnboardingStatus } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    collegeName: '',
    degree: '',
    department: '',
    yearOfStudy: '',
    linkedinUrl: '',
    githubUrl: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Load existing profile details if they exist
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await studentService.fetchProfile();
        if (profile) {
          setFormData({
            collegeName: profile.college_name || '',
            degree: profile.degree || '',
            department: profile.department || '',
            yearOfStudy: profile.year_of_study?.toString() || '',
            linkedinUrl: profile.linkedin_url || '',
            githubUrl: profile.github_url || '',
          });
        }
      } catch (error) {
        console.error('Failed to load student profile:', error);
      } finally {
        setFetching(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required';
    if (!formData.degree.trim()) newErrors.degree = 'Degree is required';
    if (!formData.department.trim()) newErrors.department = 'Department / Branch is required';
    if (!formData.yearOfStudy) {
      newErrors.yearOfStudy = 'Year of study is required';
    } else {
      const year = parseInt(formData.yearOfStudy, 10);
      if (isNaN(year) || year < 1 || year > 6) {
        newErrors.yearOfStudy = 'Year of study must be a number between 1 and 6';
      }
    }
    if (formData.linkedinUrl && !formData.linkedinUrl.startsWith('http')) {
      newErrors.linkedinUrl = 'LinkedIn URL must start with http:// or https://';
    }
    if (formData.githubUrl && !formData.githubUrl.startsWith('http')) {
      newErrors.githubUrl = 'GitHub URL must start with http:// or https://';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = formData.collegeName.trim() && formData.degree.trim() && formData.department.trim() && formData.yearOfStudy;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await studentService.saveProfile(formData);
      await refreshOnboardingStatus();
      navigate('/student/onboarding'); // Step 2
    } catch (error) {
      console.error('Failed to save profile:', error);
      setErrors({ api: 'Failed to save profile details. Please try again.' });
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
            <div className="h-10 bg-slate-100 rounded w-full" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Progress Stepper */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Student Onboarding</span>
            <span className="text-primary">Step 1 of 3: Profile Details</span>
          </div>
          <ProgressBar value={33} showLabel={false} />
        </div>

        <Card className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Basic Profile Details
            </h1>
            <p className="text-xs text-slate-400">
              Provide your college and enrollment credentials to help us tailor matches.
            </p>
          </div>

          {errors.api && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold">
              {errors.api}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="College Name"
                name="collegeName"
                placeholder="e.g. BITS Pilani"
                value={formData.collegeName}
                onChange={handleChange}
                error={errors.collegeName}
                icon={School}
                required
              />

              <Input
                label="Degree Program"
                name="degree"
                placeholder="e.g. Bachelor of Engineering"
                value={formData.degree}
                onChange={handleChange}
                error={errors.degree}
                icon={Award}
                required
              />

              <Input
                label="Department / Branch"
                name="department"
                placeholder="e.g. Computer Science"
                value={formData.department}
                onChange={handleChange}
                error={errors.department}
                icon={Library}
                required
              />

              <Input
                label="Year of Study"
                name="yearOfStudy"
                type="number"
                placeholder="e.g. 3"
                value={formData.yearOfStudy}
                onChange={handleChange}
                error={errors.yearOfStudy}
                icon={Calendar}
                min="1"
                max="6"
                required
              />
            </div>

            <div className="border-t border-slate-100 pt-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Professional Profiles (Optional)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="LinkedIn URL"
                  name="linkedinUrl"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  error={errors.linkedinUrl}
                  icon={Linkedin}
                />

                <Input
                  label="GitHub URL"
                  name="githubUrl"
                  placeholder="https://github.com/username"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  error={errors.githubUrl}
                  icon={Github}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={!isFormValid || loading}
                loading={loading}
                icon={ChevronRight}
              >
                Continue to Questionnaire
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
