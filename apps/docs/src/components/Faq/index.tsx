import { ChevronDownMini, ChevronUpMini } from "@medusajs/icons";
import React, { ReactNode, useState, useRef, useEffect } from "react";

interface FAQ {
  question: string;
  answer: string | ReactNode;
}

export function FAQItem({ children }: Readonly<{ children: ReactNode[] }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, answer] = React.Children.toArray(children);
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(0);

  useEffect(() => {
    if (isOpen && answerRef.current) {
      setHeight(answerRef.current.scrollHeight);
    } else {
      setHeight(0);
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
          <span className="text-lg font-medium cursor-pointer">{question}</span>
          {isOpen ? (
            <ChevronUpMini className="text-gray-500" />
          ) : (
            <ChevronDownMini className="text-gray-500" />
          )}
        </button>
        <div
          ref={answerRef}
          className={`overflow-hidden transition-all duration-300 ease-in-out`}
          style={{ height: height }}
          role="region"
        >
          <div className="px-[0.3rem] py-[0.8rem]">{answer}</div>
        </div>
      </div>
    </div>
  );
}

export function FAQ({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="flex flex-col">{children}</div>;
}
