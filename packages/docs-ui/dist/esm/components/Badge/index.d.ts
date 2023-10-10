import React from "react";
export type BadgeVariant = "purple" | "orange" | "green" | "blue" | "red" | "neutral";
export type BadgeProps = {
    className?: string;
    variant: BadgeVariant;
} & React.HTMLAttributes<HTMLSpanElement>;
export declare const Badge: ({ className, variant, children }: BadgeProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map