import React, { useState, ReactNode } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded mb-4">
      <button
        className="w-full text-left p-1 border-none bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
        onClick={toggleAccordion}
      >
        <span className="text-lg">{title}</span>
        <span className="text-xl font-bold">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
};

export default Accordion;
