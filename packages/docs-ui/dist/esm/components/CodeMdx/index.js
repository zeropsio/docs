import React from "react";
import { CodeBlock, InlineCode } from "../../components";
// due to how mdx handles code blocks
// it is required that a code block specify a language
// to be considered a block. Otherwise, it will be
// considered as inline code
export const CodeMdx = ({ className, children }) => {
    if (!children) {
        return React.createElement(React.Fragment, null);
    }
    const match = /language-(\w+)/.exec(className || "");
    if (match) {
        return (React.createElement(CodeBlock, { source: Array.isArray(children)
                ? children[0]
                : children, lang: match[1] }));
    }
    return React.createElement(InlineCode, null, children);
};
