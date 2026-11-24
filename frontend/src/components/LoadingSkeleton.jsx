import React from 'react';

const LoadingSkeleton = ({
  variant = 'card', // card, profile, list, text
  count = 1,
  className = '',
}) => {
  const baseShimmer = 'animate-pulse bg-slate-100 rounded-xl';

  const renderSkeleton = (index) => {
    switch (variant) {
      case 'profile':
        return (
          <div key={index} className="space-y-6 p-6 border border-slate-100 rounded-2xl bg-white shadow-premium">
            <div className="flex items-center space-x-4">
              <div className={`${baseShimmer} w-16 h-16 rounded-full`} />
              <div className="space-y-2">
                <div className={`${baseShimmer} h-5 w-40`} />
                <div className={`${baseShimmer} h-4 w-24`} />
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className={`${baseShimmer} h-4 w-full`} />
              <div className={`${baseShimmer} h-4 w-5/6`} />
              <div className={`${baseShimmer} h-4 w-4/5`} />
            </div>
          </div>
        );
      case 'list':
        return (
          <div key={index} className="flex items-center space-x-4 py-4 border-b border-slate-100 last:border-0">
            <div className={`${baseShimmer} w-10 h-10 rounded-lg`} />
            <div className="flex-1 space-y-2">
              <div className={`${baseShimmer} h-4 w-1/3`} />
              <div className={`${baseShimmer} h-3.5 w-1/2`} />
            </div>
            <div className={`${baseShimmer} h-8 w-16`} />
          </div>
        );
      case 'text':
        return (
          <div key={index} className="space-y-2.5">
            <div className={`${baseShimmer} h-4 w-full`} />
            <div className={`${baseShimmer} h-4 w-11/12`} />
            <div className={`${baseShimmer} h-4 w-4/5`} />
            <div className={`${baseShimmer} h-4 w-5/6`} />
          </div>
        );
      case 'card':
      default:
        return (
          <div key={index} className="border border-slate-100 rounded-2xl p-6 bg-white shadow-premium space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className={`${baseShimmer} w-12 h-12 rounded-full`} />
                <div className="space-y-2">
                  <div className={`${baseShimmer} h-4 w-28`} />
                  <div className={`${baseShimmer} h-3 w-20`} />
                </div>
              </div>
              <div className={`${baseShimmer} h-6 w-12 rounded-full`} />
            </div>
            <div className="space-y-2 pt-2">
              <div className={`${baseShimmer} h-3.5 w-full`} />
              <div className={`${baseShimmer} h-3.5 w-5/6`} />
            </div>
            <div className="flex space-x-2 pt-2">
              <div className={`${baseShimmer} h-9 flex-1`} />
              <div className={`${baseShimmer} h-9 w-24`} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => renderSkeleton(i))}
    </div>
  );
};

export default LoadingSkeleton;
