import React, { ReactNode } from "react";
import { SidebarItemSections, SidebarItemType, SidebarSectionItemsType } from "types";
export type CurrentItemsState = SidebarSectionItemsType & {
    previousSidebar?: CurrentItemsState;
};
export type SidebarStyleOptions = {
    disableActiveTransition?: boolean;
    noTitleStyling?: boolean;
};
export type SidebarContextType = {
    items: SidebarSectionItemsType;
    currentItems: CurrentItemsState | undefined;
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
    staticSidebarItems?: boolean;
    shouldHandleHashChange: boolean;
    sidebarRef: React.RefObject<HTMLUListElement>;
    goBack: () => void;
} & SidebarStyleOptions;
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
    scrollableElement?: Element | Window;
    staticSidebarItems?: boolean;
} & SidebarStyleOptions;
export declare const SidebarProvider: ({ children, isLoading, setIsLoading, initialItems, shouldHandleHashChange, shouldHandlePathChange, scrollableElement, staticSidebarItems, disableActiveTransition, noTitleStyling, }: SidebarProviderProps) => React.JSX.Element;
export declare const useSidebar: () => SidebarContextType;
//# sourceMappingURL=index.d.ts.map