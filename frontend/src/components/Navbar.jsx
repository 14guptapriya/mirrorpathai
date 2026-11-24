import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, ChevronDown, Menu, X, Bell } from 'lucide-react';
import Button from './Button';

const Navbar = ({ isPublic = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  // Helper to handle smooth scroll on landing page
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || !isPublic
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-softpy-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to={user ? (user.role === 'student' ? '/student/dashboard' : '/alumni/dashboard') : '/'} className="flex items-center space-x-2">
          <div className="bg-primary flex items-center justify-center w-8 h-8 rounded-xl shadow-md shadow-primary/25 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            MirrorPath<span className="text-primary font-black">AI</span>
          </span>
        </Link>

        {/* Public Desktop Navigation */}
        {isPublic && (
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              {/* Notification icon */}
              <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
                <Bell size={18} />
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2.5 p-1.5 pl-3 pr-2.5 rounded-xl border border-slate-200/50 hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 z-20 animate-slide-up">
                      <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                        <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-800 truncate">{user.email}</p>
                        <span className="inline-flex mt-1 items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/5 text-primary border border-primary/10 uppercase">
                          {user.role}
                        </span>
                      </div>
                      <Link
                        to={user.role === 'student' ? '/student/profile' : '/alumni/profile'}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        <User size={16} />
                        <span>My Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full text-left px-3 py-2 text-sm text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors mt-1"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          {user && (
            <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors mr-2">
              <Bell size={18} />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl focus:outline-none"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md p-6 absolute top-full left-0 right-0 shadow-2xl flex flex-col space-y-4">
          {isPublic && navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors py-2 border-b border-slate-50"
            >
              {item.label}
            </a>
          ))}

          {user ? (
            <div className="pt-2 flex flex-col space-y-3">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold uppercase text-sm">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-400 capitalize">{user.role} Account</p>
                </div>
              </div>
              <Link
                to={user.role === 'student' ? '/student/profile' : '/alumni/profile'}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-sm font-medium text-rose-600 hover:text-rose-700 text-left"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 flex flex-col space-y-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full">Login</Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
