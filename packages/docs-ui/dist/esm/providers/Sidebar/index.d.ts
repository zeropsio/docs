import React, { ReactNode } from "react";
export declare enum SidebarItemSections {
    TOP = "top",
    BOTTOM = "bottom",
    MOBILE = "mobile"
}
export type SidebarItemType = {
    path?: string;
    title: string;
    additionalElms?: React.ReactNode;
    children?: SidebarItemType[];
    loaded?: boolean;
    isPathHref?: boolean;
    linkProps?: React.AllHTMLAttributes<HTMLAnchorElement>;
};
export type SidebarSectionItemsType = {
    [k in SidebarItemSections]: SidebarItemType[];
};
export type SidebarContextType = {
    items: SidebarSectionItemsType;
    activePath: string | null;
    getActiveItem: () => SidebarItemType | undefined;
    setActivePath: (path: string | null) => void;
    isItemActive: (item: SidebarItemType, checkChildren?: boolean) => boolean;
    addItems: (item: SidebarItemType[], options?: {
        section?: SidebarItemSections;
        parent?: {
            path: string;
            changeLoaded?: boolean;
        };
        indexPosition?: number;
        ignoreExisting?: boolean;
    }) => void;
    findItemInSection: (section: SidebarItemType[], item: Partial<SidebarItemType>, checkChildren?: boolean) => SidebarItemType | undefined;
    mobileSidebarOpen: boolean;
    setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSidebarEmpty: () => boolean;
    desktopSidebarOpen: boolean;
    setDesktopSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare const SidebarContext: React.Context<SidebarContextType | null>;
export type ActionOptionsType = {
    section?: SidebarItemSections;
    parent?: {
        path: string;
        changeLoaded?: boolean;
    };
    indexPosition?: number;
    ignoreExisting?: boolean;
};
export type ActionType = {
    type: "add" | "update";
    items: SidebarItemType[];
    options?: ActionOptionsType;
};
export declare const reducer: (state: SidebarSectionItemsType, { type, items, options }: ActionType) => SidebarSectionItemsType;
export type SidebarProviderProps = {
    children?: ReactNode;
    isLoading?: boolean;
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    initialItems?: SidebarSectionItemsType;
    shouldHandleHashChange?: boolean;
    shouldHandlePathChange?: boolean;
};
export declare const SidebarProvider: ({ children, isLoading, setIsLoading, initialItems, shouldHandleHashChange, shouldHandlePathChange, }: SidebarProviderProps) => React.JSX.Element;
export declare const useSidebar: () => SidebarContextType;
//# sourceMappingURL=index.d.ts.map