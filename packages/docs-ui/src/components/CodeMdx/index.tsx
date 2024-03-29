import React from "react"
import { CodeBlock, InlineCode } from "@/components"

export type CodeMdxProps = {
  className?: string
  children?: React.ReactNode
}

// due to how mdx handles code blocks
// it is required that a code block specify a language
// to be considered a block. Otherwise, it will be
// considered as inline code
export const CodeMdx = ({ className, children }: CodeMdxProps) => {
  if (!children) {
    return <></>
  }

  const match = /language-(\w+)/.exec(className || "")

  if (match) {
    return (
      <CodeBlock
        source={
          Array.isArray(children)
            ? (children[0] as string)
            : (children as string)
        }
        lang={match[1]}
      />
    )
  }

  return <InlineCode>{children}</InlineCode>
}
