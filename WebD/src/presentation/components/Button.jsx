import React from 'react';

const Button = ({ label, variant = 'primary', size = 'md', className = '', onClick, leftIcon, rightIcon, type = 'button' }) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  }[size] || 'px-4 py-3 text-base';

  const variantClass =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'ghost'
      ? 'btn-ghost'
      : 'btn-secondary';

  return (
    <button type={type} className={`${variantClass} ${sizeClasses} font-poppins font-medium rounded-xl ${className}`} onClick={onClick}>
      {leftIcon ? <span className='mr-2 inline-flex'>{leftIcon}</span> : null}
      <span>{label}</span>
      {rightIcon ? <span className='ml-2 inline-flex'>{rightIcon}</span> : null}
    </button>
  );
};

export default Button;
