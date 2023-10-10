import React from "react";
import { HighlightProps } from "prism-react-renderer";
export type CodeBlockProps = {
    source: string;
    lang?: string;
    className?: string;
    collapsed?: boolean;
} & Omit<HighlightProps, "code" | "language" | "children">;
export declare const CodeBlock: ({ source, lang, className, collapsed, ...rest }: CodeBlockProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map