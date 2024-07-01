"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSidebar = exports.SidebarProvider = exports.reducer = exports.SidebarContext = void 0;
const react_1 = __importStar(require("react"));
const navigation_1 = require("next/navigation");
const utils_1 = require("../../utils");
const hooks_1 = require("../../hooks");
const types_1 = require("types");
exports.SidebarContext = (0, react_1.createContext)(null);
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
const reducer = (state, { type, items, options }) => {
    const { section = types_1.SidebarItemSections.TOP, parent, ignoreExisting = false, indexPosition, } = options || {};
    if (!ignoreExisting) {
        const selectedSection = section === types_1.SidebarItemSections.BOTTOM ? state.bottom : state.top;
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
exports.reducer = reducer;
const SidebarProvider = ({ children, isLoading = false, setIsLoading, initialItems, shouldHandleHashChange = false, shouldHandlePathChange = false, scrollableElement, staticSidebarItems = false, disableActiveTransition = false, noTitleStyling = false, }) => {
    const [items, dispatch] = (0, react_1.useReducer)(exports.reducer, {
        top: (initialItems === null || initialItems === void 0 ? void 0 : initialItems.top) || [],
        bottom: (initialItems === null || initialItems === void 0 ? void 0 : initialItems.bottom) || [],
        mobile: (initialItems === null || initialItems === void 0 ? void 0 : initialItems.mobile) || [],
    });
    const [currentItems, setCurrentItems] = (0, react_1.useState)();
    const [activePath, setActivePath] = (0, react_1.useState)("");
    const [mobileSidebarOpen, setMobileSidebarOpen] = (0, react_1.useState)(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = (0, react_1.useState)(true);
    const sidebarRef = (0, react_1.useRef)(null);
    const pathname = (0, navigation_1.usePathname)();
    const router = (0, navigation_1.useRouter)();
    const isBrowser = (0, hooks_1.useIsBrowser)();
    const getResolvedScrollableElement = (0, react_1.useCallback)(() => {
        return scrollableElement || window;
    }, [scrollableElement]);
    const findItemInSection = (0, react_1.useCallback)(findItem, []);
    const getActiveItem = (0, react_1.useCallback)(() => {
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
    const isItemActive = (0, react_1.useCallback)((item, checkChildren = false) => {
        return (item.path === activePath ||
            (checkChildren && (activePath === null || activePath === void 0 ? void 0 : activePath.split("_")[0]) === item.path));
    }, [activePath]);
    const isSidebarEmpty = (0, react_1.useCallback)(() => {
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
    const getCurrentSidebar = (0, react_1.useCallback)((searchItems) => {
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
    (0, react_1.useEffect)(() => {
        if (shouldHandleHashChange) {
            init();
        }
    }, [shouldHandleHashChange]);
    (0, react_1.useEffect)(() => {
        if (!shouldHandleHashChange) {
            return;
        }
        const resolvedScrollableElement = getResolvedScrollableElement();
        const handleScroll = () => {
            if ((0, utils_1.getScrolledTop)(resolvedScrollableElement) === 0) {
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
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        if (isLoading && items.top.length && items.bottom.length) {
            setIsLoading === null || setIsLoading === void 0 ? void 0 : setIsLoading(false);
        }
    }, [items, isLoading, setIsLoading]);
    (0, react_1.useEffect)(() => {
        if (!shouldHandlePathChange) {
            return;
        }
        if (pathname !== activePath) {
            setActivePath(pathname);
        }
    }, [shouldHandlePathChange, pathname]);
    (0, react_1.useEffect)(() => {
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
    return (react_1.default.createElement(exports.SidebarContext.Provider, { value: {
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
exports.SidebarProvider = SidebarProvider;
const useSidebar = () => {
    const context = (0, react_1.useContext)(exports.SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used inside a SidebarProvider");
    }
    return context;
};
exports.useSidebar = useSidebar;
