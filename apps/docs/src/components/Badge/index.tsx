// Badge.tsx
import React from 'react';

interface BadgeProps {
  type?: 'optional' | 'required' | 'required-some' | 'custom';
  text?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  type = 'optional',
  text,
  className = '',
}) => {
  const baseClasses = 'relative top-[-2px] ml-0.25 px-[8px] py-[4px] text-xs font-medium rounded-sm';

  const typeClasses = {
    optional: 'bg-blue-50 text-[#1e2d57] dark:bg-[#1e2d57] dark:text-[var(--ifm-menu-color)]',
    required: 'bg-red-50 text-[#651818] dark:bg-[#651818] dark:text-[var(--ifm-menu-color)]',
    'required-some': 'bg-amber-50 text-[#714E02] dark:bg-[#CC8B0040] dark:text-[var(--ifm-menu-color)]',
    custom: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-[var(--ifm-menu-color)]'
  };

  return (
    <span
      className={`${baseClasses} ${typeClasses[type]} ${className}`}
      aria-hidden="true"
    >
      {type === 'optional' && 'Optional'}
      {type === 'required' && 'Required'}
      {type === 'required-some' && 'Required for some runtimes'}
      {type === 'custom' && text}
    </span>
  );
};

export default Badge;