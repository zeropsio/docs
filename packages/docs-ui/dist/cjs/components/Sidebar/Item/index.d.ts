import React from "react";
import type { SidebarItemType } from "../../../providers";
export type SidebarItemProps = {
    item: SidebarItemType;
    nested?: boolean;
    expandItems?: boolean;
} & React.AllHTMLAttributes<HTMLLIElement>;
export declare const SidebarItem: ({ item, nested, expandItems, className, }: SidebarItemProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map