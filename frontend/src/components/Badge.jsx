import React from 'react';

const Badge = ({
  children,
  variant = 'primary', // primary, secondary, accent, success, warning, neutral
  size = 'md', // sm, md
  className = '',
  icon: Icon,
}) => {
  const baseStyle = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-blue-50 text-blue-600 border border-blue-100',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100',
    neutral: 'bg-slate-100 text-slate-600',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}>
      {Icon && <Icon className="mr-1 h-3 w-3" />}
      {children}
    </span>
  );
};

export default Badge;
