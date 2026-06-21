import React from 'react';
import Navbar from '../components/Navbar';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isPublic={true} />
      <div className="flex-1 mt-16">
        {children}
      </div>
    </div>
  );
};

export default PublicLayout;
