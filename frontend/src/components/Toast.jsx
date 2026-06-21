import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({
  message,
  type = 'success', // success, error, info
  duration = 4000,
  onClose,
  className = '',
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    error: <AlertCircle className="h-5 w-5 text-rose-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const bgStyles = {
    success: 'bg-emerald-50 border-emerald-100 text-emerald-900',
    error: 'bg-rose-50 border-rose-100 text-rose-900',
    info: 'bg-blue-50 border-blue-100 text-blue-900',
  };

  return (
    <div
      className={`fixed bottom-5 right-5 flex items-center p-4 border rounded-2xl shadow-premium bg-white z-50 animate-bounce-subtle pointer-events-auto ${bgStyles[type]} ${className}`}
      style={{
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      <div className="flex-shrink-0 mr-3">{icons[type]}</div>
      <div className="text-sm font-medium pr-8">{message}</div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
