import React from "react";
import type { ITooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
export type TooltipProps = {
    text?: string;
    tooltipClassName?: string;
    html?: string;
    tooltipChildren?: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement> & ITooltip;
export declare const Tooltip: ({ text, tooltipClassName, children, html, tooltipChildren, className, ...tooltipProps }: TooltipProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map