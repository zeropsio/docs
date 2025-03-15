import { ChevronDownMini, ChevronUpMini } from '@medusajs/icons';
import React, { ReactNode, useState, useRef, useEffect } from 'react';

interface FAQItemProps {
  question: string;
  children: ReactNode;
}

export function FAQItem({ question, children }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (isOpen && answerRef.current) {
        setHeight(answerRef.current.scrollHeight);
      } else {
        setHeight(0);
      }
    };

    updateHeight();
    // Add a small delay to handle image loading
    const timer = setTimeout(updateHeight, 100);

    // Handle dynamic content changes
    const resizeObserver = new ResizeObserver(updateHeight);
    if (answerRef.current) {
      resizeObserver.observe(answerRef.current);
    }

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [isOpen]);

  return (
    <div className="py-0.5">
      <div className="card bg-[#F2F5F7] dark:bg-medusa-bg-base shadow-card-rest dark:shadow-card-rest-dark w-full py-1 px-0.5 rounded-md">
        <button
          className="flex w-full justify-between items-center text-left bg-transparent border-none cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="text-lg font-medium cursor-pointer">{question}</span>
          {isOpen ? (
            <ChevronUpMini className="text-gray-500" />
          ) : (
            <ChevronDownMini className="text-gray-500" />
          )}
        </button>
        <div
          ref={answerRef}
          className={`transition-all duration-300 ease-in-out ${isOpen ? 'overflow-visible' : 'overflow-hidden'}`}
          style={{ height: height }}
          role="region"
        >
          <div className="px-0.75 mt-1 mb-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function FAQ({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}
