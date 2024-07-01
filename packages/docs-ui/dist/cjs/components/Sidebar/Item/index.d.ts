import React from "react";
import { SidebarItemType } from "types";
export type SidebarItemProps = {
    item: SidebarItemType;
    nested?: boolean;
    expandItems?: boolean;
    currentLevel?: number;
    isSidebarTitle?: boolean;
} & React.AllHTMLAttributes<HTMLLIElement>;
export declare const SidebarItem: ({ item, nested, expandItems, className, currentLevel, }: SidebarItemProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map