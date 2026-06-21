import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { alumniService } from '../services/apiServices';
import { 
  School, 
  Award, 
  Library, 
  Calendar, 
  Briefcase, 
  Building2, 
  Compass, 
  Clock, 
  Linkedin,
  Plus, 
  Trash2,
  ChevronRight,
  History
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

const AlumniProfile = () => {
  const { user, refreshOnboardingStatus } = useAuth();
  const navigate = useNavigate();

  const [academicData, setAcademicData] = useState({
    collegeName: '',
    degree: '',
    department: '',
    graduationYear: '',
  });

  const [currentRoleData, setCurrentRoleData] = useState({
    designation: '',
    company: '',
    industry: '',
    yearsOfExperience: '',
    linkedinUrl: '',
  });

  // Prior roles array for timeline visualization
  const [priorRoles, setPriorRoles] = useState([]);
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Load existing profile if it exists
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await alumniService.fetchProfile();
        if (profile) {
          setAcademicData({
            collegeName: profile.college_name || '',
            degree: profile.degree || '',
            department: profile.department || '',
            graduationYear: profile.graduation_year?.toString() || '',
          });

          setCurrentRoleData({
            designation: profile.current_designation || '',
            company: profile.current_company || '',
            industry: profile.industry || '',
            yearsOfExperience: profile.years_of_experience?.toString() || '',
            linkedinUrl: profile.linkedin_url || '',
          });

          // Check if there are saved prior roles in local storage as a cache
          const cachedPrior = localStorage.getItem(`prior_roles_${profile.user_id}`);
          if (cachedPrior) {
            setPriorRoles(JSON.parse(cachedPrior));
          }
        }
      } catch (error) {
        console.error('Failed to load alumni profile:', error);
      } finally {
        setFetching(false);
      }
    };
    loadProfile();
  }, []);

  const handleAcademicChange = (e) => {
    const { name, value } = e.target;
    setAcademicData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCurrentRoleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRoleData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const addPriorRole = () => {
    setPriorRoles((prev) => [
      ...prev,
      { id: Date.now(), company: '', designation: '', years: '' },
    ]);
  };

  const updatePriorRole = (id, field, value) => {
    setPriorRoles((prev) =>
      prev.map((role) => (role.id === id ? { ...role, [field]: value } : role))
    );
  };

  const removePriorRole = (id) => {
    setPriorRoles((prev) => prev.filter((role) => role.id !== id));
  };

  const validate = () => {
    const newErrors = {};
    
    // Academic validation
    if (!academicData.collegeName.trim()) newErrors.collegeName = 'College name is required';
    if (!academicData.degree.trim()) newErrors.degree = 'Degree is required';
    if (!academicData.department.trim()) newErrors.department = 'Department is required';
    if (!academicData.graduationYear) {
      newErrors.graduationYear = 'Graduation year is required';
    } else {
      const year = parseInt(academicData.graduationYear, 10);
      if (isNaN(year) || year < 1950 || year > 2030) {
        newErrors.graduationYear = 'Invalid graduation year';
      }
    }

    // Current role validation
    if (!currentRoleData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!currentRoleData.company.trim()) newErrors.company = 'Company is required';
    if (!currentRoleData.industry.trim()) newErrors.industry = 'Industry field is required';
    if (!currentRoleData.yearsOfExperience) {
      newErrors.yearsOfExperience = 'Years of experience is required';
    } else {
      const years = parseInt(currentRoleData.yearsOfExperience, 10);
      if (isNaN(years) || years < 0) {
        newErrors.yearsOfExperience = 'Years of experience must be a positive number';
      }
    }

    if (currentRoleData.linkedinUrl && !currentRoleData.linkedinUrl.startsWith('http')) {
      newErrors.linkedinUrl = 'LinkedIn URL must start with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = 
    academicData.collegeName.trim() && 
    academicData.degree.trim() && 
    academicData.department.trim() && 
    academicData.graduationYear && 
    currentRoleData.designation.trim() && 
    currentRoleData.company.trim() && 
    currentRoleData.industry.trim() && 
    currentRoleData.yearsOfExperience;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Merge current role data for profile creation endpoint
      const payload = {
        ...academicData,
        ...currentRoleData
      };
      
      const response = await alumniService.saveProfile(payload);
      
      // Save prior roles to localStorage so it can be combined in the Journey page
      localStorage.setItem(`prior_roles_${user.id}`, JSON.stringify(priorRoles));

      await refreshOnboardingStatus();
      navigate('/alumni/journey'); // Step 2
    } catch (error) {
      console.error('Failed to save alumni profile:', error);
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
        
        {/* Onboarding Stepper */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Alumni Onboarding</span>
            <span className="text-primary">Step 1 of 3: Career History</span>
          </div>
          <ProgressBar value={33} showLabel={false} />
        </div>

        <Card className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Career Timeline Setup
            </h1>
            <p className="text-xs text-slate-400">
              Frame your career history as a visual timeline. Enter your current position at the top, and add prior positions below.
            </p>
          </div>

          {errors.api && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold">
              {errors.api}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Academic Section */}
            <div className="space-y-4 border-b border-slate-100 pb-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Academic Background
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Alma Mater"
                  name="collegeName"
                  placeholder="e.g. IIT Bombay"
                  value={academicData.collegeName}
                  onChange={handleAcademicChange}
                  error={errors.collegeName}
                  icon={School}
                  required
                />
                <Input
                  label="Degree Program"
                  name="degree"
                  placeholder="e.g. B.Tech"
                  value={academicData.degree}
                  onChange={handleAcademicChange}
                  error={errors.degree}
                  icon={Award}
                  required
                />
                <Input
                  label="Department"
                  name="department"
                  placeholder="e.g. Electrical Engineering"
                  value={academicData.department}
                  onChange={handleAcademicChange}
                  error={errors.department}
                  icon={Library}
                  required
                />
                <Input
                  label="Graduation Year"
                  name="graduationYear"
                  type="number"
                  placeholder="e.g. 2018"
                  value={academicData.graduationYear}
                  onChange={handleAcademicChange}
                  error={errors.graduationYear}
                  icon={Calendar}
                  required
                />
              </div>
            </div>

            {/* Visual Timeline Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-left">
                Work Experience Timeline
              </h3>

              {/* Timeline Container */}
              <div className="relative border-l-2 border-slate-100 pl-6 space-y-8 text-left ml-3">
                
                {/* Node: Current Role */}
                <div className="relative">
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-primary/20" />
                  
                  <div className="space-y-4 bg-slate-50/50 p-4 border border-slate-100 rounded-2xl">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary/5 text-primary border border-primary/10">
                      CURRENT ROLE
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Designation / Role"
                        name="designation"
                        placeholder="e.g. Software Lead"
                        value={currentRoleData.designation}
                        onChange={handleCurrentRoleChange}
                        error={errors.designation}
                        icon={Briefcase}
                        required
                      />
                      <Input
                        label="Company Name"
                        name="company"
                        placeholder="e.g. Google"
                        value={currentRoleData.company}
                        onChange={handleCurrentRoleChange}
                        error={errors.company}
                        icon={Building2}
                        required
                      />
                      <Input
                        label="Industry Segment"
                        name="industry"
                        placeholder="e.g. Software Technology"
                        value={currentRoleData.industry}
                        onChange={handleCurrentRoleChange}
                        error={errors.industry}
                        icon={Compass}
                        required
                      />
                      <Input
                        label="Total Years of Exp"
                        name="yearsOfExperience"
                        type="number"
                        placeholder="e.g. 6"
                        value={currentRoleData.yearsOfExperience}
                        onChange={handleCurrentRoleChange}
                        error={errors.yearsOfExperience}
                        icon={Clock}
                        required
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        label="LinkedIn Profile"
                        name="linkedinUrl"
                        placeholder="https://linkedin.com/in/username"
                        value={currentRoleData.linkedinUrl}
                        onChange={handleCurrentRoleChange}
                        error={errors.linkedinUrl}
                        icon={Linkedin}
                      />
                    </div>
                  </div>
                </div>

                {/* Nodes: Prior Roles */}
                {priorRoles.map((role, idx) => (
                  <div key={role.id} className="relative">
                    {/* Timeline dot */}
                    <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-300 ring-4 ring-slate-100" />
                    
                    <div className="space-y-4 bg-white p-4 border border-slate-100 rounded-2xl shadow-sm relative">
                      <div className="flex justify-between items-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-500">
                          PRIOR ROLE #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removePriorRole(role.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Input
                          label="Designation"
                          placeholder="e.g. SDE-I"
                          value={role.designation}
                          onChange={(e) => updatePriorRole(role.id, 'designation', e.target.value)}
                          required
                        />
                        <Input
                          label="Company"
                          placeholder="e.g. Microsoft"
                          value={role.company}
                          onChange={(e) => updatePriorRole(role.id, 'company', e.target.value)}
                          required
                        />
                        <Input
                          label="Years Active"
                          placeholder="e.g. 2"
                          value={role.years}
                          onChange={(e) => updatePriorRole(role.id, 'years', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Prior Role CTA */}
              <div className="pl-9 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addPriorRole}
                  icon={Plus}
                >
                  Add Prior Role
                </Button>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <Button
                type="submit"
                disabled={!isFormValid || loading}
                loading={loading}
                icon={ChevronRight}
              >
                Continue to Journey Details
              </Button>
            </div>

          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AlumniProfile;
