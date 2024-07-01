"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { createContext, useCallback, useContext, useEffect, useReducer, useRef, useState, } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getScrolledTop } from "../../utils";
import { useIsBrowser } from "../../hooks";
import { SidebarItemSections, } from "types";
export const SidebarContext = createContext(null);
const findItem = (section, item, checkChildren = true) => {
    let foundItem;
    section.some((i) => {
        if ((!item.path && !i.path && i.title === item.title) ||
            i.path === item.path) {
            foundItem = i;
        }
        else if (checkChildren && i.children) {
            foundItem = findItem(i.children, item);
        }
        return foundItem !== undefined;
    });
    return foundItem;
};
export const reducer = (state, { type, items, options }) => {
    const { section = SidebarItemSections.TOP, parent, ignoreExisting = false, indexPosition, } = options || {};
    if (!ignoreExisting) {
        const selectedSection = section === SidebarItemSections.BOTTOM ? state.bottom : state.top;
        items = items.filter((item) => !findItem(selectedSection, item));
    }
    if (!items.length) {
        return state;
    }
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
export const SidebarProvider = ({ children, isLoading = false, setIsLoading, initialItems, shouldHandleHashChange = false, shouldHandlePathChange = false, scrollableElement, staticSidebarItems = false, disableActiveTransition = false, noTitleStyling = false, }) => {
    const [items, dispatch] = useReducer(reducer, {
        top: (initialItems === null || initialItems === void 0 ? void 0 : initialItems.top) || [],
        bottom: (initialItems === null || initialItems === void 0 ? void 0 : initialItems.bottom) || [],
        mobile: (initialItems === null || initialItems === void 0 ? void 0 : initialItems.mobile) || [],
    });
    const [currentItems, setCurrentItems] = useState();
    const [activePath, setActivePath] = useState("");
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
    const sidebarRef = useRef(null);
    const pathname = usePathname();
    const router = useRouter();
    const isBrowser = useIsBrowser();
    const getResolvedScrollableElement = useCallback(() => {
        return scrollableElement || window;
    }, [scrollableElement]);
    const findItemInSection = useCallback(findItem, []);
    const getActiveItem = useCallback(() => {
        if (activePath === null) {
            return undefined;
        }
        return (findItemInSection(items.mobile, { path: activePath }) ||
            findItemInSection(items.top, { path: activePath }) ||
            findItemInSection(items.bottom, { path: activePath }));
    }, [activePath, items, findItemInSection]);
    const addItems = (newItems, options) => {
        dispatch({
            type: (options === null || options === void 0 ? void 0 : options.parent) ? "update" : "add",
            items: newItems,
            options,
        });
    };
    const isItemActive = useCallback((item, checkChildren = false) => {
        return (item.path === activePath ||
            (checkChildren && (activePath === null || activePath === void 0 ? void 0 : activePath.split("_")[0]) === item.path));
    }, [activePath]);
    const isSidebarEmpty = useCallback(() => {
        return Object.values(items).every((sectionItems) => {
            if (!Array.isArray(sectionItems)) {
                return true;
            }
            return sectionItems.length === 0;
        });
    }, [items]);
    const init = () => {
        const currentPath = location.hash.replace("#", "");
        if (currentPath) {
            setActivePath(currentPath);
        }
    };
    const getCurrentSidebar = useCallback((searchItems) => {
        let currentSidebar;
        searchItems.some((item) => {
            var _a, _b;
            if (item.isChildSidebar) {
                if (isItemActive(item)) {
                    currentSidebar = item;
                }
                else if ((_a = item.children) === null || _a === void 0 ? void 0 : _a.length) {
                    const childSidebar = getCurrentSidebar(item.children) ||
                        findItem(item.children, { path: activePath || undefined });
                    if (childSidebar) {
                        currentSidebar = childSidebar.isChildSidebar ? childSidebar : item;
                    }
                }
            }
            else if ((_b = item.children) === null || _b === void 0 ? void 0 : _b.length) {
                currentSidebar = getCurrentSidebar(item.children);
            }
            return currentSidebar !== undefined;
        });
        return currentSidebar;
    }, [isItemActive, activePath]);
    const goBack = () => {
        if (!currentItems) {
            return;
        }
        const previousSidebar = currentItems.previousSidebar || items;
        const backItem = previousSidebar.top.find((item) => item.path && !item.isChildSidebar) ||
            previousSidebar.bottom.find((item) => item.path && !item.isChildSidebar);
        if (!backItem) {
            return;
        }
        setActivePath(backItem.path);
        setCurrentItems(currentItems.previousSidebar);
        router.replace(backItem.path);
    };
    useEffect(() => {
        if (shouldHandleHashChange) {
            init();
        }
    }, [shouldHandleHashChange]);
    useEffect(() => {
        if (!shouldHandleHashChange) {
            return;
        }
        const resolvedScrollableElement = getResolvedScrollableElement();
        const handleScroll = () => {
            if (getScrolledTop(resolvedScrollableElement) === 0) {
                setActivePath("");
                // can't use next router as it doesn't support
                // changing url without scrolling
                history.replaceState({}, "", location.pathname);
            }
        };
        resolvedScrollableElement.addEventListener("scroll", handleScroll);
        return () => {
            resolvedScrollableElement.removeEventListener("scroll", handleScroll);
        };
    }, [shouldHandleHashChange, getResolvedScrollableElement]);
    useEffect(() => {
        if (!shouldHandleHashChange || !isBrowser) {
            return;
        }
        // this is mainly triggered by Algolia
        const handleHashChange = () => {
            const currentPath = location.hash.replace("#", "");
            if (currentPath !== activePath) {
                setActivePath(currentPath);
            }
        };
        window.addEventListener("hashchange", handleHashChange);
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, [shouldHandleHashChange, isBrowser]);
    useEffect(() => {
        if (isLoading && items.top.length && items.bottom.length) {
            setIsLoading === null || setIsLoading === void 0 ? void 0 : setIsLoading(false);
        }
    }, [items, isLoading, setIsLoading]);
    useEffect(() => {
        if (!shouldHandlePathChange) {
            return;
        }
        if (pathname !== activePath) {
            setActivePath(pathname);
        }
    }, [shouldHandlePathChange, pathname]);
    useEffect(() => {
        var _a;
        if (!(activePath === null || activePath === void 0 ? void 0 : activePath.length)) {
            setCurrentItems(undefined);
            return;
        }
        const currentSidebar = getCurrentSidebar(items.top) || getCurrentSidebar(items.bottom);
        if (!currentSidebar) {
            setCurrentItems(undefined);
            return;
        }
        if (currentSidebar.isChildSidebar &&
            currentSidebar.children &&
            ((_a = currentItems === null || currentItems === void 0 ? void 0 : currentItems.parentItem) === null || _a === void 0 ? void 0 : _a.path) !== currentSidebar.path) {
            const { children } = currentSidebar, parentItem = __rest(currentSidebar, ["children"]);
            setCurrentItems({
                top: children,
                bottom: [],
                mobile: items.mobile,
                parentItem: parentItem,
                previousSidebar: currentItems,
            });
        }
    }, [getCurrentSidebar, activePath]);
    return (React.createElement(SidebarContext.Provider, { value: {
            items,
            currentItems,
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
            staticSidebarItems,
            disableActiveTransition,
            noTitleStyling,
            shouldHandleHashChange,
            sidebarRef,
            goBack,
        } }, children));
};
export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used inside a SidebarProvider");
    }
    return context;
};
