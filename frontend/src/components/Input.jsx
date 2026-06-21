import React from 'react';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  icon: Icon,
  required = false,
  multiline = false,
  rows = 4,
  className = '',
  ...props
}) => {
  const inputClass = `w-full px-4 py-2.5 rounded-xl border ${
    error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
      : 'border-slate-200 focus:border-primary focus:ring-primary/20'
  } bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-4 transition-all duration-200`;

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon size={18} />
          </div>
        )}
        
        {multiline ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            required={required}
            className={`${inputClass} ${Icon ? 'pl-11' : ''} resize-none`}
            {...props}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`${inputClass} ${Icon ? 'pl-11' : ''}`}
            {...props}
          />
        )}
      </div>
      
      {error ? (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-400 leading-relaxed">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
