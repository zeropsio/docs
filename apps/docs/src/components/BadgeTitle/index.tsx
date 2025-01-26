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
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-50 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
    gray: 'bg-gray-100 text-gray-800',
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
