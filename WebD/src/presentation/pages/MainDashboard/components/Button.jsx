import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';

const sizeClassMap = {
  sm: 'text-sm px-3 py-2',
  md: 'text-base px-4 py-3',
  lg: 'text-lg px-5 py-3.5',
};

const widthClassMap = {
  full: 'w-full',
  auto: 'w-auto',
};

const Button = ({
  icon,
  bgColor = '#3B82F6',
  color = '#ffffff',
  // bgHoverColor is not used for Tailwind safety; apply generic hover effect
  size = 'md',
  text,
  borderRadius = '10px',
  width = 'auto',
}) => {
  const { setIsClicked, initialState } = useStateContext();

  const sizeClasses = sizeClassMap[size] || sizeClassMap.md;
  const widthClasses = widthClassMap[width] || widthClassMap.auto;

  return (
    <button
      type='button'
      onClick={() => setIsClicked(initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`${sizeClasses} ${widthClasses} rounded-lg hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-400 hover:drop-shadow-xl`}
    >
      {icon ? <span className='mr-2 inline-flex'>{icon}</span> : null}
      {text}
    </button>
  );
};

export default Button;
