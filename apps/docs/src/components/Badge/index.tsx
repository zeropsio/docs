import React from 'react';

interface BadgeProps {
  text: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  color = 'blue',
  className = '',
}) => {
  const colorClasses = {
    blue: 'bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-50',
    green: 'bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-50',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-50',
    red: 'bg-red-200 text-red-900 dark:bg-red-800 dark:text-red-50',
    purple: 'bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-purple-50',
    gray: 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-50',
  };

  return (
    <>
    <span
      className={`relative top-[-2px] ml-0.25  px-[8px] py-[4px] text-xs font-medium rounded-sm ${colorClasses[color]} ${className}`}
      aria-hidden="true"
    >
      {text}
    </span>
    </>
  );
};

export default Badge;
