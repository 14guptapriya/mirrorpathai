import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

const ErrorState = ({
  title = 'Something went wrong',
  description = 'We encountered an error while fetching the data. Please try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 border border-red-100 rounded-2xl bg-red-50/30 ${className}`}>
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-500 mb-4 animate-pulse">
        <AlertTriangle size={24} />
      </div>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-5">{description}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} icon={RefreshCw}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
