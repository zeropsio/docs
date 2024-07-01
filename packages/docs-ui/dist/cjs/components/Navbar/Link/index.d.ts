import React from "react";
import { LinkProps } from "../../../components";
export type NavbarLinkProps = {
    href: string;
    label: string;
    className?: string;
    activeValuePattern?: RegExp;
    isActive?: boolean;
} & LinkProps;
export declare const NavbarLink: ({ href, label, className, isActive, }: NavbarLinkProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map