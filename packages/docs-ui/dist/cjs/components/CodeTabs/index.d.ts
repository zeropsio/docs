import React from "react";
import { CodeBlockProps } from "../../components";
import { BaseTabType } from "../../hooks";
export type TabType = {
    code?: CodeBlockProps;
    codeBlock?: React.ReactNode;
} & BaseTabType;
export type CodeTabsProps = {
    tabs: TabType[];
    className?: string;
    group?: string;
};
export declare const CodeTabs: ({ tabs, className, group, }: CodeTabsProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map