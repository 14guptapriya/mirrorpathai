import React from 'react';

const ProgressBar = ({
  value = 0, // percentage (0 to 100)
  max = 100,
  variant = 'linear', // linear, circular
  size = 'md', // sm, md, lg (applies to circular)
  showLabel = false,
  label = '',
  className = '',
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  if (variant === 'circular') {
    const sizeMap = {
      sm: { diameter: 48, strokeWidth: 4, fontSize: 'text-[10px]' },
      md: { diameter: 72, strokeWidth: 6, fontSize: 'text-xs' },
      lg: { diameter: 120, strokeWidth: 10, fontSize: 'text-lg font-semibold' },
    };

    const config = sizeMap[size] || sizeMap.md;
    const radius = (config.diameter - config.strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className="relative" style={{ width: config.diameter, height: config.diameter }}>
          <svg className="transform -rotate-90 w-full h-full">
            {/* Background Circle */}
            <circle
              cx={config.diameter / 2}
              cy={config.diameter / 2}
              r={radius}
              className="stroke-slate-100 fill-none"
              strokeWidth={config.strokeWidth}
            />
            {/* Foreground Circle */}
            <circle
              cx={config.diameter / 2}
              cy={config.diameter / 2}
              r={radius}
              className="stroke-primary fill-none transition-all duration-500 ease-out"
              strokeWidth={config.strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          {/* Label inside */}
          <div className="absolute inset-0 flex items-center justify-center font-medium text-slate-800">
            <span className={config.fontSize}>{percentage}%</span>
          </div>
        </div>
        {label && <span className="mt-2 text-xs font-medium text-slate-500">{label}</span>}
      </div>
    );
  }

  // Linear bar
  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1 text-xs font-semibold text-slate-600">
          <span>{label}</span>
          {showLabel && <span>{percentage}%</span>}
        </div>
      )}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className="bg-primary h-full rounded-full transition-all duration-500 ease-out shadow-sm shadow-primary/10"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
