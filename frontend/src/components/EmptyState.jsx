import React from 'react';
import { HelpCircle } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  title = 'No records found',
  description = 'There is nothing to display here yet.',
  icon: Icon = HelpCircle,
  actionLabel,
  onActionClick,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 ${className}`}>
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 text-slate-500 mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-5">{description}</p>
      {actionLabel && onActionClick && (
        <Button variant="secondary" size="sm" onClick={onActionClick}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
