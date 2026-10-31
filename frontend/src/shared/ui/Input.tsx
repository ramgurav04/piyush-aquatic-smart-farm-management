import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, className = '', ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full text-left">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-[#263238]">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full rounded-lg border bg-white px-3.5 py-2 text-sm text-[#263238] placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#087F8C] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error ? 'border-[#A12E38] focus:ring-[#A12E38]' : 'border-[#D9E8E5]'
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-[#A12E38]">{error}</span>}
        {helperText && !error && <span className="text-xs text-gray-500">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
