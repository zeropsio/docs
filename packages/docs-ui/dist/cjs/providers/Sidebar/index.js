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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSidebar = exports.SidebarProvider = exports.reducer = exports.SidebarContext = exports.SidebarItemSections = void 0;
const react_1 = __importStar(require("react"));
const navigation_1 = require("next/navigation");
var SidebarItemSections;
(function (SidebarItemSections) {
    SidebarItemSections["TOP"] = "top";
    SidebarItemSections["BOTTOM"] = "bottom";
    SidebarItemSections["MOBILE"] = "mobile";
})(SidebarItemSections || (exports.SidebarItemSections = SidebarItemSections = {}));
exports.SidebarContext = (0, react_1.createContext)(null);
const reducer = (state, { type, items, options }) => {
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
exports.reducer = reducer;
const SidebarProvider = ({ children, isLoading = false, setIsLoading, initialItems, shouldHandleHashChange = false, shouldHandlePathChange = false, }) => {
    const [items, dispatch] = (0, react_1.useReducer)(exports.reducer, {
        top: (initialItems === null || initialItems === void 0 ? void 0 : initialItems.top) || [],
        bottom: (initialItems === null || initialItems === void 0 ? void 0 : initialItems.bottom) || [],
        mobile: (initialItems === null || initialItems === void 0 ? void 0 : initialItems.mobile) || [],
    });
    const [activePath, setActivePath] = (0, react_1.useState)("");
    const [mobileSidebarOpen, setMobileSidebarOpen] = (0, react_1.useState)(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = (0, react_1.useState)(true);
    const pathname = (0, navigation_1.usePathname)();
    const findItemInSection = (0, react_1.useCallback)((section, item, checkChildren = true) => {
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
    const getActiveItem = (0, react_1.useCallback)(() => {
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
    const isItemActive = (0, react_1.useCallback)((item, checkChildren = false) => {
        return (item.path === activePath ||
            (checkChildren && (activePath === null || activePath === void 0 ? void 0 : activePath.split("_")[0]) === item.path));
    }, [activePath]);
    const isSidebarEmpty = (0, react_1.useCallback)(() => {
        return Object.values(items).every((sectionItems) => sectionItems.length === 0);
    }, [items]);
    const init = () => {
        const currentPath = location.hash.replace("#", "");
        if (currentPath) {
            setActivePath(currentPath);
        }
    };
    // this is mainly triggered by Algolia
    const handleHashChange = (0, react_1.useCallback)(() => {
        const currentPath = location.hash.replace("#", "");
        if (currentPath !== activePath) {
            setActivePath(currentPath);
        }
    }, [activePath]);
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        if (isLoading && items.top.length && items.bottom.length) {
            setIsLoading === null || setIsLoading === void 0 ? void 0 : setIsLoading(false);
        }
    }, [items, isLoading, setIsLoading]);
    (0, react_1.useEffect)(() => {
        if (shouldHandlePathChange && pathname !== activePath) {
            setActivePath(pathname);
        }
    }, [shouldHandlePathChange, pathname]);
    return (react_1.default.createElement(exports.SidebarContext.Provider, { value: {
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
exports.SidebarProvider = SidebarProvider;
const useSidebar = () => {
    const context = (0, react_1.useContext)(exports.SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used inside a SidebarProvider");
    }
    return context;
};
exports.useSidebar = useSidebar;
