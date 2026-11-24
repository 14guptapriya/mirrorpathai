import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Search, 
  Sparkles, 
  User, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const studentLinks = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Find Mentor', path: '/student/matching', icon: Search },
    { label: 'My Identity', path: '/student/identity', icon: Sparkles },
    { label: 'Profile', path: '/student/profile', icon: User },
  ];

  const alumniLinks = [
    { label: 'Dashboard', path: '/alumni/dashboard', icon: LayoutDashboard },
    { label: 'My Identity', path: '/alumni/identity', icon: Sparkles },
    { label: 'Profile', path: '/alumni/profile', icon: User },
  ];

  const links = user.role === 'student' ? studentLinks : alumniLinks;

  return (
    <>
      {/* Desktop Sidebar (Persistent Left Side) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-100 bg-white min-h-screen sticky top-0 py-6 px-4 shrink-0 shadow-soft">
        {/* Brand Logo inside Sidebar */}
        <div className="flex items-center space-x-2 px-3 mb-8">
          <div className="bg-primary flex items-center justify-center w-7 h-7 rounded-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
            </svg>
          </div>
          <span className="text-base font-bold tracking-tight text-slate-800">
            MirrorPath<span className="text-primary font-black">AI</span>
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/5 text-primary'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`
                }
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer (User session & logout) */}
        <div className="pt-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center space-x-3 px-3 py-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
              {user.name.charAt(0)}
            </div>
            <div className="truncate flex-1">
              <p className="text-xs font-semibold text-slate-800 truncate">{user.name}</p>
              <p className="text-[10px] text-slate-400 capitalize truncate">{user.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors focus:outline-none"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile/Tablet Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-2 flex items-center justify-around shadow-lg">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 py-1 px-3 rounded-xl transition-colors ${
                  isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-700'
                }`
              }
            >
              <Icon size={20} />
              <span className="text-[9px] font-bold tracking-tight">{link.label}</span>
            </NavLink>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center space-y-1 py-1 px-3 text-slate-400 hover:text-rose-500 transition-colors"
        >
          <LogOut size={20} />
          <span className="text-[9px] font-bold tracking-tight">Sign Out</span>
        </button>
      </nav>
    </>
  );
};

export default Sidebar;
