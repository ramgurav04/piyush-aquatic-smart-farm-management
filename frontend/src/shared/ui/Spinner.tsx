import React from 'react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '', label = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-label={label}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-[#087F8C] border-t-transparent`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};
