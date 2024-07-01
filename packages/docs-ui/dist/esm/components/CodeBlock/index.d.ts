import React from "react";
import { HighlightProps } from "prism-react-renderer";
import { CodeBlockHeaderMeta } from "./Header";
import { ApiAuthType, ApiDataOptions, ApiMethod } from "types";
export type Highlight = {
    line: number;
    text?: string;
    tooltipText?: string;
};
export type CodeBlockMetaFields = {
    title?: string;
    npm2yarn?: boolean;
    highlights?: string[][];
    apiTesting?: boolean;
    testApiMethod?: ApiMethod;
    testApiUrl?: string;
    testAuthType?: ApiAuthType;
    testPathParams?: ApiDataOptions;
    testQueryParams?: ApiDataOptions;
    testBodyParams?: ApiDataOptions;
    noCopy?: boolean;
    noReport?: boolean;
    noLineNumbers?: boolean;
} & CodeBlockHeaderMeta;
export type CodeBlockStyle = "loud" | "subtle";
export type CodeBlockProps = {
    source: string;
    lang?: string;
    className?: string;
    collapsed?: boolean;
    blockStyle?: CodeBlockStyle;
    children?: React.ReactNode;
} & CodeBlockMetaFields & Omit<HighlightProps, "code" | "language" | "children">;
export declare const CodeBlock: ({ source, lang, className, collapsed, title, highlights, apiTesting, blockStyle, noCopy, noReport, noLineNumbers, children, ...rest }: CodeBlockProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map