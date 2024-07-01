import React from "react";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
export type MarkdownContentProps = ReactMarkdownOptions & {
    components?: Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>;
};
export declare const MarkdownContent: ({ children, components, ...props }: MarkdownContentProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map