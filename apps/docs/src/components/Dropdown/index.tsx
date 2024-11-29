import { ChevronDownMini, ChevronUpMini } from '@medusajs/icons';
import React, { ReactNode, useState, useRef, useEffect } from 'react';

interface DropdownItemProps {
    question: string;
    children: ReactNode;
}

export function DropdownItem({ question, children }: DropdownItemProps) {
    const [isOpen, setIsOpen] = useState(false);
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
            <div className="card bg-[#F2F5F7] dark:bg-medusa-bg-base shadow-card-rest dark:shadow-card-rest-dark w-full p-[5px] rounded-md">
                <button
                    className="flex w-full p-[10px] justify-between items-center text-left bg-transparent border-none cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                >
                    <span className="text-[13px] ml-0.5 font-medium cursor-pointer">{question}</span>
                    {isOpen ? (
                        <ChevronUpMini className="text-gray-400" />
                    ) : (
                        <ChevronDownMini className="text-gray-500" />
                    )}
                </button>
                <div
                    ref={answerRef}
                    className={`overflow-hidden transition-all duration-500 ease-in-out`}
                    style={{ height: height }}
                    role="region"
                >
                    <p className="px-0.75 mt-1 -mb-1">{children}</p>
                </div>
            </div>
        </div>
    );
}

export function Dropdown({ children }: { children: ReactNode }) {
    return <div className="flex flex-col">{children}</div>;
}
