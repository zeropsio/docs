import React from 'react';

interface CustomCardProps {
  emoji: string;
  title: string;
  children: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, children, emoji }) => {
  return (
    <div className="bg-medusa-tag-neutral-bg border-medusa-tag-neutral-border flex flex-row py-1.5 px-1 my-2  border border-solid rounded shadow-none">
      <span className="mr-1">{emoji}</span>
      <span>
        <span className="font-semibold text-md">{title}</span>
        <div className="pb-0 pt-0.5">{children}</div>
      </span>
    </div>
  );
};

export default CustomCard;
