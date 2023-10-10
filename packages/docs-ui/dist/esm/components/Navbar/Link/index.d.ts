import React from "react";
import { NextLinkProps } from "../../../components";
export type NavbarLinkProps = {
    href: string;
    label: string;
    className?: string;
    activeValuePattern?: RegExp;
} & NextLinkProps;
export declare const NavbarLink: ({ href, label, className, activeValuePattern, }: NavbarLinkProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map