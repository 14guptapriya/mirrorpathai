import React from 'react';

const Card = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-surface border border-slate-100 rounded-2xl shadow-premium p-6 ${
        hoverEffect ? 'hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
