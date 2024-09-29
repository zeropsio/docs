import { ChevronDownMini, ChevronUpMini } from "@medusajs/icons"
import React, { ReactNode, useState } from "react"

interface FAQ {
  question: string
  answer: string | ReactNode
}

export function FAQItem({ children }: Readonly<{ children: ReactNode[] }>) {
  const [isOpen, setIsOpen] = useState(false)

  const [question, answer] = React.Children.toArray(children)

  return (
    <div className="border-b border-gray-200 w-full">
      <button
        className="flex w-full justify-between items-center text-left bg-transparent border-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-xl font-medium">{question}</span>
        {isOpen ? (
          <ChevronUpMini className="text-gray-500" />
        ) : (
          <ChevronDownMini className="text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-[0.3rem] py-[0.8rem] text-gray-600" role="region">
          {answer}
        </div>
      )}
      <hr className="h-[1px] bg-gray-500 opacity-20" />
    </div>
  )
}

export function FAQ({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="flex flex-col">{children}</div>
}
