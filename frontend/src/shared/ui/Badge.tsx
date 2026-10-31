import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-[#E6F7F6] text-[#087F8C] border-[#B6D6D5]',
    success: 'bg-[#EBF7F2] text-[#247A59] border-[#BCE3D3]',
    warning: 'bg-[#FEF8E7] text-[#946400] border-[#FCE1A8]',
    danger: 'bg-[#FDF0F1] text-[#A12E38] border-[#F6C6CB]',
    neutral: 'bg-[#F2F6F5] text-[#526977] border-[#D9E8E5]',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
