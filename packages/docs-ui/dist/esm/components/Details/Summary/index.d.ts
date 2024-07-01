import React from "react";
export type DetailsSummaryProps = {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    badge?: React.ReactNode;
    expandable?: boolean;
    open?: boolean;
    className?: string;
    titleClassName?: string;
    hideExpandableIcon?: boolean;
    summaryRef?: React.LegacyRef<HTMLDivElement>;
} & Omit<React.HTMLAttributes<HTMLElement>, "title">;
export declare const DetailsSummary: ({ title, subtitle, children, badge, expandable, open, className, titleClassName, hideExpandableIcon, summaryRef, ...rest }: DetailsSummaryProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map