import React from "react";
export type DetailsSummaryProps = {
    title: React.ReactNode;
    subtitle?: string;
    badge?: React.ReactNode;
    expandable?: boolean;
    open?: boolean;
    className?: string;
    titleClassName?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "title">;
export declare const DetailsSummary: ({ title, subtitle, children, badge, expandable, open, className, titleClassName, ...rest }: DetailsSummaryProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map