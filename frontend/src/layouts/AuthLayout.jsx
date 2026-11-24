import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-[120px] animate-pulse-subtle pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] animate-pulse-subtle pointer-events-none" style={{ animationDelay: '1.5s' }} />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 flex flex-col items-center">
        {/* Brand Link */}
        <Link to="/" className="flex items-center space-x-2.5 mb-6">
          <div className="bg-primary flex items-center justify-center w-9 h-9 rounded-xl shadow-md shadow-primary/20 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            MirrorPath<span className="text-primary font-black">AI</span>
          </span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="bg-white py-10 px-6 sm:px-10 border border-slate-100/80 rounded-3xl shadow-premium">
          <div className="fade-in">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
