import React from "react";
import type { LinkProps as NextLinkProps } from "next/link";
export type LinkProps = {
    href?: string;
    children?: React.ReactNode;
    className?: string;
} & Partial<NextLinkProps> & React.AllHTMLAttributes<HTMLAnchorElement>;
export declare const Link: ({ href, children, className, ...rest }: LinkProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map