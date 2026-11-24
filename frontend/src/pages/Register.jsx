import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, GraduationCap, Briefcase, UserPlus } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '', // 'student' or 'alumni'
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setApiError('');
  };

  const selectRole = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    if (errors.role) {
      setErrors((prev) => ({ ...prev, role: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError('');
    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      // Success logs user in immediately and routes them. Route guards will force redirect
      // to the appropriate profile creation starting point.
      navigate('/login'); // Let guard redirect to appropriate step
    } catch (err) {
      console.error(err);
      setApiError(
        err.response?.data?.detail || 'Registration failed. Email might already be taken.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Create your account
          </h2>
          <p className="text-xs text-slate-400">
            Join MirrorPathAI to start finding deep, semantic matches
          </p>
        </div>

        {apiError && (
          <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold leading-relaxed">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selection Step */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">
              I want to join as: <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* Student Card */}
              <div
                onClick={() => selectRole('student')}
                className={`border p-4 rounded-2xl cursor-pointer transition-all duration-300 text-center flex flex-col items-center justify-center space-y-2 relative overflow-hidden ${
                  formData.role === 'student'
                    ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20 shadow-md'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${formData.role === 'student' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <GraduationCap size={20} />
                </div>
                <span className="text-xs font-bold block">Student</span>
                <span className="text-[10px] text-slate-400 leading-normal block">
                  Find alumni who navigated similar paths.
                </span>
              </div>

              {/* Alumni Card */}
              <div
                onClick={() => selectRole('alumni')}
                className={`border p-4 rounded-2xl cursor-pointer transition-all duration-300 text-center flex flex-col items-center justify-center space-y-2 relative overflow-hidden ${
                  formData.role === 'alumni'
                    ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20 shadow-md'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${formData.role === 'alumni' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <Briefcase size={20} />
                </div>
                <span className="text-xs font-bold block">Alumnus</span>
                <span className="text-[10px] text-slate-400 leading-normal block">
                  Share experiences and guide current students.
                </span>
              </div>
            </div>
            {errors.role && (
              <p className="text-xs text-red-500 font-medium mt-1">{errors.role}</p>
            )}
          </div>

          <div className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="Aarav Sharma"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={User}
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="aarav@university.edu"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={Lock}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              icon={Lock}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3"
            loading={loading}
            icon={UserPlus}
          >
            Create Account
          </Button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-100">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
