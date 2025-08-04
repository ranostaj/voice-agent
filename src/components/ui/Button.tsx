import React from 'react';

export type ButtonVariant = 'primary' | 'primaryOutline' | 'secondary' | 'success' | 'successOutline' | 'warning' | 'danger' | 'transparent';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isRound?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isRound = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'flex cursor-pointer items-center justify-center font-medium transition-colors focus:outline-none focus:ring focus:ring-offset-1';

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white hover:bg-blue-700 focus:ring-blue-500',
    primaryOutline: 'border-2 border-primary text-primary hover:bg-primary-50 focus:ring-primary-500',
    secondary: 'bg-primary-60 text-primary hover:bg-primary-40 focus:bg-primary-40',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    successOutline: 'border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    transparent: 'bg-transparent text-gray-800 hover:bg-gray-50/20  focus:ring-gray-100',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: isRound ? 'w-8 h-8' : 'px-3 py-1.5 text-sm',
    md: isRound ? 'w-12 h-12' : 'px-4 py-2',
    lg: isRound ? 'w-16 h-16' : 'px-6 py-3 text-lg',
  };

  const shapeClasses = isRound ? 'rounded-full' : 'rounded-md';

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    shapeClasses,
    className
  ].join(' ');

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
