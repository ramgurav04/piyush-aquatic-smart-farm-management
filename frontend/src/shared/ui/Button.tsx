import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[32px]',
    md: 'px-4 py-2 text-sm gap-2 min-h-[40px]',
    lg: 'px-5 py-2.5 text-base gap-2.5 min-h-[48px]',
  };

  const variantStyles = {
    primary: 'bg-[#087F8C] hover:bg-[#06696E] text-white focus:ring-[#087F8C]',
    secondary: 'bg-[#153D42] hover:bg-[#0E2C30] text-white focus:ring-[#153D42]',
    outline: 'border border-[#D9E8E5] bg-white text-[#263238] hover:bg-[#F2F6F5] focus:ring-[#087F8C]',
    danger: 'bg-[#A12E38] hover:bg-[#85252E] text-white focus:ring-[#A12E38]',
    ghost: 'bg-transparent text-[#263238] hover:bg-[#F2F6F5] focus:ring-[#087F8C]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
      )}
      {children}
    </button>
  );
};
