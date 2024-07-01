import React from "react";
export type CopyButtonProps = {
    text: string;
    buttonClassName?: string;
    tooltipClassName?: string;
    tooltipText?: string;
    onCopy?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.TouchEvent<HTMLSpanElement>) => void;
    handleTouch?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onCopy">;
export declare const CopyButton: ({ text, buttonClassName, tooltipClassName, tooltipText, children, className, onCopy, handleTouch, }: CopyButtonProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map