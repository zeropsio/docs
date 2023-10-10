"use client";
import React, { createContext, useCallback, useContext, useEffect, useReducer, useState, } from "react";
import { usePathname } from "next/navigation";
export var SidebarItemSections;
(function (SidebarItemSections) {
    SidebarItemSections["TOP"] = "top";
    SidebarItemSections["BOTTOM"] = "bottom";
    SidebarItemSections["MOBILE"] = "mobile";
})(SidebarItemSections || (SidebarItemSections = {}));
export const SidebarContext = createContext(null);
export const reducer = (state, { type, items, options }) => {
    const { section = SidebarItemSections.TOP, parent, indexPosition, } = options || {};
    switch (type) {
        case "add":
            return Object.assign(Object.assign({}, state), { [section]: indexPosition !== undefined
                    ? [
                        ...state[section].slice(0, indexPosition),
                        ...items,
                        ...state[section].slice(indexPosition),
                    ]
                    : [...state[section], ...items] });
        case "update":
            // find item index
            return Object.assign(Object.assign({}, state), { [section]: state[section].map((i) => {
                    if (i.path && (parent === null || parent === void 0 ? void 0 : parent.path) && i.path === (parent === null || parent === void 0 ? void 0 : parent.path)) {
                        return Object.assign(Object.assign({}, i), { children: [...(i.children || []), ...items], loaded: parent.changeLoaded ? true : i.loaded });
                    }
                    return i;
                }) });
        default:
            return state;
    }
};
export const SidebarProvider = ({ children, isLoading = false, setIsLoading, initialItems, shouldHandleHashChange = false, shouldHandlePathChange = false, }) => {
    const [items, dispatch] = useReducer(reducer, {
        top: (initialItems === null || initialItems === void 0 ? void 0 : initialItems.top) || [],
        bottom: (initialItems === null || initialItems === void 0 ? void 0 : initialItems.bottom) || [],
        mobile: (initialItems === null || initialItems === void 0 ? void 0 : initialItems.mobile) || [],
    });
    const [activePath, setActivePath] = useState("");
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
    const pathname = usePathname();
    const findItemInSection = useCallback((section, item, checkChildren = true) => {
        return section.find((i) => {
            if (!item.path) {
                return !i.path && i.title === item.title;
            }
            else {
                return (i.path === item.path ||
                    (checkChildren && i.children && findItemInSection(i.children, item)));
            }
        });
    }, []);
    const getActiveItem = useCallback(() => {
        if (activePath === null) {
            return undefined;
        }
        return (findItemInSection(items.mobile, { path: activePath }) ||
            findItemInSection(items.top, { path: activePath }) ||
            findItemInSection(items.bottom, { path: activePath }));
    }, [activePath, items, findItemInSection]);
    const addItems = (newItems, options) => {
        const { section = SidebarItemSections.TOP, parent, ignoreExisting = false, } = options || {};
        if (!ignoreExisting) {
            const selectedSection = section === SidebarItemSections.BOTTOM ? items.bottom : items.top;
            newItems = newItems.filter((item) => !findItemInSection(selectedSection, item));
        }
        if (!newItems.length) {
            return;
        }
        dispatch({
            type: parent ? "update" : "add",
            items: newItems,
            options,
        });
    };
    const isItemActive = useCallback((item, checkChildren = false) => {
        return (item.path === activePath ||
            (checkChildren && (activePath === null || activePath === void 0 ? void 0 : activePath.split("_")[0]) === item.path));
    }, [activePath]);
    const isSidebarEmpty = useCallback(() => {
        return Object.values(items).every((sectionItems) => sectionItems.length === 0);
    }, [items]);
    const init = () => {
        const currentPath = location.hash.replace("#", "");
        if (currentPath) {
            setActivePath(currentPath);
        }
    };
    // this is mainly triggered by Algolia
    const handleHashChange = useCallback(() => {
        const currentPath = location.hash.replace("#", "");
        if (currentPath !== activePath) {
            setActivePath(currentPath);
        }
    }, [activePath]);
    useEffect(() => {
        if (!shouldHandleHashChange) {
            return;
        }
        init();
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setActivePath("");
                // can't use next router as it doesn't support
                // changing url without scrolling
                history.replaceState({}, "", location.pathname);
            }
        };
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("hashchange", handleHashChange);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, [handleHashChange, shouldHandleHashChange]);
    useEffect(() => {
        if (isLoading && items.top.length && items.bottom.length) {
            setIsLoading === null || setIsLoading === void 0 ? void 0 : setIsLoading(false);
        }
    }, [items, isLoading, setIsLoading]);
    useEffect(() => {
        if (shouldHandlePathChange && pathname !== activePath) {
            setActivePath(pathname);
        }
    }, [shouldHandlePathChange, pathname]);
    return (React.createElement(SidebarContext.Provider, { value: {
            items,
            addItems,
            activePath,
            setActivePath,
            isItemActive,
            findItemInSection,
            mobileSidebarOpen,
            setMobileSidebarOpen,
            isSidebarEmpty,
            getActiveItem,
            desktopSidebarOpen,
            setDesktopSidebarOpen,
        } }, children));
};
export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used inside a SidebarProvider");
    }
    return context;
};
