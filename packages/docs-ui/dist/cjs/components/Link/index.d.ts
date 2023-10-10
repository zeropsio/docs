import React from "react";
export type LinkProps = {
    href?: string;
    children?: React.ReactNode;
    className?: string;
} & React.AllHTMLAttributes<HTMLAnchorElement>;
export declare const Link: ({ href, children, className, ...rest }: LinkProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map