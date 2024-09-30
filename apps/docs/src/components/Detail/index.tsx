import { ChevronDownMini, ChevronUpMini } from '@medusajs/icons';
import React, { ReactNode, useState, useRef, useEffect } from 'react';

interface DetailProps {
  title: string;
  children: ReactNode;
}

export function Detail({ title, children }: DetailProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight); // Set height to the full scroll height when open
    } else {
      setHeight(0); // Reset height when closed
    }
  }, [isOpen]);

  return (
    <div className="py-0.5">
      <div className="card bg-medusa-bg-subtle dark:bg-medusa-bg-base shadow-card-rest dark:shadow-card-rest-dark w-full py-1 px-0.5 rounded-md">
        <button
          className="flex w-full justify-between items-center text-left bg-transparent border-none cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="text-lg font-medium cursor-pointer">{title}</span>
          {isOpen ? (
            <ChevronUpMini className="text-gray-500" />
          ) : (
            <ChevronDownMini className="text-gray-500" />
          )}
        </button>
        <div
          ref={contentRef}
          className={`overflow-hidden transition-all duration-300 ease-in-out`}
          style={{ height }}
          role="region"
        >
          <div className={`px-0.75 py-0.75`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
